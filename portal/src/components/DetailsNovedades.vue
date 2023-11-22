<template>
    <div>
        <div class="content-section m-5">
            <h1 class="text-center pt-4 black-dark-blue-xlg">{{ title }}</h1>

            <div class="image-details-container">
                <div class="image-container">
                    <img class="img-fluid card-img-top" :src="image" alt="img">
                </div>
            </div>

            <hr class="divider">
            <div class="d-flex-dp comunMarginx">
                <p class="txt-name-student">Por <span @click="goAuthorProfile">{{ author }} </span> </p>
                <hr class="dividerH comunMarginx">
                <p class="txt-name-student">{{ date }}</p>
            </div>
            <div class="d-flex-dp comunMarginx margin-b">
                <p class="txt-name-student ">{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "DetailsNovedades",
    props: {
        id: String,
        title: String,
        image: String,
        date: { type: String, default: "portalitm@gmail.com" },
        author: String,
        description: String
    }
}
</script>

<style scoped>
.txt-footer1 {
    font-size: 1.2rem;
    font-weight: 700;
    color: rgba(0, 196, 151, 1);
}

.footer-proyects {
    background-color: rgba(0, 45, 92, 1);
    border: 4px solid rgba(0, 196, 151, 1);
}

.margin-top-cart-proyects {
    margin-top: 1rem;
}

.margin-b {
    padding-bottom: 4rem;
}

.centered-image {
    display: block;
    margin: 1.5rem auto 0 auto;
    /* Esto centra la imagen */
    width: 65rem;
    /* Abarca hasta un 90% del ancho del contenedor */
    height: 32.5rem;
}

.images-proyect {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}

.image-item {
    flex: 0 0 32.5%;
    /* Cada imagen ocupa el 30% del espacio disponible */
    border: 3px solid rgba(0, 45, 92, 1);
}

.image-item img {
    width: 100%;
    height: auto;
}

.overlay {
    position: relative;
}

.overlay-img {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
}

.overlay-text {
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    padding: 10px;
    margin: 0;
    box-sizing: border-box;
    font-weight: 600;
}

/* ---------------------------- */
.txt-name-student {
    font-size: 1.5rem;
    font-weight: 400;
    color: rgba(0, 45, 92, 1);
}

.txt-name-student span {
    font-weight: 700;
}

.d-flex-dp {
    display: flex;
}

.divider {
    border: 2px solid rgba(0, 45, 92, 1);
    margin: 20px 20px;
}

.dividerH {
    border-left: 4px solid rgba(0, 45, 92, 1);
    height: 30px;
    transform: translateY(-10px);
}

.mediumSpaceBottom {
    margin-bottom: 8px;
}

.comunMarginx {
    margin-left: 20px;
    margin-right: 20px;
}

.image-details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
}

.image-container {
    border: solid rgba(23, 82, 127, 1) 4px;
    width: 60%;
}

.image-container img {
    width: 100%;
    /* height: 30rem; */
}

.details-container {
    width: 35%;
    height: 21rem;
}

.txtDescriptionProyects {
    font-size: 1.2rem;
    font-weight: 700;
    color: rgba(0, 45, 92, 1);
    margin-bottom: 0;
}

.txtDetailsProyects {
    font-size: 1rem;
    font-weight: 400;
    color: rgba(0, 45, 92, 1);
}
</style>
