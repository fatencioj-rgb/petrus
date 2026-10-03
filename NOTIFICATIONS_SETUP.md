# Petrus FOH — Notificaciones push (GRATIS, sin tarjeta)

Envía **notificaciones push** a los teléfonos del equipo (como las de WhatsApp)
cuando pasa algo en el sitio. **No cuesta nada** y **no pide tarjeta**: usa el plan
gratis de Firebase (Spark) + un pequeño servidor Python que corre en tu PC
(igual que viniv, pero es un proceso aparte).

## Qué notifica

| Evento | Quién lo recibe | Dónde se dispara |
|--------|-----------------|------------------|
| Mensaje manual que tú escribes | Todos | `admin.html` → "Notify the team" |
| Plato nuevo o editado (botón "Save & Notify team") | Todos | `food-editor.html` |
| Nueva tarea / duty | Solo Fiorella, Christian, Milena | `sommeliers.html`, `somm-duties.html` |
| 86 registrado | Todos | `somm-stock.html` |

> Las tareas y los 86 notifican **automáticamente** al crearse. El plato solo
> notifica si usas el botón "Save & Notify team" (el "Save dish" normal guarda en silencio).

---

## Cómo funciona (sin pagar)

1. Los teléfonos del equipo se registran solos cuando entran al sitio y aceptan notificaciones.
2. `push-server.py` corre en una PC y **vigila** Firestore.
3. Cuando aparece un mensaje / plato / tarea / 86, ese servidor **envía** la push.

El único requisito: esa PC debe estar **encendida con el servidor corriendo** durante el
servicio. Es exactamente igual que viniv.

---

## PASO 1 — Generar la clave VAPID (gratis, una sola vez)

1. Entra a <https://console.firebase.google.com> → proyecto **petrus-foh**.
2. ⚙️ **Project settings** → pestaña **Cloud Messaging**.
3. En **Web Push certificates** → **Generate key pair**.
4. Copia la clave larga (empieza con `B...`).
5. Abre `push.js` y reemplaza:
   ```js
   var PETRUS_VAPID_KEY = "PASTE_YOUR_VAPID_KEY_HERE";
   ```
   por tu clave:
   ```js
   var PETRUS_VAPID_KEY = "B...tu-clave...";
   ```

> Esto es gratis y NO pide tarjeta. Es una clave pública, no hay problema en dejarla en el código.

## PASO 2 — Publicar el sitio

Sube los archivos a donde publicas (GitHub Pages). Asegúrate de incluir los nuevos:
`manifest.json`, `firebase-messaging-sw.js`, `push.js`, la carpeta `icons/`.

> Las push solo funcionan en **HTTPS** (GitHub Pages ya lo es).

## PASO 3 — Arrancar el servidor de notificaciones

En la PC que quede encendida durante el servicio, doble clic en:

```
start-push-server.bat
```

(o en terminal: `python push-server.py`). Déjalo corriendo. Mientras esté abierto,
las notificaciones salen. Si lo cierras, dejan de salir.

No necesitas instalar nada: `firebase-admin` ya está en tu PC.

---

## Cómo lo usa el equipo (una sola vez por teléfono)

1. Abrir el sitio en el navegador del celular.
2. **Añadir a pantalla de inicio** (en iPhone es obligatorio; requiere iOS 16.4+).
   - iPhone (Safari): botón Compartir → "Añadir a pantalla de inicio".
   - Android (Chrome): menú ⋮ → "Instalar app".
3. Abrir desde el ícono nuevo e **iniciar sesión**.
4. Aceptar **"Permitir notificaciones"**.

Si alguien no ve el permiso, en `admin.html` hay un botón **"Enable on this device"**.

---

## Probar que funciona

1. Arranca `start-push-server.bat`.
2. Entra a `admin.html`, escribe en **"Notify the team"** y pulsa **Send notification**.
3. En otro teléfono (con la app instalada y sesión iniciada) debe llegar.
4. Prueba también crear un **86** y una **tarea**.

En la ventana del servidor verás líneas como `[push] «86» → 3 enviadas`.

---

## Notas y límites

- **GRATIS, sin tarjeta.** No usa Cloud Functions ni plan Blaze.
- **Requiere PC encendida** con `push-server.py` corriendo (como viniv). Si la PC está
  apagada, las notificaciones no salen (sí quedan guardadas en el sitio, pero no avisan).
- **iPhone:** sin "Añadir a pantalla de inicio" NO llegan push (limitación de Apple). iOS 16.4+.
- Los tres sommeliers que reciben las tareas están en `push-server.py` (`DUTY_RECIPIENTS`).
  Si cambia el equipo, edita esa lista y reinicia el servidor.
- No afecta a viniv (`viniv-server.py`): es un proceso totalmente aparte.

---

## ¿Y si quieres que funcione con la PC apagada?

Esa es la única cosa que la versión gratis no da. Para eso se necesitaría Cloud Functions
(plan Blaze, con tarjeta) o un servidor en la nube. Si algún día lo quieres, se puede
cambiar sin rehacer nada del lado del teléfono.
