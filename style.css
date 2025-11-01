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

  activarDragAndDrop();
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

  // Drag handle
  const handle = document.createElement('span');
  handle.textContent = "↕️";
  handle.classList.add('drag-handle');
  li.appendChild(handle);

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
   🚀 Drag and Drop
================================== */
function activarDragAndDrop() {
  const listaDOM = document.getElementById('listaCompras');
  let draggedItem = null;

  listaDOM.addEventListener('dragstart', (e) => {
    if (!e.target.classList.contains('drag-handle') && !e.target.closest('.drag-handle')) return;
    draggedItem = e.target.closest('li');
    draggedItem.classList.add('dragging');
  });

  listaDOM.addEventListener('dragend', (e) => {
    if (draggedItem) {
      draggedItem.classList.remove('dragging');
      draggedItem = null;
      actualizarOrdenLista();
    }
  });

  listaDOM.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (!dragging) return;
    const afterElement = getDragAfterElement(listaDOM, e.clientY);
    if (afterElement == null) {
      listaDOM.appendChild(dragging);
    } else {
      listaDOM.insertBefore(dragging, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function actualizarOrdenLista() {
  const items = document.querySelectorAll('#listaCompras li span:nth-of-type(2)');
  lista = Array.from(items).map(span => {
    const texto = span.textContent;
    const guardado = JSON.parse(localStorage.getItem("listaCompras")) || [];
    const item = guardado.find(i => i.texto === texto);
    return { texto, comprado: item ? item.comprado : false };
  });
  guardarLista();
}
