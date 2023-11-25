<template>
    <div>
        <div class="content-section m-5">
            <h1 class="text-center pt-4 black-dark-blue-xlg">{{ title }}</h1>

            <div class="image-details-container">
                <div class="image-container">
                    <img class="img-fluid card-img-top" :src="image" alt="img">
                </div>
            </div>

            <hr class="divider">
            <div class="d-flex-dp comunMarginx">
                <p class="txt-name-student">Por <span @click="goAuthorProfile">{{ author }} </span> </p>
                <hr class="dividerH comunMarginx">
                <p class="txt-name-student">{{ date }}</p>
            </div>
            <div class="d-flex-dp comunMarginx margin-b">
                <p class="txt-name-student ">{{ description }}</p>
            </div>

            <hr class="divider">
            <div class="comunMarginx pt-2">
                <p class=" black-dark-blue-xlg">Destacados</p>
            </div>
            <div class="images-proyect margin-b">
                <div class="container">
                    <div class="" >
                        <div class="row">
                            <div v-for="(news, index) in allNews" :key="index" class="col-md-6 mb-4">
                                <NewsCard @showNewsDetails="goNewsDetails" :id="news.id" :image="news.image"
                                :inputNewsTitle="news.inputNewsTitle" :inputNewsText="news.inputNewsText" :date="news.date"
                                :profile="news.profile"></NewsCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import NewsCard from './NewsCard.vue'
import { db } from '@/firebase'
import { collection } from 'firebase/firestore'
import { getDocs } from 'firebase/firestore';

export default {
    name: "DetailsNovedades",
    components: {
        NewsCard,
    },
    props: {
        id: String,
        title: String,
        image: String,
        date: { type: String, default: "portalitm@gmail.com" },
        author: String,
        description: String
    }, 
    data(){
        return{
            allNews: [],
        }
    }, 
    methods:{
        async getAllNews (){
            const newsRef = collection(db, 'news')
            const currentNewsId = this.id;

            //console.log('News ID: ', currentNewsId)

            getDocs(newsRef)
            .then((querySnapshot) => {
                const limit = 4;

                // Utiliza slice para obtener solo los primeros 4 elementos
                const firstFourNews = querySnapshot.docs
                .filter((doc) => doc.id !== currentNewsId) // Filtra la novedad actual
                .slice(0, limit);

                firstFourNews.forEach((doc) => {
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
        },

        goNewsDetails(data) {
            //console.log(data)
            this.$emit('goNewsDetails', data)
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Para un desplazamiento suave
            });
            //this.getAllNews()
        },
    },
    mounted() {
        this.getAllNews();
    }

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
    padding-bottom: 4rem;
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
    justify-content: center;
    align-items: center;
    margin: 20px;
}

.image-container {
    border: solid rgba(23, 82, 127, 1) 4px;
    width: 60%;
}

.image-container img {
    width: 100%;
    /* height: 30rem; */
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
