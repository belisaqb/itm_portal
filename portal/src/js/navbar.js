// navbar.js


/*
document.addEventListener('DOMContentLoaded', function () {
    var navbarCollapse = document.querySelector('.navbar-collapse');
    var imgUser = document.querySelector('.img-user');
    
    //var notifications = document.querySelector('.notifications');

    var divCollapse = document.querySelector(".div-collapse");
    var ulElement = divCollapse.querySelector("ul");

    navbarCollapse.addEventListener('show.bs.collapse', function () {
        // Navbar está colapsando
        imgUser.classList.add('text-only'); // Agrega una clase para mostrar texto
        //notifications.classList.add('text-only'); // Agrega una clase para mostrar texto
    });

    navbarCollapse.addEventListener('hide.bs.collapse', function () {
        // Navbar está expandiendo
        setTimeout(function () {
            imgUser.classList.remove('text-only'); // Elimina la clase para mostrar la imagen
            //notifications.classList.remove('text-only'); // Elimina la clase para mostrar la imagen
        }, 100);
    });


    function updateAriaExpanded() {
        if (window.innerWidth > 991 && divCollapse.classList.contains("show")) {
            divCollapse.classList.remove("show");
            ulElement.style.display = "inherit";

            elementoVisible.style.top = '0';
            optionsContainer.style.top = '0';

            imgUser.innerHTML = '<button class="nav-buttons"><img src="@/assets/svg/user.svg" alt="user"></button>';
           
            //notifications.innerHTML = '<button class="nav-buttons"><img src="@/assets/svg/campaing.svg" alt="user"></button>';

            // Agrega la clase "mobile-view" cuando la pantalla sea responsive
            imgUser.classList.add('mobile-view');
            //notifications.classList.add('mobile-view');
        }
    }

    window.addEventListener("resize", updateAriaExpanded);
    // Llamar a la función al cargar la página
    updateAriaExpanded();


    const btnHamburger = document.querySelector('.btn-hamburguer');
    const menuOptions = document.querySelector('.navbar-nav');
    const elementoVisible = document.querySelector('.floating-filter');
    const optionsContainer = document.getElementById('optionsContainer');

    let animacionEnCurso = false;

    btnHamburger.addEventListener('click', () => {
        if (animacionEnCurso) return;

        animacionEnCurso = true;

        if (menuOptions.style.display === 'inherit' || menuOptions.style.display === '') {
            menuOptions.style.display = 'block';

            // Añadir animación al desplazamiento
            elementoVisible.style.transition = 'top 0.3s ease';
            optionsContainer.style.transition = 'top 0.3s ease';

            // Ajusta la posición debajo de las opciones
            setTimeout(() => {
                elementoVisible.style.top = '178px';
                optionsContainer.style.top = '170px';

                // Habilitar el botón después de la animación
                setTimeout(() => {
                    animacionEnCurso = false;
                }, 300); // 0.3 segundos es la duración de la animación
            }, 0);

        } else {
            menuOptions.style.display = 'inherit';

            // Añadir animación al desplazamiento
            elementoVisible.style.transition = 'top 0.3s ease';
            optionsContainer.style.transition = 'top 0.3s ease';

            // Restaura la posición original
            setTimeout(() => {
                elementoVisible.style.top = '0';
                optionsContainer.style.top = '0';

                // Habilitar el botón después de la animación
                setTimeout(() => {
                    animacionEnCurso = false;
                }, 300); // 0.3 segundos es la duración de la animación
            }, 0);
        }
    });
});
*/