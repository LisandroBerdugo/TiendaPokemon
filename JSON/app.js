angular.module('tiendaApp', [])
  .filter('capitalize', function() {
    return function(input) {
      if (!input) return '';
      return input.charAt(0).toUpperCase() + input.slice(1);
    };
  })
  .controller('MainController', function($timeout, $window) {
    const ctrl = this;

    // Cargar datos
    ctrl.pokemons = pokemonsData;

    // Lógica para alternar el modo oscuro y cambiar el fondo
    ctrl.isDarkMode = JSON.parse($window.localStorage.getItem('darkMode')) || false;

    // Función para aplicar el fondo según el modo
    const applyBackground = function() {
      if (ctrl.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('day-mode');
        document.body.style.backgroundImage = "url('imagenes_pokemon/paisajefondo_noche.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      } else {
        document.body.classList.add('day-mode');
        document.body.classList.remove('dark-mode');
        document.body.style.backgroundImage = "url('imagenes_pokemon/paisajefondo_dia.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      }
    };

    // Aplica el fondo y modo al cargar la página
    applyBackground();

    // Función para alternar entre modos día y noche
    ctrl.toggleDarkMode = function() {
      ctrl.isDarkMode = !ctrl.isDarkMode;
      applyBackground(); // Aplica los cambios de fondo
      $window.localStorage.setItem('darkMode', JSON.stringify(ctrl.isDarkMode)); // Guarda el estado
    };

    // Filtros
    ctrl.filtroNombreNumero = '';
    ctrl.filtroTipo = '';
    ctrl.filtroSubtipo = '';
    ctrl.filtroGenero = '';
    ctrl.filtroRareza = '';

    // Función de filtros personalizados
    ctrl.filtrarPokemons = function(pokemon) {
      if (
        ctrl.filtroNombreNumero &&
        !(
          pokemon.nombre.toLowerCase().includes(ctrl.filtroNombreNumero.toLowerCase()) ||
          pokemon.numero.includes(ctrl.filtroNombreNumero)
        )
      ) {
        return false;
      }
      if (ctrl.filtroTipo && pokemon.tipo !== ctrl.filtroTipo) return false;
      if (ctrl.filtroSubtipo && pokemon.subtipo !== ctrl.filtroSubtipo) return false;
      if (ctrl.filtroGenero) {
        if (ctrl.filtroGenero === 'Sin género' && pokemon.genero !== null) return false;
        if (ctrl.filtroGenero !== 'Sin género' && pokemon.genero !== ctrl.filtroGenero)
          return false;
      }
      if (ctrl.filtroRareza && pokemon.rareza !== ctrl.filtroRareza) return false;

      return true;
    };

    // Variables del modal
    ctrl.showModal = false;
    ctrl.selectedPokemon = null;

    // Función para abrir el modal con animación
    ctrl.triggerFlip = function(pokemon) {
      ctrl.selectedPokemon = pokemon;

      const cardElement = Array.from(document.querySelectorAll('.producto-card')).find(
        (card) =>
          card.querySelector('.producto-nombre').textContent.trim() === pokemon.nombre
      );

      if (cardElement) {
        const rect = cardElement.getBoundingClientRect();
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const translateX = viewportCenterX - cardCenterX;
        const translateY = viewportCenterY - cardCenterY;

        cardElement.style.position = 'fixed';
        cardElement.style.top = `${rect.top}px`;
        cardElement.style.left = `${rect.left}px`;
        cardElement.style.width = `${rect.width}px`;
        cardElement.style.height = `${rect.height}px`;
        cardElement.style.transition = 'transform 0.6s ease-in-out';
        cardElement.style.transform = `translate(${translateX}px, ${translateY}px) rotateY(0deg)`;

        $timeout(() => {
          cardElement.style.transform = `translate(${translateX}px, ${translateY}px) rotateY(180deg)`;
        }, 100);

        $timeout(() => {
          ctrl.showModal = true;
          cardElement.style.transition = '';
          cardElement.style.transform = '';
          cardElement.style.position = '';
          cardElement.style.top = '';
          cardElement.style.left = '';
          cardElement.style.width = '';
          cardElement.style.height = '';
        }, 700);
      }
    };

    // Función para cerrar el modal
    ctrl.closeModal = function() {
      ctrl.showModal = false;
      ctrl.selectedPokemon = null;
    };

    // Función para manejar estrellas en las estadísticas
    ctrl.getStarsArray = function(value) {
      return new Array(value);
    };

    // Estado inicial de la barra lateral
    ctrl.sidebarCollapsed = false;

    // Función para alternar la barra lateral
    ctrl.toggleSidebar = function() {
      ctrl.sidebarCollapsed = !ctrl.sidebarCollapsed;

      const sidebarElement = document.querySelector('.sidebar');
      if (sidebarElement) {
        if (ctrl.sidebarCollapsed) {
          sidebarElement.classList.add('collapsed');
        } else {
          sidebarElement.classList.remove('collapsed');
        }
      }
    };

    // --- Lógica del carrito ---
    ctrl.cart = JSON.parse($window.localStorage.getItem('cart')) || [];
    ctrl.cartCount = ctrl.cart.reduce((sum, item) => sum + item.quantity, 0);

    ctrl.addToCart = function(pokemon) {
      const existingItem = ctrl.cart.find(item => item.numero === pokemon.numero);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        ctrl.cart.push({
          numero: pokemon.numero,
          nombre: pokemon.nombre,
          precio: pokemon.precio,
          imagen: pokemon.imagen,
          quantity: 1
        });
      }

      ctrl.updateCart();
    };

    ctrl.updateCart = function() {
      $window.localStorage.setItem('cart', JSON.stringify(ctrl.cart));
      ctrl.cartCount = ctrl.cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    ctrl.goToCart = function() {
      $window.location.href = "Carrito/cart.html";
    };
  });
