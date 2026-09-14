import { obtenerRutas } from './firebase-init.js';

const selector = document.getElementById('selector-municipio');
const resultado = document.getElementById('resultado-ruta');

function campo(icono, rotulo, valor) {
  const pendientes = ['Pendiente', 'Por definir', ''];
  const val = valor && !pendientes.includes(valor.trim())
    ? valor
    : '<span class="vacio">Aún no confirmado — contacta a SEPAS</span>';
  return `
    <div class="ruta-item">
      <div class="ruta-icono">${icono}</div>
      <div class="ruta-texto">
        <div class="rotulo">${rotulo}</div>
        <div class="valor">${val}</div>
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

function pintarOtro() {
  resultado.innerHTML = `
    ${campo('🙏', 'No encontraste tu municipio', 'No hay problema — puedes escribirnos igual y te contactamos para ver cómo acompañarte.')}
    ${campo('📅', '¿Qué hacer?', 'Agenda una cita contándonos dónde estás, y coordinamos la mejor forma de ayudarte.')}
    ${campo('📞', 'Si es una emergencia ahora mismo', 'Llama a la Línea 123, o a la Línea 106 (Salud Mental) — funcionan en toda Colombia.')}
  `;
  resultado.classList.add('activo');
}

async function iniciar() {
  const rutas = await obtenerRutas();
  rutas.sort((a, b) => a.municipio.localeCompare(b.municipio, 'es'));

  selector.innerHTML = '<option value="">Selecciona tu municipio…</option>' +
    rutas.map((r, i) => `<option value="${i}">${r.municipio}</option>`).join('') +
    '<option value="__otro__">Otro / no encuentro mi municipio</option>';

  selector.addEventListener('change', () => {
    if (selector.value === '') { resultado.classList.remove('activo'); return; }
    if (selector.value === '__otro__') { pintarOtro(); return; }
    pintarResultado(rutas[Number(selector.value)]);
  });
}

iniciar();
