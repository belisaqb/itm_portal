<template>
 <div>
  <!-- REGISTER SECTION -->
  <div id="registration-popup" class="registration-popup">
    <div class="registration-modal">
      <span class="close-popup-button">&times;</span>
      <h2>REGISTRARSE</h2>
      <form @submit.prevent="doRegister" class="add form-display">
        <label for="firstname">NOMBRE</label>
        <input v-model="firstname" type="text" id="firstname" class="input-field" placeholder="nombre" required>

        <label for="lastname">APELLIDOS</label>
        <input v-model="lastname" type="text" id="lastname" class="input-field" placeholder="apellidos" required>

        <label for="carnet">CARNET</label>
        <input v-model="carnet" type="text" id="carnet" class="input-field" placeholder="carnet" required>

        <label for="inputEmail">CORREO ELECTRONICO</label>
        <input v-model="inputEmail" type="email" id="inputEmail" class="input-field" placeholder="correo electronico"
          required>

        <label for="inputPassword">CONTRASEÑA</label>
        <input v-model="inputPassword" type="password" id="inputPassword" class="input-field" placeholder="contraseña"
          required>

        <label for="verifyPassword">VERIFICAR CONTRASEÑA</label>
        <input type="password" id="verifyPassword" class="input-field" placeholder="verificar contraseña" required>
        <div id="password-error" class="error-message" style="color: red; display: none;">
          Error al registrar usuario</div>

        <div class="button-container">
          <button :disabled="!inputEmail || !inputPassword" @click="doRegister" type="button" class="register-button">REGISTRAR</button>
          <hr class="line-between-buttons">
          <button @click="isLogin = true" id="login-button" type="button" class="login-button">INICIAR SESION</button>
        </div>

      </form>
    </div>
  </div>
  <!-- REGISTER SECTION -->


  <!-- LOGIN SECTION -->
  <div id="login-popup" class="registration-popup">
    <div class="registration-modal">
      <span id="close-login-popup" class="close-popup-button">&times;</span>
      <!-- <div v-if="isLogin"> v-if -->
      <h2>Iniciar Sesión</h2>
      <form class="form-display" @submit.prevent="doLogin"> <!-- doLogin -->

        <label for="correo">CORREO ELECTRONICO</label>
        <input v-model="inputEmail" id="correo" class="input-field" type="email" name="correo"
          placeholder="correo electrónico" required>

        <label for="contraseña">CONTRASEÑA</label>
        <input v-model="inputPassword" id="contraseña" class="input-field" type="password" name="contraseña" placeholder="contraseña" required>

        <div class="button-container">
          <button :disabled="!inputEmail || !inputPassword" @click="doLogin" type="button"
            class="register-button">INICIAR SESION</button>
          <hr class="line-between-buttons">
          <button id="register-button" type="button" class="login-button"> VOLVER A REGISTRO</button>
          <hr class="line-between-buttons">
          <button id="restore-button" type="button" class="login-button">RESTABLECER CONTRASEÑA</button>
        </div>
      </form>
      <!-- </div> v-if end -->
    </div>
  </div>
  <!-- LOGIN SECTION -->

  <!-- Ingresar Email para restablecer -->
  <div id="restore-popup" class="registration-popup">
    <div class="registration-modal">
      <span id="close-login-popup" class="close-popup-button">&times;</span>
      <h2>Recuperar contraseña</h2>
      <form class="form-display"> 

        <label for="correo">CORREO ELECTRONICO</label>
        <input v-model="inputEmail" id="RecuperarCorreo" class="input-field" type="email" name="correo" placeholder="correo electrónico" required>

        <div class="button-container">
          <button type="button" class="register-button">VERIFICAR CORREO</button>
          <hr class="line-between-buttons">
          <button id="backToLogin-button" type="button" class="login-button">VOLVER A INICIO DE SESION</button>
        </div>
      </form>
    </div>
  </div>
  <!-- Ingresar Email para restablecer -->


  <!-- Nueva contraseña -->
  <div id="restoreConf-popup" class="registration-popup">
    <div class="registration-modal">
      <span id="close-login-popup" class="close-popup-button">&times;</span>
      <h2>Recuperar contraseña</h2>
      <form class="form-display"> 

        <label for="contraseña">CONTRASEÑA</label>
        <input v-model="inputPassword" id="contraseña" class="input-field" type="password" name="contraseña" placeholder="contraseña" required>
        
        <label for="contraseña">CONFIRMAR CONTRASEÑA</label>
        <input v-model="inputPassword" id="contraseña" class="input-field" type="password" name="contraseña" placeholder=" confirmar contraseña" required>

        <div class="button-container">
          <button type="button" class="register-button">CAMBIAR CONTRASEÑA</button>
        </div>
      </form>
    </div>
  </div>
  <!-- Nueva contraseña -->
  </div>
</template>


<script>
// import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from '@/firebase'
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

// const email = ref('')
// const password = ref('')
//sendPasswordResetEmail 


export default {
  name: 'AuthUser',
  emits: ['go-profile'],
  data() {
    return {
      isLogin: true,
      isLoggedIn: false,
      passwordError: false,
      firstname: '',
      lastname: '',
      carnet: '',
      inputEmail: '',
      inputPassword: '',
    }
  },

  /* METODOS */
  methods: {

    /* DOREGISTER METHOD*/
    doRegister() {
      const firstname = document.getElementById('firstname').value;
      const lastname = document.getElementById('lastname').value;
      const carnet = document.getElementById('carnet').value;
      const inputEmail = document.getElementById('inputEmail').value;
      const inputPassword = document.getElementById('inputPassword').value;

      if (this.inputPassword !== document.getElementById('verifyPassword').value) {
        document.getElementById('password-error').style.display = 'block';
        return;
      } else {
        document.getElementById('password-error').style.display = 'none';
      }

      // console.log('REGISTRO')
      console.log('Datos del usuario:', firstname, lastname, carnet, inputEmail, inputPassword);

      // Después de registrar al usuario en Firebase Authentication, guarda sus datos en Firestore
      createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          // const usuariosCollection = collection(db, "users");
          const userDocRef = doc(db, 'users', user.uid);

          // Guarda la información adicional en la colección "users" de Firestore
          const userData = {
            firstname: this.firstname,
            lastname: this.lastname,
            carnet: this.carnet,
            inputEmail: this.inputEmail,
            inputPassword: this.inputPassword,
          };


          // Agrega el documento del usuario con los datos adicionales a la colección "users"
          setDoc(userDocRef, userData)
            .then(() => {
              console.log("Usuario registrado con éxito", user);
              // this.switchToLoginModal();
              this.isLogin = true;
              this.inputEmail = '';
              this.inputPassword = '';
              this.firstname = '',
                this.lastname = '',
                this.carnet = '',
                this.verifyPassword = '';
              this.$emit('go-profile');
            })
            .catch((error) => {
              console.error("Error al guardar datos en Firestore:", error);
              document.getElementById('password-error').style.display = 'block';
              return;
            });
        })
        .catch((error) => {
          console.error("Error al registrar al usuario:", error.message);
          document.getElementById('password-error').style.display = 'block';
          return;
        });
    },
    
    /* DOREGISTER METHOD*/

    switchToLoginModal() {
      const registrationModal = document.getElementById('registration-popup');
      registrationModal.style.display = 'none';
      const loginModal = document.getElementById('login-popup');
      loginModal.style.display = 'block';
    },

    /* DOLOGIN METHOD*/
    doLogin() {
      // console.log('login')

      // console.log(this.inputEmail, this.inputPassword)
      signInWithEmailAndPassword(auth, this.inputEmail, this.inputPassword)
        .then((cred) => {
          console.log('The user logged in:', cred.user)
          this.isLoggedIn = true
          this.$emit('go-profile');
        })
        .catch((err) => {
          console.log(err.message)
        })
    },

    /** METODOS CAMBIAR CONTRASEÑA */

    /** METODOS CAMBIAR CONTRASEÑA */


    /* DOLOGIN METHOD*/

    // /* logii */
    // logiin() {
    //   console.log(' metodo logiin')

    //   console.log(this.inputEmail, this.inputPassword)
    //   signInWithEmailAndPassword(auth, this.inputEmail, this.inputEmail)
    //     .then((cred) => {
    //       console.log('Usuario logeado: ', cred.user)
    //       this.isLoggedIn = true
    //     })
    //     .catch((err) => {
    //       console.log(err.message)
    //     })

    // },
    /* logiin */

    /* DOLOGOUT METHOD*/
    // doLogOut() {
    //   // console.log('logout')
    //   signOut(auth)
    //     .then((cred) => {
    //       this.isLoggedIn = false
    //       console.log('The user logged in:', cred.user)
    //       // alert('The user signed out')
    //     })
    //     .catch((err) => {
    //       console.log(err.message)
    //       alert(err.message)
    //     })
    // },
    // /* DOLOGOUT METHOD*/
  }

  /* METODOS */
}
</script>