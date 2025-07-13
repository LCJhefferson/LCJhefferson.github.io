document.addEventListener('DOMContentLoaded', () => {
  const carritoItems = document.getElementById('carrito-items');
  const totalPrecio = document.getElementById('total-precio');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function renderizarCarrito() {
    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
      carritoItems.innerHTML = '<li>El carrito está vacío</li>';
      totalPrecio.textContent = 'S/0';
      return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
      const li = document.createElement('li');
      li.classList.add('item-carrito');

      li.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">     
        <span class="nombre-producto">${producto.nombre}</span>
        <span class="precio-producto">${producto.precio}</span>
        <button class="eliminar-btn" data-index="${index}">Eliminar</button>
      `;

      carritoItems.appendChild(li);

      const precioNumerico = parseFloat(producto.precio.replace('S/', '').replace(',', ''));
      total += precioNumerico;
    });

    totalPrecio.textContent = `S/${total.toFixed(2)}`;
  }

  carritoItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-btn')) {
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      
      // Elimina el producto solo desde el array
      carrito.splice(index, 1);

      // Guarda en localStorage y vuelve a renderizar
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderizarCarrito();
    }
  });

  renderizarCarrito();
});


const li = e.target.closest('li');
li.classList.add('removiendo');

setTimeout(() => {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCarrito();
}, 300);
