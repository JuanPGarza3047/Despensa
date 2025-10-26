function agregarProducto() {
  const input = document.getElementById('productoInput');
  const valor = input.value.trim();
  if (valor === "") return;

  const li = document.createElement('li');
  const texto = document.createElement('span');
  texto.textContent = valor;
  li.appendChild(texto);

  // Botón de estado (⭕️ -> ✅)
  const estadoBtn = document.createElement('button');
  estadoBtn.textContent = "⭕️";
  estadoBtn.onclick = () => {
    if (estadoBtn.textContent === "⭕️") {
      estadoBtn.textContent = "✅";
      estadoBtn.classList.add('comprado');
    } else {
      estadoBtn.textContent = "⭕️";
      estadoBtn.classList.remove('comprado');
    }
  };
  li.appendChild(estadoBtn);

  // Botón subir
  const upBtn = document.createElement('button');
  upBtn.textContent = "⬆️";
  upBtn.onclick = () => moverElemento(li, -1);
  li.appendChild(upBtn);

  // Botón bajar
  const downBtn = document.createElement('button');
  downBtn.textContent = "⬇️";
  downBtn.onclick = () => moverElemento(li, 1);
  li.appendChild(downBtn);

  // Botón eliminar
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => li.remove();
  li.appendChild(deleteBtn);

  document.getElementById('listaCompras').appendChild(li);
  input.value = "";
  input.focus();
}

function moverElemento(elemento, direccion) {
  const lista = document.getElementById('listaCompras');
  const items = Array.from(lista.children);
  const indice = items.indexOf(elemento);
  const nuevoIndice = indice + direccion;

  if (nuevoIndice >= 0 && nuevoIndice < items.length) {
    if (direccion === -1) {
      lista.insertBefore(elemento, items[nuevoIndice]);
    } else {
      lista.insertBefore(items[nuevoIndice], elemento);
    }
  }
}
