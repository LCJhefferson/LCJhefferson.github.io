document.addEventListener('DOMContentLoaded', () => {
  const carritoItems = document.getElementById('carrito-items');
  const totalPrecio = document.getElementById('total-precio');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // 1) Renderizar el carrito en pantalla
  function renderizarCarrito() {
    carritoItems.innerHTML = '';
    if (carrito.length === 0) {
      carritoItems.innerHTML = '<li>El carrito está vacío</li>';
      totalPrecio.textContent = 'S/0';
      return;
    }

    let total = 0;
    carrito.forEach((producto, index) => {
      const precioNum = parseFloat(
        producto.precio
          .toString()
          .replace('S/', '')
          .replace(',', '.')
      ) * (producto.cantidad || 1);

      total += precioNum;
      const li = document.createElement('li');
      li.classList.add('item-carrito');
      li.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">     
        <span class="nombre-producto">${producto.nombre}</span>
        <span class="precio-producto">S/${precioNum.toFixed(2)}</span>
        <button class="eliminar-btn" data-index="${index}">Eliminar</button>
      `;
      carritoItems.appendChild(li);
    });

    totalPrecio.textContent = `S/${total.toFixed(2)}`;
  }

  // 2) Eliminar items al pulsar “Eliminar”
  carritoItems.addEventListener('click', e => {
    if (!e.target.classList.contains('eliminar-btn')) return;
    const idx = +e.target.dataset.index;
    carrito.splice(idx, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
  });

  renderizarCarrito();

  // 3) Listener del botón “Realizar compra”
  const btnComprar = document.querySelector('.comprar-btn');
  btnComprar.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío 🌼');
      return;
    }

    // 4) Construir mensaje
    let mensaje = '🌷 *Pedido FlowerLover* 🌷\n\n';
    mensaje += '📦 *Productos solicitados:*\n';
    let total = 0;
    carrito.forEach(item => {
      const cantidad = item.cantidad || 1;
      const precioNum =
        parseFloat(item.precio.toString().replace('S/', '').replace(',', '.')) *
        cantidad;
      mensaje += `• ${item.nombre} x${cantidad} 🌼 — S/${precioNum.toFixed(2)}\n`;

      total += precioNum;
    });
    mensaje += `\n💳 *Total:* S/${total.toFixed(2)}\n`;
    mensaje += '\n🎀 Gracias por tu compra 🌸\n';
    mensaje += '✨ Esperamos que disfrutes tus flores ✨';


    // 5) Elegir canal de envío:
    //    Descomenta la línea que necesites:

    enviarPorWhatsApp(mensaje);
    // enviarPorEmail(mensaje);--------------------------
  });

  // 6a) Función WhatsApp
  function enviarPorWhatsApp(texto) {
    const numero = '51974371160';                    // tu número sin “+”
    const urlWA = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(urlWA, '_blank');
  }

  /*

  // 6b) Función Email (mailto)
  function enviarPorEmail(texto) {
    const destinatario = 'lcjhefferson@correo.com';
    const asunto = 'Pedido FlowerLover';
    const mailto = [
      `mailto:${destinatario}`,
      `subject=${encodeURIComponent(asunto)}`,
      `body=${encodeURIComponent(texto)}`
    ].join('?').replace('??', '?');
    window.location.href = mailto;
  }

  */
});
