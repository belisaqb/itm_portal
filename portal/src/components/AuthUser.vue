<template>
  <!-- Register section -->
  <div id="registration-popup" class="registration-popup">
    <div class="registration-modal">
      <span class="close-popup-button">&times;</span>
      <h2>REGISTRARSE</h2>
      <form class="form-display">
        <label for="nombre">NOMBRE</label>
        <input type="text" id="nombre" class="input-field" placeholder="nombre" required>

        <label for="apellidos">APELLIDOS</label>
        <input type="text" id="apellidos" class="input-field" placeholder="apellidos" required>

        <label for="carnet">CARNET</label>
        <input type="text" id="carnet" class="input-field" placeholder="carnet" required>

        <label for="correo">CORREO ELECTRONICO</label>
        <input type="email" id="correo" class="input-field" placeholder="correo electrónico" required>

        <label for="contraseña">CONTRASEÑA</label>
        <input type="password" id="contraseña" class="input-field" placeholder="contraseña" required>

        <label for="verificar-contraseña">VERIFICAR CONTRASEÑA</label>
        <input type="password" id="verificar-contraseña" class="input-field" placeholder="verificar contraseña" required>

        <div class="button-container">
          <button type="button" class="register-button">REGISTRAR</button>
          <hr class="line-between-buttons">
          <button id="login-button" type="button" class="login-button">INICIAR SESION</button>
        </div>
      </form>
    </div>
  </div>
  <!-- Register section -->

  <!-- Login section -->
  <div id="login-popup" class="registration-popup">
    <div class="registration-modal">
      <span id="close-login-popup" class="close-popup-button">&times;</span>
      <h2>Iniciar Sesión</h2>
      <form class="form-display">

        <label for="correo">CORREO ELECTRONICO</label>
        <input type="email" id="correo" class="input-field" placeholder="correo electrónico" required>

        <label for="contraseña">CONTRASEÑA</label>
        <input type="password" id="contraseña" class="input-field" placeholder="contraseña" required>

        <div class="button-container">
          <button type="button" class="register-button">INICIAR SESION</button>
          <hr class="line-between-buttons">
          <button id="register-button" type="button" class="login-button">REGISTRAR</button>
        </div>
      </form>
    </div>
  </div>
  <!-- Login section -->

  <!-- Form to Login -->
  <div>
    <template v-if="isLogin">
      <h3>Inicio de Sesión</h3>
      <form @submit.prevent="doLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Correo</label>
          <input v-model="inputEmail" id="email" class="form-bg form-control" type="text" name="email"
            placeholder="Email">
          <!-- <input v-model="userData.email" type="email" class="form-control" id="email"> -->
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <!-- <input v-model="userData.password" type="password" class="form-control" id="password"> -->
          <input v-model="inputPassword" id="password" class="form-bg form-control" type="password" name="password"
            placeholder="Password">
        </div>
        <a href="#" @click="isLogin = false">¿No tienes cuenta? Registrarse</a>
        <input :disabled="!inputEmail || !inputPassword" type="submit" class="btn btn-primary m-2" value="Iniciar Sesión">
        <!-- <button @click="$emit('doLogin')" type="submit" class="btn btn-primary">Iniciar Sesión</button> -->

      </form>

      <button @click="doLogOut" v-show="isLoggedIn" class="btn btn-primary">Cerrar Sesión</button>
    </template>
    <!-- Form to Login -->

    <!-- Form to register -->
    <template v-else>
      <h3>Registro de Usuario</h3>
      <form @submit.prevent="doRegister" class="add">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="name">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Correo</label>
          <input v-model="inputEmail" type="email" name="email" class="form-control">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input v-model="inputPassword" type="password" name="password" class="form-control">
        </div>
        <a href="#" @click="isLogin = true">¿Ya tienes cuenta? Inicia Sesión</a>
        <button :disabled="!inputEmail || !inputPassword" type="submit" class="btn btn-primary m-2">Registrarse</button>
      </form>
    </template>

    <!-- Form to register -->
  </div>
</template>

<script>
// import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '@/firebase'

// const email = ref('')
// const password = ref('')

export default {
  name: 'AuthUser',
  data() {
    return {
      isLogin: true,
      isLoggedIn: false,
      inputEmail: '',
      inputPassword: '',
    }
  },
  methods: {
    doRegister() {
      console.log('register')
      console.log('email: ', this.inputEmail, 'Password: ', this.inputPassword)

      createUserWithEmailAndPassword(auth, this.inputEmail, this.inputPassword)
        .then((cred) => {
          console.log('user created:', cred.user)
          this.isLoggedIn = true
          // signupForm.reset()
        })
        .catch((err) => {
          alert(err.message)
        })
    },
    doLogin() {
      console.log('login')

      console.log(this.inputEmail, this.inputPassword)
      signInWithEmailAndPassword(auth, this.inputEmail, this.inputPassword)
        .then((cred) => {
          console.log('The user logged in:', cred.user)
          this.isLoggedIn = true
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    doLogOut() {
      console.log('logout')
      signOut(auth)
        .then((cred) => {
          this.isLoggedIn = false
          console.log('The user logged in:', cred.user)
          // alert('The user signed out')
        })
        .catch((err) => {
          console.log(err.message)
          alert(err.message)
        })
    }
  }
}
</script>