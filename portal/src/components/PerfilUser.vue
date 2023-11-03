<template>
  <div class="ps-4">
    <div class="row pt-4 mb-4">
      <div class="col-auto">
        <img src="../assets/svg/user-dark.svg" style="width: 70%;">
      </div>
      <div class="col mr-4">
        <div style="display: flex;">
          <h1 class="bold-dark-blue-xlg">
            <span v-if="!editing">{{ editedFirstName }} {{ editedLastName }}</span>
            <span v-else>
              <input v-model="editedFirstName" type="text" />
              <input v-model="editedLastName" type="text" />
            </span>
          </h1>
          <button class="edit-button" @click="activateEditMode">
            <img class="edit-img" src="../assets/svg/edit.svg">
          </button>
          <button @click="saveChanges" v-if="editing">Guardar</button>
          <button @click="cancelEdit" v-if="editing">Cancelar</button>
        </div>
        <h2 class="light-dark-blue-xm">{{ email }}</h2>
      </div>
      <div class="col ms-6">
        <button class="perfil-button">
          <img src="../assets/svg/plus-button.svg" alt="" class="img-button">
        </button>
      </div>
    </div>

    <div class="dark-blue-container">
        <textarea v-model="userDescription" class="light-ligth-green-xm p-3 description-ta" @input="onDescriptionChange" placeholder="AGREGAR DESCRIPCION DEL USUARIO"></textarea>
    </div>

    <div class="row pt-4 mb-4 ms-1">
      <button class="perfil-button col-auto me-4 ps-4 pe-4">
        <img class="img-filter dark-blue-container-button" src="../assets/svg/code.svg" alt="code">
      </button>

      <button class="perfil-button col-auto me-4 ps-4 pe-4">
        <img class="img-filter dark-blue-container-button" src="../assets/svg/drawings.svg" alt="drawings">
      </button>

      <button class="perfil-button col-auto me-4 ps-4 pe-4">
        <img class="img-filter dark-blue-container-button" src="../assets/svg/cyber-segurity.svg" alt="cyber-segurity">
      </button>

      <button class="perfil-button col-auto me-4 ps-4 pe-4">
        <img class="img-filter dark-blue-container-button" src="../assets/svg/animations.svg" alt="animations">
      </button>

      <div class="col-auto d-flex justify-content-center dropdown mx-2">
        <button class="dropdown-toggle dropdown-button semibold-ligth-green-med" type="button" data-bs-toggle="dropdown"
          aria-expanded="false">
          ORDENAR POR
        </button>
        <ul style="border-radius: 0% ; padding: 1rem 1.32rem; " class="dropdown-menu">
          <li><a class="dropdown-item semibold-ligth-green-med" href="#">MÁS NUEVOS</a></li>
          <li><a class="dropdown-item semibold-ligth-green-med" href="#">A-Z</a></li>
        </ul>
      </div>

    </div>  

    <div class="row mx-1">

      <NewsCard></NewsCard>
      <NewsCard></NewsCard>
      <NewsCard></NewsCard>

      <div class="col-md-6 mb-4">
        <div class="card-content ">
          <div class="card-container">
            <img class="card-img-top" src="@/assets/imgs/Novedades/img4.jpg" alt="img">
            <div class="position-absolute w-100 overlay">
              <div class="d-flex mx-2 positionY justify-content-between">
                <p class="bold-white-lg">ITM OFICIAL</p>
                <p class="bold-white-lg">20/26/2023</p>
              </div>
            </div>
          </div>
          <div class="pt-3">
            <h2 class="bold-dark-blue-lg">TEATRO DE SOMBRAS, LEYENDAS COSTARRICENSES</h2>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card-content ">
          <div class="card-container">
            <img class="card-img-top" src="@/assets/imgs/Novedades/img3.jpg" alt="img">
            <div class="position-absolute w-100 overlay">
              <div class="d-flex mx-2 positionY justify-content-between">
                <p class="bold-white-lg">ITM OFICIAL</p>
                <p class="bold-white-lg">20/26/2023</p>
              </div>
            </div>
          </div>
          <div class="pt-3">
            <h2 class="bold-dark-blue-lg">CONCURSO ANUAL DE CAMISAS ITM, SEMANA U</h2>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card-content ">
          <div class="card-container">
            <img class="card-img-top" src="@/assets/imgs/Novedades/img2.jpg" alt="img">
            <div class="position-absolute w-100 overlay">
              <div class="d-flex mx-2 positionY justify-content-between">
                <p class="bold-white-lg">ITM OFICIAL</p>
                <p class="bold-white-lg">20/26/2023</p>
              </div>
            </div>
          </div>
          <div class="pt-3">
            <h2 class="bold-dark-blue-lg">SE LLEVA A CABO FIESTA ITM, CONOZCA CÓMO SE ...
            </h2>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import { db } from '@/firebase'
import { collection, doc, updateDoc } from 'firebase/firestore'
import NewsCard from './NewsCard.vue';

export default {
  name: 'PerfilUser',
  components: {
    NewsCard,
  },
  props: {
    firstName: String,
    lastName: String,
    email: String,
    carnet: String,
    uid: String,
  },
  data() {
    return {
      editing: false,
      editedFirstName: this.firstName,
      editedLastName: this.lastName, 
      userDescription: '',
    };
  },
  methods: {
    activateEditMode() {
      this.editing = true;
    },
    cancelEdit() {
      this.editing = false;
      // Revierte a los valores originales si se cancela la edición
      this.editedFirstName = this.firstName;
      this.editedLastName = this.lastName;
    },
    saveChanges() {
    // Emitir eventos para actualizar los valores en el componente padre
    this.$emit('update:firstName', this.editedFirstName);
    this.$emit('update:lastName', this.editedLastName);

    // Verificar si this.uid tiene un valor válido
    if (!this.uid) {
      console.error('this.uid no está definido o es inválido.');
      return;
    }

    // Crear una referencia al documento del usuario en Firebase
    const userRef = doc(db, 'users', this.uid);

    // Actualizar el documento del usuario en Firebase
    updateDoc(userRef, {
      firstName: this.editedFirstName,
      lastName: this.editedLastName,
    })
      .then(() => {
        this.editing = false;
      })
      .catch((error) => {
        console.error('Error al guardar los cambios: ', error);
      });
    },

    onDescriptionChange() {
      // Este método se llama cuando el usuario cambia la descripción
      if (this.auth && this.uid) {
        const userRef = collection(db, 'users').doc(this.uid);
        userRef.update({
          description: this.userDescription, // Actualiza el campo de descripción
        })
          .then(() => {
            console.log('Descripción actualizada con éxito.');
          })
          .catch((error) => {
            console.error('Error al actualizar la descripción:', error);
          });
      }
    },
  },
};
</script>