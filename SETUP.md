# Centro de Escucha Psicoespiritual — Guía de instalación

Sigue estos pasos en orden. Son los mismos que usamos para Club de Lectura.

## ⚠️ Si ya tenías el sitio funcionando: actualiza las reglas de Firestore

Esta versión agrega 3 colecciones nuevas (`agentes`, `citas`, `reflexiones`) al archivo `firestore.rules`. Si ya habías publicado las reglas antes, tienes que **volver a pegarlas**:

1. Sube los archivos nuevos/actualizados de esta carpeta a tu repositorio en GitHub (los mismos de antes, más `agendar-cita.html`, `motivacion.html`, `js/agendar.js`, `js/agentes-data.js`, `js/reflexiones-data.js`).
2. En Firebase Console → **Firestore Database → Reglas** → borra todo → pega el contenido actualizado de `firestore.rules` → **Publicar**.

Sin este paso, el formulario de citas y la página de motivación no van a poder guardar ni leer datos.

## 1. Publicar el sitio en GitHub Pages

1. Entra a GitHub con la cuenta **paginabierta**.
2. Crea un repositorio nuevo llamado **centro-escucha-ssg** (público).
3. Sube todo el contenido de esta carpeta al repositorio (arrastra los archivos en la web de GitHub, o usa GitHub Desktop).
4. En el repositorio: **Settings → Pages → Source → main branch → /(root)** → Guardar.
5. En unos minutos el sitio queda publicado en:
   `https://paginabierta.github.io/centro-escucha-ssg/`

En este punto el sitio ya funciona — el buscador de rutas muestra los datos de ejemplo (`js/rutas-data.js`). Lo único que falta es activar el panel del equipo.

## 2. Crear el proyecto de Firebase

1. Ve a https://console.firebase.google.com y crea un proyecto llamado **centro-escucha-ssg**.
2. Dentro del proyecto, click en el ícono `</>` (Agregar app web). Nómbrala igual y **no** actives Firebase Hosting (ya usamos GitHub Pages).
3. Firebase te muestra un bloque `firebaseConfig = {...}`. Cópialo.
4. Abre `js/firebase-config.js` en el repositorio y **reemplaza** el objeto `firebaseConfig` por el que copiaste. Guarda y sube el cambio a GitHub.

## 3. Activar Authentication

1. En la consola de Firebase: **Authentication → Sign-in method → Correo electrónico/contraseña → Activar**.
2. **Authentication → Users → Add user** — crea tu propia cuenta (la tuya, de administrador) con tu correo y una contraseña.
3. Copia el **UID** que te asigna (aparece en la lista de usuarios).

## 4. Activar Firestore y las reglas de seguridad

1. **Firestore Database → Crear base de datos** → modo producción → elige la región más cercana (ej. `us-east1` o `southamerica-east1`).
2. Ve a la pestaña **Reglas** y reemplaza todo el contenido por el archivo `firestore.rules` que está en esta carpeta. Publica.
3. **Crea tu propio usuario administrador a mano** (esto es el único paso manual porque las reglas exigen que ya exista un admin para poder crear otros):
   - En Firestore, crea la colección **usuarios**.
   - Crea un documento cuyo ID sea tu **UID** (el que copiaste en el paso 3).
   - Agrégale dos campos: `correo` (tu correo) y `rol` con el valor `admin`.

## 5. Entrar al panel

1. Ve a `https://paginabierta.github.io/centro-escucha-ssg/equipo/login.html`
2. Entra con tu correo y contraseña.
3. En la pestaña **Rutas por municipio**, haz clic en "Cargar datos de ejemplo a Firestore" — esto copia los 42 municipios que ya teníamos a la base de datos, para que puedas seguir completando teléfonos y hospitales desde ahí en vez de escribirme a mí cada vez.

## 6. Crear cuentas para otros agentes del equipo

Firebase no permite crear cuentas de otras personas desde el panel sin un servidor adicional, así que este paso es manual pero rápido:

1. **Authentication → Users → Add user** — crea la cuenta del agente (correo + contraseña temporal).
2. Copia su UID.
3. Entra al panel como administrador → pestaña **Accesos** → pega el UID, su correo (de referencia) y elige el rol **Agente de escucha** → Guardar.

Listo — esa persona ya puede entrar y registrar casos en la bitácora, pero no puede editar las rutas ni los accesos (eso queda solo para el rol Administrador).

## 7. Activar "Agendar cita" y "Motivación"

Estas dos páginas públicas nuevas también dependen de Firestore. Desde el panel, como administrador:

1. Pestaña **Motivación** → botón "Cargar reflexiones de ejemplo a Firestore" (una sola vez). Desde ahí puedes agregar más reflexiones cuando quieras.
2. Pestaña **Agentes del equipo** → agrega ahí a cada sacerdote/psicólogo que quieras que aparezca como opción en el formulario de "Agendar cita", marcando qué modalidades ofrece (virtual, presencial en San Gil, presencial en su parroquia).
3. Pestaña **Solicitudes de cita** — ahí verás lo que la gente vaya enviando desde el formulario público. Cuando confirmes un horario con la persona (por teléfono), agrégalo tú mismo a tu Google Calendar y marca la solicitud como "confirmada" en el panel.

## Sobre agendar citas y Google Calendar

Por ahora el formulario público solo **guarda la solicitud** — no crea el evento en Google Calendar automáticamente. Ustedes (el equipo) revisan la solicitud en el panel, confirman el horario por teléfono, y lo agregan a mano a su calendario. Si en el futuro el volumen de citas lo justifica, se puede automatizar con Google Calendar, pero eso requiere activar el plan de pago por uso de Firebase (Blaze) y una configuración bastante más técnica — lo dejamos para una fase futura.

## Notas

- El sitio público (inicio, qué es, cómo acompañamos, contacto) es visible para cualquiera, sin necesidad de Firebase.
- La bitácora de casos NUNCA es pública — las reglas de Firestore lo impiden aunque alguien intente entrar directo a la base de datos.
- Si en el futuro quieres dominio propio (ej. centrodeescucha.org), se configura desde GitHub Pages → Custom domain; el costo aproximado ronda los 50.000–80.000 COP/año, igual que hablamos para Conozcamos la Biblia.
