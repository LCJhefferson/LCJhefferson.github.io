document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar todos los botones "Añadir"
  const botones = document.querySelectorAll('.cart-btn');

  botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();

      // Obtener el contenedor del producto (.box)
      const box = e.target.closest('.box');
      const nombre = box.querySelector('.content h3').innerText;
      const precio = box.querySelector('.price').childNodes[0].textContent.trim();
      const imagen = box.querySelector('.image img').src;

      // Crear objeto del producto
      const producto = { nombre, precio, imagen };

      // Obtener productos del carrito desde localStorage
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      // Añadir producto al carrito
      carrito.push(producto);

      // Guardar de nuevo en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
mostrarNotificacion("Producto agregado al carrito 🌷");

    });
  });
});

function mostrarNotificacion(mensaje) {
  const noti = document.createElement('div');
  noti.className = 'notificacion';
  noti.textContent = mensaje;
  document.body.appendChild(noti);

  setTimeout(() => {
    noti.classList.add('desvanecer');
  }, 1500);

  setTimeout(() => {
    document.body.removeChild(noti);
  }, 2000);
}

