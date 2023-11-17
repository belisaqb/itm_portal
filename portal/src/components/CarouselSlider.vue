<template>
    <div class="m-auto mx-1 mx-lg-5 px-1 px-lg-4">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide">
            <Slide v-for="slide in slides" :key="slide">
                <div class="carousel__item">
                    <img class="rounded img-fluid gallery-img object-fit-cover" :src="slide.name" alt="">
                </div>
            </Slide>
        </Carousel>

        <Carousel class="mt-3 mx-1 mx-lg-5 px-1 px-lg-5" id="thumbnails" :items-to-show="4" :wrap-around="true" v-model="currentSlide" ref="carousel">
            <Slide v-for="slide in slides" :key="slide">
                <div class="carousel__item ms-lg-1 ms-2" @click="slideTo(slide - 1)">
                    <img class="rounded img-fluid thumbnail-img" :src="slide.name" alt="">
                </div>
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>


    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
    name: 'CarouselSlider',
    components: {
        Carousel,
        Slide,
        Navigation
    },
    props: {
        slides: { type: Array }
    },
    data: () => ({
        currentSlide: 0,
    }),
    methods: {
        slideTo(val) {
            this.currentSlide = val
        },
    },
})
</script>

<style scoped>
/* Agrega un estilo específico para las miniaturas */
.carousel__item {
    min-height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}


.thumbnail-img {
    height: 100px;
    object-fit: cover;
}

@media (min-width: 768px) {
    .gallery-img {
    height: 400px;
    object-fit: cover;
}
}



</style>
