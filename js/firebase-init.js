// ============================================
// INICIALIZACIÓN DE FIREBASE + HELPERS DE DATOS
// ============================================
import { firebaseConfig, FIREBASE_LISTO } from './firebase-config.js';
import RUTAS_SEED from './rutas-data.js';

let app, auth, db;

if (FIREBASE_LISTO) {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
  const authMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");
  const fsMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

  app = initializeApp(firebaseConfig);
  auth = authMod.getAuth(app);
  db = fsMod.getFirestore(app);

  window.__fb = { app, auth, db, authMod, fsMod };
}

/**
 * Devuelve la lista de rutas por municipio.
 * Si Firebase ya está configurado, lee de Firestore (colección "rutas").
 * Si no, usa los datos de ejemplo embebidos (RUTAS_SEED) para que el sitio
 * sea usable desde el primer momento.
 */
export async function obtenerRutas() {
  if (!FIREBASE_LISTO) return RUTAS_SEED;
  try {
    const { collection, getDocs, orderBy, query } = window.__fb.fsMod;
    const q = query(collection(db, "rutas"), orderBy("municipio"));
    const snap = await getDocs(q);
    if (snap.empty) return RUTAS_SEED; // aún no se ha migrado la semilla
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn("No se pudo leer Firestore, usando datos de ejemplo:", e);
    return RUTAS_SEED;
  }
}

export { FIREBASE_LISTO, auth, db };
