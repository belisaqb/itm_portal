<template>
    <div @click="projectDetails">
        <div class="card-content">
            <div class="card-container">
                <img class="card-img-top" :src="image" :alt="projectName">
                <div class="position-absolute w-100 overlay ">
                    <div class="d-flex mx-2  positionY justify-content-between">
                        <p class="bold-white-lg">{{ authorName }}</p>
                        <p class="bold-white-lg">{{ projectCategory }}</p>
                    </div>
                </div>
            </div>
            <div class="pt-3">
                <h2 class="bold-dark-blue-lg">{{ projectName }}</h2>
                <p class="light-dark-blue-xm limit-lines">{{ projectDescription }}</p>
            </div>
        </div>
    </div>

    <!-- <div>
        <div @click="projectDetails" class="card" style="width: 18rem;">
            <img :src="image" class="card-img-top" :alt="projectName">
            <div class="card-body">                
                <h5 class="card-title">{{ projectName }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ projectCategory }}</h6>
                <p class="card-text">{{ projectDescription }}</p>                
            </div>
        </div>
    </div> -->
</template>

<script>
// import { auth, db } from '@/firebase';

export default {
    name: 'ProjectCard',
    data() {
        return {
            // authorName: ''
        }
    },
    props: {
        id: String,
        image: { type: String, default: 'https://firebasestorage.googleapis.com/v0/b/portal-itm.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=614d5ce1-6099-4572-ace6-10d240c44e68' },
        projectName: String,
        projectDescription: String,
        projectCategory: String,
        authorName: String
    },
    methods: {
        projectDetails() {
            this.$emit('showProjectDetails', { id: this.id });
        }
    },
    mounted() {
        // this.authorName = 
    },
}
</script>

