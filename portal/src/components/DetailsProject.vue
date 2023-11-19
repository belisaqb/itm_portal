<template>
    <div>
        <div class="content-section">
            <h1 class="text-center pt-4 black-dark-blue-xlg">{{ projectName }}</h1>

            <div class="image-details-container">
                <div class="image-container">
                    <img class="img-fluid object-fit-cover" :src="image" alt="img">
                </div>
                <div class="details-container">
                    <p class="txtDescriptionProyects">PARTICIPANTES:</p>
                    <p class="txtDetailsProyects mediumSpaceBottom">{{ participantes.map(participante =>
                        participante.name).join(', ') }}</p>
                    <p class="txtDescriptionProyects">TIPO DE PROYECTO:</p>
                    <p class="txtDetailsProyects mediumSpaceBottom">{{ projectCategory }}</p>
                    <p class="txtDescriptionProyects">SOFTWARE:</p>
                    <p class="txtDetailsProyects mediumSpaceBottom">{{ softwares.map(software => software.name).join(', ')
                    }}</p>
                    <p class="txtDescriptionProyects">CICLO LECTIVO:</p>
                    <p class="txtDetailsProyects mediumSpaceBottom">I CICLO 2023</p>
                </div>
            </div>
            <hr class="divider">
            <div class="d-flex-dp comunMarginx">
                <p class="txt-name-student">Por <span style="cursor: pointer;" @click="goAuthorProfile">{{ authorFirstName
                }} {{ authorLastName }} </span></p>
                <hr class="dividerH comunMarginx">
                <p class="txt-name-student">{{ formatDate(createdAt) }}</p>
            </div>
            <div class="d-flex-dp comunMarginx">
                <p class="txt-name-student">{{ projectDescription }}</p>
            </div>
            <!-- <div class="m-4 row d-flex">
                <div class="col-4" v-for="(preview, index) in imgUrls" :key="index">
                    <img class="img-fluid" :src="preview.name" alt="Vista previa de la imagen">
                </div>
            </div>
            <div>
                <h2 class="text-center pt-4 black-dark-blue-xlg">MUESTRA DEL PROYECTO</h2>
                <img class="centered-image img-fluid" :src="image" alt="img">
            </div> -->

            <h2 class="m-4 text-center pt-4 black-dark-blue-xlg">MUESTRA DEL PROYECTO</h2>
            <CarouselSlider :slides="imgUrls"></CarouselSlider>

            <hr class="divider">
            <div class="comunMarginx pt-2">
                <p class=" black-dark-blue-xlg">Relacionados</p>
            </div>
            <div class="images-proyect margin-b">

                <div class="container mt-4">
                    <div class="row mx-1">
                        <!-- Proyectos del mismo autor -->
                        <div v-if="relatedProjectsByAuthor.length > 0">
                            <div v-for="(project, index) in relatedProjectsByAuthor" :key="index" class="col-lg-6 col-sm-9 mb-4">
                                <ProjectCard @showProjectDetails="goProjectDetails" :id="project.id" :image="project.image"
                                :projectName="project.name" :projectDescription="project.description" :projectCategory="project.category"
                                ></ProjectCard>
                            </div>
                        </div>
                
                        <!-- Proyectos de la misma categoría -->
                        <div v-if="relatedProjectsByCategory.length > 0">
                            <div v-for="(project, index) in relatedProjectsByCategory" :key="index" class="col-lg-6 col-sm-9 mb-4">
                                <ProjectCard @showProjectDetails="goProjectDetails" :id="project.id" :image="project.image"
                                :projectName="project.name" :projectDescription="project.description" :projectCategory="project.category"
                                ></ProjectCard>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- <div class="image-item">
                    <div class="overlay">
                        <p class="overlay-text">TonyJEF</p>
                        <img style="width: 35px; height: 25px;" class="overlay-img"
                            src="@/assets/imgs/Proyectos/proyects.png" alt="img">
                        <img src="@/assets/imgs/Proyectos/img_magic.png" alt="img">
                    </div>
                    <p class="margin-top-cart-proyects txt-name-student">Juego hecho en Java</p>
                </div>
                <div class="image-item">
                    <div class="overlay">
                        <p class="overlay-text">TonyJEF</p>
                        <img style="width: 35px; height: 25px;" class="overlay-img"
                            src="@/assets/imgs/Proyectos/proyects.png" alt="img">
                        <img src="@/assets/imgs/Proyectos/img_magic.png" alt="img">
                    </div>
                    <p class="margin-top-cart-proyects txt-name-student">Juego hecho en Java</p>
                </div>
                <div class="image-item">
                    <div class="overlay">
                        <p class="overlay-text">TonyJEF</p>
                        <img style="width: 35px; height: 25px;" class="overlay-img"
                            src="@/assets/imgs/Proyectos/proyects.png" alt="img">
                        <img src="@/assets/imgs/Proyectos/img_magic.png" alt="img">
                    </div>
                    <p class="margin-top-cart-proyects txt-name-student">Juego hecho en Java</p>
                </div> -->
            </div>
        </div>
    </div>
</template>


<script>
import CarouselSlider from './CarouselSlider.vue'
import { format } from 'date-fns'
import { db } from '@/firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import ProjectCard from './ProjectCard.vue';
import { query, where, getDocs } from 'firebase/firestore';


export default {
    name: 'DetailsProject',
    components: {
        CarouselSlider,
        ProjectCard,
    },
    props: {
        id: String,
        image: { type: String, default: 'https://firebasestorage.googleapis.com/v0/b/portal-itm.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=614d5ce1-6099-4572-ace6-10d240c44e68' },
        projectName: String,
        projectDescription: String,
        idCategory: String,
        projectCategory: String,
        authorId: String,
        participantes: { type: Array },
        softwares: { type: Array },
        imgUrls: { type: Array },
        createdAt: { type: Object },
        categories: {
            type: Array,
        },
    },
    data() {
        return {
            authorFirstName: '',
            authorLastName: '',
            relatedProjectsByAuthor: [],
            relatedProjectsByCategory: [],
        }
    },
    methods: {
        async getAuthorInfo() {
            //----------- Method to get Author Information -----------
            const authorNameAwait = await this.fetchDataById('users', this.authorId)
            this.authorFirstName = authorNameAwait.firstname
            this.authorLastName = authorNameAwait.lastname

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
        goAuthorProfile() {
            this.$emit('go-author-profile', { authorId: this.authorId })
        },

        formatDate(createdAt) {
            // Convierte la fecha de Firebase a un objeto de fecha
            const dateObject = new Date(createdAt.toDate());
            // Formatea la fecha según el formato 'dd/MM/yy'
            return format(dateObject, 'dd/MM/yy');
        },

        //--------FILTRADO POR AUTOR FALTA ENCONTRAR EL currentProjectId---------//
        async getRelatedProjectsByAuthor() {
            const authorId = this.authorId;
            const currentProjectId = this.id;
            console.log('id proyeccto ', this.id, currentProjectId)
            
            const projectsRef = collection(db, 'projects');
            const querySnapshot = await getDocs(query(projectsRef, where('userId', '==', authorId)));

            this.relatedProjectsByAuthor = [];

            querySnapshot.forEach((doc) => {
            // Verifica si el proyecto actual coincide con el proyecto en iteración
                if (doc.id != currentProjectId) {
                    
                    const filterCategories = this.filterCategory(doc.data().id_category);

                    this.relatedProjectsByAuthor.push({
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        category: filterCategories[0].category,
                        image: doc.data().images[0],
                        userId: doc.data().userId,
                    });
                }
            });
        },

        //--------FILTRADO POR CATEGORIA AUN NO FUNCIONA---------//
        async getRelatedProjectsByCategory() {

            const authorId = this.authorId;
            const currentProjectCategoryId = this.projectCategory; // Asegúrate de tener acceso a la categoría del proyecto actual
            console.log('currentProjectCategoryId', currentProjectCategoryId)

            const projectsRef = collection(db, 'projects');
            const querySnapshot = await getDocs(query(projectsRef, where('userId', '==', authorId)));

            this.relatedProjectsByCategory = [];

            querySnapshot.forEach((doc) => {
                const projectCategoryId = doc.data().id_category;

                if (doc.id !== this.id && projectCategoryId === currentProjectCategoryId) {
                    const filterCategories = this.filterCategory(projectCategoryId);

                    this.relatedProjectsByCategory.push({
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        category: filterCategories[0].category,
                        image: doc.data().images[0],
                        userId: doc.data().userId,
                    });
                }
            });          
        },

        filterCategory(idToMatch) {
            //------------Method to get the correct category for the project--------------
            const filteredCategories = this.categories.filter(category => category.id === idToMatch)
            return filteredCategories
        },
    },

    mounted() {
        this.getAuthorInfo()
        this.getRelatedProjectsByAuthor();
        this.getRelatedProjectsByCategory();
    },

}
</script>


<style scoped>
.txt-footer1 {
    font-size: 1.2rem;
    font-weight: 700;
    color: rgba(0, 196, 151, 1);
}

.footer-proyects {
    background-color: rgba(0, 45, 92, 1);
    border: 4px solid rgba(0, 196, 151, 1);
}

.margin-top-cart-proyects {
    margin-top: 1rem;
}

.margin-b {
    padding-bottom: 8rem;
}

.centered-image {
    display: block;
    margin: 1.5rem auto 0 auto;
    /* Esto centra la imagen */
    width: 65rem;
    /* Abarca hasta un 90% del ancho del contenedor */
    height: 32.5rem;
}

.images-proyect {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}

.image-item {
    flex: 0 0 32.5%;
    /* Cada imagen ocupa el 30% del espacio disponible */
    border: 3px solid rgba(0, 45, 92, 1);
}

.image-item img {
    width: 100%;
    height: auto;
}

.overlay {
    position: relative;
}

.overlay-img {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
}

.overlay-text {
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    padding: 10px;
    margin: 0;
    box-sizing: border-box;
    font-weight: 600;
}

/* ---------------------------- */
.txt-name-student {
    font-size: 1.5rem;
    font-weight: 400;
    color: rgba(0, 45, 92, 1);
}

.txt-name-student span {
    font-weight: 700;
}

.d-flex-dp {
    display: flex;
}

.divider {
    border: 2px solid rgba(0, 45, 92, 1);
    margin: 20px 20px;
}

.dividerH {
    border-left: 4px solid rgba(0, 45, 92, 1);
    height: 30px;
    transform: translateY(-10px);
}

.mediumSpaceBottom {
    margin-bottom: 8px;
}

.comunMarginx {
    margin-left: 20px;
    margin-right: 20px;
}

.image-details-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
}

.image-container {
    border: solid rgba(23, 82, 127, 1) 4px;
    width: 60%;
}

.image-container img {
    width: 100%;
    height: 21rem;
}

.details-container {
    width: 35%;
    height: 21rem;
}

.txtDescriptionProyects {
    font-size: 1.2rem;
    font-weight: 700;
    color: rgba(0, 45, 92, 1);
    margin-bottom: 0;
}

.txtDetailsProyects {
    font-size: 1rem;
    font-weight: 400;
    color: rgba(0, 45, 92, 1);
}

</style>