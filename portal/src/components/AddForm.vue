<template>
    <div class="addF-container">
        <h1 class="bold-dark-blue-xlg" style="text-align: center">PUBLICAR PROYECTO</h1>

        <form @submit.prevent="addProject">
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
                    <label for="upload" class="upload-button">
                        Arrastra y suelta las imágenes o haz clic aquí para subirlas.
                        <input @change="onFileChange" type="file" id="upload" class="file-input" multiple>
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
            softwares: []
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
                createdAt: serverTimestamp(),
                userId: auth.currentUser.uid,
                participantes: this.participantes.map(participante => participante.name),
                softwares: this.softwares.map(software => software.name),
            })
                .then(() => {
                    this.reset()
                    this.participantes = []
                    this.softwares = []
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
        },
        addParticipante() {
            this.participantes.push({ name: this.inputName });
            this.inputName = '';
            console.log(this.participantes)
        },
        addSoftware() {
            this.softwares.push({ name: this.inputName })
            this.inputName = ''
            console.log(this.softwares)
        }
    },
    mounted() {
        // const participante = document.getElementById('add-participante')
        // participante.addEventListener('click', function () {
        //     event.preventDefault()
        //     let contenedor = document.createElement("div");
        //     let id = "participante-" + Date.now();
        //     contenedor.id = id;
        //     document.querySelector('#participantes').appendChild(contenedor);

        //     let input = document.createElement("input");
        //     input.type = "text";
        //     input.setAttribute('v-model', "inputName");
        //     input.setAttribute('placeholder', "Nombre del Participante");
        //     document.querySelector('#' + id).appendChild(input);
        // })

        // const software = document.getElementById('add-software')
        // software.addEventListener('click', function () {
        //     event.preventDefault()
        //     let contenedor = document.createElement("div");
        //     let id = "software-" + Date.now();
        //     contenedor.id = id;
        //     document.querySelector('#softwares').appendChild(contenedor);

        //     let input = document.createElement("input");
        //     input.type = "text";
        //     input.setAttribute('name', "softwares[]");
        //     input.setAttribute('placeholder', "Nombre del software");
        //     document.querySelector('#' + id).appendChild(input);
        // })

    },
}


//-----------------------------------------

</script>

