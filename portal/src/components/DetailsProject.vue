<template>
    <div>
        <div class="content-section">
            <h1 class="text-center pt-4 black-dark-blue-xlg">{{ projectName }}</h1>

            <div class="image-details-container">
                <div class="image-container">
                    <img class="img-fluid object-fit-cover" :src="image" alt="img">
                </div>
                <div class="details-container align-self-center">
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
                <div class="container">
                    <div class="" >
                        <div class="row">
                            <div v-for="(project, index) in relatedProjectsCombined" :key="index" class="col-lg-3 col-md-6">
                                <ProjectCard @showProjectDetails="goProjectDetails" :id="project.id" :image="project.image"
                                :projectName="project.name" :projectDescription="project.description" :projectCategory="project.category"
                                ></ProjectCard>
                            </div>
                        </div>
                    </div>
                </div>
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
        projectCategory: String,
        idCategory: String,
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
            relatedProjectsCombined: [],
            singleProject: {},
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

        goProjectDetails(data) {
            //console.log(data)
            this.$emit('goProjectDetails', data)
            this.getRelatedProjectsCombined();
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Para un desplazamiento suave
            });
        },

        formatDate(createdAt) {
            // Convierte la fecha de Firebase a un objeto de fecha
            const dateObject = new Date(createdAt.toDate());
            // Formatea la fecha según el formato 'dd/MM/yy'
            return format(dateObject, 'dd/MM/yy');
        },

        async getRelatedProjectsByAuthor() {
            const authorId = this.authorId;
            const currentProjectId = this.id;
            
            const projectsRef = collection(db, 'projects');
            const querySnapshot = await getDocs(query(projectsRef, where('userId', '==', authorId)));

            this.relatedProjectsByAuthor = [];

            querySnapshot.forEach((doc) => {
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


        async getRelatedProjectsByCategory() {
            const currentProjectCategoryId = this.idCategory; 
            // console.log('currentProjectCategoryId', currentProjectCategoryId)

            const projectsRef = collection(db, 'projects');
            const querySnapshot = await getDocs(query(projectsRef, where('id_category', '==', currentProjectCategoryId)));

            this.relatedProjectsByCategory = [];

            querySnapshot.forEach((doc) => {
            if (doc.id !== this.id && doc.data().userId !== this.authorId) {
            const filterCategories = this.filterCategory(currentProjectCategoryId);

            this.relatedProjectsByCategory.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                category: filterCategories[0].category,
                image: doc.data().images[0],
                userId: doc.data().userId,
            });
        }
        //console.log('projectCategoryId: ', currentProjectCategoryId)
    });          
},

async getRelatedProjectsCombined() {
    // Obtén las listas de proyectos por autor y por categoría
    await this.getRelatedProjectsByAuthor();
    await this.getRelatedProjectsByCategory();

    // Combina las listas
    const combinedProjects = [...this.relatedProjectsByAuthor, ...this.relatedProjectsByCategory];

    // Mezcla la lista de manera aleatoria
    const shuffledProjects = combinedProjects.sort(() => Math.random() - 0.5);

    // Selecciona los primeros 4 elementos para mostrar
    this.relatedProjectsCombined = shuffledProjects.slice(0, 4);
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
        this.getRelatedProjectsCombined();
    },

}
</script>


<style scoped>

.project-list {
    display: flex;
    flex: row;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

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
    /* height: 21rem; */
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