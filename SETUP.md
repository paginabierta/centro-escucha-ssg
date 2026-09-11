# Centro de Escucha Psicoespiritual — Guía de instalación

Sigue estos pasos en orden. Son los mismos que usamos para Club de Lectura.

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

## Notas

- El sitio público (inicio, qué es, cómo acompañamos, contacto) es visible para cualquiera, sin necesidad de Firebase.
- La bitácora de casos NUNCA es pública — las reglas de Firestore lo impiden aunque alguien intente entrar directo a la base de datos.
- Si en el futuro quieres dominio propio (ej. centrodeescucha.org), se configura desde GitHub Pages → Custom domain; el costo aproximado ronda los 50.000–80.000 COP/año, igual que hablamos para Conozcamos la Biblia.
