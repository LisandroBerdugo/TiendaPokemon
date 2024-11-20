angular.module('tiendaApp', [])
  .filter('capitalize', function() {
    // Filtro para capitalizar textos
    return function(input) {
      if (!input) return '';
      return input.charAt(0).toUpperCase() + input.slice(1);
    };
  })
  .controller('MainController', function($timeout) {
    const ctrl = this;

    // Cargar datos
    ctrl.pokemons = pokemonsData;
    
        // Lógica para alternar el modo oscuro
ctrl.isDarkMode = false; // Inicialmente modo claro

ctrl.toggleDarkMode = function() {
  ctrl.isDarkMode = !ctrl.isDarkMode; // Cambia el estado
  document.body.classList.toggle('dark-mode', ctrl.isDarkMode); // Aplica la clase CSS
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

      // Encuentra la tarjeta seleccionada de forma dinámica
      const cardElement = Array.from(document.querySelectorAll('.producto-card')).find(
        (card) =>
          card.querySelector('.producto-nombre').textContent.trim() === pokemon.nombre
      );

      if (cardElement) {
        const rect = cardElement.getBoundingClientRect(); // Coordenadas actuales de la tarjeta
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        // Calcula el centro de la tarjeta actual
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Calcula el desplazamiento necesario para llevar la tarjeta al centro del viewport
        const translateX = viewportCenterX - cardCenterX;
        const translateY = viewportCenterY - cardCenterY;

        // Aplica el movimiento al centro
        cardElement.style.position = 'fixed';
        cardElement.style.top = `${rect.top}px`;
        cardElement.style.left = `${rect.left}px`;
        cardElement.style.width = `${rect.width}px`;
        cardElement.style.height = `${rect.height}px`;
        cardElement.style.transition = 'transform 0.6s ease-in-out';
        cardElement.style.transform = `translate(${translateX}px, ${translateY}px) rotateY(0deg)`;

        // Aplica el giro después de un pequeño retraso
        $timeout(() => {
          cardElement.style.transform = `translate(${translateX}px, ${translateY}px) rotateY(180deg)`;
        }, 100);

        // Muestra el modal después de que termina la animación
        $timeout(() => {
          ctrl.showModal = true;
          cardElement.style.transition = ''; // Limpia la transición
          cardElement.style.transform = ''; // Limpia las transformaciones
          cardElement.style.position = ''; // Restaura el estado original
          cardElement.style.top = '';
          cardElement.style.left = '';
          cardElement.style.width = '';
          cardElement.style.height = '';
        }, 700); // Tiempo total de la animación
      }
    };

    // Función para cerrar el modal
    ctrl.closeModal = function() {
      ctrl.showModal = false;
      ctrl.selectedPokemon = null;
    };

    // Función para manejar estrellas en las estadísticas
    ctrl.getStarsArray = function(value) {
      return new Array(value); // Genera un array con el tamaño del valor
    };

    // Estado inicial de la barra lateral
    ctrl.sidebarCollapsed = false;

    // Función para alternar la barra lateral
    ctrl.toggleSidebar = function() {
      ctrl.sidebarCollapsed = !ctrl.sidebarCollapsed;

      // Encuentra el elemento de la barra lateral y cambia la clase
      const sidebarElement = document.querySelector('.sidebar');
      if (sidebarElement) {
        if (ctrl.sidebarCollapsed) {
          sidebarElement.classList.add('collapsed');
        } else {
          sidebarElement.classList.remove('collapsed');
        }
      }
    };
  });
