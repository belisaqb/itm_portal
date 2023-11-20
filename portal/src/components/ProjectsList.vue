<template>
    <div>
        <section class="container">
            <div class=" mt-3 p-4">

                <!--------------- TAB NAVEGADOR ---------------->
                <h1 class="bold-dark-blue-xlg" style="text-align: center">PROYECTOS</h1>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="news" role="tabpanel">
                        <div class="d-flex justify-content-start">
                            <a class=" btn-dark nav-link me-2 fw-bold my-3" href="">Crear Proyecto</a>
                        </div>
                        <ul class="list-group mt-4">
                            <li class="list-group-item" aria-current="true">
                                <div class="row d-flex justify-content-between px-2 pt-2">
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Nombre</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Autor</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Categoría</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Fecha</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Editar</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                            <div>
                                <li v-for="(project, index) in ownProjects" :key="index" class='list-group-item'>
                                    <div class='row d-flex justify-content-between px-2 pt-1'>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.name }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.author }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.category }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ formatDate(project.createdAt) }}</p>
                                        <a @click="editProject(project.id)" class='col-lg-1 col-sm-3 m-0' href='#'>Editar</a>
                                        <a @click="deleteProject(project.id)" class='col-lg-1 col-sm-3 m-0' href='#'>Eliminar</a>
                                    </div>
                                </li>
                            </div>

                        </ul>
                    </div>

                </div>

            </div>

        </section>

        <div v-if="isAlertDialogVisible" class="alert-dialog">
          <p>¿Estás seguro de eliminar este proyecto?</p>
          <button class="btn btn-outline-danger me-2" @click="confirmAction">Sí</button>
          <button class="btn btn-outline-primary" @click="cancelAction">No</button>
        </div>
    </div>
</template>


<script>
import { format } from 'date-fns';
import { db, auth } from '@/firebase'
import { collection, query, where, getDocs,  doc, deleteDoc  } from 'firebase/firestore';

export default {
    name: 'ProjectsList',
    data() {
        return {
            ownProjects: [],
            isAlertDialogVisible: false,
            deleteProjectId: ''
        }
    },
    props: {
        categories: { type: Array },
        users: {type: Array}
    },
    methods: {
        editProject(projectId) {
            // console.log(projectId)
            this.$emit('edit-project', { id: projectId })
        },
        deleteProject(projectId) {
            this.isAlertDialogVisible = true
            this.deleteProjectId = projectId
        },
        async confirmAction() {
            // Lógica a ejecutar cuando el usuario selecciona "Sí"
            await deleteDoc(doc(db, "projects", this.deleteProjectId));
            alert('Proyecto borrado');
            this.isAlertDialogVisible = false
        },
        cancelAction() {
            // Lógica a ejecutar cuando el usuario selecciona "No"
            alert('Acción cancelada');
            this.deleteProjectId = ''
            this.isAlertDialogVisible = false
        },
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
        formatDate(createdAt) {
            // Convierte la fecha de Firebase a un objeto de fecha
            const dateObject = new Date(createdAt.toDate());
            // Formatea la fecha según el formato 'dd/MM/yy'
            return format(dateObject, 'dd/MM/yy');
        },
        getUserProjects() {
            // Define la categoría por la que deseas filtrar
            const authorId = auth.currentUser.uid; // Cambia esto según tu categoría deseada

            // Crea una referencia a la colección "productos"
            const projectsRef = collection(db, 'projects');

            // Crea una consulta para filtrar por la categoría
            const consultaFiltrada = query(projectsRef, where('userId', '==', authorId));

            getDocs(consultaFiltrada)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const filterCategories = this.filterCategory(doc.data().id_category)
                        const filterUsers = this.filterUser(doc.data().userId)
                        // console.log(doc.data().image)
                        this.ownProjects.push({
                            id: doc.id,
                            name: doc.data().name,
                            description: doc.data().description,
                            category: filterCategories[0].category,
                            image: doc.data().image,
                            userId: doc.data().userId,
                            author: filterUsers[0].authorName + " " + filterUsers[0].authorLastName,
                            createdAt: doc.data().createdAt
                        });
                    });
                })
                .catch((error) => {
                    console.error('Error al obtener proyectos:', error);
                });
            // console.log(this.ownProjects)
        }
    },
    mounted() {
        
        this.getUserProjects()
    },
}
</script>

<style scoped>
.alert-dialog {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>