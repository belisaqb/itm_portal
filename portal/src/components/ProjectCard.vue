<template>
    <div>
        <div class="card" style="width: 18rem;">
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
        projectName: String,
        projectDescription: String,
        projectCategory: String
    }
}
</script>