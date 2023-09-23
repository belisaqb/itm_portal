<template>
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
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}</style>
