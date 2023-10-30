<template>
    <div>
        <div class="row align-items-md-stretch">
          <div class="col-md-6">
            <img class="img-fluid" :src="image" :alt="projectName">
          </div>
          <div class="col-md-6">
            <div class="h-100 p-5 bg-light border rounded-3">
              <h2>{{ projectName }}</h2>
              <p>{{ projectDescription }}</p>              
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectDetails',
    props: {
      id: String,
      image: { type: String, default: 'https://firebasestorage.googleapis.com/v0/b/portal-itm.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=614d5ce1-6099-4572-ace6-10d240c44e68' },
      projectName: String,
      projectDescription: String,
      projectCategory: String
    }
}
</script>