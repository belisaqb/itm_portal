<template>
  <NavBar></NavBar>


  <div class="m-5">
    <ProjectRegister class="col-6" :categories="categories"></ProjectRegister>
  </div>

  <div v-for="(project, index) in projects" :key="index" class="m-5">
        <ProjectCard
          :id="project.id"
          :projectName="project.name"
          :projectDescription="project.description"
          :projectCategory="project.category"
        ></ProjectCard>
      </div>

  <div class="m-5">
    <AuthUser class="col-6"></AuthUser>
  </div>

  <UploadImg></UploadImg>
  <!-- <div class="custom">
    <div class="mb-3">
      <h1>Registro de proyecto</h1>

      <form @submit.prevent="addProject">
        <label for="name" class="mt-4 form-label">Nombre del proyecto</label>
        <input v-model="newProjectName" type="text" class="form-control" id="name" placeholder="Nombre del proyecto">
        <label for="description" class="mt-4 form-label">Descripción</label>
        <input v-model="newProjectDescription" type="text" class="form-control" id="description"
          placeholder="Descripción del proyecto">
        <button :disabled="!newProjectName || !newProjectDescription" class="mt-4 btn btn-primary mb-3">Guardar</button>
      </form>


      <div v-for="project in projects" :key="project.id">
        <div class="card mt-2" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>
            <button @click="deleteProject(project.id)" class="btn btn-danger">&cross;</button>
          </div>
        </div>
      </div>

    </div>
  </div> -->
</template>



<script>

import AuthUser from './components/AuthUser.vue'
import UploadImg from './components/UploadImg.vue'
import NavBar from './components/NavBar.vue';
import ProjectRegister from './components/ProjectRegister.vue';
import ProjectCard from './components/ProjectCard.vue';

export default {
  name: 'App',
  data() {
    return {
      categories: [],
      projects: []
    }
  },
  components: {
    NavBar,
    AuthUser,
    UploadImg,
    ProjectRegister,
    ProjectCard
  },
  methods: {
    filterCategory(idToMatch) {
      const filteredCategories = this.categories.filter(category => category.id === idToMatch);
      return filteredCategories;
    }
  },
  mounted: function () {

    //----------------------Get Categories-----------------
    const categoriesRef = collection(db, 'categories')
    getDocs(categoriesRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data());
          this.categories.push({
            id: doc.id,
            category: doc.data().category
          })
        });
      })
      .catch((error) => {
        console.error('Error al obtener documentos: ', error);
      });


   
    //-----------------Get Projects------------------------
    //  Obtener datos de Firebase y actualizar projects
    const projectsRef = collection(db, 'projects');
    getDocs(projectsRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const filterCategories = this.filterCategory(doc.data().id_category);
          // console.log(filterCategories[0].category)
          this.projects.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            category: filterCategories[0].category
          });
        });

      })
      .catch((error) => {
        console.error('Error al obtener documentos: ', error);
      });
    //-----------------Get Projects------------------------
    

  },
  beforeUnmount() {
    
  }
}

</script>

<script setup>
//-------------------------- imports de Firebase ---------------------------------
import { onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from '@/firebase'




//------------------------ Carga del Bootstrap---------------------------------
const loadBootstrap = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js';
  script.async = false;  // Carga de forma síncrona
  document.head.appendChild(script);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css';
  document.head.appendChild(link);
};
// Cargar Bootstrap al inicio
loadBootstrap();
//-------------------------------------------------------------------------------


onMounted(() => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
})
</script>

<style>
.custom {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>



