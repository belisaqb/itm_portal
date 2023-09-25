<template>
    <div>
        <div @click="projectDetails" class="card" style="width: 18rem;">
            <img :src="image" class="card-img-top" :alt="projectName">
            <div class="card-body">                
                <h5 class="card-title">{{ projectName }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ projectCategory }}</h6>
                <p class="card-text">{{ projectDescription }}</p>                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectCard',
    props: {
        id: String,
        image: {type:String, default: 'https://firebasestorage.googleapis.com/v0/b/portal-itm.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=614d5ce1-6099-4572-ace6-10d240c44e68' },
        projectName: String,
        projectDescription: String,
        projectCategory: String
    },
    methods:{
        projectDetails() {
            this.$emit('showProjectDetails', { id: this.id });
        }
    }
}
</script>