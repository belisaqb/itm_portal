<template>
  <div>
    <form class="ms-5 me-5 text-center" @submit.prevent="handleFormSubmit">
      <h1 class="text-center bold-dark-blue-xlg pt-3 pb-3">PUBLICAR NOTICIA</h1>
      <div class="mb-3">
        <label for="newsTitle" class="bold-dark-blue-mx form-label">Título de la noticia</label>
        <input v-model="inputNewsTitle" type="text" class="input-user form-control" id="newsTitle" placeholder="Título de la noticia">
      </div>
      <div class="mb-3">
        <label for="newsText" class="bold-dark-blue-mx form-label">Texto completo de la noticia</label>
        <textarea v-model="inputNewsText" class="input-user form-control" id="newsText" rows="3"></textarea>
      </div>
      <label for="formFile" class="bold-dark-blue-mx form-label">
        Imágenes
      </label>
      <div class="mb-3 p-5 rectangle-div">
        <div for="formFile" class="upload-icon">
          <!-- Ícono de subir imagen (puedes cambiarlo según tus necesidades) -->
          <img src="../assets/imgs/Novedades/upload-img.png" class="fas fa-upload">
          <h2 class="light-dark-blue-sm">Upload or drag your images</h2>
        </div>
        <input @change="onFileChange" class="input-user form-control" type="file" id="formFile" style="display:none;">
      </div>

      <button :disabled="!inputNewsTitle || !inputNewsText" type="submit" class="btn btn-primary">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
    </form>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db, storage } from '@/firebase';

const newsRef = collection(db, 'news');

export default {
  name: 'NewsRegister',
  data() {
    return {
      inputNewsTitle: '',
      inputNewsText: '',
      date: '',
      profile: '', // Esto es como donde dice quién publicó la noticia
      imageUrl: '',
      isEditing: false,
      newsIdToEdit: null,
    };
  },
  props: {
    categories: {
      type: Array,
    },
  },
  methods: {
    async handleFormSubmit() {
      if (this.isEditing) {
        await this.editNews();
      } else {
        await this.addNews();
      }
    },
    async addNews() {
      try {
        const user = auth.currentUser;
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          };
          const newsData = {
            name: this.inputNewsTitle,
            text: this.inputNewsText,
            profile: userData,
            date: serverTimestamp(),
            image: this.imageUrl,
          };

          await addDoc(newsRef, newsData);
          this.$emit('news-saved');
          this.reset();
          this.$emit('go-news');
        } else {
          console.log('No hay usuario autenticado.');
        }
      } catch (error) {
        console.error('Error al guardar la noticia:', error);
      }
    },
    async editNews() {
      try {
        const newsDocRef = doc(db, 'news', this.newsIdToEdit);
        const updatedData = {
          name: this.inputNewsTitle,
          text: this.inputNewsText,
          image: this.imageUrl,
        };

        await updateDoc(newsDocRef, updatedData);
        this.$emit('news-updated');
        this.reset();
        this.isEditing = false;
      } catch (error) {
        console.error('Error al editar la noticia:', error);
      }
    },
    reset() {
      this.inputNewsTitle = '';
      this.inputNewsText = '';
      this.date = '';
      this.profile = '';
      this.imageUrl = '';
      this.isEditing = false;
      this.newsIdToEdit = null;
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      // Subir la imagen a Firebase Storage
      await this.uploadImage(file);
    },
    async uploadImage(file) {
      const storageReference = storageRef(storage, 'images/' + file.name);
      const task = uploadBytesResumable(storageReference, file);

      task.on(
        'state_changed',
        (snapshot) => {
          // Progreso de la carga
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Manejar errores
          console.error('Error al subir la imagen: ', error);
        },
        () => {
          // Carga completada con éxito
          console.log('Imagen subida con éxito');
          // Obtener la URL de la imagen
          getDownloadURL(task.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            // Llamar a una función para mostrar la imagen en la interfaz de usuario
            this.imageUrl = downloadURL;
          });
        }
      );
    },
  },
  watch: {
    // Observar cambios en la prop "newsToEdit"
    // Esto se activará cuando el componente padre pase una noticia para editar
    newsToEdit: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // Si hay una noticia para editar, cargar sus datos en el formulario
          this.isEditing = true;
          this.newsIdToEdit = newVal.id;
          this.inputNewsTitle = newVal.inputNewsTitle;
          this.inputNewsText = newVal.inputNewsText;
          this.imageUrl = newVal.imageUrl;
        }
      },
    },
  },
};
</script>
