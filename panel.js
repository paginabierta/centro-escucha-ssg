import { FIREBASE_LISTO, auth, db, obtenerRutas, obtenerAgentes } from './firebase-init.js';
import RUTAS_SEED from './rutas-data.js';
import REFLEXIONES_SEED from './reflexiones-data.js';

if (!FIREBASE_LISTO) {
  document.querySelector('.panel-wrap').innerHTML =
    '<p>El panel aún no está activado — falta conectar Firebase (ver SETUP.md).</p>';
  throw new Error('Firebase no configurado');
}

const { onAuthStateChanged, signOut } = window.__fb.authMod;
const {
  collection, doc, getDoc, getDocs, setDoc, addDoc, query, orderBy, limit,
  where, serverTimestamp
} = window.__fb.fsMod;

let usuarioActual = null;
let rolActual = 'agente';
let rutasCache = [];

document.getElementById('btn-salir').addEventListener('click', () => signOut(auth).then(() => location.href = 'login.html'));

onAuthStateChanged(auth, async (user) => {
  if (!user) { location.href = 'login.html'; return; }
  usuarioActual = user;

  const rolDoc = await getDoc(doc(db, 'usuarios', user.uid));
  rolActual = rolDoc.exists() ? (rolDoc.data().rol || 'agente') : 'agente';

  document.getElementById('quien-soy').textContent = `${user.email} · ${rolActual === 'admin' ? 'Administrador' : 'Agente de escucha'}`;

  if (rolActual === 'admin') {
    document.getElementById('tab-rutas').style.display = 'block';
    document.getElementById('tab-agentes').style.display = 'block';
    document.getElementById('tab-motivacion').style.display = 'block';
    document.getElementById('tab-accesos').style.display = 'block';
  }

  await cargarMunicipiosEnSelector();
  await cargarCasos();
  await cargarCitas();
});

// ---------- Tabs ----------
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('activo'));
    document.querySelectorAll('.panel-seccion').forEach(s => s.classList.remove('activo'));
    tab.classList.add('activo');
    document.getElementById('sec-' + tab.dataset.tab).classList.add('activo');
    if (tab.dataset.tab === 'rutas') cargarTablaRutas();
    if (tab.dataset.tab === 'agentes') cargarListaAgentes();
    if (tab.dataset.tab === 'motivacion') cargarListaReflexiones();
  });
});

// ---------- Bitácora ----------
async function cargarMunicipiosEnSelector() {
  rutasCache = await obtenerRutas();
  rutasCache.sort((a, b) => a.municipio.localeCompare(b.municipio, 'es'));
  const sel = document.getElementById('caso-municipio');
  sel.innerHTML = rutasCache.map(r => `<option>${r.municipio}</option>`).join('');
}

document.getElementById('form-caso').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg-caso');
  try {
    await addDoc(collection(db, 'casos'), {
      municipio: document.getElementById('caso-municipio').value,
      modo: document.getElementById('caso-modo').value,
      motivo: document.getElementById('caso-motivo').value,
      notas: document.getElementById('caso-notas').value,
      registradoPor: usuarioActual.email,
      registradoPorUid: usuarioActual.uid,
      fecha: serverTimestamp(),
    });
    msg.textContent = 'Caso registrado.';
    msg.className = 'form-msg ok';
    e.target.reset();
    cargarCasos();
  } catch (err) {
    msg.textContent = 'No se pudo guardar: ' + err.message;
    msg.className = 'form-msg error';
  }
});

async function cargarCasos() {
  const cont = document.getElementById('lista-casos');
  try {
    let q;
    if (rolActual === 'admin') {
      q = query(collection(db, 'casos'), orderBy('fecha', 'desc'), limit(25));
    } else {
      q = query(collection(db, 'casos'), where('registradoPorUid', '==', usuarioActual.uid), orderBy('fecha', 'desc'), limit(25));
    }
    const snap = await getDocs(q);
    if (snap.empty) { cont.innerHTML = '<p style="font-size:0.85rem; color:var(--gris-texto);">Aún no hay casos registrados.</p>'; return; }
    cont.innerHTML = snap.docs.map(d => {
      const c = d.data();
      const fecha = c.fecha?.toDate ? c.fecha.toDate().toLocaleString('es-CO') : '—';
      return `<div class="caso">
        <strong>${c.municipio}</strong> — ${c.motivo}
        <div class="meta">${c.modo} · ${fecha} · registrado por ${c.registradoPor}</div>
      </div>`;
    }).join('');
  } catch (err) {
    cont.innerHTML = `<p class="form-msg error">Error al cargar casos: ${err.message}</p>`;
  }
}

// ---------- Rutas (admin) ----------
async function cargarTablaRutas() {
  const body = document.getElementById('tabla-rutas-body');
  const rutas = await obtenerRutas();
  rutas.sort((a, b) => a.municipio.localeCompare(b.municipio, 'es'));
  body.innerHTML = rutas.map((r) => `
    <tr data-id="${r.id || ''}" data-municipio="${r.municipio}">
      <td>${r.municipio}</td>
      <td><input value="${r.parroquia || ''}" data-campo="parroquia"></td>
      <td><input value="${r.parroco || ''}" data-campo="parroco"></td>
      <td><input value="${r.telefono || ''}" data-campo="telefono"></td>
      <td><input value="${r.hospital || ''}" data-campo="hospital"></td>
      <td><button class="fila-guardar">Guardar</button></td>
    </tr>`).join('');

  body.querySelectorAll('.fila-guardar').forEach(btn => {
    btn.addEventListener('click', async () => {
      const tr = btn.closest('tr');
      const id = tr.dataset.id || tr.dataset.municipio.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const datos = { municipio: tr.dataset.municipio };
      tr.querySelectorAll('input').forEach(inp => datos[inp.dataset.campo] = inp.value);
      btn.textContent = 'Guardando…';
      try {
        await setDoc(doc(db, 'rutas', id), datos, { merge: true });
        btn.textContent = 'Guardado ✓';
        setTimeout(() => btn.textContent = 'Guardar', 1500);
      } catch (err) {
        btn.textContent = 'Error';
        console.error(err);
      }
    });
  });
}

document.getElementById('btn-cargar-semilla').addEventListener('click', async () => {
  if (!confirm('Esto copia los datos de ejemplo a Firestore. Si ya editaste datos ahí, no los borra pero sí los puede sobrescribir con estos valores por defecto. ¿Continuar?')) return;
  for (const r of RUTAS_SEED) {
    const id = r.municipio.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await setDoc(doc(db, 'rutas', id), r, { merge: true });
  }
  alert('Datos de ejemplo cargados.');
  cargarTablaRutas();
});

// ---------- Citas (todo el equipo) ----------
async function cargarCitas() {
  const cont = document.getElementById('lista-citas');
  try {
    const q = query(collection(db, 'citas'), orderBy('creado', 'desc'), limit(30));
    const snap = await getDocs(q);
    if (snap.empty) { cont.innerHTML = '<p style="font-size:0.85rem; color:var(--gris-texto);">Aún no hay solicitudes de cita.</p>'; return; }
    cont.innerHTML = snap.docs.map(d => {
      const c = d.data();
      const fecha = c.creado?.toDate ? c.creado.toDate().toLocaleString('es-CO') : '—';
      const modalidadTexto = { 'presencial-sangil': 'Presencial en San Gil', 'presencial-parroquia': 'Presencial en su parroquia', 'virtual': 'Virtual' }[c.modalidad] || c.modalidad;
      return `<div class="caso">
        <strong>${c.nombre}</strong> — ${modalidadTexto} con ${c.agente || 'quien esté disponible'}
        <div class="meta">${c.municipio} · Prefiere: ${c.fechaPreferida} · Contacto: ${c.contacto} · Solicitado ${fecha} · Estado: ${c.estado}</div>
        ${c.motivo ? `<div class="meta">Motivo: ${c.motivo}</div>` : ''}
        ${c.estado === 'pendiente' ? `<button class="fila-guardar" data-id="${d.id}" style="margin-top:6px;">Marcar como confirmada</button>` : ''}
      </div>`;
    }).join('');
    cont.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        await setDoc(doc(db, 'citas', btn.dataset.id), { estado: 'confirmada' }, { merge: true });
        cargarCitas();
      });
    });
  } catch (err) {
    cont.innerHTML = `<p class="form-msg error">Error al cargar citas: ${err.message}</p>`;
  }
}

// ---------- Agentes del equipo (admin) ----------
async function cargarListaAgentes() {
  const cont = document.getElementById('lista-agentes');
  const agentes = await obtenerAgentes();
  if (!agentes.length) { cont.innerHTML = '<p style="font-size:0.85rem;">Sin agentes registrados aún.</p>'; return; }
  cont.innerHTML = agentes.map(a => `
    <div class="caso">
      <strong>${a.nombre}</strong>
      <div class="meta">${a.sede} · ${(a.modalidades || []).join(', ')}</div>
    </div>`).join('');
}

document.getElementById('form-agente')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg-agente');
  const modalidades = [];
  if (document.getElementById('ag-mod-virtual').checked) modalidades.push('virtual');
  if (document.getElementById('ag-mod-sangil').checked) modalidades.push('presencial-sangil');
  if (document.getElementById('ag-mod-parroquia').checked) modalidades.push('presencial-parroquia');
  try {
    await addDoc(collection(db, 'agentes'), {
      nombre: document.getElementById('ag-nombre').value,
      sede: document.getElementById('ag-sede').value,
      modalidades,
      activo: true,
    });
    msg.textContent = 'Agente agregado.';
    msg.className = 'form-msg ok';
    e.target.reset();
    cargarListaAgentes();
  } catch (err) {
    msg.textContent = 'Error: ' + err.message;
    msg.className = 'form-msg error';
  }
});

// ---------- Motivación / reflexiones (admin) ----------
async function cargarListaReflexiones() {
  const cont = document.getElementById('lista-reflexiones');
  try {
    const snap = await getDocs(collection(db, 'reflexiones'));
    if (snap.empty) { cont.innerHTML = '<p style="font-size:0.85rem;">Aún no hay reflexiones en Firestore (usando las de ejemplo mientras tanto).</p>'; return; }
    cont.innerHTML = snap.docs.map(d => {
      const r = d.data();
      return `<div class="caso"><strong>${r.cita}</strong><div class="meta">"${r.texto}"</div><div class="meta">${r.pensamiento}</div></div>`;
    }).join('');
  } catch (err) {
    cont.innerHTML = `<p class="form-msg error">Error: ${err.message}</p>`;
  }
}

document.getElementById('btn-cargar-reflexiones')?.addEventListener('click', async () => {
  for (const r of REFLEXIONES_SEED) {
    await addDoc(collection(db, 'reflexiones'), r);
  }
  alert('Reflexiones de ejemplo cargadas.');
  cargarListaReflexiones();
});

document.getElementById('form-reflexion')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg-reflexion');
  try {
    await addDoc(collection(db, 'reflexiones'), {
      cita: document.getElementById('rf-cita').value,
      texto: document.getElementById('rf-texto').value,
      pensamiento: document.getElementById('rf-pensamiento').value,
    });
    msg.textContent = 'Reflexión agregada.';
    msg.className = 'form-msg ok';
    e.target.reset();
    cargarListaReflexiones();
  } catch (err) {
    msg.textContent = 'Error: ' + err.message;
    msg.className = 'form-msg error';
  }
});

// ---------- Accesos (admin) ----------
const formRol = document.getElementById('form-rol');
if (formRol) {
  formRol.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('msg-rol');
    try {
      await setDoc(doc(db, 'usuarios', document.getElementById('rol-uid').value.trim()), {
        correo: document.getElementById('rol-correo').value.trim(),
        rol: document.getElementById('rol-valor').value,
      }, { merge: true });
      msg.textContent = 'Acceso guardado.';
      msg.className = 'form-msg ok';
      e.target.reset();
    } catch (err) {
      msg.textContent = 'Error: ' + err.message;
      msg.className = 'form-msg error';
    }
  });
}
