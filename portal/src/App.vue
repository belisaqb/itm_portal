<template>
  <AuthUser></AuthUser>
  <UploadImg></UploadImg>
  <!-- <div class="custom">
    <div class="mb-3">
      <h1>Registro de proyecto</h1>

      <form @submit.prevent="addProject">
        <label for="name" class="mt-4 form-label">Nombre del proyecto</label>
        <input v-model="newProjectName" type="text" class="form-control" id="name" placeholder="Nombre del proyecto">
        <label for="description" class="mt-4 form-label">Descripción</label>
        <input v-model="newProjectDescription" type="text" class="form-control" id="description"
          placeholder="Descripción del proyecto">
        <button :disabled="!newProjectName || !newProjectDescription" class="mt-4 btn btn-primary mb-3">Guardar</button>
      </form>


      <div v-for="project in projects" :key="project.id">
        <div class="card mt-2" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>
            <button @click="deleteProject(project.id)" class="btn btn-danger">&cross;</button>
          </div>
        </div>
      </div>

    </div>
  </div> -->
</template>

<script>
import AuthUser from './components/AuthUser.vue'
import UploadImg from './components/UploadImg.vue'

export default {
  name: 'App',
  data() {
    return {      
    }
  },
  components: {
    AuthUser,
    UploadImg
  },
  methods: {
    
  }  
}

</script>

<script setup>
// imports de Firebase
import { ref, onMounted } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, auth } from '@/firebase'

import { onAuthStateChanged } from "firebase/auth";



//todos
const projects = ref([
  // {
  //   id: 'id1',
  //   name: 'Crystals Path',
  //   description: 'This'
  // },
  // {
  //   id: 'id2',
  //   name: 'Damn this thing',
  //   description: 'These'
  // }
])

//get Projects on Firebase
onMounted(() => {
  // console.log('mounted')
  // const querySnapshot = await getDocs(collection(db, 'projects'))
  // let projectList = []

  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  //   const project = {
  //     id: doc.id,
  //     name: doc.data().name,
  //     description: doc.data().description
  //   }
  //   projectList.push(project)
  // })
  // projects.value = projectList

  onSnapshot(collection(db, 'projects'), (querySnapshot) => {
    const projectList = [];
    querySnapshot.forEach((doc) => {
      const project = {
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description
      }
      projectList.push(project)
    })
    projects.value = projectList
  })  

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
})



//addProject

// const newProjectName = ref('')
// const newProjectDescription = ref('')

// const addProject = () => {
//   // console.log('addProject')
//   const newProject = {
//     id: Math.floor(Math.random() * 10),
//     name: newProjectName.value,
//     description: newProjectDescription.value
//   }
//   projects.value.unshift(newProject)
//   console.log('newProject: ', newProject)
//   newProjectName.value = ''
//   newProjectDescription.value = ''
// }

// const deleteProject = id => {
//   // console.log('deleteProject: ', id)
//   projects.value = projects.value.filter(project => project.id !== id)
// }


</script>


<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css';

.custom {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>
