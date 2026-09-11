// ============================================
// CONFIGURACIÓN DE FIREBASE
// ============================================
// 1. Ve a https://console.firebase.google.com
// 2. Crea el proyecto "centro-escucha-ssg"
// 3. Agrega una app web (ícono </>)
// 4. Copia el objeto firebaseConfig que te da Firebase y REEMPLAZA el de abajo
// 5. Activa en la consola: Authentication (correo/contraseña) y Firestore Database
//
// Mientras no completes esto, el sitio sigue funcionando con los datos de
// ejemplo en rutas-data.js (modo "solo lectura sin conexión").

export const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "centro-escucha-ssg.firebaseapp.com",
  projectId: "centro-escucha-ssg",
  storageBucket: "centro-escucha-ssg.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
};

// Se pone en true automáticamente cuando detecta que ya reemplazaste la clave
export const FIREBASE_LISTO = firebaseConfig.apiKey !== "TU_API_KEY";
