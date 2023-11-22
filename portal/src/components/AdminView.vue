<template>
    <div>
        <section class="container">
            <div class="mt-3 py-3">

                <!--------------- TAB NAVEGADOR ---------------->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="tab-panel nav-item" role="presentation">
                        <button class=" nav-link active text-dark" id="news-tab" data-bs-toggle="tab" data-bs-target="#news"
                            type="button" role="tab">Novedades</button>
                    </li>
                    <li class="tab-panel nav-item " role="presentation">
                        <button class="nav-link unlink text-dark" id="users-tab" data-bs-toggle="tab"
                            data-bs-target="#users" type="button" role="tab">Usuarios</button>
                    </li>
                    <li class="tab-panel nav-item " role="presentation">
                        <button class="nav-link unlink text-dark" id="projects-tab" data-bs-toggle="tab"
                            data-bs-target="#projects" type="button" role="tab">Proyectos</button>
                    </li>
                </ul>

                <!--------------- NOVEDADES ---------------->
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="news" role="tabpanel">
                        <div @click.prevent="onClickAddNew" class="d-flex justify-content-end">
                            <button class="add-btn px-3 py-1 me-2 my-3">
                                Crear novedad
                            </button>
                        </div>

                        <ul class="list-group">
                            <li class="list-group-item" aria-current="true">
                                <div class="row d-flex justify-content-between px-2 pt-2">
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Título</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Publicado por</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Fecha</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Editar</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                            <!--Cargar lista de novedades-->
                            <NewsList :newsList="newsList" @edit-news="editNews" @delete-news="deleteDocument" />
                            <NewsEdit :newsToEdit="newsToEdit" @news-updated="handleNewsUpdated" />

                        </ul>
                    </div>


                    <!--------------- USUARIOS ---------------->
                    <div class="tab-pane fade" id="users" role="tabpanel">
                        <ul class="list-group mt-4">
                            <li class="list-group-item" aria-current="true">
                                <div class="row d-flex justify-content-between px-2 pt-2">
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Nombre</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Email</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Carnet</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                            <div>
                                <li v-for="(user, index) in allUsers" :key="index" class='list-group-item'>
                                    <div class='row d-flex justify-content-between px-2 pt-1'>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ user.userFirstName }} {{ user.userLastName }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ user.userEmail }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ user.carnet }}</p>
                                        <a @click="deleteDocument(user.id, 'users')" class='col-lg-1 col-sm-3 m-0'
                                            href='#'><img class="w-25" src="../assets/svg/delete.svg" href='#'></a>
                                    </div>
                                </li>
                            </div>

                        </ul>
                    </div>


                    <!--------------- PROYECTOS ---------------->
                    <div class="tab-pane fade" id="projects" role="tabpanel">
                        <ul class="list-group mt-4">
                            <li class="list-group-item" aria-current="true">
                                <div class="row d-flex justify-content-between px-2 pt-2">
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Nombre</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Autor</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Categoría</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Fecha</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                            <div>
                                <li v-for="(project, index) in allProjects" :key="index" class='list-group-item'>
                                    <div class='row d-flex justify-content-between px-2 pt-1'>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.name }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.author }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.category }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.date }}</p>
                                        <a @click="deleteDocument(project.id, 'projects')" class='col-lg-1 col-sm-3 m-0'
                                            href='#'><img class="w-25" src="../assets/svg/delete.svg" href='#'></a>
                                    </div>
                                </li>
                            </div>

                        </ul>
                    </div>
                </div>
            </div>

        </section>

        <div v-if="isAlertDialogVisible" class="alert-dialog">
            <p>¿Estás seguro de eliminar este documento?</p>
            <button class="agree-btn px-3 py-1 me-2" @click="confirmAction">Sí</button>
            <button class="cancel-btn px-3 py-1" @click="cancelAction">No</button>
        </div>
    </div>
</template>


<script>

import { format } from 'date-fns';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import NewsList from "@/components/NewsList.vue";
// Este comentario se supone que sirve para solucionar un problema que hay con conectar el componente EditNews
// eslint-disable-next-line no-unused-vars
import NewsEdit from "@/components/NewsEdit.vue";


export default {
    name: 'AdminView',

    components: {
        NewsList,
    },
    props: {
        categories: Array
    },

    data() {
        return {
            newsToEdit: null,
            allNews: [],
            newsList: [],
            inputProjectName: '',
            inputProjectDescription: '',
            selectedCategory: '',
            imageUrl: '',

            /////////////USERS LIST////////////
            allUsers: [],

            ///////////PROJECTS LIST//////////
            allProjects: [],

            ///////////DELETE DOCUMENTS/////////////
            isAlertDialogVisible: false,
            deleteDocumentCollection: '',
            deleteDocumentId: ''
        }
    },
    methods: {
        onClickAddNew() {
            this.$emit('add-new')
        },
        loadNews() {
            const newsRef = collection(db, 'news');
            getDocs(newsRef)
                .then((querySnapshot) => {
                    const newsList = [];
                    querySnapshot.forEach((doc, index) => {
                        newsList.push({
                            id: doc.id,
                            rowNumber: index + 1, // Número de fila autoincremental
                            inputNewsTitle: doc.data().name,
                            profile: doc.data().profile.email,
                            date: doc.data().date, // Asegúrate de usar el nombre correcto de la propiedad
                            // Puedes agregar otras propiedades según sea necesario

                        });
                        // console.log(`Noticia ${index + 1}:`, newsList);
                    });
                    // Actualiza la propiedad newsList con la lista de noticias
                    this.newsList = newsList;
                })
                .catch((error) => {
                    console.error('Error al obtener documentos: ', error);
                });
        },
        // Método para manejar la edición de una noticia
        editNews(news) {
            this.newsToEdit = news;
            // console.log('Editando noticia:', news);
        },

        // Método para manejar la eliminación de una noticia
        deleteNews(newsId) {
            const newsDocRef = doc(db, 'news', newsId);
            deleteDoc(newsDocRef)
                .then(() => {
                    console.log('Noticia eliminada con éxito:', newsId);
                    this.loadNews();
                })
                .catch((error) => {
                    console.error('Error al eliminar la noticia:', error);
                });
        },
        handleNewsUpdated() {
            this.loadNews();
            this.newsToEdit = null;
        },

        //Metodo para cargar los usuarios
        loadUsers() {
            const usersRef = collection(db, 'users');
            getDocs(usersRef)
                .then((querySnapshot) => {
                    const usersList = [];
                    querySnapshot.forEach((doc) => {
                        usersList.push({
                            id: doc.id,
                            userFirstName: doc.data().firstname,
                            userLastName: doc.data().lastname,
                            carnet: doc.data().carnet,
                            userEmail: doc.data().inputEmail
                        });
                    });
                    this.allUsers = usersList;
                })
                .catch((error) => {
                    console.error('Error al obtener documentos: ', error);
                });

        },

        //Metodo para cargar los proyectos
        loadProjects() {
            const projectsRef = collection(db, 'projects')
            getDocs(projectsRef)
                .then((querySnapshot) => {
                    const projectsList = [];
                    querySnapshot.forEach((doc) => {
                        const filterCategories = this.filterCategory(doc.data().id_category)
                        const filterUsers = this.filterUser(doc.data().userId)

                        projectsList.push({
                            id: doc.id,
                            name: doc.data().name,
                            category: filterCategories[0].category,
                            userId: doc.data().userId,
                            author: filterUsers[0].userFirstName + " " + filterUsers[0].userLastName,
                            date: this.formatDate(doc.data().createdAt)
                        })
                    })
                    this.allProjects = projectsList

                })
                .catch((error) => {
                    console.error('Error al obtener projects: ', error)
                });

        },

        //Filtrar categoría y user de proyecto
        filterCategory(idToMatch) {
            //------------Method to get the correct category for the project--------------
            const filteredCategories = this.categories.filter(category => category.id === idToMatch)
            return filteredCategories
        },
        filterUser(idToMatch) {
            //------------Method to get the correct user for the project--------------
            // console.log(this.allUsers)
            const filteredUsers = this.allUsers.filter(user => user.id === idToMatch)
            return filteredUsers
        },

        //Formato de fecha
        formatDate(createdAt) {
            // Convierte la fecha de Firebase a un objeto de fecha
            const dateObject = new Date(createdAt.toDate());
            // Formatea la fecha según el formato 'dd/MM/yy'
            return format(dateObject, 'dd/MM/yy');
        },

        //Eliminar document
        deleteDocument(id, collection) {
            this.isAlertDialogVisible = true
            this.deleteDocumentId = id
            this.deleteDocumentCollection = collection
        },
        async confirmAction() {
            // Lógica a ejecutar cuando el usuario selecciona "Sí"

            if (this.deleteDocumentCollection == 'users') {
                const projectsByUser = this.allProjects.filter(project => project.userId === this.deleteDocumentId)
                // console.log(projectsByUser)
                projectsByUser.forEach(element => {
                   deleteDoc(doc(db, 'projects', element.id))
                });
            }

            await deleteDoc(doc(db, this.deleteDocumentCollection, this.deleteDocumentId));
            alert('Documento borrado');
            this.isAlertDialogVisible = false
            this.loadUsers()
            this.loadNews()
            this.loadProjects()
        },
        cancelAction() {
            // Lógica a ejecutar cuando el usuario selecciona "No"
            alert('Acción cancelada');
            this.deleteDocumentId = ''
            this.deleteDocumentCollection = ''
            this.isAlertDialogVisible = false
        },
    },
    created() {
        this.loadNews()
        this.loadUsers()
        this.loadProjects()
    }
}
</script>


<style scoped>
.add-btn {
    background-color: rgba(0, 45, 92, 1);
    color: white;
    border: solid;
    border-radius: 0.2rem;
    border-width: 0.1rem;
    border-color: rgba(0, 45, 92, 1);
}

.tab-panel {
    text-decoration: none;
    color: rgba(0, 45, 92, 1);
    background-color: rgba(0, 167, 126, 1);
    /* Set the background to transparent */
    border: 0.1rem solid rgba(0, 196, 151, 1);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

.tab-panel::focus {
    background-color: rgba(0, 45, 92, 1);
}

.list-group-item {
    text-decoration: none;
    color: rgba(0, 45, 92, 1);
    background-color: rgba(0, 167, 126, 1);
    /* Set the background to transparent */
    border: 0.1rem solid rgba(0, 196, 151, 1);
}

.agree-btn {
    background-color: rgba(0, 196, 151, 1);
    color: rgba(0, 45, 92, 1);
    ;
    ;
    border: solid;
    border-radius: 0.2rem;
    border-width: 0.1rem;
    border-color: rgba(0, 196, 151, 1);
}

.cancel-btn {
    background: none;
    color: rgba(0, 196, 151, 1);
    border: solid;
    border-radius: 0.2rem;
    border-width: 0.1rem;
    border-color: rgba(0, 196, 151, 1);
}

.alert-dialog {
    background-color: rgba(0, 45, 92, 1);
    ;
    border: 1px solid rgba(0, 45, 92, 1);
    ;
    color: rgba(0, 196, 151, 1);
    ;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>