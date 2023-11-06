<template>

<div>

  <header class="header">
    <!----------------- COMPONENT NAV BAR ------------------------->
    <NavBar @go-home="viewHome" @go-auth="viewAuth" @go-project-register="viewProjectRegister" @go-logout="doLogOut"
      @go-all-projects="viewAllProjects" @go-current-user-profile="goCurrentUserProfile"></NavBar>
  </header>

  <main>
    <!----------------- COMPONENT SIDE BAR ------------------------->
    <SideBar @categorySelected="updateSelectedCategory"></SideBar>

    <!----------------- MAIN SECTION ------------------------->
    <section class="content" id="content">
      <div class="content-section ms-5">



        <!----------------- COMPONENT PERFIL USER ------------------------->
        <PerfilUser v-if="currentUserProfile" :authorLoggedIn="authorLoggedIn" :uid="currentUser.userId" :firstName="currentUser.firstname"
          :lastName="currentUser.lastname" :email="currentUser.inputEmail" :carnet="currentUser.carnet"
          :description="currentUser.description" @update:firstName="updateFirstName" @update:lastName="updateLastName" @add-project="createProject">
        </PerfilUser>


        <PerfilUser v-if="authorUserProfile" :authorLoggedIn="authorLoggedIn" :uid="authorUser.userId" :firstName="authorUser.firstname"
            :lastName="authorUser.lastname" :email="authorUser.inputEmail" :carnet="authorUser.carnet">           
        </PerfilUser> 


        <!----------------- NOVEDADES ------------------------->
        <div v-if="news">
          <h1 class="text-center pt-4 black-dark-blue-xlg">NOVEDADES</h1>


          <div class="d-flex justify-content-center mt-3 dropdown mx-2">
            <button class="dropdown-toggle dropdown-button semibold-ligth-green-med" type="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              ORDENAR POR
            </button>
            <ul style="border-radius: 0% ; padding: 1rem 1.32rem; " class="dropdown-menu">
              <li><a class="dropdown-item semibold-ligth-green-med" href="#">MÁS NUEVOS</a></li>
              <li><a class="dropdown-item semibold-ligth-green-med" href="#">A-Z</a></li>
            </ul>
          </div>

          <div class="container mt-4">

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


        </div>


        <!----------------- PROYECTOS ------------------------->
        <div v-if="allProjects">
          <h1 class="text-center pt-4 black-dark-blue-xlg">PROYECTOS</h1>

          <div class="d-flex justify-content-center mt-3 dropdown mx-2">
            <button class="dropdown-toggle dropdown-button semibold-ligth-green-med" type="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              ORDENAR POR
            </button>
            <ul style="border-radius: 0% ; padding: 1rem 1.32rem; " class="dropdown-menu">
              <li><a class="dropdown-item semibold-ligth-green-med" href="#">MÁS NUEVOS</a></li>
              <li><a class="dropdown-item semibold-ligth-green-med" href="#">A-Z</a></li>
            </ul>
          </div>

          <div class="container mt-4">

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


        </div>




      </div>
    </section>


  </main>

  <!------------------ FOOTER --------------------------->
  <LowFooter></LowFooter>


  <!--//////////////////////// CODIGO DE PRUEBAS ////////////////////// -->
  <!-- <div class="">
    <div v-if="projectRegister" class="m-5">
      <ProjectRegister class="col-6" :categories="categories">
      </ProjectRegister>
    </div>

    <div v-if="allProjects" class="row">
      <div v-for="(project, index) in projects" :key="index" class="col my-2">
        <ProjectCard @showProjectDetails="goProjectDetails" :id="project.id" :image="project.image"
          :projectName="project.name" :projectDescription="project.description" :projectCategory="project.category">
        </ProjectCard>
      </div>
    </div>


    <div v-if="projectDetails">
      <ProjectDetails :image="singleProject.image" :projectName="singleProject.name"
        :projectDescription="singleProject.description" :projectCategory="singleProject.category">
      </ProjectDetails>
    </div>

    <div v-show="authUser" class="">
      <AuthUser @go-profile="goCurrentUserProfile"></AuthUser>
    </div>
  </div> -->
  <!--//////////////////////// CODIGO DE PRUEBAS ////////////////////// -->
  </div>
  
</template>



<script>

//----------SCRIPTS--------------
import './js/navbar'
import './js/sidebar'

import './js/login'
import './js/register'


//----------IMPORT COMPONENTS--------------
import AddForm from './components/AddForm.vue';
import AuthUser from './components/AuthUser.vue'
import NavBar from './components/NavBar.vue';
import ProjectRegister from './components/ProjectRegister.vue';
import ProjectCard from './components/ProjectCard.vue';
// import ProjectDetails from './components/ProjectDetails.vue'
import SideBar from './components/SideBar.vue'
import NewsCard from './components/NewsCard.vue'
import PerfilUser from './components/PerfilUser.vue'
import DetailsProject from './components/DetailsProject.vue'
// import DetailsNovedades from './components/DetailsNovedades.vue'
import LowFooter from './components/LowFooter.vue'

import AdminView from './components/AdminView.vue'


export default {
  name: 'App',
  data() {
    return {
      //------------------VIEWS----------------
      home: true,
      authUser: false,
      projectRegister: false,
      projectDetails: false,
      news: true,
      allProjects: false,
      currentUserProfile: false,
      adminPanel: false,
      selectedCategory: null,
      authorUserProfile: false,
      firstName: '',
      lastName: '',

      //-------------------Variables Init---------------
      categories: [],
      users: [],
      projects: [],
      allProjectsList: [],
      projectId: '',
      uid: '',
      authorLoggedIn: false,
      singleProject: {},
      currentUser: {},
      authorUser: {}
    }
  },

  //------------Components---------------------
  components: {

    NavBar,
    AuthUser,
    ProjectRegister,
    ProjectCard,
    SideBar,
    NewsCard,
    PerfilUser,
    DetailsProject,
    LowFooter,
    AddForm
  },

  //---------------Methods---------------------
  methods: {
    filterCategory(idToMatch) {
      //------------Method to get the correct category for the project--------------
      const filteredCategories = this.categories.filter(category => category.id === idToMatch)
      return filteredCategories
    },
    filterUser(idToMatch) {
      //------------Method to get the correct user for the project--------------
      const filteredUsers = this.users.filter(user => user.id === idToMatch)
      return filteredUsers
    },
    async goProjectDetails(data) {
      //------------Method to show a single project--------------
      this.projectId = data

      const getProject = await this.fetchDataById('projects', data.id)
      const filteredCategory = this.filterCategory(getProject.id_category)[0].category

      this.singleProject.name = getProject.name
      this.singleProject.description = getProject.description
      this.singleProject.category = filteredCategory 
      this.singleProject.image = getProject.image
      this.singleProject.authorId = getProject.userId

      console.log(this.singleProject)
      this.showProjectDetails = true
      this.filteredProjects = this.projectsList;

      this.changeView(2)
    },
    async getDocumentById(collection, documentId) {
      //------------Method to get a document by the id--------------
      const docRef = doc(db, collection, documentId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        // console.log('Datos del documento:', docSnap.data())
        return docSnap.data();
      } else {
        console.log('El documento no existe.')
        return null;
      }
    },
    async fetchDataById(collection, documentId) {
      //------------Method to get a document by the id--------------
      const documentData = await this.getDocumentById(collection, documentId);
      if (documentData) {
        return documentData
      } else {
        console.log('Documento no encontrado.');
      }
    },
    async goCurrentUserProfile() {
      //------------Method to show the current user profile--------------
      const user = auth.currentUser;

      const getCurrentUser = await this.fetchDataById('users', user.uid);
      this.currentUser = getCurrentUser;
      Object.assign(this.currentUser, { userId: user.uid })
      // console.log(this.currentUser.uid)
      this.authorLoggedIn = 'true'

      if (user.uid == 'YRsNBEnQm3eykok24Wu2DedqeNp2') {
        this.viewAdminPanel()
      } else {
        this.changeView(5)
      }


    },
    createProject() {
      //------------Method to create a new project for the user logged in-------------- 
      // console.log(data.userId)
      this.viewProjectRegister()
    },

    doLogOut() {
      //------------Method to logOut--------------
      // console.log('logout')
      signOut(auth)
        .then(() => {
          this.isLoggedIn = false
          console.log('The user signed out')
          // alert('The user signed out')
        })
        .catch((err) => {
          console.log(err.message)
        })
      this.viewHome();
    },

    updateSelectedCategory(categoryId) {
      //------------Method to filter by category with the sidebar --------------
      console.log('updateSelectedCategory llamado con categoryId:', categoryId);
      // Filtra los proyectos según la categoría seleccionada (categoryId) y asigna los resultados a projectsList.
      this.projects = this.allProjectsList.filter(project => project.category === categoryId);
      // console.log(this.allProjectsList)
      // console.log(this.projects)
      this.changeView(4);
    },

    updateFirstName(newFirstName) {
      // Actualizar firstName en el objeto user
      this.$emit('update:firstName', newFirstName);
      this.editedFirstName = newFirstName;
    },

    updateLastName(newLastName) {
      // Actualizar lastName en el objeto user
      this.$emit('update:lastName', newLastName);
      this.editedLastName = newLastName;
    },

    //------------------------------CHANGE VIEW------------------------------
    changeView(view) {
      switch (view) {
        ///////////////////Home-News///////////////////////
        case 0:
          this.home = true,
            this.news = true,
            this.projectDetails = false,
            this.projectRegister = false,
            this.authUser = false
            this.allProjects = false,
            this.currentUserProfile = false,
            this.adminPanel = false,
            this.authorUserProfile = false
          break

        ///////////////////Auth//////////////////
        case 1:        
          this.authUser = true          
          break
        ///////////////////ProjectDetails///////////////////
        case 2:
          this.home = false
          this.news = false,
            this.projectDetails = true,
            this.projectRegister = false,
            this.authUser = false
          this.allProjects = false,
            this.currentUserProfile = false,
            this.adminPanel = false,
            this.authorUserProfile = false
          break
        ///////////////////ProjectRegister///////////////////
        case 3:
          this.home = false
          this.news = false,
            this.projectDetails = false,
            this.projectRegister = true,
            this.authUser = false
          this.allProjects = false,
            this.currentUserProfile = false,
            this.adminPanel = false,
            this.authorUserProfile = false
          break
        ///////////////////AllProjects///////////////////
        case 4:
          this.home = false
          this.news = false,
            this.projectDetails = false,
            this.projectRegister = false,
            this.authUser = false,
            this.allProjects = true,
            this.currentUserProfile = false,
            this.adminPanel = false,
            this.authorUserProfile = false
          break
        ///////////////////Current User Profile////////////////////
        case 5:
          this.home = false
          this.news = false,
            this.projectDetails = false,
            this.projectRegister = false,
            this.authUser = false,
            this.allProjects = false,
            this.currentUserProfile = true,
            this.adminPanel = false,
            this.authorUserProfile = false
          break
        ///////////////////Admin Panel View////////////////////
        case 6:
          this.home = false
          this.news = false,
            this.projectDetails = false,
            this.projectRegister = false,
            this.authUser = false,
            this.allProjects = false,
            this.currentUserProfile = false,
            this.adminPanel = true,
            this.authorUserProfile = false            
          break
          ///////////////////Project Author User Profile////////////////////
        case 7:
          this.home = false
          this.news = false,
          this.projectDetails = false,
          this.projectRegister = false,
          this.authUser = false,
          this.allProjects = false,
          this.currentUserProfile = false,
          this.adminPanel = false,
          this.authorUserProfile = true
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
    },
    viewAllProjects() {
      this.projects = this.allProjectsList
      this.changeView(4)
    },
    viewFilteredProjects() {
      this.changeView(4)
    },
    viewAdminPanel() {
      this.changeView(6)
    },
    async viewAuthorProfile(data) {
      console.log(data.authorId)


      const getAuthorUser = await this.fetchDataById('users', data.authorId);
      this.authorUser = getAuthorUser
      Object.assign(this.authorUser, { userId: data.authorId })

      if (this.uid != '') {
        console.log(this.uid)
        if (this.uid == this.authorUser.userId) {
          this.authorLoggedIn = true
        } else {
          this.authorLoggedIn = false
        }
      } else {
        console.log(this.uid)
        this.authorLoggedIn = false
      }

      // console.log(this.authorUser)
      this.changeView(7)
    }

  },
  mounted: function () {

    //--------------------App.vue mounted-------------------------


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
        console.error('Error al obtener categories: ', error);
      });
    //----------------------Get Categories-----------------


    //----------------------Get Users-----------------
    const usersRef = collection(db, 'users')
    getDocs(usersRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data());
          this.users.push({
            id: doc.id,
            authorName: doc.data().firstname,
            authorLastName: doc.data().lastname
          })

        });
      })
      .catch((error) => {
        console.error('Error al obtener users: ', error);
      });
    //----------------------Get Categories-----------------


    //-----------------Get Projects------------------------
    //  Obtener datos de Firebase y actualizar projects
    const projectsRef = collection(db, 'projects')
    getDocs(projectsRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const filterCategories = this.filterCategory(doc.data().id_category)
          const filterUsers = this.filterUser(doc.data().userId)
          // console.log(doc.data().image)
          this.projects.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            category: filterCategories[0].category,
            image: doc.data().image,
            userId: doc.data().userId,
            author: filterUsers[0].authorName + " " + filterUsers[0].authorLastName
          });
        });

      })
      .catch((error) => {
        console.error('Error al obtener projects: ', error)
      });
    this.allProjectsList = this.projects;
    //-----------------Get Projects------------------------


    //----------------Get the currentUser-----------------
    onAuthStateChanged(auth, (user) => {
      if (user) {

        this.uid = user.uid
        // console.log(this.uid)

      } else {
        this.uid = ''
      }
    });
    //----------------Get the currentUser-----------------


  },
  beforeUnmount() {
    //---------------Before getting rid of the component-----------------
    this.authorLoggedIn = false
    this.doLogOut()
  },

}

</script>

<script setup>
//-------------------------- imports de Firebase ---------------------------------
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from "firebase/auth"
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

</script>

<style></style>