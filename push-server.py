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

def _author_from_email(email):
    """'fiorella@petrus.local' → 'Fiorella'. Devuelve '' si no hay email."""
    if not email:
        return ""
    name = str(email).split("@")[0].replace(".", " ").strip()
    return name[:1].upper() + name[1:] if name else ""


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


def send(tokens, heading, text, url="index.html", tag="petrus"):
    """Envía una push.
    En iPhone, Apple SIEMPRE pone 'Petrus FOH' arriba y 'from Petrus FOH' en el
    medio (no se puede quitar). El TÍTULO que controlamos (negrita, bajo el
    nombre de la app) lo usamos para el `heading` descriptivo:
      • heading = 'Fiorella', 'Milena', 'New Dish', 'Dish Updated',
                  'New task to Milena', '86'
      • text    = el mensaje / nombre del plato / producto (va en el cuerpo)
    `url` es una página relativa; aquí se convierte en URL HTTPS completa."""
    if not tokens:
        print(f"[push] sin dispositivos para «{heading}»")
        return

    full_url = url if url.startswith("http") else (SITE_URL + url.lstrip("/"))
    heading = (heading or "Petrus FOH").strip()
    # iOS descarta las push con saltos de línea: los reemplazamos por espacios.
    heading = " ".join(heading.split())
    body = " ".join((text or "").split())

    # SOLO `data` (sin `notification`): el service worker arma la notificación
    # usando data.title como título y data.body como cuerpo.
    message = messaging.MulticastMessage(
        tokens=tokens,
        data={"title": heading, "body": body, "url": full_url, "tag": tag},
        webpush=messaging.WebpushConfig(
            headers={"Urgency": "high"},
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
    print(f"[push] «{heading}» → {resp.success_count} enviadas, "
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
        for doc in db.collection("notes").stream():
            _sent.add("note:" + doc.id)
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
        body = d.get("body") or d.get("message") or d.get("title") or ""
        # Mensaje manual (admin): título = NOMBRE de quien lo envió.
        author = _author_from_email(d.get("authorEmail")) or "Fiorella"
        send(get_tokens(None), author, body, url="index.html", tag="broadcast")


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
        # Nuevo vs actualizado: si createdAt y updatedAt coinciden (± unos
        # segundos), es nuevo. Si no, es una actualización.
        title = "Dish Updated"
        ca, ua = d.get("createdAt"), d.get("updatedAt")
        try:
            if ca and ua and abs(ca.timestamp() - ua.timestamp()) < 5:
                title = "New Dish"
            elif ca and not ua:
                title = "New Dish"
        except Exception:
            pass
        send(get_tokens(None), title, name, url="food-net.html", tag="dish")


def on_duties(col_snapshot, changes, read_time):
    for change in changes:
        if change.type.name != "ADDED":
            continue
        doc = change.document
        if not _once("duty:" + doc.id):
            continue
        d = doc.to_dict() or {}
        text = d.get("text") or ""
        author = (d.get("author") or "").strip() or "Someone"
        if d.get("isMessage"):
            # Mensaje libre → título = NOMBRE de quien lo envía.
            send(get_tokens(DUTY_RECIPIENTS), author,
                 text, url="sommeliers.html", tag="duty")
        else:
            # Tarea → título "New task to <asignado>".
            assignee = (d.get("assignee") or "").strip()
            title = f"New task to {assignee}" if assignee else "New task"
            send(get_tokens(DUTY_RECIPIENTS), title,
                 text or "A new task has been assigned.",
                 url="sommeliers.html", tag="duty")


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
        where = f" ({d.get('location')})" if d.get("location") else ""
        send(get_tokens(None), "86",
             f"{vintage}{name}{where}", url="somm-stock.html", tag="86")


def on_notes(col_snapshot, changes, read_time):
    """Notas de la página de inicio (colección `notes`).
      • recipients == ['all']  → notifica a TODOS.
      • recipients == [emails] → notifica SOLO a esas personas.
    El autor NO se notifica a sí mismo (ya sabe lo que escribió)."""
    for change in changes:
        if change.type.name != "ADDED":
            continue
        doc = change.document
        if not _once("note:" + doc.id):
            continue
        d = doc.to_dict() or {}
        text = (d.get("text") or "").replace("\n", " ").strip()
        if not text:
            continue
        author_email = (d.get("authorEmail") or "").lower()
        author = _author_from_email(author_email) or "Petrus"
        recipients = d.get("recipients") or []
        if not isinstance(recipients, list):
            recipients = []

        if "all" in recipients:
            # A todos, INCLUIDO el autor (Opción B).
            tokens = get_tokens(None)
        else:
            # Solo a los destinatarios indicados.
            emails_filter = [str(e).lower() for e in recipients]
            tokens = get_tokens(emails_filter)
        send(tokens, author, text, url="index.html", tag="note")


# ── Sondeo periódico (polling) ────────────────────────────────────────────
# En vez de depender de listeners en tiempo real (que a veces se "duermen"),
# consultamos Firestore cada POLL_SECONDS buscando documentos nuevos y los
# enviamos. Es simple y MUY fiable. La deduplicación por ID (_once) evita
# que algo se envíe dos veces.

POLL_SECONDS = 15


def _poll_once():
    """Revisa las 4 colecciones y procesa lo que no se haya enviado aún.
    Reutiliza exactamente la misma lógica que los handlers, simulando un
    cambio de tipo ADDED/MODIFIED por cada documento."""
    class _Change:
        def __init__(self, doc, kind="ADDED"):
            self.document = doc
            class _T:  # imita change.type.name
                name = kind
            self.type = _T()

    # notifications → ADDED
    docs = list(db.collection("notifications").stream())
    on_notifications(None, [_Change(d, "ADDED") for d in docs], None)

    # dishes → tratamos como MODIFIED (el handler ya filtra notifyTeam + firma)
    docs = list(db.collection("dishes").stream())
    on_dishes(None, [_Change(d, "MODIFIED") for d in docs], None)

    # somm_duties → ADDED
    docs = list(db.collection("somm_duties").stream())
    on_duties(None, [_Change(d, "ADDED") for d in docs], None)

    # somm_stock → ADDED
    docs = list(db.collection("somm_stock").stream())
    on_stock(None, [_Change(d, "ADDED") for d in docs], None)

    # notes (notas de inicio) → ADDED
    docs = list(db.collection("notes").stream())
    on_notes(None, [_Change(d, "ADDED") for d in docs], None)


def main():
    print("=" * 60)
    print("  Petrus FOH — Servidor de notificaciones (gratis)")
    print("  Proyecto: petrus-foh")
    print(f"  Revisando cada {POLL_SECONDS}s: notifications, dishes, "
          "somm_duties, somm_stock")
    print("  Déjalo corriendo. Ctrl+C para detener.")
    print("=" * 60)

    # Marca todo lo existente como ya enviado ANTES de empezar, para que al
    # arrancar no se reenvíe historial. Solo avisará lo creado de aquí en más.
    _seed_already_sent()

    try:
        while True:
            try:
                _poll_once()
            except Exception as e:
                print(f"[push] error en sondeo (se reintenta): {e}")
            time.sleep(POLL_SECONDS)
    except KeyboardInterrupt:
        print("\n[push] Detenido.")


if __name__ == "__main__":
    main()
