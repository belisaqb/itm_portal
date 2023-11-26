<template>
    <div class="addF-container">
        <h1 class="bold-dark-blue-xlg" style="text-align: center">PUBLICAR PROYECTO</h1>

        <form @submit.prevent="addProject">
            <div class="add-col">

                <div class="addF-col2 form-group">
                    <label class="title-input" for="name">NOMBRE DE PROYECTO:</label>
                    <input v-model="inputProjectName" type="text" class="select-input" id="name" placeholder="Nombre del proyecto">
                </div>
                <div class="addF-col2 form-group">
                    <label class="title-input" for="categoria">CATEGORÍA:</label>
                    <select v-model="selectedCategory" id="categoria" class="select-input">
                        <option value="" disabled selected>Selecciona una categoría</option>
                        <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.category }}
                        </option>
                    </select>
                </div>
                <div class="addF-col2 form-group">
                    <label class="title-input" for="participantes">PARTICIPANTES:</label>
                    <div id="participantes" class="multi-input-group">
                        <div v-for="(participante, index) in participantes" :key="index">
                            <input class="add-input" type="text" v-model="participante.name" :name="'participantes[' + index + '].name'"
                                placeholder="Nombre del Participante" />
                        </div>
                    </div>
                    <div @click="addParticipante" id="add-participante" class="btn-addInput">+ Agregar Participante</div>
                </div>
                <div class="addF-col2 form-group">
                    <label class="title-input" for="softwares">SOFTWARES:</label>
                    <div id="softwares" class="multi-input-group">
                        <div v-for="(software, index) in softwares" :key="index">
                            <input class="add-input" type="text" v-model="software.name" :name="'softwares[' + index + '].name'"
                                    placeholder="Nombre del Software" />
                        </div>
                        <!-- Se carga con JS                     -->
                    </div>
                    <div @click="addSoftware" id="add-software" class="btn-addInput">+ Agregar Software</div>
                </div>

            </div>

            <div class="addF-center">

                <div class="form-group">
                    <label class="title-input">DESCRIPCIÓN:</label>
                    <textarea v-model="inputProjectDescription" class="add-textarea" id="descripcion" rows="4"
                        placeholder="Descripción del proyecto"></textarea>
                </div>
                <div class="form-group">
                    <label class="title-input">CARGAR IMÁGENES:</label>
                    <!-- Mostrar el avance de la imagen seleccionada -->
                        <div class="my-4 row d-flex">
                            <div class="col-4" v-for="(preview, index) in imagePreviews" :key="index">
                                <img class="img-fluid" :src="preview" alt="Vista previa de la imagen">
                            </div>
                        </div>

                    <label for="upload" class="upload-button">
                        <img src="../assets/seleccionar-imagen.png" alt="">
                        Haz click para subir imágenes.
                        <input @change="onFileChange" type="file" id="upload" class="file-input" ref="upload" multiple>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <button id="post-button" type="submit" class="login-button btn"
                    style="width: 10rem; background-color: rgba(0, 45, 92, 1); color: white">PUBLICAR</button>
            </div>
        </form>
    </div>
</template>


<script>
//---------Import Firebase-------------------------
// import { ref } from 'firebase/storage';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage, auth } from '@/firebase'

const projectsRef = collection(db, 'projects') //call collection on firestore

export default {
    name: 'AddForm',
    data() {
        return {
            inputName: '',
            inputProjectName: '',
            inputProjectDescription: '',
            selectedCategory: '',
            imageUrl: '',
            participantes: [],
            softwares: [],
            imagePreviews: [],
            selectedFiles: null,
        }
    },
    props: {
        categories: {
            type: Array,
        },
    },
    methods: {
        async addProject() {
            // console.log('crear proyecto', this.inputProjectDescription, this.inputProjectName, this.selectedCategory)

            const imageUrls = await this.uploadImages()

            addDoc(projectsRef, {
                name: this.inputProjectName,
                description: this.inputProjectDescription,
                id_category: this.selectedCategory,
                images: imageUrls,
                createdAt: serverTimestamp(),
                userId: auth.currentUser.uid,
                participantes: this.participantes.map(participante => participante.name),
                softwares: this.softwares.map(software => software.name),
            })
                .then(() => {
                    this.reset()
                    this.participantes = []
                    this.softwares = []
                    this.$emit('go-project-list')
                })
                .catch((err) => {
                    console.log(err.message)
                })


        },
        reset() {
            this.inputProjectName = '',
            this.inputProjectDescription = '',
            this.selectedCategory = ''
            this.selectedFiles = null
        },
        async onFileChange(event) {
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
                                    // console.log('File available at', downloadURL);
                                    resolve(downloadURL); // Resolver la promesa con la URL de la imagen
                                });
                            }
                        );
                    });
                })
            );

            // console.log(imageUrls);
            return imageUrls;
        },
        addParticipante() {
            this.participantes.push({ name: this.inputName });
            // console.log(this.participantes)
        },
        addSoftware() {
            this.softwares.push({ name: this.inputName })
            // console.log(this.softwares)
        }
    },
    mounted() {
        

    },
}


//-----------------------------------------

</script>

