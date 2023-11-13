<template>
    <div class="addF-container">
        <h1 class="bold-dark-blue-xlg" style="text-align: center">MODIFICAR PROYECTO</h1>

        <form @submit.prevent="editProject">
            <div class="add-col">

                <div class="addF-col2 form-group">
                    <label class="light-dark-blue-xm" for="name">NOMBRE DE PROYECTO:</label>
                    <input v-model="inputProjectName" type="text" id="name" placeholder="Nombre del proyecto">
                </div>
                <div class="addF-col2 form-group">
                    <label class="light-dark-blue-xm" for="categoria">CATEGORÍA:</label>
                    <select v-model="selectedCategory" id="categoria" class="select-input">
                        <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.category }}
                        </option>
                    </select>
                </div>
                <div class="addF-col2 form-group">
                    <label class="light-dark-blue-xm" for="participantes">PARTICIPANTES:</label>
                    <div id="participantes" class="multi-input-group">
                        <div v-for="(participante, index) in participantes" :key="index">
                            <input type="text" v-model="participante.name" :name="'participantes[' + index + '].name'"
                                placeholder="Nombre del Participante" />
                        </div>
                    </div>
                    <div @click="addParticipante" id="add-participante" class="add-button">+ Agregar Participante</div>
                </div>
                <div class="addF-col2 form-group">
                    <label class="light-dark-blue-xm" for="softwares">SOFTWARES:</label>
                    <div id="softwares" class="multi-input-group">
                        <div v-for="(software, index) in softwares" :key="index">
                            <input type="text" v-model="software.name" :name="'softwares[' + index + '].name'"
                                placeholder="Nombre del Software" />
                        </div>
                        <!-- Se carga con JS                     -->
                    </div>
                    <div @click="addSoftware" id="add-software" class="add-button">+ Agregar Software</div>
                </div>

            </div>

            <div class="addF-center">

                <div class="form-group">
                    <label class="description-group light-dark-blue-xm">DESCRIPCIÓN:</label>
                    <textarea v-model="inputProjectDescription" id="descripcion" rows="4"
                        placeholder="Descripción del proyecto"></textarea>
                </div>
                <div class="form-group">
                    <label class="light-dark-blue-xm">CARGAR IMÁGENES:</label>
                    <!-- Mostrar el avance de la imagen seleccionada -->
                    <div class="my-4 row d-flex">
                        <div class="col-4" v-for="(preview, index) in imagePreviews" :key="index">
                            <img class="img-fluid" :src="preview" alt="Vista previa de la imagen">
                        </div>
                    </div>

                    <label for="upload" class="upload-button">
                        Haz clic aquí para imágenes.
                        <input @change="onFileChange" type="file" id="upload" class="file-input" ref="upload" multiple>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <button id="post-button" type="submit" class="login-button btn"
                    style="width: 10rem; background-color: rgba(0, 45, 92, 1); color: white">MODIFICAR</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '@/firebase';

export default {
    name: 'EditProject',
    data() {
        return {
            project: {},
            inputProjectName: '',
            inputProjectDescription: '',
            selectedCategory: '',
            participantes: [],
            softwares: [],
            imagePreviews: [],
            selectedFiles: null,
        };
    },
    props: {
        projectId: { type: String },
        categories: {
            type: Array,
        },
    },
    methods: {
        async editProject() {

            // Subir imágenes a Firebase Storage y obtener las URLs
            const imageUrls = await this.uploadImages();

            // console.log(imageUrls)

            // Actualizar el documento del proyecto en Firestore
            const projectRef = doc(db, 'projects', this.projectId);
            await setDoc(projectRef, {
                name: this.inputProjectName,
                id_category: this.selectedCategory,
                description: this.inputProjectDescription,
                participantes: this.participantes.map(participante => participante.name),
                softwares: this.softwares.map(software => software.name),
                images: imageUrls
            }, { merge: true })
            .then(() => {
                    this.reset()
                    this.participantes = []
                    this.softwares = []
                    this.$emit('go-project-list')
                })

            // Lógica adicional después de editar el proyecto
        },
        async uploadImages() {

            const imageUrls = await Promise.all(
                Array.from(this.selectedFiles).map(async (file) => {
                    return new Promise((resolve, reject) => {
                        // Lógica de subida de imágenes
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
                                reject(error); // Rechazar la promesa en caso de error
                            },
                            () => {
                                // Carga completada con éxito
                                console.log('Imagen subida con éxito');
                                // Obtener la URL de la imagen
                                getDownloadURL(task.snapshot.ref).then((downloadURL) => {
                                    console.log('File available at', downloadURL);
                                    resolve(downloadURL); // Resolver la promesa con la URL de la imagen
                                });
                            }
                        );
                    });
                })
            );

            console.log(imageUrls);
            return imageUrls;
        
        },
        addParticipante() {
            this.participantes.push({ name: '' });
        },
        addSoftware() {
            this.softwares.push({ name: '' });
        },
        async getProjectById() {
            const projectRef = doc(db, 'projects', this.projectId)
            const projectSnapshot = await getDoc(projectRef)

            // console.log(projectSnapshot.data())
            if (projectSnapshot.exists()) {
                this.project = projectSnapshot.data()
                this.inputProjectName = this.project.name
                this.selectedCategory = this.project.id_category
                this.inputProjectDescription = this.project.description
                this.imagePreviews = this.project.images
                // this.participantes = this.project.participantes;
                if (this.project.participantes != undefined) {
                    this.project.participantes.forEach(participante => {
                        this.participantes.push({
                            name: participante
                        })
                    })
                }

                if (this.project.softwares != undefined) {
                    this.project.softwares.forEach(software => {
                        this.softwares.push({
                            name: software
                        })
                    })
                }



            } else {
                console.log('Document not found');
            }
            this.selectedFiles = this.imagePreviews
        },
        onFileChange(event) {
            const input = event.target;
            this.imagePreviews = []; // Limpiar las vistas previas anteriores

            if (input.files) {

                this.selectedFiles = input.files;
                Array.from(this.selectedFiles).forEach((file) => {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        // Agregar la vista previa de la imagen a la matriz
                        this.imagePreviews.push(e.target.result);
                    };

                    // Leer el archivo como una URL de datos
                    reader.readAsDataURL(file);
                });
            }
        },
        reset() {
            this.inputProjectName = '',
            this.inputProjectDescription = '',
            this.selectedCategory = ''
            this.selectedFiles = null
        },
    },
    mounted() {
        this.getProjectById()
    },
};
</script>