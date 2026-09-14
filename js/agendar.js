import { FIREBASE_LISTO, obtenerRutas, obtenerAgentes, crearSolicitudCita } from './firebase-init.js';

const form = document.getElementById('form-cita');
const msg = document.getElementById('msg-cita');

if (!FIREBASE_LISTO) {
  msg.textContent = 'El envío de solicitudes aún no está activado en este sitio — vuelve a intentarlo más tarde, o llama directamente a tu parroquia.';
  msg.className = 'form-msg error';
  form.querySelector('button').disabled = true;
}

function horaLegible(h) {
  const hora12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? 'a.m.' : 'p.m.';
  return `${hora12}:00 ${ampm}`;
}

function iniciarSelectorHora() {
  const selHora = document.getElementById('c-hora');
  let opciones = '';
  for (let h = 8; h <= 21; h++) {
    opciones += `<option value="${String(h).padStart(2, '0')}:00">${horaLegible(h)}</option>`;
  }
  selHora.innerHTML = opciones;
}

function limitarFechaMinima() {
  const inputFecha = document.getElementById('c-fecha');
  const hoy = new Date().toISOString().split('T')[0];
  inputFecha.min = hoy;
}

async function iniciar() {
  const [rutas, agentes] = await Promise.all([obtenerRutas(), obtenerAgentes()]);

  const selMun = document.getElementById('c-municipio');
  rutas.sort((a, b) => a.municipio.localeCompare(b.municipio, 'es'));
  selMun.innerHTML = rutas.map(r => `<option>${r.municipio}</option>`).join('') +
    '<option value="Otro / fuera de la diócesis">Otro / fuera de la diócesis</option>';

  const selAgente = document.getElementById('c-agente');
  selAgente.innerHTML = '<option value="">Quien esté disponible</option>' +
    agentes.map(a => `<option value="${a.id || a.nombre}">${a.nombre} — ${a.sede}</option>`).join('');

  iniciarSelectorHora();
  limitarFechaMinima();
}
iniciar();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';
  try {
    const fecha = document.getElementById('c-fecha').value;
    const hora = document.getElementById('c-hora').value;
    await crearSolicitudCita({
      nombre: document.getElementById('c-nombre').value,
      telefono: document.getElementById('c-telefono').value,
      correo: document.getElementById('c-correo').value,
      municipio: document.getElementById('c-municipio').value,
      modalidad: document.getElementById('c-modalidad').value,
      agente: document.getElementById('c-agente').selectedOptions[0]?.textContent || 'Quien esté disponible',
      fecha: fecha,
      hora: hora,
      fechaPreferida: `${fecha} a las ${hora}`,
      motivo: document.getElementById('c-motivo').value,
    });
    form.style.display = 'none';
    msg.textContent = 'Solicitud enviada. Esta es la fecha y hora que prefieres — nuestro equipo la revisará y te contactará para confirmarla o proponerte otra opción.';
    msg.className = 'form-msg ok';
  } catch (err) {
    msg.textContent = 'No se pudo enviar: ' + err.message;
    msg.className = 'form-msg error';
  }
});
