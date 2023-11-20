<template>
  <header class="header">
    <!----------------- COMPONENT NAV BAR ------------------------->
    <NavBar @go-home="viewHome" @go-auth="viewAuth" @go-project-register="viewProjectRegister" @go-logout="doLogOut"
      @go-all-projects="viewAllProjects" @go-current-user-profile="goCurrentUserProfile" @do-Search="doSearchProjects">
    </NavBar>
  </header>

  <main>
    <!----------------- COMPONENT SIDE BAR ------------------------->
    <SideBar @categorySelected="updateSelectedCategory"></SideBar>

    <!----------------- MAIN SECTION ------------------------->
    <section class="content" id="content">
      <div class="content-section ms-2 ms-lg-5">



        <!----------------- COMPONENT PERFIL USER ------------------------->
        <PerfilUser v-if="currentUserProfile" :authorLoggedIn="authorLoggedIn" :uid="currentUser.userId"
          :loggedInUserUid="loggedInUserUid" :firstName="currentUser.firstname" :lastName="currentUser.lastname"
          :email="currentUser.inputEmail" :carnet="currentUser.carnet" :description="currentUser.description"
          :categories="categories" @update:firstName="updateFirstName" @update:lastName="updateLastName"
          @add-project="createProject" @edit-projects="viewListOwnProjects" @goProjectDetails="goProjectDetails">
        </PerfilUser>


        <PerfilUser v-if="authorUserProfile" :authorLoggedIn="authorLoggedIn" :uid="authorUser.userId"
          :firstName="authorUser.firstname" :lastName="authorUser.lastname" :email="authorUser.inputEmail"
          :categories="categories" :carnet="authorUser.carnet" @goProjectDetails="goProjectDetails">
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
              <div v-for="(news, index) in allNews" :key="index" class="col-md-4 mb-4">
                <NewsCard @showNewsDetails="goNewsDetails" :id="news.id" :image="news.image"
                  :inputNewsTitle="news.inputNewsTitle" :inputNewsText="news.inputNewsText" :date="news.date"
                  :profile="news.profile"></NewsCard>
              </div>
            </div>
          </div>


        </div>


        <!----------------- PROYECTOS ------------------------->
        <div v-if="allProjects">
          <h1 class="text-center pt-4 black-dark-blue-xlg">PROYECTOS</h1>

          <div class="d-flex justify-content-center mt-3 dropdown mx-2">
            <button class="dropdown-toggle dropdown-button semibold-ligth-green-med" type="button"
              data-bs-toggle="dropdown" aria-expanded="false" @filterSelected="updateFilter">
              ORDENAR POR
            </button>
            <ul style="border-radius: 0% ; padding: 1rem 1.32rem; " class="dropdown-menu">
              <li><a class="dropdown-item semibold-ligth-green-med" href="#" @click="selectFilter('Mas Nuevos')">MÁS
                  NUEVOS</a></li>
              <li><a class="dropdown-item semibold-ligth-green-med" href="#" @click="selectFilter('A-Z')">A-Z</a></li>
            </ul>
          </div>

          <div class="container mt-4">

            <div class="row mx-1">

              <div v-for="(project, index) in projects" :key="index" class="col-md-6 mb-4">
                <ProjectCard @showProjectDetails="goProjectDetails" :id="project.id" :image="project.image"
                  :projectName="project.name" :projectDescription="project.description"
                  :projectCategory="project.category" :authorName="project.author" :date="project.date"></ProjectCard>
              </div>

            </div>
          </div>

        </div>


        <!----------------- DETALLE DE PROYECTO ------------------------->
        <DetailsProject v-if="projectDetails" @go-author-profile="viewAuthorProfile" @goProjectDetails="goProjectDetails"
          :image="singleProject.image" :projectId="singleProject.projectId" :projectName="singleProject.name"
          :projectDescription="singleProject.description" :categories="categories" :id="singleProject.id"
          :idCategory="singleProject.id_category" :projectCategory="singleProject.category"
          :authorId="singleProject.authorId" :participantes="singleProject.participantes"
          :softwares="singleProject.softwares" :imgUrls="singleProject.imgUrls" :createdAt="singleProject.createdAt">
        </DetailsProject>



        <!----------------- PANEL ADMIN ------------------------->
        <AdminView @add-new="addNew" v-if="adminPanel"></AdminView>

        <NewsRegister @news-saved="redirectToAdminView" v-if="newsRegister"></NewsRegister>


        <!----------------- LISTA DE PROYECTOS DEL CURRENT USER ------------------------->
        <ProjectsList v-if="projectsList" :categories="categories" :users="users" @edit-project="editSelectedProject">
        </ProjectsList>

        <AddForm v-if="projectRegister" @go-project-list="viewListOwnProjects" :categories="categories"></AddForm>

        <EditProject v-if="editProject" @go-project-list="viewListOwnProjects" :categories="categories"
          :projectId="editProjectId"></EditProject>

      </div>
    </section>


  </main>

  <!------------------ FOOTER --------------------------->
  <LowFooter></LowFooter>


  <!--//////////////////////// CODIGO DE PRUEBAS ////////////////////// -->
  <div class="">

    <div v-if="projectRegister" class="m-5">
      <ProjectRegister class="col-6" :categories="categories">
      </ProjectRegister>
    </div>

    <!-- <div v-if="allProjects" class="row">
      <div v-for="(project, index) in projects" :key="index" class="col my-2">
        <ProjectCard @showProjectDetails="goProjectDetails" :id="project.id" :image="project.image"
          :projectName="project.name" :projectDescription="project.description" :projectCategory="project.category">
        </ProjectCard>
      </div>
    </div> -->


    <!-- <div v-if="projectDetails">

      <ProjectDetails :image="singleProject.image" :projectName="singleProject.name"
        :projectDescription="singleProject.description" :projectCategory="singleProject.category">
      </ProjectDetails>
    </div> -->

    <div v-show="authUser" class="">
      <AuthUser @go-profile="goCurrentUserProfile"></AuthUser>
    </div>
  </div>
  <!--//////////////////////// CODIGO DE PRUEBAS ////////////////////// -->
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
import NewsRegister from './components/NewsRegister.vue'
import AdminView from './components/AdminView.vue'
import ProjectsList from './components/ProjectsList.vue'
import EditProject from './components/EditProject.vue'
import { format } from 'date-fns'



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
      newsRegister: false,
      allProjects: false,
      currentUserProfile: false,
      adminPanel: false,
      selectedCategory: null,
      authorUserProfile: false,
      firstName: '',
      lastName: '',
      loggedInUserUid: '',
      projectsList: false,
      editProject: false,

      //-------------------Variables Init---------------
      categories: [],
      users: [],
      projects: [],
      allProjectsList: [],
      projectId: '',
      allNews: [],
      uid: '',
      authorLoggedIn: false,
      singleProject: {},
      currentUser: {},
      authorUser: {},
      editProjectId: '',
      date: ''
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
    NewsRegister,
    PerfilUser,
    DetailsProject,
    LowFooter,
    AddForm,
    ProjectsList,
    EditProject
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


      //Llenar los arreglos de participantes, softwares e imagenes
      let participantes = []
      let softwares = []
      let imgUrls = []

      if (getProject.participantes != undefined) {
        getProject.participantes.forEach(participante => {
          participantes.push({
            name: participante
          })
        })
      }

      if (getProject.softwares != undefined) {
        getProject.softwares.forEach(software => {
          softwares.push({
            name: software
          })
        })
      }

      if (getProject.images != undefined) {
        getProject.images.forEach(image => {
          imgUrls.push({
            name: image
          })
        })
      }
      ////////////////////////////////////////////////////////////
      this.singleProject.id = data.id
      this.singleProject.id_category = getProject.id_category
      this.singleProject.name = getProject.name
      this.singleProject.description = getProject.description
      this.singleProject.category = filteredCategory
      this.singleProject.image = getProject.images[0]
      this.singleProject.authorId = getProject.userId
      this.singleProject.participantes = participantes
      this.singleProject.softwares = softwares
      this.singleProject.imgUrls = imgUrls
      this.singleProject.createdAt = getProject.createdAt

      // console.log(this.singleProject)
      this.showProjectDetails = true
      this.filteredProjects = this.projectsList;

      this.changeView(2)
    },
    async goNewsDetails(data) {
      //------------Method to show a single new--------------
      this.projectId = data

      const getNew = await this.fetchDataById('allNews', data.id)
      this.singleNew = getNew
      this.showNewsDetails = true
      this.filteredNews = this.newsList;

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
      this.authorLoggedIn = true

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
    editSelectedProject(data) {
      console.log('ProjectId: ' + data.id)
      this.editProjectId = data.id
      this.changeView(10)
    },
    addNew() {
      console.log("crear novedad")
      this.changeView(8)
    },
    async doSearchProjects(data) {
      // console.log(data.keyword)
      const keyword = data.keyword;
      const projectsRef = collection(db, 'projects');

      // Crear una consulta para buscar productos que contienen la palabra clave en el campo "nombre"
      const consulta = query(projectsRef, where('name', '==', keyword));

      this.projects = []

      // Ejecutar la consulta para obtener los resultados
      getDocs(consulta)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const filterCategories = this.filterCategory(doc.data().id_category)
            const filterUsers = this.filterUser(doc.data().userId)

            console.log(doc.data())
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
          console.error('Error al realizar la consulta:', error);
        });

      this.changeView(4)


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
    redirectToAdminView() {
      console.log("guardar novedad")
      this.changeView(6)
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

    selectFilter(filterOption) {
      // this.$emit('filterSelected', filterOption);
      // console.log('filterSelected'+ filterOption);
      if (filterOption === 'Mas Nuevos') {
        console.log('filterSelected' + filterOption);
        // this.projects.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.projects.sort((a, b) => {
          const dateA = new Date(a.date.replace(/(\d{2})\/(\d{2})\/(\d{2})/, '20$3-$2-$1'));
          const dateB = new Date(b.date.replace(/(\d{2})\/(\d{2})\/(\d{2})/, '20$3-$2-$1'));
          return dateB.getTime() - dateA.getTime();
        });

      } else {
        console.log('filterSelected' + filterOption);
        this.projects.sort((a, b) => a.name.localeCompare(b.name));
      }
      console.log('Proyectos ordenados:', this.projects);
    },
    formatDate(createdAt) {
      // Convierte la fecha de Firebase a un objeto de fecha
      const dateObject = new Date(createdAt.toDate());
      // Formatea la fecha según el formato 'dd/MM/yy'
      return format(dateObject, 'dd/MM/yy');
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
          this.projectsList = false
          this.editProject = false
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
          this.projectsList = false
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
          this.projectsList = false
          this.editProject = false
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
          this.projectsList = false
          this.editProject = false
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
          this.projectsList = false
          this.editProject = false
          break
        ///////////////////Admin Panel View////////////////////
        case 6:
          this.home = false
          this.news = false,
            this.projectDetails = false,
            this.projectRegister = false,
            this.authUser = false,
            this.allProjects = false,
            this.currentUserProfile = false
            this.adminPanel = true
            this.authorUserProfile = false
          this.projectsList = false
          this.editProject = false
          this.newsRegister = false
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
          this.projectsList = false
          this.editProject = false
          break

        ///////////////////Create News////////////////////
        case 8:
          this.home = false
          this.news = false,
            this.projectDetails = false,
            this.projectRegister = false,
            this.authUser = false,
            this.allProjects = false,
            this.currentUserProfile = false,
            this.adminPanel = false,
            this.authorUserProfile = false
          this.projectsList = false
          this.editProject = false
          this.newsRegister = true
          break



        ///////////////////Project List For The Current User////////////////////
        case 9:
          this.home = false
          this.news = false,
            this.projectDetails = false,
            this.projectRegister = false,
            this.authUser = false,
            this.allProjects = false,
            this.currentUserProfile = false,
            this.adminPanel = false,
            this.authorUserProfile = false,
            this.projectsList = true
          this.editProject = false
          break
        ///////////////////Edit Project////////////////////
        case 10:
          this.home = false
          this.news = false,
            this.projectDetails = false,
            this.projectRegister = false,
            this.authUser = false,
            this.allProjects = false,
            this.currentUserProfile = false,
            this.adminPanel = false,
            this.authorUserProfile = false,
            this.projectsList = false
          this.editProject = true
          break

        case 11:
          this.home = false
          this.news = false,
            this.authorUserProfile = false
          this.newsRegister = false;
          this.adminPanel = true;
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
    viewListOwnProjects() {
      this.changeView(9)
      // console.log('editar')
    },
    async viewAuthorProfile(data) {
      // console.log(data.authorId)


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
  beforeMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedInUserUid = user.uid; // Asignar el valor del usuario al loggedInUserUid
      }
    });
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
    //-------------------Get News -------------------------
    const newsRef = collection(db, 'news')
    getDocs(newsRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data());
          this.allNews.push({
            id: doc.id,
            image: doc.data().image,
            inputNewsTitle: doc.data().name,
            profile: doc.data().profile.email
          })
        });
      })
      .catch((error) => {
        console.error('Error al obtener documentos: ', error);
      });
    //-------------------Get News -------------------------
    //-----------------Get Projects------------------------
    //  Obtener datos de Firebase y actualizar projects
    const projectsRef = collection(db, 'projects')
    getDocs(projectsRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const filterCategories = this.filterCategory(doc.data().id_category)
          const filterUsers = this.filterUser(doc.data().userId)


          // console.log(project.image)
          this.projects.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            category: filterCategories[0].category,
            image: doc.data().images[0],
            userId: doc.data().userId,
            author: filterUsers[0].authorName + " " + filterUsers[0].authorLastName,
            date: this.formatDate(doc.data().createdAt)
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
import { collection, getDocs, doc, getDoc, where, query } from 'firebase/firestore'
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