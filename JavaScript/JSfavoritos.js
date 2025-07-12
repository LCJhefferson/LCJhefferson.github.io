

function agregarAFavoritos(producto) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  const existe = favoritos.find(p => p.nombre === producto.nombre);
  if (!existe) {
    favoritos.push(producto);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert(`${producto.nombre} se añadió a tus favoritos 🌸`);
  } else {
    alert(`${producto.nombre} ya está en tus favoritos ✨`);
  }
}















document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById("favoritos-contenedor");
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (favoritos.length === 0) {
    contenedor.innerHTML = "<p>No tienes productos en favoritos.</p>";
    return;
  }

  favoritos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("box");

    div.innerHTML = `
      <span class="discount">${producto.descuento}</span>
      <div class="image">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="icons">
          <a href="#" class="fas fa-heart"></a>
          <a href="#" class="cart-btn">Añadir</a>
          <a href="#" class="fas fa-share"></a>
        </div>
      </div>
      <div class="content">
        <h3>${producto.nombre}</h3>
        <div class="price">${producto.precio} <span>${producto.precioDescuento}</span></div>
      </div>
    `;

    contenedor.appendChild(div);
  });
});
