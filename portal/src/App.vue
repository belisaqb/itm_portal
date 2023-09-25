<template>
  <NavBar
    @go-home="viewHome"
    @go-auth="viewAuth"
    @go-project-register="viewProjectRegister">

  </NavBar>

  <div v-if="projectRegister" class="m-5">
    <ProjectRegister class="col-6" 
      :categories="categories">
    </ProjectRegister>
  </div>

  <div v-if="home" class="row">
    <div v-for="(project, index) in projects" :key="index" class="col my-2">
      <ProjectCard 
        @showProjectDetails="goProjectDetails" 
        :id="project.id" 
        :image="project.image"
        :projectName="project.name" 
        :projectDescription="project.description" 
        :projectCategory="project.category">
      </ProjectCard>
    </div>
  </div>

  <div v-if="projectDetails">
      <ProjectDetails 
        :image="singleProject.image" 
        :projectName="singleProject.name"
        :projectDescription="singleProject.description" 
        :projectCategory="singleProject.category">
      </ProjectDetails>
  </div>
  


  <div v-if="authUser" class="m-5">
    <AuthUser class="col-6"></AuthUser>
  </div>
</template>



<script>

import AuthUser from './components/AuthUser.vue'
import NavBar from './components/NavBar.vue';
import ProjectRegister from './components/ProjectRegister.vue';
import ProjectCard from './components/ProjectCard.vue';
import ProjectDetails from './components/ProjectDetails.vue'

export default {
  name: 'App',
  data() {
    return {
      //------------------VIEWS----------------
      home: true,
      authUser: false,
      projectRegister: false,
      projectDetails: false,
      

      //-------------------Init---------------
      categories: [],
      projects: [],
      projectId: '',
      singleProject: {}
    }
  },
  components: {
    NavBar,
    AuthUser,
    ProjectRegister,
    ProjectCard,
    ProjectDetails
  },
  methods: {
    filterCategory(idToMatch) {
      const filteredCategories = this.categories.filter(category => category.id === idToMatch)
      return filteredCategories
    },
    async goProjectDetails(data) {
      // console.log('Datos recibidos del componente hijo:', data)
      this.projectId = data

      console.log('getting: ', this.fetchDataById(data.id))
      const getProject = await this.fetchDataById(data.id)
      this.singleProject = getProject
      this.showProjectDetails = true

      console.log(this.singleProject)

      this.changeView(2)


    },
    async getDocumentById(documentId) {
      const docRef = doc(db, 'projects', documentId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        // console.log('Datos del documento:', docSnap.data())
        return docSnap.data();
      } else {
        console.log('El documento no existe.')
        return null;
      }
    },
    async fetchDataById(documentId) {
      const documentData = await this.getDocumentById(documentId);
      if (documentData) {
        // Maneja los datos del documento aquí
        // console.log('Datos del documento:', documentData);
        return documentData
      } else {
        console.log('Documento no encontrado.');
      }
    },

    //------------------------------CHANGE VIEW------------------------------
    changeView(view) {
      switch (view) {
        //Home
        case 0:
          this.home = true
          this.projectDetails = false,
          this.projectRegister = false,
          this.authUser = false
          break

        //Auth
        case 1:
          this.home = false
          this.projectDetails = false,
          this.projectRegister = false,
          this.authUser = true
          break
        //ProjectDetails
        case 2:
          this.home = false
          this.projectDetails = true,
          this.projectRegister = false,
          this.authUser = false
          break
        //ProjectDetails
        case 3:
          this.home = false
          this.projectDetails = false,
          this.projectRegister = true,
          this.authUser = false
          break
      }
    },
    viewHome() {
      this.changeView(0)
    },
    viewAuth() {
      this.changeView(1)
    },
    viewProjectRegister() {
      this.changeView(3)
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
    const projectsRef = collection(db, 'projects')
    getDocs(projectsRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const filterCategories = this.filterCategory(doc.data().id_category);
          // console.log(doc.data().image)
          this.projects.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            category: filterCategories[0].category,
            image: doc.data().image
          });
        });

      })
      .catch((error) => {
        console.error('Error al obtener documentos: ', error)
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
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"
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
      const uid = user.uid
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



