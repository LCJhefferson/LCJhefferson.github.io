
document.addEventListener('DOMContentLoaded', () => {
  const carritoItems = document.getElementById('carrito-items');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    carritoItems.innerHTML = "<li>El carrito está vacío</li>";
  } else {
    carrito.forEach(producto => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width:50px; vertical-align:middle; margin-right:10px;">
        <strong>${producto.nombre}</strong> - ${producto.precio}
      `;
      carritoItems.appendChild(li);
    });
  }
});










document.addEventListener('DOMContentLoaded', () => {
  const carritoItems = document.getElementById('carrito-items');
  const totalPrecio = document.getElementById('total-precio');
const productoEjemplo = {
  nombre: "Maceta floral",
  precio: "S/1799",
  imagen: "images/maceta-floral.jpg"
};

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function renderizarCarrito() {
    carritoItems.innerHTML = ''; // Limpia el contenido actual

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

      // Extrae el número del precio (quita 'S/')
      const precioNumerico = parseFloat(producto.precio.replace('S/', '').replace(',', ''));
      total += precioNumerico;
    });

    totalPrecio.textContent = `S/${total.toFixed(2)}`;
  }

  // Evento delegado para eliminar productos
  carritoItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-btn')) {
      const index = e.target.getAttribute('data-index');

      // Eliminar producto del array
      carrito.splice(index, 1);

      // Guardar en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));

      // Volver a mostrar el carrito
      renderizarCarrito();
    }
  });

  renderizarCarrito();
});