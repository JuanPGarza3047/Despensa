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
  const span = document.createElement('span');
  span.textContent = texto;
  li.appendChild(span);

  // Botón de estado
  const estadoBtn = document.createElement('button');
  estadoBtn.textContent = comprado ? "✅" : "⭕️";
  if (comprado) estadoBtn.classList.add('comprado');
  estadoBtn.onclick = () => toggleEstado(estadoBtn, texto);
  li.appendChild(estadoBtn);

  // Subir
  const upBtn = document.createElement('button');
  upBtn.textContent = "⬆️";
  upBtn.onclick = () => moverElemento(li, -1);
  li.appendChild(upBtn);

  // Bajar
  const downBtn = document.createElement('button');
  downBtn.textContent = "⬇️";
  downBtn.onclick = () => moverElemento(li, 1);
  li.appendChild(downBtn);

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

  // Actualizar en la lista
  const index = lista.findIndex(item => item.texto === texto);
  if (index !== -1) lista[index].comprado = comprado;
  guardarLista();
}

function eliminarElemento(li, texto) {
  li.remove();
  lista = lista.filter(item => item.texto !== texto);
  guardarLista();
}

function moverElemento(elemento, direccion) {
  const listaDOM = document.getElementById('listaCompras');
  const items = Array.from(listaDOM.children);
  const indice = items.indexOf(elemento);
  const nuevoIndice = indice + direccion;

  if (nuevoIndice >= 0 && nuevoIndice < items.length) {
    if (direccion === -1) {
      listaDOM.insertBefore(elemento, items[nuevoIndice]);
    } else {
      listaDOM.insertBefore(items[nuevoIndice], elemento);
    }
    // Reordenar en la lista guardada
    const [item] = lista.splice(indice, 1);
    lista.splice(nuevoIndice, 0, item);
    guardarLista();
  }
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
