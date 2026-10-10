"""
═══════════════════════════════════════════════════════════════════════
Petrus FOH — Push Notification Server (gratis, sin tarjeta)
───────────────────────────────────────────────────────────────────────
Vigila Firestore en tiempo real y envía notificaciones push a los
teléfonos del equipo usando firebase-admin + el serviceAccountKey.json
que ya existe. Es un proceso INDEPENDIENTE de viniv.

Qué notifica:
  • notifications (mensaje manual)      → TODOS
  • dishes con notifyTeam == True        → TODOS (nombre del plato)
  • somm_duties (tarea nueva)            → solo Fiorella, Christian, Milena
  • somm_stock con tag == '86'           → TODOS

Cómo correrlo:
  python push-server.py

Déjalo corriendo en la PC que esté encendida durante el servicio.
No necesita plan de pago: usa el plan gratis (Spark) de Firebase.
═══════════════════════════════════════════════════════════════════════
"""

import os
import time
import warnings

# Silencia un aviso cosmético de la librería (no afecta el envío).
warnings.filterwarnings("ignore", category=DeprecationWarning)

import firebase_admin
from firebase_admin import credentials, firestore, messaging, exceptions as fb_exceptions

# ── Configuración ──────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
KEY_PATH = os.path.join(BASE_DIR, "serviceAccountKey.json")

# URL base del sitio publicado (HTTPS obligatorio para las push web).
# Si algún día cambias de dominio, edita solo esta línea.
SITE_URL = "https://fatencioj-rgb.github.io/petrus/"

# Solo estos tres sommeliers reciben notificaciones de tareas (duties).
DUTY_RECIPIENTS = [
    "fiorella@petrus.local",
    "christian@petrus.local",
    "milena@petrus.local",
    "orson@petrus.local",
]

# ── Inicializar Firebase ───────────────────────────────────────────────
cred = credentials.Certificate(KEY_PATH)
firebase_admin.initialize_app(cred)
db = firestore.client()


# ── Helpers ────────────────────────────────────────────────────────────
def get_tokens(emails=None):
    """Devuelve los tokens de dispositivos.
    emails=None → todos. emails=[...] → solo esos correos."""
    tokens = []
    for doc in db.collection("push_tokens").stream():
        d = doc.to_dict() or {}
        tok = d.get("token")
        email = (d.get("email") or "").lower()
        if not tok:
            continue
        if emails is None or email in emails:
            tokens.append(tok)
    return tokens


# Todas las notificaciones muestran este título fijo. El detalle va en el cuerpo.
APP_TITLE = "Petrus FOH"


def send(tokens, heading, body, url="index.html", tag="petrus"):
    """Envía una push a la lista de tokens y limpia los que ya no sirven.
    El título siempre es «Petrus FOH»; `heading` (ej. 'Dish updated') se pone
    como primera línea del cuerpo, seguido del mensaje.
    `url` es una página relativa; aquí se convierte en URL HTTPS completa."""
    if not tokens:
        print(f"[push] sin dispositivos para «{heading}»")
        return

    full_url = url if url.startswith("http") else (SITE_URL + url.lstrip("/"))

    # Cuerpo final en UNA sola línea (iOS/Safari descarta pushes con '\n').
    # Formato: "Encabezado — mensaje". Si no hay encabezado, solo el mensaje.
    full_body = (f"{heading} — {body}" if heading and body
                 else (heading or body or ""))

    message = messaging.MulticastMessage(
        tokens=tokens,
        notification=messaging.Notification(title=APP_TITLE, body=full_body),
        data={"title": APP_TITLE, "body": full_body, "url": full_url, "tag": tag},
        webpush=messaging.WebpushConfig(
            notification=messaging.WebpushNotification(
                icon=SITE_URL + "icons/icon-192.png",
                badge=SITE_URL + "icons/icon-192.png",
            ),
            fcm_options=messaging.WebpushFCMOptions(link=full_url),
        ),
    )

    resp = messaging.send_each_for_multicast(message)

    # Limpia tokens muertos (app desinstalada, reinstalada, permiso revocado…).
    # Se detecta por el TIPO de error de FCM, que es más fiable que el texto:
    #   • UnregisteredError  → el token ya no existe (reinstalación/desinstalación)
    #   • InvalidArgumentError → token con formato inválido
    dead = 0
    for i, r in enumerate(resp.responses):
        if not r.success and r.exception:
            e = r.exception
            is_dead = isinstance(e, fb_exceptions.NotFoundError) \
                or type(e).__name__ in ("UnregisteredError", "SenderIdMismatchError") \
                or "notregistered" in str(e).lower().replace("-", "") \
                or "unregistered" in str(e).lower() \
                or "invalid-argument" in str(e).lower() \
                or "invalidargument" in str(e).lower().replace("-", "")
            if is_dead:
                try:
                    db.collection("push_tokens").document(tokens[i]).delete()
                    dead += 1
                except Exception:
                    pass
    print(f"[push] «{heading or body}» → {resp.success_count} enviadas, "
          f"{resp.failure_count} fallidas, {dead} tokens limpiados")


# ── Listeners (tiempo real) ─────────────────────────────────────────────
# Para no notificar documentos viejos al arrancar, marcamos el momento de
# inicio y solo reaccionamos a documentos ADDED después de arrancar.

# ── Anti-duplicados ──────────────────────────────────────────────────────
# Guardamos una "firma" de cada aviso ya enviado. Mientras el servidor viva,
# nunca reenvía la misma firma, pase lo que pase con reconexiones o snapshots.
#   • notifications / duties / 86 → firma = id del documento
#   • dishes → firma = id + notifyAt (así, si editas el MISMO plato otra vez
#     con "Save & Notify", cambia notifyAt y sí vuelve a avisar; pero las
#     reconexiones, que repiten el mismo notifyAt, NO reenvían).
_sent = set()


def _seed_already_sent():
    """Al arrancar, marca TODO lo existente como ya enviado, para no
    reenviar historial viejo. Solo se notificará lo creado de aquí en adelante."""
    try:
        for doc in db.collection("notifications").stream():
            _sent.add("notif:" + doc.id)
        for doc in db.collection("somm_duties").stream():
            _sent.add("duty:" + doc.id)
        for doc in db.collection("somm_stock").stream():
            _sent.add("86:" + doc.id)
        for doc in db.collection("dishes").stream():
            d = doc.to_dict() or {}
            _sent.add("dish:" + doc.id + ":" + _notify_stamp(d))
        print(f"[push] historial marcado ({len(_sent)} elementos); "
              f"solo se avisará lo nuevo.")
    except Exception as e:
        print(f"[push] aviso: no se pudo precargar historial: {e}")


def _notify_stamp(d):
    """Firma del 'notifyAt' de un plato (para distinguir re-notificaciones)."""
    na = d.get("notifyAt")
    try:
        return str(na.timestamp()) if na else "0"
    except Exception:
        return str(na)


def _once(key):
    """True solo la primera vez que se ve esta firma."""
    if key in _sent:
        return False
    _sent.add(key)
    return True


def on_notifications(col_snapshot, changes, read_time):
    for change in changes:
        if change.type.name != "ADDED":
            continue
        doc = change.document
        if not _once("notif:" + doc.id):
            continue
        d = doc.to_dict() or {}
        title = d.get("title") or ""
        body = d.get("body") or d.get("message") or ""
        heading = "" if title.strip().lower() in ("", "petrus", "petrus foh") else title
        send(get_tokens(None), heading, body, url="index.html", tag="broadcast")


def on_dishes(col_snapshot, changes, read_time):
    for change in changes:
        if change.type.name not in ("ADDED", "MODIFIED"):
            continue
        doc = change.document
        d = doc.to_dict() or {}
        if not d.get("notifyTeam"):
            continue
        # Firma = id + notifyAt. Una reconexión repite la misma firma → no reenvía.
        if not _once("dish:" + doc.id + ":" + _notify_stamp(d)):
            continue
        name = d.get("name") or "A dish"
        body = f"{name} has been updated on the menu."
        send(get_tokens(None), "Dish updated", body, url="food-net.html", tag="dish")


def on_duties(col_snapshot, changes, read_time):
    for change in changes:
        if change.type.name != "ADDED":
            continue
        doc = change.document
        if not _once("duty:" + doc.id):
            continue
        d = doc.to_dict() or {}
        text = d.get("text") or ""
        if d.get("isMessage"):
            # Mensaje libre: "Fiorella has a message: ..."
            author = (d.get("author") or "Someone")
            send(get_tokens(DUTY_RECIPIENTS), f"{author} has a message",
                 text, url="sommeliers.html", tag="duty")
        else:
            # Tarea normal.
            text = text or "A new task has been assigned."
            assignee = f" ({d.get('assignee')})" if d.get("assignee") else ""
            send(get_tokens(DUTY_RECIPIENTS), "New task",
                 f"{text}{assignee}", url="sommeliers.html", tag="duty")


def on_stock(col_snapshot, changes, read_time):
    for change in changes:
        if change.type.name != "ADDED":
            continue
        doc = change.document
        d = doc.to_dict() or {}
        if d.get("tag") != "86":
            continue
        if not _once("86:" + doc.id):
            continue
        name = d.get("name") or "An item"
        vintage = f"{d.get('vintage')} " if d.get("vintage") else ""
        where = f" — {d.get('location')}" if d.get("location") else ""
        send(get_tokens(None), "86",
             f"{vintage}{name} is 86{where}.", url="somm-stock.html", tag="86")


# ── Suscripciones + reconexión ───────────────────────────────────────────
# Los listeners de Firestore de larga duración a veces se "duermen" y dejan
# de recibir eventos sin avisar. Para evitarlo, cada cierto tiempo cerramos
# y volvemos a abrir las suscripciones, manteniendo la conexión fresca.

RESUBSCRIBE_SECONDS = 15 * 60  # re-suscribir cada 15 minutos

_watches = []


def subscribe():
    """Abre las 4 suscripciones y guarda sus handles."""
    global _watches
    _watches = [
        db.collection("notifications").on_snapshot(on_notifications),
        db.collection("dishes").on_snapshot(on_dishes),
        db.collection("somm_duties").on_snapshot(on_duties),
        db.collection("somm_stock").on_snapshot(on_stock),
    ]


def unsubscribe():
    """Cierra las suscripciones actuales."""
    global _watches
    for w in _watches:
        try:
            w.unsubscribe()
        except Exception:
            pass
    _watches = []


def main():
    print("=" * 60)
    print("  Petrus FOH — Servidor de notificaciones (gratis)")
    print("  Proyecto: petrus-foh")
    print("  Escuchando: notifications, dishes, somm_duties, somm_stock")
    print("  Déjalo corriendo. Ctrl+C para detener.")
    print("=" * 60)

    # Marca todo lo existente como ya enviado ANTES de escuchar, para que al
    # arrancar no se reenvíe historial. Solo avisará lo creado de aquí en más.
    _seed_already_sent()

    subscribe()

    try:
        last = time.time()
        while True:
            time.sleep(1)
            # Refresca las suscripciones periódicamente para que no se duerman.
            if time.time() - last >= RESUBSCRIBE_SECONDS:
                unsubscribe()
                subscribe()
                last = time.time()
                print("[push] conexión refrescada")
    except KeyboardInterrupt:
        unsubscribe()
        print("\n[push] Detenido.")


if __name__ == "__main__":
    main()
