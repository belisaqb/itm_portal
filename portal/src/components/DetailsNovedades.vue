<template>
    <div>
        <div>
        <div class="content-section m-5">
            <h1 class="text-center pt-4 black-dark-blue-xlg">FERIA VOCACIONAL DE ITM EN LICEO DE PUNTARENAS.</h1>

            <div class="image-details-container">
                <div class="image-container">
                    <img class="img-fluid"  src="../assets/imgs/Novedades/img2.jpg" alt="img">
                </div>
            </div>
            
            <hr class="divider">
            <div class="d-flex-dp comunMarginx">
                <p class="txt-name-student">Por <span @click="goAuthorProfile" >ELÍAS ZUÑIGA </span> </p>
                <hr class="dividerH comunMarginx"> <p class="txt-name-student">21/9/2023</p>
            </div>
            <div class="d-flex-dp comunMarginx">
                <p class="txt-name-student ">  Informática y tecnología multimedia ha llevado a dar una serie de fierias vocacionales en diferentes zonas de la región pacífico central. La idea de las ferias es promover la carrera a estudiantes jóvenes de colegio y escuelas en carreras del área de ti y stem, entre estas la carrera de itm. <br>
                Roberto González nos comenta que La coordinación de carrera de informática y tecnología multimedia ha llevado a dar una serie de fierias vocacionales en diferentes zonas de la región pacífico central. La idea de las ferias es promover la carrera a estudiantes jóvenes de colegio y escuelas en carreras del área de ti y stem, entre estas la carrera de itm.  </p>
            </div>
            
            
            <hr class="divider">
            <div class="comunMarginx pt-2">
                <p class=" black-dark-blue-xlg">Similares</p>
            </div>
           

            <div class="row mx-1">

                <NewsCard></NewsCard>
                <NewsCard></NewsCard>
                <NewsCard></NewsCard>

                <div class="col mb-4">
                <div class="card-content ">
                    <div class="card-container">
                    <img class="card-img-top" src="@/assets/imgs/Novedades/img4.jpg" alt="img">
                    <div class="position-absolute w-100 overlay">
                        <div class="d-flex mx-2 positionY justify-content-between">
                        <p class="bold-white-lg">ITM OFICIAL</p>
                        <p class="bold-white-lg">20/26/2023</p>
                        </div>
                    </div>
                    </div>
                    <div class="pt-3">
                    <h2 class="bold-dark-blue-lg">TEATRO DE SOMBRAS, LEYENDAS COSTARRICENSES</h2>
                    </div>
                </div>
                </div>

                <div class="col mb-4">
                <div class="card-content ">
                    <div class="card-container">
                    <img class="card-img-top" src="@/assets/imgs/Novedades/img3.jpg" alt="img">
                    <div class="position-absolute w-100 overlay">
                        <div class="d-flex mx-2 positionY justify-content-between">
                        <p class="bold-white-lg">ITM OFICIAL</p>
                        <p class="bold-white-lg">20/26/2023</p>
                        </div>
                    </div>
                    </div>
                    <div class="pt-3">
                    <h2 class="bold-dark-blue-lg">CONCURSO ANUAL DE CAMISAS ITM, SEMANA U</h2>
                    </div>
                </div>
                </div>

                <div class="col mb-4">
                <div class="card-content ">
                    <div class="card-container">
                    <img class="card-img-top" src="@/assets/imgs/Novedades/img2.jpg" alt="img">
                    <div class="position-absolute w-100 overlay">
                        <div class="d-flex mx-2 positionY justify-content-between">
                        <p class="bold-white-lg">ITM OFICIAL</p>
                        <p class="bold-white-lg">20/26/2023</p>
                        </div>
                    </div>
                    </div>
                    <div class="pt-3">
                    <h2 class="bold-dark-blue-lg">SE LLEVA A CABO FIESTA ITM, CONOZCA CÓMO SE ...
                    </h2>
                    </div>
                </div>
                </div>

                </div>

            
        </div>       
    </div>
    
    </div>
</template>

<script>
import NewsCard from './NewsCard.vue';

export default {
    name: "DetailsNovedades",
    NewsCard,
    components: {  }
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
    padding-bottom: 8rem;
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
    height: 30rem;
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
