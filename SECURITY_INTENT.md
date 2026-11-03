# Petrus FOH — Seguridad y protección del contenido

> Documento de intención. Resume **qué quiere Fiorella** respecto a "asegurar"
> la web, **qué se implementó**, **dónde**, y los **límites reales** de cada
> medida. Sirve para no perder el contexto si se borra la conversación.
>
> Última actualización: 31 Oct 2026

---

## 1. La intención de Fiorella (el "por qué")

El problema de origen: hay personas que están **compartiendo acceso** / copiando
información de la web (se sospecha que comparten cuentas y/o hacen capturas de
pantalla del contenido de training).

Lo que Fiorella quiere conseguir:

1. **Avisar/disuadir** cuando alguien intenta hacer un **screenshot**.
2. Que si se logra copiar/capturar la información, la imagen quede **"firmada"
   con el nombre del usuario** (marca de agua), para poder rastrear una fuga.
3. Que la página **no** lleve marca de agua visible todo el tiempo (por estética).
4. Control de **accesos por rol** bien definido (ver sección 4).
5. Que **solo Fiorella** vea quién se ha conectado recientemente.

> Importante: Fiorella entiende y acepta los límites técnicos explicados abajo.
> El objetivo no es un bloqueo perfecto (imposible en web), sino **disuadir** y
> **poder rastrear** una fuga.

---

## 2. Límites honestos (qué NO se puede hacer en una web)

- **No se pueden bloquear screenshots.** El navegador no da ninguna API para
  impedir la captura del sistema operativo, ni el botón de captura del móvil, ni
  una foto hecha con otro teléfono. Cualquier promesa de "bloquear capturas" es
  falsa.
- **No se puede saber el instante exacto de una captura.** Solo se pueden
  detectar las **teclas/acciones** que suelen acompañarla (PrtScn, Win+Shift+S,
  Cmd+Shift+3/4/5, imprimir).
- **No se puede bloquear de verdad la consola / ver código.** Se puede dificultar
  (F12, clic derecho, Ctrl+U), pero quien sepa un poco lo salta. Es cosmético.
- **Bloquear copiar/pegar** es solo una barrera para el usuario casual; el texto
  sigue en el HTML y siempre se puede fotografiar la pantalla.

La protección que **sí** funciona de verdad es **disuasión + rastreo**:
marca de agua con el nombre del usuario + registro de accesos.

---

## 3. Qué se implementó (y dónde)

### a) Aviso de screenshot — `anti-capture.js`
- Muestra una **alerta a pantalla completa** ("Screenshots are not permitted…")
  cuando detecta: tecla **PrintScreen**, **Win+Shift+S**, **Cmd+Shift+3/4/5**, o
  un intento de **imprimir** (Ctrl/Cmd+P).
- Incluye además disuasores cosméticos: bloqueo de **clic derecho**, **Ctrl+C/X**,
  **F12**, **Ctrl+U**, y selección de texto / arrastrar imágenes.
  - Nota: los campos de formulario (`input`, `textarea`, editable) sí permiten
    seleccionar texto, para no romper la escritura.

### b) Marca de agua bajo demanda — `watermark.js`
- La página se ve **limpia** (NO hay marca de agua permanente — se quitó por
  estética, a petición de Fiorella).
- Cuando se detecta un intento de captura, `anti-capture.js` llama a
  `window.petrusShowWatermark(5000)` y se superpone, durante ~5 s y **por encima
  de la alerta**, el **nombre del usuario + fecha y hora**, en mosaico diagonal.
- Objetivo: que una captura hecha en ese momento quede "firmada".
- Límite: funciona bien con los atajos del sistema; no garantiza el 100% (p. ej.
  una foto con otro teléfono no se puede firmar).

### c) Dónde están aplicados estos dos scripts
Se cargan después de `auth.js`, en este orden: `auth.js` → `watermark.js` →
`anti-capture.js`. Páginas con la protección (contenido de training):
- `training.html`
- `food-net.html`
- `wine-btg.html`
- `wine-pairings.html`

> Pendiente / opcional: extender a sommeliers, operaciones y otras páginas si se
> quiere. Hoy NO están cubiertas para no arriesgar romper sus funciones.

### d) Vista "Recently connected" — solo Fiorella (`index.html`)
- En la página principal, **solo** para `fiorella@petrus.local`, aparece al final
  (debajo del link **Admin**) una lista discreta con los **últimos 5 inicios de
  sesión** (nombre + hora), en texto plano (no botones).
- Lee de la colección `access_logs` de Firestore.

### e) Campana de notificaciones (`index.html`)
- El botón grande "Turn on notifications" se quitó de la zona de navegación.
- Ahora es una **campana pequeña (🔔)** abajo, junto al link de Admin.

---

## 4. Control de acceso por rol (estado deseado y real)

Definido en `auth.js` (`PETRUS_ACCESS`) y aplicado en las reglas de Firestore
(`firestore.rules`) y en las listas de editores de las páginas de Food.

| Persona  | Training | Sommeliers | Operations | Admin | Editar platos/producers |
|----------|:--:|:--:|:--:|:--:|:--:|
| Fiorella | ✅ | ✅ | ✅ | ✅ | ✅ |
| Milena   | ✅ | ✅ | ✅ | — | ✅ |
| Orson    | ✅ | ✅ | ✅ | — | ✅ |
| Christian| ✅ | ✅ | — | — | — |
| Liza     | ✅ | — | ✅ | — | — |
| Irena    | ✅ | — | — | — | — (se le quitó la edición) |
| Cain     | ✅ | — | — | — | — |
| Tanvir   | ✅ | — | — | — | — |
| Johnny   | ✅ | — | — | — | — |
| Guest    | ✅ (solo) | — | — | — | — |

Reglas clave:
- **Acceso total: solo Fiorella.**
- **Editar platos y producers: solo Fiorella, Milena y Orson.** (Irena fue
  removida de los editores; conserva acceso de solo training.)
- **Cain: solo training**, nada más.
- La edición de platos/producers está protegida en `firestore.rules` por
  `canEditDishes()` = managers (Fiorella/Milena/Orson), y en el cliente por las
  listas `FN_EDITORS` / `EDITOR_ALLOWED` de `food-net.html`, `food-editor.html`
  y `producers-editor.html`.

### Contraseñas y sesiones
- Las contraseñas viven en **Firebase Authentication**, no en el repo.
- Cambio de contraseña: `cain@petrus.local` → `kinnerton-cain` (31 Oct 2026).
- Opciones que Fiorella **descartó** por ahora: caducar sesiones automáticamente
  (A) y sesión única por cuenta (C). Si el problema de cuentas compartidas
  persiste, reconsiderar la opción C.

---

## 5. Reglas de Firestore relevantes (`firestore.rules`)

- `dishes` y `producers`: lectura para cualquier usuario autenticado; escritura
  solo para `canEditDishes()` (Fiorella/Milena/Orson).
- `access_logs`: crear para cualquier autenticado; **leer solo Fiorella**;
  sin editar/borrar desde el cliente.
- Despliegue de reglas: se hace con la **service account** (`serviceAccountKey.json`)
  contra la API REST de Firebase Rules (`firebaserules.googleapis.com`), porque
  la CLI interactiva pide `firebase login`. El sitio en sí se publica por
  **GitHub Pages** (push a `main` del repo `fatencioj-rgb/petrus`).

---

## 6. Archivos tocados / creados

- `anti-capture.js` *(nuevo)* — aviso de screenshot + disuasores de copia.
- `watermark.js` *(nuevo)* — marca de agua bajo demanda con el nombre del usuario.
- `index.html` — Recently connected (solo Fiorella) + campana pequeña.
- `firestore.rules` — producers, canEditDishes sin Irena, access_logs legible por Fiorella.
- `food-net.html`, `food-editor.html`, `producers-editor.html` — editores sin Irena;
  food-net incluye watermark + anti-capture.
- `training.html`, `wine-btg.html`, `wine-pairings.html` — incluyen watermark + anti-capture.

---

## 7. Pendientes / ideas para más adelante

- Extender watermark + aviso a más páginas (sommeliers, operaciones).
- Ajustar duración/opacidad de la marca de agua si hace falta (hoy ~5 s).
- Si siguen compartiendo cuentas: evaluar **sesión única por dispositivo** (opción C).
- Actualizar `reset-password.js` a la API modular de `firebase-admin` v14
  (el script actual está escrito para una versión antigua y fallaría tal cual).
