import { obtenerRutas } from './firebase-init.js';

const selector = document.getElementById('selector-municipio');
const resultado = document.getElementById('resultado-ruta');

function campo(icono, rotulo, valor) {
  const val = valor && valor.trim() && valor !== 'Pendiente'
    ? valor
    : '<span class="vacio">Aún no confirmado — contacta a SEPAS</span>';
  return `
    <div class="ruta-item">
      <div class="ruta-icono">${icono}</div>
      <div class="ruta-texto">
        <div class="rotulo">${rotulo}</div>
        <div class="valor ${val.includes('vacio') ? '' : ''}">${val}</div>
      </div>
    </div>`;
}

function pintarResultado(r) {
  resultado.innerHTML = `
    ${campo('⛪', 'Parroquia', r.parroquia)}
    ${campo('🙏', 'Párroco / responsable', r.parroco)}
    ${campo('📞', 'Teléfono de contacto', r.telefono)}
    ${campo('🏥', 'Hospital / centro de salud', r.hospital)}
  `;
  resultado.classList.add('activo');
}

async function iniciar() {
  const rutas = await obtenerRutas();
  rutas.sort((a, b) => a.municipio.localeCompare(b.municipio, 'es'));

  selector.innerHTML = '<option value="">Selecciona tu municipio…</option>' +
    rutas.map((r, i) => `<option value="${i}">${r.municipio}</option>`).join('');

  selector.addEventListener('change', () => {
    if (selector.value === '') { resultado.classList.remove('activo'); return; }
    pintarResultado(rutas[Number(selector.value)]);
  });
}

iniciar();
