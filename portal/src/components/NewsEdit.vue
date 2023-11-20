<template>
    <div>
      <form @submit.prevent="updateNews">
        <h1 class="text-center bold-dark-blue-xlg pt-3 pb-3">EDITAR NOTICIA</h1>
        <div class="mb-3">
          <label for="editNewsTitle" class="bold-dark-blue-mx form-label">Título de la noticia</label>
          <input v-model="editedNews.inputNewsTitle" type="text" class="input-user form-control" id="editNewsTitle" placeholder="Título de la noticia">
        </div>
        <div class="mb-3">
          <label for="editNewsText" class="bold-dark-blue-mx form-label">Texto completo de la noticia</label>
          <textarea v-model="editedNews.inputNewsText" class="input-user form-control" id="editNewsText" rows="3"></textarea>
        </div>
  
        <!-- Agrega cualquier otro campo que necesites editar -->
  
        <button type="submit" class="btn btn-primary">Guardar cambios</button>
      </form>
    </div>
  </template>
  
  <script>
  import { updateDoc, doc } from 'firebase/firestore';
  import { db } from '@/firebase';
  
  export default {
    name: 'NewsEdit',
    props: {
      newsToEdit: Object,
    },
    data() {
      return {
        editedNews: {
          inputNewsTitle: '',
          inputNewsText: '',
          // Agrega cualquier otra propiedad que necesites editar
        },
      };
    },
    watch: {
      newsToEdit: {
        handler(newNewsToEdit) {
          // Cuando cambia la noticia a editar, actualiza el objeto editedNews
          this.editedNews = { ...newNewsToEdit };
        },
        immediate: true,
      },
    },
    methods: {
      async updateNews() {
        try {
          const newsDocRef = doc(db, 'news', this.editedNews.id);
          await updateDoc(newsDocRef, {
            name: this.editedNews.inputNewsTitle,
            text: this.editedNews.inputNewsText,
            // Actualiza cualquier otra propiedad según sea necesario
          });
  
          // Emitir un evento para indicar que la noticia se ha actualizado
          this.$emit('news-updated');
        } catch (error) {
          console.error('Error al actualizar la noticia:', error);
        }
      },
    },
  };
  </script>
  