<template>
    <div>

        <form @submit.prevent="addProject">
            <div class="mb-3">
                <label for="projectName" class="form-label">Nombre del Proyecto</label>
                <input v-model="inputProjectName" type="text" class="form-control" id="projectName"
                    placeholder="Nombre del Proyecto">
            </div>
            <div class="mb-3">
                <label for="projectDescription" class="form-label">Descripción del proyecto</label>
                <textarea v-model="inputProjectDescription" class="form-control" id="projectDescription"
                    rows="3"></textarea>
            </div>
            <div>
                <label for="projectName" class="form-label">Categoría del Proyecto</label>
                <select v-model="selectedCategory" class="form-select mb-3">
                    <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.category }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">Default file input example</label>
                <input @change="onFileChange" class="form-control" type="file" id="formFile">
            </div>
            <button :disabled="!inputProjectName || !inputProjectDescription || !selectedCategory" type="submit"
                class="btn btn-primary">Guardar</button>
        </form>

    </div>
</template>

<script>
//---------Import Firebase-------------------------
// import { ref } from 'firebase/storage';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from '@/firebase'

const projectsRef = collection(db, 'projects') //call collection on firestore

export default {
    name: 'ProjectRegister',
    data() {
        return {
            inputProjectName: '',
            inputProjectDescription: '',
            selectedCategory: '',
            imageUrl: ''
        }
    },
    props: {
        categories: {
            type: Array,
        },
    },
    methods: {
        addProject() {
            console.log('crear proyecto', this.inputProjectDescription, this.inputProjectName, this.selectedCategory)

            addDoc(projectsRef, {
                name: this.inputProjectName,
                description: this.inputProjectDescription,
                id_category: this.selectedCategory,
                image: this.imageUrl,
                createdAt: serverTimestamp()
            })
                .then(() => {
                    this.reset()
                })
                .catch((err) => {
                    console.log(err.message)
                })


        },
        reset() {
            this.inputProjectName = '',
                this.inputProjectDescription = '',
                this.selectedCategory = ''
        },
        async onFileChange(event) {
            const file = event.target.files[0];

            // Subir la imagen a Firebase Storage
            await this.uploadImage(file);
        },
        async uploadImage(file) {
            const storageReference = storageRef(storage, 'images/' + file.name);
            const task = uploadBytesResumable(storageReference, file);

            task.on('state_changed',
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
                        this.imageUrl = downloadURL
                    });
                }
            );
        }
    }

}
</script>