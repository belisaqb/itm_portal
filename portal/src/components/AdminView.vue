<template>
    <div>
        <section class="container">
            <div class=" mt-3">

                <!--------------- TAB NAVEGADOR ---------------->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active text-dark" id="news-tab" data-bs-toggle="tab" data-bs-target="#news"
                            type="button" role="tab">Novedades</button>
                    </li>
                    <li class="nav-item " role="presentation">
                        <button class="nav-link unlink" id="users-tab" data-bs-toggle="tab" data-bs-target="#users"
                            type="button" role="tab">Usuarios</button>
                    </li>
                    <li class="nav-item " role="presentation">
                        <button class="nav-link unlink" id="projects-tab" data-bs-toggle="tab" data-bs-target="#projects"
                            type="button" role="tab">Proyectos</button>
                    </li>              
                </ul>

                <!--------------- NOVEDADES ---------------->
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="news" role="tabpanel">
                        <a @click.prevent="onClickAddNew" class="d-flex justify-content-end">
                            <p class=" btn-dark nav-link me-2 fw-bold my-3" href="">Crear novedad</p>
                        </a>
                        <ul class="list-group">
                            <li class="list-group-item" aria-current="true">
                                <div class="row d-flex justify-content-between px-2 pt-2">
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Título</h6>
                                    <h6 class="col-lg-7 col-sm-6 fw-bold">Publicado por</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Fecha</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Editar</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                <!--Cargar lista de novedades-->
                <NewsList :newsList="newsList" @edit-news="editNews" @delete-news="deleteNews" />
                <NewsEdit :newsToEdit="newsToEdit" @news-updated="handleNewsUpdated"/>

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
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Editar</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                            <div>
                                <li class='list-group-item'>
                                    <div class='row d-flex justify-content-between px-2 pt-1'>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>Juan</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>juan@gmail.com</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>B94545</p>
                                        <a class='col-lg-1 col-sm-3 m-0' href='#'>Editar</a>
                                            <a class='col-lg-1 col-sm-3 m-0' href='#'>Eliminar</a>
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
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Editar</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                            <div>
                                <li class='list-group-item'>
                                    <div class='row d-flex justify-content-between px-2 pt-1'>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>Nombre del proyecto</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>Juan</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>Audiovisuales</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>25/10/23</p>
                                        <a class='col-lg-1 col-sm-3 m-0' href='#'>Editar</a>
                                            <a class='col-lg-1 col-sm-3 m-0' href='#'>Eliminar</a>
                                    </div>
                                </li>
                            </div>

                        </ul>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>


<script>
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import NewsList from "@/components/NewsList.vue";
// Este comentario se supone que sirve para solucionar un problema que hay con conectar el componente EditNews
// eslint-disable-next-line no-unused-vars
import NewsEdit from "@/components/NewsEdit.vue";


export default {
    name: 'AdminView',
   
    components:{
        NewsList,
    },

    data() {
        return {
            newsToEdit: null,
            allNews: [],
            newsList: [],
            inputProjectName: '',
            inputProjectDescription: '',
            selectedCategory: '',
            imageUrl: ''
        }
    },
    methods:{
        onClickAddNew(){
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
        console.log(`Noticia ${index + 1}:`, newsList);
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
      console.log('Editando noticia:', news);
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
    },
    created(){
        this.loadNews();
    }
}
</script>