<template>
    <div>
        <nav style="padding: 0;" class="navbar navbar-expand-lg">
            <div class="navbar-container container">
                <a class="navbar-brand logo" href="#"><img class="img-logo" src="@/assets/svg/ITM.svg" alt="itm"></a>
                <form class="d-flex search-bar" @submit.prevent="doSearch">
                    <input v-model="inputSearchBar" type="search" class="search-input" placeholder="Buscar">
                    <button class="search-button" type="submit"><img src="@/assets/svg/search2.svg" alt="search"></button>
                </form>
                <button style="font-size: 0;" class="navbar-toggler btn-hamburguer" id="hamburguer" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span><img src="@/assets/svg/menuHamburguesa.svg" alt="menu"></span>
                </button>
                <div class=" nav-center collapse navbar-collapse div-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a @click="goProjects" class="link-nav semibold-ligth-green-med" href="#">PROYECTOS</a>
                        </li>
                        <li class="nav-item">
                            <a class="link-nav semibold-ligth-green-med" href="#">FOROS</a>
                        </li>
                        <li class="nav-item">
                            <a @click="goHome" class="link-nav semibold-ligth-green-med" href="#">NOVEDADES</a>
                        </li>
                    </ul>
                    <div v-if="!isLoggedIn" class="img-user">
                        <button @click="goAuth" class="nav-buttons"><img src="@/assets/svg/user.svg" alt="user"></button>
                    </div>
                    <div v-if="isLoggedIn" class="img-user dropdown">
                        <button class="nav-buttons" data-bs-toggle="dropdown"><img src="@/assets/svg/user.svg" alt="user"></button>
                        <ul style="border-radius: 0% ; padding: 1rem 1.32rem; " class="dropdown-menu">
                            <li><a @click="goCurrentUserProfile" class="dropdown-item semibold-ligth-green-med" href="#">VER PERFIL</a></li>
                            <li><a @click="goLogout" class="dropdown-item semibold-ligth-green-med" href="#">CERRAR SESIÓN</a></li>
                        </ul>
                    </div>
                    <div class="notifications">
                        <button class="nav-buttons"><img src="@/assets/svg/campaing.svg" alt="notifications"></button>
                    </div>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase'

export default {
    name: 'NavBar',
    data() {
        return {
            isLoggedIn: false,
            inputSearchBar: ''
        }
    },
    methods: {
        goHome() {
            this.$emit('go-home')
        },
        goAuth() {
            this.$emit('go-auth')
        },
        goProjectRegister() {
            this.$emit('go-project-register')
        },
        goLogout() {
            this.$emit('go-logout')
        },
        goProjects() {
            this.$emit('go-all-projects')
        },
        userState() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // console.log(user.uid)
                    this.isLoggedIn = true
                } else {
                    this.isLoggedIn = false
                }
            });
        },
        goCurrentUserProfile(){
            this.$emit('go-current-user-profile')
        },
        doSearch() {
            if (this.inputSearchBar == '') {
                console.log('búsqueda vacía')
            } else {
                // console.log('Consulta ' + this.inputSearchBar)
                this.$emit('do-search', {keyword: this.inputSearchBar})
                
            }
        }
    },
    mounted() {
        this.userState()
    },

}


</script>
