import { FIREBASE_LISTO, db } from './firebase-init.js';

export const PALETAS = {
  diocesis:  { nombre: 'Diócesis (verde y azul)', verde:'#0E7A4D', verdeClaro:'#E8F5EE', verdeVivo:'#14A367', azul:'#094985', azulTinta:'#0B3866', dorado:'#E8C77F', doradoOscuro:'#C9A356', crema:'#FBF8F2' },
  tierra:    { nombre: 'Tierra y sol',            verde:'#B5563C', verdeClaro:'#FBEAE4', verdeVivo:'#C96A4E', azul:'#4A3728', azulTinta:'#3A2A1E', dorado:'#E0A458', doradoOscuro:'#C08A3E', crema:'#FBF6EE' },
  serenidad: { nombre: 'Serenidad',               verde:'#2A7F7E', verdeClaro:'#E6F3F3', verdeVivo:'#3B9998', azul:'#4B4E8C', azulTinta:'#383A6B', dorado:'#D9A441', doradoOscuro:'#B98A34', crema:'#F7F7FB' },
  solemne:   { nombre: 'Solemne',                 verde:'#7A1F2B', verdeClaro:'#F3E6E8', verdeVivo:'#93303D', azul:'#1B2A4A', azulTinta:'#131F38', dorado:'#D4AF37', doradoOscuro:'#B4922C', crema:'#FAF8F3' },
};

export const FUENTES = {
  clasica:  { nombre: 'Clásica',  serif: "'Lora', Georgia, serif",             sans: "'Work Sans', -apple-system, sans-serif" },
  elegante: { nombre: 'Elegante', serif: "'Playfair Display', Georgia, serif", sans: "'Inter', -apple-system, sans-serif" },
  serena:   { nombre: 'Serena',   serif: "'Merriweather', Georgia, serif",     sans: "'Nunito Sans', -apple-system, sans-serif" },
};

export async function obtenerTema() {
  let paleta = 'diocesis', fuente = 'clasica';
  if (FIREBASE_LISTO) {
    try {
      const { doc, getDoc } = window.__fb.fsMod;
      const snap = await getDoc(doc(db, 'configuracion', 'tema'));
      if (snap.exists()) {
        const d = snap.data();
        paleta = d.paleta || paleta;
        fuente = d.fuente || fuente;
      }
    } catch (e) {
      console.warn('No se pudo leer la configuración de tema, usando el tema por defecto:', e);
    }
  }
  return { paleta, fuente };
}

export function aplicarTema(paletaId, fuenteId) {
  const p = PALETAS[paletaId] || PALETAS.diocesis;
  const f = FUENTES[fuenteId] || FUENTES.clasica;
  const r = document.documentElement.style;
  r.setProperty('--verde', p.verde);
  r.setProperty('--verde-claro', p.verdeClaro);
  r.setProperty('--verde-vivo', p.verdeVivo);
  r.setProperty('--azul', p.azul);
  r.setProperty('--azul-tinta', p.azulTinta);
  r.setProperty('--dorado', p.dorado);
  r.setProperty('--dorado-oscuro', p.doradoOscuro);
  r.setProperty('--crema', p.crema);
  r.setProperty('--serif', f.serif);
  r.setProperty('--sans', f.sans);
}

// Se autoejecuta al importarse: cada página solo necesita incluir este script.
obtenerTema().then(({ paleta, fuente }) => aplicarTema(paleta, fuente));
