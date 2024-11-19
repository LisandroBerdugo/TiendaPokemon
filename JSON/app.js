angular.module('tiendaApp', [])
  .controller('MainController', function() {
    const ctrl = this;

    // Estado inicial de la barra lateral
    ctrl.sidebarCollapsed = true;

    // Función para alternar la barra lateral
    ctrl.toggleSidebar = function() {
      ctrl.sidebarCollapsed = !ctrl.sidebarCollapsed;
    };

    // Lista de Pokémon cargada desde pokemons.js
    ctrl.pokemons = pokemonsData;

    // Filtros
    ctrl.filtroNombre = '';
    ctrl.filtroTipo = '';
    ctrl.filtroRareza = '';

    // Función para filtrar Pokémon
    ctrl.filtrarPokemons = function(pokemon) {
      if (ctrl.filtroNombre && !pokemon.nombre.toLowerCase().includes(ctrl.filtroNombre.toLowerCase())) {
        return false;
      }
      if (ctrl.filtroTipo && pokemon.tipo !== ctrl.filtroTipo) {
        return false;
      }
      if (ctrl.filtroRareza && pokemon.rareza !== ctrl.filtroRareza) {
        return false;
      }
      return true;
    };
  });
