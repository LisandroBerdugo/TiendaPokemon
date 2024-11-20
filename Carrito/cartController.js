angular.module('tiendaApp')
  .controller('CartController', function($window) {
    const ctrl = this;

    // Cargar carrito desde localStorage al inicializar
    ctrl.cart = JSON.parse($window.localStorage.getItem('cart')) || [];

    // Corregir rutas de imágenes al inicializar
    ctrl.correctImagePaths = function() {
      ctrl.cart = ctrl.cart.map(item => {
        if (item.imagen && !item.imagen.startsWith('../')) {
          item.imagen = `../${item.imagen}`; // Ajustar ruta de imágenes
        }
        return item;
      });

      // Guardar carrito corregido en localStorage
      $window.localStorage.setItem('cart', JSON.stringify(ctrl.cart));
    };

    // Llamar a la función para corregir rutas de imágenes
    ctrl.correctImagePaths();

    // Variables para los datos de la tarjeta
    ctrl.cardNumber = '';
    ctrl.cardHolder = '';
    ctrl.cardExpiration = '';
    ctrl.cardCVV = '';
    ctrl.showBack = false; // Control para voltear la tarjeta

    // Formato automático del número de tarjeta
    ctrl.formatCardNumber = function() {
      ctrl.cardNumber = ctrl.cardNumber
        .replace(/\s+/g, '') // Eliminar espacios existentes
        .replace(/[^0-9]/g, '') // Permitir solo números
        .replace(/(\d{4})/g, '$1 ') // Agregar espacio cada 4 dígitos
        .trim(); // Eliminar espacios finales
    };

    // Formato automático para la fecha de expiración
    ctrl.formatExpirationDate = function() {
      ctrl.cardExpiration = ctrl.cardExpiration
        .replace(/[^0-9]/g, '') // Permitir solo números
        .replace(/(\d{2})(\d{0,2})/, '$1/$2') // Insertar pleca después de 2 dígitos
        .slice(0, 5); // Limitar a 5 caracteres
    };

    // Calcular subtotal y total al inicializar
    ctrl.calculateTotals = function() {
      ctrl.subtotal = ctrl.cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
      ctrl.shipping = ctrl.cart.length > 0 ? 20 : 0; // Envío fijo si hay productos
      ctrl.total = ctrl.subtotal + ctrl.shipping;
    };

    // Llamar a la función de cálculo de totales
    ctrl.calculateTotals();

    // Actualizar carrito y recalcular totales
    ctrl.updateCart = function() {
      // Recalcular totales
      ctrl.calculateTotals();

      // Guardar carrito en localStorage
      $window.localStorage.setItem('cart', JSON.stringify(ctrl.cart));
    };

    // Eliminar un producto del carrito
    ctrl.removeItem = function(item) {
      // Filtrar el carrito para eliminar el producto seleccionado
      ctrl.cart = ctrl.cart.filter(cartItem => cartItem.numero !== item.numero);

      // Actualizar carrito y totales
      ctrl.updateCart();
    };

    // Finalizar compra (limpiar carrito y mostrar mensaje)
    ctrl.checkout = function() {
      if (ctrl.cart.length === 0) {
        alert('El carrito está vacío. Agrega productos para continuar.');
        return;
      }

      if (!ctrl.cardNumber || !ctrl.cardHolder || !ctrl.cardExpiration || !ctrl.cardCVV) {
        alert('Por favor, llena todos los campos de la tarjeta.');
        return;
      }

      alert('¡Compra realizada con éxito!');

      // Vaciar el carrito
      ctrl.cart = [];
      ctrl.updateCart();

      // Guardar carrito vacío en localStorage y redirigir
      $window.localStorage.setItem('cart', JSON.stringify(ctrl.cart));
      $window.location.href = "../index.html"; // Volver a la página principal
    };

    // Manejar el evento para voltear la tarjeta
    ctrl.showCardBack = function(show) {
      ctrl.showBack = show; // true para mostrar el reverso, false para mostrar el frente
    };
  });
