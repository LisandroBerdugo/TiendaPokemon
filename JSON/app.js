angular.module('tiendaApp', [])
  .controller('MainController', function() {
    const ctrl = this;

    // Cargar datos
    ctrl.pokemons = pokemonsData;

    // Filtros
    ctrl.filtroNombreNumero = '';
    ctrl.filtroTipo = '';
    ctrl.filtroSubtipo = '';
    ctrl.filtroGenero = '';
    ctrl.filtroRareza = '';

    // Estado de la barra lateral
    ctrl.sidebarCollapsed = false;

    // Función para alternar la barra lateral
    ctrl.toggleSidebar = function() {
      ctrl.sidebarCollapsed = !ctrl.sidebarCollapsed;
    };

    // Filtros de Pokémon
    ctrl.filtrarPokemons = function(pokemon) {
      // Filtro por nombre o número
      if (
        ctrl.filtroNombreNumero &&
        !(
          pokemon.nombre.toLowerCase().includes(ctrl.filtroNombreNumero.toLowerCase()) ||
          pokemon.numero.includes(ctrl.filtroNombreNumero)
        )
      ) {
        return false;
      }
      // Filtro por tipo
      if (ctrl.filtroTipo && pokemon.tipo !== ctrl.filtroTipo) {
        return false;
      }
      // Filtro por subtipo
      if (ctrl.filtroSubtipo && pokemon.subtipo !== ctrl.filtroSubtipo) {
        return false;
      }
      // Filtro por género
      if (ctrl.filtroGenero) {
        if (ctrl.filtroGenero === 'Sin género' && pokemon.genero !== null) {
          return false;
        }
        if (ctrl.filtroGenero !== 'Sin género' && pokemon.genero !== ctrl.filtroGenero) {
          return false;
        }
      }
      // Filtro por rareza
      if (ctrl.filtroRareza && pokemon.rareza !== ctrl.filtroRareza) {
        return false;
      }
      return true;
    };
  });
