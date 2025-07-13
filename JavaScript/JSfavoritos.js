document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('lista-favoritos');
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  // Si está vacío
  if (favoritos.length === 0) {
    contenedor.innerHTML = "<p style='padding:20px;'>No tienes productos en favoritos.</p>";
    return;
  }

  // Mostrar cada producto
  favoritos.forEach((producto, index) => {
    const box = document.createElement('div');
    box.classList.add('box');

    box.innerHTML = `
      <span class="discount">${producto.descuento}</span>
      <div class="image">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="icons">
          <a href="#" class="fas fa-heart" style="color:red;"></a>
          <a href="#" class="cart-btn">Añadir al carrito</a>
          <a href="#" class="fas fa-share"></a>
        </div>
      </div>
      <div class="content">
        <h3>${producto.nombre}</h3>
        <div class="price">${producto.precio} <span>${producto.precioDescuento}</span></div>
        <button class="eliminar-favorito" data-index="${index}">Eliminar</button>
      </div>
    `;

    contenedor.appendChild(box);
  });

  // Delegación para eliminar productos
  contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-favorito')) {
      const index = parseInt(e.target.dataset.index);
      favoritos.splice(index, 1);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      location.reload(); // Recarga para volver a dibujar
    }

    if (e.target.classList.contains('cart-btn')) {
      const productoBox = e.target.closest('.box');
      const nombre = productoBox.querySelector('.content h3').innerText;
      const precio = productoBox.querySelector('.price').childNodes[0].textContent.trim();
      const imagen = productoBox.querySelector('.image img').src;

      const producto = { nombre, precio, imagen };
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));

      alert(`"${nombre}" se añadió al carrito.`);
    }
  });
});
