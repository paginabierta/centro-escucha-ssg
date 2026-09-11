// ============================================
// CONFIGURACIÓN DE FIREBASE
// ============================================
export const firebaseConfig = {
  apiKey: "AIzaSyBK4uiFaqKRez52OmDgmDpLmdr2GYfan-s",
  authDomain: "centro-escucha-ssg.firebaseapp.com",
  projectId: "centro-escucha-ssg",
  storageBucket: "centro-escucha-ssg.firebasestorage.app",
  messagingSenderId: "255789862696",
  appId: "1:255789862696:web:1411c96fe4381ebd868a1d",
};

// Se pone en true automáticamente cuando detecta que ya reemplazaste la clave
export const FIREBASE_LISTO = firebaseConfig.apiKey !== "TU_API_KEY";
