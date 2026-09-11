import { FIREBASE_LISTO, obtenerRutas, obtenerAgentes, crearSolicitudCita } from './firebase-init.js';

const form = document.getElementById('form-cita');
const msg = document.getElementById('msg-cita');

if (!FIREBASE_LISTO) {
  msg.textContent = 'El envío de solicitudes aún no está activado en este sitio — vuelve a intentarlo más tarde, o llama directamente a tu parroquia.';
  msg.className = 'form-msg error';
  form.querySelector('button').disabled = true;
}

async function iniciar() {
  const [rutas, agentes] = await Promise.all([obtenerRutas(), obtenerAgentes()]);

  const selMun = document.getElementById('c-municipio');
  rutas.sort((a, b) => a.municipio.localeCompare(b.municipio, 'es'));
  selMun.innerHTML = rutas.map(r => `<option>${r.municipio}</option>`).join('');

  const selAgente = document.getElementById('c-agente');
  selAgente.innerHTML = '<option value="">Quien esté disponible</option>' +
    agentes.map(a => `<option value="${a.id || a.nombre}">${a.nombre} — ${a.sede}</option>`).join('');
}
iniciar();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';
  try {
    await crearSolicitudCita({
      nombre: document.getElementById('c-nombre').value,
      contacto: document.getElementById('c-contacto').value,
      municipio: document.getElementById('c-municipio').value,
      modalidad: document.getElementById('c-modalidad').value,
      agente: document.getElementById('c-agente').selectedOptions[0]?.textContent || 'Quien esté disponible',
      fechaPreferida: document.getElementById('c-fecha').value,
      motivo: document.getElementById('c-motivo').value,
    });
    form.style.display = 'none';
    msg.textContent = 'Solicitud enviada. Nos pondremos en contacto contigo para confirmar el horario.';
    msg.className = 'form-msg ok';
  } catch (err) {
    msg.textContent = 'No se pudo enviar: ' + err.message;
    msg.className = 'form-msg error';
  }
});
