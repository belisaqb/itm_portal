<template>
    <div class="">
        <div @click="newsDetails" class="card-content">
            <div class="card-container">
                <img :src="image" class="card-img-top" alt="img">
                <!--src="@/assets/imgs/Novedades/img1.jpg"-->
                <div class="position-absolute w-100 overlay ">
                    <div class="d-flex mx-2  positionY justify-content-between">

                        <p class="bold-white-lg">{{profile}}</p>
                        <p class="bold-white-lg">{{date}}</p>

                    </div>
                </div>
            </div>
            <div class="pt-3">
                <h2 class="bold-dark-blue-lg">{{ inputNewsTitle }}
                </h2>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NewsCard',
    props: {
        id: String,
        image: {type:String, default: 'https://firebasestorage.googleapis.com/v0/b/portal-itm.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=614d5ce1-6099-4572-ace6-10d240c44e68' },
        inputNewsTitle: String,
        inputNewsText: String,
        date: String,
        profile: String
    },
    methods: {
        newsDetails() {
            this.$emit('showNewsDetails', { id: this.id });
        }
    }
}

</script>