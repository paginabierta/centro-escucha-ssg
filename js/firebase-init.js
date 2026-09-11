import { firebaseConfig, FIREBASE_LISTO } from './firebase-config.js';
import RUTAS_SEED from './rutas-data.js';
import AGENTES_SEED from './agentes-data.js';
import REFLEXIONES_SEED from './reflexiones-data.js';

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

export async function obtenerRutas() {
  if (!FIREBASE_LISTO) return RUTAS_SEED;
  try {
    const { collection, getDocs, orderBy, query } = window.__fb.fsMod;
    const q = query(collection(db, "rutas"), orderBy("municipio"));
    const snap = await getDocs(q);
    if (snap.empty) return RUTAS_SEED;
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn("No se pudo leer Firestore, usando datos de ejemplo:", e);
    return RUTAS_SEED;
  }
}

export async function obtenerAgentes() {
  if (!FIREBASE_LISTO) return AGENTES_SEED;
  try {
    const { collection, getDocs, query, where } = window.__fb.fsMod;
    const q = query(collection(db, "agentes"), where("activo", "==", true));
    const snap = await getDocs(q);
    if (snap.empty) return AGENTES_SEED;
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn("No se pudo leer agentes, usando datos de ejemplo:", e);
    return AGENTES_SEED;
  }
}

export async function obtenerReflexionDelDia() {
  let lista = REFLEXIONES_SEED;
  if (FIREBASE_LISTO) {
    try {
      const { collection, getDocs } = window.__fb.fsMod;
      const snap = await getDocs(collection(db, "reflexiones"));
      if (!snap.empty) lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) {
      console.warn("No se pudo leer reflexiones, usando datos de ejemplo:", e);
    }
  }
  const inicioAno = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - inicioAno;
  const diaDelAno = Math.floor(diff / 86400000);
  return lista[diaDelAno % lista.length];
}

export async function obtenerEquipoApoyo() {
  if (!FIREBASE_LISTO) return [];
  try {
    const { collection, getDocs, query, where } = window.__fb.fsMod;
    const q = query(collection(db, "equipo_apoyo"), where("activo", "==", true));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn("No se pudo leer el equipo de apoyo:", e);
    return [];
  }
}

export async function crearSolicitudCita(datos) {
  const { collection, addDoc, serverTimestamp } = window.__fb.fsMod;
  return addDoc(collection(db, "citas"), {
    ...datos,
    estado: "pendiente",
    creado: serverTimestamp(),
  });
}

export { FIREBASE_LISTO, auth, db };
