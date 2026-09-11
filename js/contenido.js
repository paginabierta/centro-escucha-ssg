import { FIREBASE_LISTO, db } from './firebase-init.js';

// Metadatos para armar el formulario del panel: qué campos tiene cada página y su etiqueta.
export const CAMPOS = {
  inicio: [
    { id: 'hero_titulo', label: 'Título principal (Inicio)' },
    { id: 'hero_subtitulo', label: 'Subtítulo debajo del título' },
    { id: 'seccion_titulo', label: 'Título de la sección "Un espacio para quien..."' },
    { id: 'seccion_texto', label: 'Texto de esa sección' },
  ],
  que_es: [
    { id: 'intro1', label: 'Primer párrafo' },
    { id: 'desde_donde', label: 'Párrafo "Desde dónde acompañamos"' },
    { id: 'confidencialidad', label: 'Párrafo de confidencialidad' },
  ],
  como_acompanamos: [
    { id: 'soledad', label: 'Texto de "Soledad"' },
    { id: 'duelo', label: 'Texto de "Acompañamiento del duelo"' },
    { id: 'enfermedad', label: 'Texto de "Enfermedad"' },
    { id: 'trabajo', label: 'Texto de "Pérdida del trabajo"' },
    { id: 'familias', label: 'Texto de "Familias y parejas"' },
  ],
  contacto: [
    { id: 'texto2', label: 'Párrafo de cierre' },
  ],
  equipo_apoyo: [
    { id: 'intro', label: 'Texto debajo del título "Equipo de Apoyo"' },
  ],
};

// Textos actuales del sitio — se usan si Firestore aún no tiene nada guardado para ese campo.
export const DEFAULTS = {
  inicio: {
    hero_titulo: 'Aquí te escuchamos.',
    hero_subtitulo: 'Encuentra a quién acudir en tu municipio: parroquia, párroco y hospital más cercano.',
    seccion_titulo: 'Un espacio para quien atraviesa un momento difícil',
    seccion_texto: 'El Centro de Escucha Psicoespiritual acompaña a la comunidad diocesana desde la escucha, la espiritualidad y la psicología — sin juzgar, sin prisa, y sin sustituir la ayuda profesional cuando hace falta.',
  },
  que_es: {
    intro1: 'El Centro de Escucha Psicoespiritual es un espacio de acogida, escucha activa, primeros auxilios psicológicos, orientación y acompañamiento espiritual, de carácter gratuito, confidencial y no clínico, dirigido a toda persona de la Diócesis de Socorro y San Gil.',
    desde_donde: 'Este espacio se sostiene en dos tradiciones que se complementan: la escucha y la cercanía que pide el Evangelio — como el Buen Samaritano, que se acerca, venda las heridas y acompaña — y el rigor de la psicología, desde los enfoques cognitivo-conductual y humanista.',
    confidencialidad: 'Todo lo que compartas aquí es confidencial, con dos únicas excepciones: riesgo inminente para tu vida o la de alguien más, y sospecha de abuso a un menor o un adulto vulnerable. En esos casos, activamos la ruta de ayuda correspondiente para proteger la vida por encima de la reserva de la conversación.',
  },
  como_acompanamos: {
    soledad: 'Particularmente presente en un territorio rural y disperso, donde muchos adultos mayores viven solos, con hijos que migraron. Aquí el acompañamiento es de presencia y escucha regular — la soledad no se resuelve con una sola visita, se alivia con un vínculo que se sostiene en el tiempo.',
    duelo: 'Duelo por la muerte de un ser querido, pero también otros duelos que a veces no se nombran: la migración de un hijo, una ruptura familiar, un proyecto de vida que no se pudo cumplir. Acompañamos sin prisa por "consolar" con frases hechas, respetando tu propio proceso.',
    enfermedad: 'Cercanía espiritual y emocional en la enfermedad, incluidos los pacientes en etapa terminal o con cáncer. No sustituimos el manejo médico: acompañamos junto a él, en coordinación con el equipo de salud tratante cuando existe.',
    trabajo: 'Un espacio para la pérdida de identidad, la vergüenza y la tensión familiar que trae la crisis económica — muchas veces invisibilizada en el acompañamiento pastoral tradicional.',
    familias: 'Un primer espacio de escucha y orientación ante conflictos de convivencia o crisis de pareja, con remisión a Comisaría de Familia o a profesionales especializados cuando el caso lo requiere.',
  },
  contacto: {
    texto2: 'Para cualquier otra consulta sobre el Centro de Escucha, puedes comunicarte con SEPAS a través de los canales oficiales de la Diócesis de Socorro y San Gil.',
  },
  equipo_apoyo: {
    intro: 'Sacerdotes, psicólogos, trabajadores sociales y agentes de pastoral que acompañan el Centro de Escucha.',
  },
};

export async function obtenerContenido(pagina) {
  const base = { ...(DEFAULTS[pagina] || {}) };
  if (!FIREBASE_LISTO) return base;
  try {
    const { doc, getDoc } = window.__fb.fsMod;
    const snap = await getDoc(doc(db, 'contenido', pagina));
    if (snap.exists()) return { ...base, ...snap.data() };
  } catch (e) {
    console.warn(`No se pudo leer el contenido de "${pagina}":`, e);
  }
  return base;
}

// Aplica el contenido a cualquier elemento con data-cid="campoId" en la página actual.
export function aplicarContenido(datos) {
  document.querySelectorAll('[data-cid]').forEach(el => {
    const val = datos[el.dataset.cid];
    if (val) el.innerText = val;
  });
}
