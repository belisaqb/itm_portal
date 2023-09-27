<template>
    <div>
        <aside class="floating-filter" id="filter">
          <button id="toggleButton" class="nav-buttons btn-link"><img src="@/assets/svg/open.svg" alt="open"></button>
          <ul>
            <li>
              <img class="img-filter" src="@/assets/svg/code.svg" alt="code">
            </li>
            <li>
              <img class="img-filter" src="@/assets/svg/drawings.svg" alt="drawings">
            </li>
            <li>
              <img class="img-filter" src="@/assets/svg/cyber-segurity.svg" alt="cyber-segurity">
            </li>
            <li>
              <img class="img-filter" src="@/assets/svg/animations.svg" alt="animations">
            </li>
          </ul>
          <!-- opciones desplegables -->
          <div id="optionsContainer" style="display: none; z-index: 1;">
            <div class="d-block ms-3 me-4">
              <div class="d-flex mt-5">
                <button class="nav-buttons ms-2" id="closeButton"><img style="width: 1rem;" src="@/assets/svg/Close.svg"
                    alt="Close"></button>
                <p class="black-ligth-green-lg mt-3 ms-3">PROYECTOS
                </p>
              </div>
              <div class="d-flex padding-options">
                <button class="nav-buttons"><img class="img-filter" src="@/assets/svg/code.svg" alt="code"></button>
                <p class="mt-3 ms-3 regular-ligth-green-med">PROGRAMACIÓN</p>
              </div>
              <div class="d-flex padding-options">
                <button class="nav-buttons"><img class="img-filter" src="@/assets/svg/drawings.svg" alt="drawings"></button>
                <p class="mt-3 ms-3 regular-ligth-green-med">DISEÑO/DIBUJO</p>
              </div>
              <div class="d-flex padding-options">
                <button class="nav-buttons"><img class="img-filter" src="@/assets/svg/cyber-segurity.svg"
                    alt="cyber-segurity"></button>
                <p class="mt-3 ms-3 regular-ligth-green-med">CIBERSEGURIDAD</p>
              </div>
              <div class="d-flex padding-options">
                <button class="nav-buttons"><img class="img-filter" src="@/assets/svg/animations.svg" alt="animations"></button>
                <p class="mt-3 ms-3 regular-ligth-green-med">AUDIOVISUALES</p>
              </div>
            </div>
          </div>
        </aside>        
    </div>
</template>

<script>
export default {
    name: 'SideBar'
}




</script>