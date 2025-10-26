function agregarProducto() {
  const input = document.getElementById('productoInput');
  const valor = input.value.trim();
  if (valor === "") return;

  const li = document.createElement('li');
  li.textContent = valor;

  // Botón para marcar como comprado
  const compradoBtn = document.createElement('button');
  compradoBtn.textContent = "✓";
  compradoBtn.onclick = () => {
    li.classList.toggle('comprado');
  };
  li.appendChild(compradoBtn);

  // Botón para eliminar
  const eliminarBtn = document.createElement('button');
  eliminarBtn.textContent = "🗑";
  eliminarBtn.onclick = () => li.remove();
  li.appendChild(eliminarBtn);

  document.getElementById('listaCompras').appendChild(li);
  input.value = "";
  input.focus();
}
