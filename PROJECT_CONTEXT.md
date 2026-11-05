# Petrus FOH — Contexto del proyecto (memoria de trabajo)

> Memoria de contexto para retomar el trabajo si se pierde la conversación.
> Resume cómo está montado el sitio, las convenciones, y qué se ha construido
> con cada petición de Fiorella. Complementa a `SECURITY_INTENT.md` (seguridad)
> y a `SETUP.md` / `NOTIFICATIONS_SETUP.md` (Firebase / push).
>
> Última actualización: 05 Nov 2026

---

## 1. Cómo está montado y cómo se publica

- **Hosting:** GitHub Pages, repo `fatencioj-rgb/petrus`, rama `main`. Publicar =
  `git push origin main`; GitHub Pages reconstruye solo (normalmente <1 min; puede
  tardar o fallar si GitHub tiene un incidente — pasó el 04 Nov 2026).
- **URL en vivo:** https://fatencioj-rgb.github.io/petrus/
- **Backend:** Firebase, proyecto `petrus-foh`. Firestore para datos; Firebase Auth
  para los logins `nombre@petrus.local`. Config del cliente en `auth.js`.
- **Reglas de Firestore (`firestore.rules`):** se despliegan con la **service account**
  (`serviceAccountKey.json`, git-ignored) contra la API REST de Firebase Rules,
  porque la CLI pide `firebase login` interactivo. Script de un uso: crear ruleset →
  release a `cloud.firestore`. (Ver cómo se hizo en el historial de git.)
- **Solo tocar los archivos de cada tarea.** `auth.js` y `bookings.html` suelen
  aparecer como modificados localmente por cambios ajenos previos: NO incluirlos en
  los commits salvo que la tarea sea sobre ellos.

## 2. Convenciones al trabajar aquí

- Páginas HTML independientes, JS en un `<script>` inline al final (compat SDK de Firebase).
- Verificación antes de publicar: extraer el script inline y `node --check`; para UI/print,
  probar en Chrome headless (`--dump-dom`, `--screenshot`, `--print-to-pdf`) con un
  Firestore/stub simulado, y revisar PDFs con PyMuPDF (`fitz`). Limpiar los temporales
  (`_t_*.js`, `_pdfcheck/`, etc.) antes del commit.
- Paleta: bordeaux `#5c1a1a`, dorado `#b89650`, crema `#faf7f1`. Serif Cormorant Garamond,
  sans Inter. Las cifras de mesa usan lining-nums (si no, el "1" de Cormorant parece "I").

## 3. Accesos por rol (resumen; detalle en SECURITY_INTENT.md)

- Definidos en `auth.js` (`PETRUS_ACCESS`) y en `firestore.rules`.
- **Fiorella:** todo (único con `admin`). **Milena, Orson:** training/sommeliers/operations.
- **Editar platos:** Fiorella, Milena, Orson + **Irena** (solo platos, no producers).
- **Editar producers:** solo Fiorella, Milena, Orson.
- **Operations (bookings, seat plan):** Fiorella, Milena, Orson, Liza (`canOperations()`).
- **Cain, Tanvir, Johnny, Irena, Guest:** solo training.

## 4. Training → Food (`food-net.html` + `food-editor.html` + `producers-editor.html`)

- **Dishes:** viven en Firestore `dishes`; se editan en `food-editor.html`. Tarjetas con
  foto, modal, "Knowledge points", etc. `food-net.html` las muestra por menú.
- **Producers:** Firestore `producers`; editor `producers-editor.html` (espejo del de platos:
  foto, "The story" con texto enriquecido, knowledge points, y un selector para **enlazar platos**
  que aparecen como chips clicables en la tarjeta del producer). Pestaña "Our producers".
- Protecciones de contenido (watermark on-demand, aviso de screenshot): ver SECURITY_INTENT.md.
  Están en training.html, food-net.html, wine-btg.html, wine-pairings.html.

## 5. Training (home) y notificaciones (`index.html`)

- **Recently connected:** lista de los últimos 5 logins (nombre + hora), visible SOLO para Fiorella,
  al final de la home bajo el enlace Admin. Lee `access_logs` (que solo Fiorella puede leer).
- **Campana de notificaciones:** icono pequeño (🔔) junto a Admin, no un botón grande.

## 6. Operations → Seat Plan (`operations/seating.html`)

Editor del plano de sala en un solo archivo. Todo el estado vive en `state`
(`{ units, fixed, nextNum, selectedId, isDefault, meta }`).

- **Mesas:** redondas / largas, 1–30 asientos; se arrastran desde el centro. En redondas cada
  silla se arrastra para reposicionarla; "Reset Seats" las reparte parejo. +/− cambia asientos.
- **Número de mesa editable:** campo en el panel lateral (o doble clic en el número). Avisa si el
  número ya lo usa otra mesa (no bloquea).
- **Invitados por posición:** al hacer clic en una mesa, panel a la derecha (debajo en móvil) con
  P1, P2… Las sillas se numeran; con nombre llevan aro dorado. Enter pasa a la siguiente posición.
- **Alergias / dieta por invitado:** botón slim "Allergies…" junto a cada nombre abre una lista con
  casillas (grupos Diet y Allergies) + campo "Other" para escribir libre. Se guardan en `u.diets[i]`
  (array de tags). En impresión: columna slim a la derecha del nombre, solo en filas con nota;
  alergias en **rojo negrita**, dietas normal, texto libre en *cursiva*; leyenda pequeña en el header.
- **Guardado automático:** cada cambio → navegador al instante (localStorage, clave
  `petrus_seatplan_v1`) + Firestore `seat_plans/main` (debounced ~0.8 s). El primer sync nunca
  pisa un plano real sin preguntar (confirm + backup); el plano de ejemplo no se sube solo.
- **Planos con nombre (eventos):** colección `seat_plan_saves`. El nombre se escribe en un campo
  bajo el título "Seat Plan"; botón **Save** al lado. Una vez guardado, el campo muestra el nombre,
  el botón pasa a **Update** (activo solo si hay cambios) con estado "saved/modified", y aparece un
  enlace "Save as…" para copiar. La barra inferior tiene **New** y **Open…** (abrir/renombrar/borrar).
  `state.meta = { id, name, baseline }` liga el plano de trabajo a su versión guardada; la
  comparación usa una firma normalizada (seleccionar o re-render NO cuenta como cambio).
- **Print / PDF:** botón abre un menú con 2 opciones:
  1. **All on one sheet:** una hoja horizontal con el mini salón a la izquierda y las listas de
     invitados por mesa en columnas a la derecha.
  2. **Two sheets:** hoja 1 = el salón grande; hoja 2+ = las mesas en columnas a todo el ancho.
  La letra y nº de columnas se eligen solos (se prueba off-screen cuál entra). Planos enormes siguen
  en hojas extra. Ctrl/Cmd+P reusa la última opción elegida.
- **Encabezado de impresión:** "Seat Plan" y debajo "PETRUS - <nombre del evento tal cual se guardó>"
  (p.ej. "GR 60's", respetando mayúsculas/minúsculas). Mesas en orden natural (Table 1, 2, … 10).
- **Crédito:** "Automatization made by Fiorella A." va en el ENCABEZADO, arriba a la derecha bajo la
  fecha (dentro del contenido, para que no se pueda recortar al imprimir), 8px, en cada hoja. El pie
  de la página en pantalla dice "© 2026 — Petrus — Internal Use Only — Automatization made by Fiorella A."

## 7. Pendientes / ideas

- Extender watermark + aviso de screenshot a más páginas si se quiere.
- (En curso) Training → Food: botón **Print / PDF** visible SOLO para Fiorella, que exporte una
  ficha imprimible por plato.
- Actualizar `reset-password.js` a la API modular de `firebase-admin` v14.
