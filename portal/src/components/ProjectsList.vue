<template>
    <div>
        <section class="container">
            <div class=" mt-3 p-4">

                <!--------------- TAB NAVEGADOR ---------------->
                <h1 class="bold-dark-blue-xlg" style="text-align: center">Lista de Proyectos</h1>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="news" role="tabpanel">
                        <div class="d-flex justify-content-end">
                            <button class="add-btn px-3 py-1 me-2 my-3">Crear Proyecto</button>
                        </div>
                        <ul class="list-group">
                            <li class=" list-group-item-back list-group-item" aria-current="true">
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
                                    <div class='row d-flex justify-content-between px-2 pt-1 pb-2'>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.name }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.author }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ project.category }}</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>{{ formatDate(project.createdAt) }}</p>
                                        <a @click="editProject(project.id)" class='col-lg-1 col-sm-3 m-0' href='#'><img
                                                class="w-25" src="../assets/svg/edit.svg" alt=""></a>
                                        <a @click="deleteProject(project.id)" class='col-lg-1 col-sm-3 m-0' href='#'><img
                                                class="w-25" src="../assets/svg/delete.svg" alt=""></a>
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
            <button class="agree-btn px-3 py-1 me-2" @click="confirmAction">Sí</button>
            <button class="cancel-btn px-3 py-1" @click="cancelAction">No</button>
        </div>
    </div>
</template>


<script>
import { format } from 'date-fns';
import { db, auth } from '@/firebase'
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';

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
        users: { type: Array }
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

.add-btn {
    background-color: rgba(0, 45, 92, 1);
    color: white;
    border: solid;
    border-radius: 0.2rem;
    border-width: 0.1rem;
    border-color: rgba(0, 45, 92, 1);
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
    border: 1px solid rgba(0, 45, 92, 1);
    color: rgba(0, 196, 151, 1);
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.list-group-item {
    text-decoration: none;
    color: rgba(0, 45, 92, 1);
    background-color: rgba(0, 167, 126, 1);
    /* Set the background to transparent */
    border: 0.1rem solid rgba(0, 196, 151, 1);
}
</style>