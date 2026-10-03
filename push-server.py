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
from firebase_admin import credentials, firestore, messaging

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


def send(tokens, title, body, url="index.html", tag="petrus"):
    """Envía una push a la lista de tokens y limpia los que ya no sirven.
    `url` es una página relativa (ej. 'somm-stock.html'); aquí se convierte
    en una URL HTTPS completa, que es lo que FCM exige para webpush."""
    if not tokens:
        print(f"[push] sin dispositivos para «{title}»")
        return

    full_url = url if url.startswith("http") else (SITE_URL + url.lstrip("/"))

    message = messaging.MulticastMessage(
        tokens=tokens,
        notification=messaging.Notification(title=title, body=body),
        data={"title": title, "body": body, "url": full_url, "tag": tag},
        webpush=messaging.WebpushConfig(
            notification=messaging.WebpushNotification(
                icon=SITE_URL + "icons/icon-192.png",
                badge=SITE_URL + "icons/icon-192.png",
            ),
            fcm_options=messaging.WebpushFCMOptions(link=full_url),
        ),
    )

    resp = messaging.send_each_for_multicast(message)

    # Limpia tokens muertos (app desinstalada, permiso revocado, etc.)
    dead = 0
    for i, r in enumerate(resp.responses):
        if not r.success:
            code = getattr(r.exception, "code", "") if r.exception else ""
            if r.exception and (
                "not-registered" in str(r.exception).lower()
                or "invalid-registration" in str(r.exception).lower()
                or "unregistered" in str(r.exception).lower()
            ):
                try:
                    db.collection("push_tokens").document(tokens[i]).delete()
                    dead += 1
                except Exception:
                    pass
    print(f"[push] «{title}» → {resp.success_count} enviadas, "
          f"{resp.failure_count} fallidas, {dead} tokens limpiados")


# ── Listeners (tiempo real) ─────────────────────────────────────────────
# Para no notificar documentos viejos al arrancar, marcamos el momento de
# inicio y solo reaccionamos a documentos ADDED después de arrancar.

_started_at = time.time()


def _is_new(change):
    """True si el documento se acaba de crear (ADDED), no al cargar inicial."""
    return change.type.name == "ADDED"


def on_notifications(col_snapshot, changes, read_time):
    for change in changes:
        if not _is_new(change):
            continue
        d = change.document.to_dict() or {}
        # Evita reenviar lo que ya existía antes de arrancar el servidor.
        created = d.get("createdAt")
        if created and created.timestamp() < _started_at - 5:
            continue
        title = d.get("title") or "Petrus"
        body = d.get("body") or d.get("message") or ""
        send(get_tokens(None), title, body, url="index.html", tag="broadcast")


def on_dishes(col_snapshot, changes, read_time):
    for change in changes:
        # Platos pueden ser ADDED o MODIFIED (editar un plato existente).
        if change.type.name not in ("ADDED", "MODIFIED"):
            continue
        d = change.document.to_dict() or {}
        if not d.get("notifyTeam"):
            continue
        notify_at = d.get("notifyAt")
        # Solo si el "notificar" es reciente (evita avisos viejos al arrancar).
        if notify_at and notify_at.timestamp() < _started_at - 5:
            continue
        name = d.get("name") or "Un plato"
        title = "Plato actualizado"
        body = f"{name} se ha actualizado en el menú."
        send(get_tokens(None), title, body, url="food-net.html", tag="dish")


def on_duties(col_snapshot, changes, read_time):
    for change in changes:
        if not _is_new(change):
            continue
        d = change.document.to_dict() or {}
        created = d.get("createdAt")
        if created and created.timestamp() < _started_at - 5:
            continue
        text = d.get("text") or "Nueva tarea asignada."
        assignee = f" ({d.get('assignee')})" if d.get("assignee") else ""
        send(get_tokens(DUTY_RECIPIENTS), "Nueva tarea",
             f"{text}{assignee}", url="sommeliers.html", tag="duty")


def on_stock(col_snapshot, changes, read_time):
    for change in changes:
        if not _is_new(change):
            continue
        d = change.document.to_dict() or {}
        if d.get("tag") != "86":
            continue
        created = d.get("createdAt")
        if created and created.timestamp() < _started_at - 5:
            continue
        name = d.get("name") or "Un producto"
        vintage = f"{d.get('vintage')} " if d.get("vintage") else ""
        where = f" — {d.get('location')}" if d.get("location") else ""
        send(get_tokens(None), "86",
             f"{vintage}{name} está 86{where}.", url="somm-stock.html", tag="86")


# ── Arranque ─────────────────────────────────────────────────────────────
def main():
    print("=" * 60)
    print("  Petrus FOH — Servidor de notificaciones (gratis)")
    print("  Proyecto: petrus-foh")
    print("  Escuchando: notifications, dishes, somm_duties, somm_stock")
    print("  Déjalo corriendo. Ctrl+C para detener.")
    print("=" * 60)

    # Suscripciones en tiempo real.
    db.collection("notifications").on_snapshot(on_notifications)
    db.collection("dishes").on_snapshot(on_dishes)
    db.collection("somm_duties").on_snapshot(on_duties)
    db.collection("somm_stock").on_snapshot(on_stock)

    # Mantener vivo el proceso.
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[push] Detenido.")


if __name__ == "__main__":
    main()
