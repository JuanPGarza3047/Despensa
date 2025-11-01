let lista = [];

// Cargar lista y modo al iniciar
window.onload = function() {
  const guardado = localStorage.getItem("listaCompras");
  if (guardado) {
    lista = JSON.parse(guardado);
    lista.forEach(item => crearElemento(item.texto, item.comprado));
  }

  const modoOscuro = localStorage.getItem("modoOscuro");
  if (modoOscuro === "true") {
    document.body.classList.add("oscuro");
    document.getElementById("modoBtn").textContent = "☀️";
  }

  activarSortable(); // Inicializa reordenamiento
};

function agregarProducto() {
  const input = document.getElementById('productoInput');
  const valor = input.value.trim();
  if (valor === "") return;

  crearElemento(valor, false);
  lista.push({ texto: valor, comprado: false });
  guardarLista();

  input.value = "";
  input.focus();
}

function crearElemento(texto, comprado) {
  const li = document.createElement('li');

  // Texto
  const span = document.createElement('span');
  span.textContent = texto;
  li.appendChild(span);

  // Botón de estado
  const estadoBtn = document.createElement('button');
  estadoBtn.textContent = comprado ? "✅" : "⭕️";
  if (comprado) estadoBtn.classList.add('comprado');
  estadoBtn.onclick = () => toggleEstado(estadoBtn, texto);
  li.appendChild(estadoBtn);

  // Eliminar
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => eliminarElemento(li, texto);
  li.appendChild(deleteBtn);

  document.getElementById('listaCompras').appendChild(li);
}

function toggleEstado(btn, texto) {
  btn.classList.toggle('comprado');
  const comprado = btn.classList.contains('comprado');
  btn.textContent = comprado ? "✅" : "⭕️";

  const index = lista.findIndex(item => item.texto === texto);
  if (index !== -1) lista[index].comprado = comprado;
  guardarLista();
}

function eliminarElemento(li, texto) {
  li.remove();
  lista = lista.filter(item => item.texto !== texto);
  guardarLista();
}

function guardarLista() {
  localStorage.setItem("listaCompras", JSON.stringify(lista));
}

function toggleModo() {
  const body = document.body;
  const boton = document.getElementById("modoBtn");
  body.classList.toggle("oscuro");

  const oscuro = body.classList.contains("oscuro");
  boton.textContent = oscuro ? "☀️" : "🌙";
  localStorage.setItem("modoOscuro", oscuro);
}

/* ================================
   🚀 SortableJS con long press
================================== */
function activarSortable() {
  const listaDOM = document.getElementById('listaCompras');

Sortable.create(listaDOM, {
  animation: 150,
  ghostClass: 'sortable-ghost',
  delay: 200,             // long-press ms
  delayOnTouchOnly: true, // only delay for touch devices
  forceFallback: true,    // IMPORTANT: use Sortable's fallback drag on touch to avoid native text selection
  fallbackClass: 'sortable-fallback',
  onEnd: function() {
    actualizarOrdenDesdeDOM();
  }
});

}

// Guarda el nuevo orden en localStorage
function actualizarOrdenDesdeDOM() {
  const items = document.querySelectorAll('#listaCompras li span');
  const guardado = JSON.parse(localStorage.getItem("listaCompras")) || [];
  lista = Array.from(items).map(span => {
    const texto = span.textContent;
    const item = guardado.find(i => i.texto === texto);
    return { texto, comprado: item ? item.comprado : false };
  });
  guardarLista();
}
