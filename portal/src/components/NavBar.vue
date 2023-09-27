<template>
    <div>
        <nav style="padding: 0;" class="navbar navbar-expand-lg">
            <div class="navbar-container container">
                <a class="navbar-brand logo" href="#"><img class="img-logo" src="@/assets/svg/ITM.svg" alt="itm"></a>
                <form class="d-flex search-bar">
                    <input type="search" class="search-input" placeholder="Buscar">
                    <button class="search-button" type="submit"><img src="@/assets/svg/search2.svg" alt="search"></button>
                </form>
                <button class="navbar-toggler btn-hamburguer" id="hamburguer" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span><img src="@/assets/svg/menuHamburguesa.svg" alt="menu"></span>
                </button>
                <div class="collapse navbar-collapse div-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a @click="goHome" class="link-nav semibold-ligth-green-med" href="#">PROYECTOS</a>
                        </li>
                        <li class="nav-item">
                            <a class="link-nav semibold-ligth-green-med" href="#">FOROS</a>
                        </li>
                        <li class="nav-item">
                            <a class="link-nav semibold-ligth-green-med" href="#">NOVEDADES</a>
                        </li>
                        <li class="nav-item">
                            <a @click="goProjectRegister" class="link-nav semibold-ligth-green-med" href="#">REGISTRAR PROYECTO</a>
                        </li>
                    </ul>
                    <div class="img-user">
                        <button @click="goAuth" class="nav-buttons"><img src="@/assets/svg/user.svg" alt="user"></button>
                    </div>
                    <div class="notifications">
                        <button class="nav-buttons"><img src="@/assets/svg/campaing.svg" alt="user"></button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a @click="goHome" class="nav-link active" aria-current="page" href="#">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a @click="goAuth" class="nav-link" href="#">Auth</a>
                        </li>
                        <li class="nav-item">
                            <a @click="goProjectRegister" class="nav-link" href="#">Crear Proyecto</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav> -->
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    methods: {
        goHome() {
            this.$emit('go-home')
        },
        goAuth() {
            this.$emit('go-auth')
        },
        goProjectRegister() {
            this.$emit('go-project-register')
        }
    }
}





</script>
