<template>
  <div class="ps-4">
    <div class="row d-flex pt-4 mb-4 mx-3">
      <div class="col-1">
        <img src="../assets/svg/user-dark.svg" style="width: 70%;">
      </div>
      <div class="col-10">
        <div class="d-flex">
          <h1 class="bold-dark-blue-xlg">
            <span v-if="!editing">{{ editedFirstName }} {{ editedLastName }}</span>
            <span class="d-flex" v-else>
              <input class="col input-user form-control" v-model="editedFirstName" type="text" />
              <input class="col input-user form-control" v-model="editedLastName" type="text" />
            </span>
          </h1>
          <button class="edit-button" @click="activateEditMode" v-if="canEditProfile" v-show="!editing">
            <img class="edit-img" src="../assets/svg/edit.svg">
          </button>                   
        </div>
        <div v-if="editing" class="d-flex">
          <div class="ms-1 align-self-center">
              <button class="edit-btn px-3 py-1 me-2" @click="saveChanges" v-if="editing && canEditProfile">Guardar</button>
              <button class="cancel-btn px-3 py-1" @click="cancelEdit" v-if="editing">Cancelar</button>
            </div> 
        </div>
        <h2 v-if="!editing" class="light-dark-blue-xm">{{ email }}</h2>
      </div>
      <div v-if="authorLoggedIn" class="col-1 img-user dropdown">
        <button data-bs-toggle="dropdown" class="nav-buttons">
          <img src="../assets/svg/options.svg" alt="" class="img-button">
        </button>
        <ul style="border-radius: 0% ; padding: 1rem 1.32rem; " class="dropdown-menu">
          <li><a @click="addProject" class="dropdown-item semibold-ligth-green-med" href="#">Agregar Proyecto</a></li>
          <li><a @click="editProjects" class="dropdown-item semibold-ligth-green-med" href="#">Modificar Proyectos</a>
          </li>
        </ul>

      </div>
    </div>

    <div class="dark-blue-container mx-3">
      <textarea v-model="userDescription" class="light-ligth-green-xm p-3 description-ta" @input="onDescriptionChange"
        placeholder="AGREGAR DESCRIPCION DEL USUARIO" :disabled="!canEditProfile"></textarea>
    </div>



    <div class="row pt-4 mb-4 mx-3">
      <button @click="selectCategory('Programación')" class="perfil-button rounded col-auto me-4 ps-4 pe-4">
        <img class="img-filter" src="../assets/svg/code.svg" alt="code">
      </button>

      <button @click="selectCategory('Diseño/Dibujo')" class="perfil-button rounded col-auto me-4 ps-4 pe-4">
        <img class="img-filter" src="../assets/svg/drawings.svg" alt="drawings">
      </button>

      <button @click="selectCategory('Ciberseguridad')" class="perfil-button rounded col-auto me-4 ps-4 pe-4">
        <img class="img-filter" src="../assets/svg/cyber-segurity.svg" alt="cyber-segurity">
      </button>

      <button @click="selectCategory('Audiovisuales')" class="perfil-button rounded col-auto me-4 ps-4 pe-4">
        <img class="img-filter" src="../assets/svg/animations.svg" alt="animations">
      </button>

      <div class="col-auto d-flex justify-content-center dropdown mx-2">
        <button class="dropdown-toggle dropdown-button semibold-ligth-green-med rounded" type="button" data-bs-toggle="dropdown"
          aria-expanded="false">
          ORDENAR POR
        </button>
        <ul style="border-radius: 0% ; padding: 1rem 1.32rem; " class="dropdown-menu">
              <li><a class="dropdown-item semibold-ligth-green-med" href="#" @click="selectFilter('Mas Nuevos')">MÁS
                  NUEVOS</a></li>
              <li><a class="dropdown-item semibold-ligth-green-med" href="#" @click="selectFilter('A-Z')">A-Z</a></li>
          </ul>
      </div>

    </div>

    <div class="container mt-4">
      <div class="row mx-1">
        <h1 class="text-center py-4 black-dark-blue-xlg">PROYECTOS</h1>
        <div v-for="(project, index) in ownProjects" :key="index" class="col-md-6 mb-4">
          <ProjectCard @showProjectDetails="goProjectDetails" :id="project.id" :image="project.image"
            :projectName="project.name" :projectDescription="project.description" :projectCategory="project.category"
            :authorName="project.author" :date="project.date"></ProjectCard>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue';
import { query, where, getDocs } from 'firebase/firestore';


import { db } from '@/firebase'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore';

import { format } from 'date-fns'


export default {
  name: 'PerfilUser',
  components: {
    ProjectCard,
  },
  props: {
    firstName: String,
    lastName: String,
    email: String,
    carnet: String,
    uid: String,
    authorLoggedIn: Boolean,
    loggedInUserUid: String,
    date: String,
    categories: {
      type: Array,
    },
  },
  data() {
    return {
      editing: false,
      editedFirstName: this.firstName,
      editedLastName: this.lastName,
      userDescription: '',
      ownProjects: [],
      allOwnProjects: []
    };
  },

  async mounted() {
    // console.log('OnMounted ' + this.uid);

    const userRef = doc(db, 'users', this.uid);

    // Escuchar cambios en el documento del usuario
    onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        this.userDescription = doc.data().description || '';
      } else {
        this.userDescription = '';
      }

      this.getUserProjects();
    });
  },

  computed: {
    canEditProfile() {
      // Verifica si el usuario actual coincide con el usuario del perfil
      return this.uid === this.loggedInUserUid;
    },
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

      // Crear una referencia al documento del usuario en Firebase
      const userRef = doc(db, 'users', this.uid);

      // Actualizar el documento del usuario en Firebase
      updateDoc(userRef, {
        firstname: this.editedFirstName,
        lastname: this.editedLastName,
      })
        .then(() => {
          this.editing = false;
        })
        .catch((error) => {
          console.error('Error al guardar los cambios: ', error);
        });
    },

    async onDescriptionChange() {
      if (this.canEditProfile) {
        // Este método se llama cuando el usuario cambia la descripción
        const userRef = doc(db, 'users', this.uid);
        try {
          await updateDoc(userRef, {
            description: this.userDescription, // Actualiza el campo de descripción
          });
        } catch (error) {
          console.error('Error al actualizar la descripción:', error);
        }
      }
    },

    addProject() {
      this.$emit('add-project')
      // this.$emit('add-project', { userId: this.uid })
    },
    editProjects() {
      this.$emit('edit-projects')
    },
    getUserProjects() {
      // Define la categoría por la que deseas filtrar
      const authorId = this.uid; // Cambia esto según tu categoría deseada

      // console.log("AuthorID" + authorId)
      // Crea una referencia a la colección "productos"
      const projectsRef = collection(db, 'projects');

      // Crea una consulta para filtrar por la categoría
      const consultaFiltrada = query(projectsRef, where('userId', '==', authorId));

      getDocs(consultaFiltrada)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const filterCategories = this.filterCategory(doc.data().id_category)
            // console.log(project.image)
            this.ownProjects.push({
              id: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              category: filterCategories[0].category,
              image: doc.data().images[0],
              userId: doc.data().userId,
              date: this.formatDate(doc.data().createdAt)

            });
          });
        })
        .catch((error) => {
          console.error('Error al obtener proyectos filtrados:', error);
        });
      // console.log(this.ownProjects)
      this.allOwnProjects = this.ownProjects
    },
    selectFilter(filterOption) {
      this.ownProjects = this.allOwnProjects
      // this.$emit('filterSelected', filterOption);
      // console.log('filterSelected'+ filterOption);
      if (filterOption === 'Mas Nuevos') {
        console.log('filterSelected' + filterOption);
        // this.projects.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.ownProjects.sort((a, b) => {
      const dateA = new Date(a.date.replace(/(\d{2})\/(\d{2})\/(\d{2})/, '20$3-$2-$1'));
      const dateB = new Date(b.date.replace(/(\d{2})\/(\d{2})\/(\d{2})/, '20$3-$2-$1'));
      return dateB.getTime() - dateA.getTime();
    });

      } else {
        this.ownProjects = this.allOwnProjects
        console.log('filterSelected' + filterOption);
        this.ownProjects.sort((a, b) => a.name.localeCompare(b.name));
      }
      console.log('Proyectos ordenados:', this.allOwnProjects);
    },
    formatDate(createdAt) {
      // Convierte la fecha de Firebase a un objeto de fecha
      const dateObject = new Date(createdAt.toDate());
      // Formatea la fecha según el formato 'dd/MM/yy'
      return format(dateObject, 'dd/MM/yy');
    },
    goProjectDetails(data) {
      this.$emit('goProjectDetails', data)
    },
    filterCategory(idToMatch) {
      //------------Method to get the correct category for the project--------------
      const filteredCategories = this.categories.filter(category => category.id === idToMatch)
      return filteredCategories
    },
    selectCategory(categoryId) {
      // console.log('categorySelected:', categoryId);
      this.ownProjects = this.allOwnProjects.filter(project => project.category === categoryId);      
    }
  }
}

</script>

<style scoped>
.edit-button {
  background: none;
  border: 0;
}

.edit-img {
  width: 1em;
  margin-left: 1em;
  padding-bottom: 1em;
}

.description-ta {
  background-color: rgb(0, 45, 92);
  border: none;
  width: 100%;  
}

.edit-btn{
  background-color: rgba(0, 45, 92, 1); 
  color: white;
  border: solid;
  border-radius: 0.2rem;
  border-width: 0.1rem;
  border-color: rgba(0, 45, 92, 1); 
}

.cancel-btn{
  background: none;
  color: rgba(0, 45, 92, 1);  
  border: solid;
  border-radius: 0.2rem;
  border-width: 0.1rem;
  border-color: rgba(0, 45, 92, 1); 
}
</style>