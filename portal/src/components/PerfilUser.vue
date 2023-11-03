<template>
  <div class="ps-4 ">
    <div class="row pt-4 mb-4">
      <div class="col-auto">
        <img src="../assets/svg/user-dark.svg" style="width: 70%;">
      </div>
      <div class="col mr-4">
        <h1 class="bold-dark-blue-xlg">{{ firstName }} {{ lastName }}</h1>
        <h2 class="light-dark-blue-xm">{{ email }}</h2>
      </div>
      <div v-if="currentUser" class="col ms-6">
        <button @click="addProject" class="perfil-button">
          <img src="../assets/svg/plus-button.svg" alt="" class="img-button">
        </button>
      </div>
    </div>

    <div class="dark-blue-container">
      <p class="light-ligth-green-xm p-3">ESTUDIANTE DE TERCER AÑO DE CARRERA, EL ÁREA QUE MAS LE GUSTA DE LA CARRERA ES
        EL BACK'END Y EL FRONT-END</p>
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

    <div class="container mt-4">
      <div class="row mx-1">

        <div v-for="(project, index) in ownProjects" :key="index" class="col-md-6 mb-4">
          <ProjectCard @showProjectDetails="goProjectDetails" :id="project.id"
            :image="project.image" :projectName="project.name" :projectDescription="project.description"
            :projectCategory="project.category" :authorName="project.author"></ProjectCard>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';


export default {
  name: 'PerfilUser',
  data() {
    return {
      ownProjects: []
    }
  },
  components: {
    ProjectCard,
  },
  props: {
    firstName: String,
    lastName: String,
    email: String,
    carnet: String,
    uid: String,
    currentUser: Boolean
  },
  methods: {
    addProject() {
      this.$emit('add-project')
      // this.$emit('add-project', { userId: this.uid })
    },
    getUserProjects() {
      // Define la categoría por la que deseas filtrar
      const authorId = this.uid; // Cambia esto según tu categoría deseada

      // Crea una referencia a la colección "productos"
      const projectsRef = collection(db, 'projects');

      // Crea una consulta para filtrar por la categoría
      const consultaFiltrada = query(projectsRef, where('userId', '==', authorId));

      getDocs(consultaFiltrada)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Accede a los datos de cada producto
            const project = doc.data();
            this.ownProjects.push(project)
          });
        })
        .catch((error) => {
          console.error('Error al obtener proyectos filtrados:', error);
        });
      console.log(this.ownProjects)
    }
  },
  mounted() {
    this.getUserProjects()
  },
}

</script>