<template>
    <div>
        <div class="content-section">
            <h1 class="text-center pt-4 black-dark-blue-xlg">WEATHER APP COSTA RICA</h1>

            <div class="image-details-container">
                <div class="image-container">
                    <img src="../assets/imgs/Proyectos/img_weather_app.png" alt="img">
                </div>
                <div class="details-container">
                    <p class="txtDescriptionProyects">PARTICIPANTES:</p>
                    <p class="txtDetailsProyects mediumSpaceBottom">Anthonny Joseph</p>
                    <p class="txtDescriptionProyects">TIPO DE PROYECTO:</p>
                    <p class="txtDetailsProyects mediumSpaceBottom">Programación</p>
                    <p class="txtDescriptionProyects">SOFTWARE:</p>
                    <p class="txtDetailsProyects mediumSpaceBottom">HTM, SASS, JavaScript</p>
                    <p class="txtDescriptionProyects">CICLO LECTIVO:</p>
                    <p class="txtDetailsProyects mediumSpaceBottom">I CICLO 2023</p>
                </div>
            </div>
            <hr class="divider">
            <div class="d-flex-dp comunMarginx">
                <p class="txt-name-student">Por <span>Anthonny Joseph</span></p>
                <hr class="dividerH comunMarginx">
                <p class="txt-name-student">01/06/2023</p>
            </div>
            <div class="d-flex-dp comunMarginx">
                <p class="txt-name-student">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero rem doloremque
                    minima dolore porro minus earum possimus, adipisci quia nostrum eum et eos similique ipsa! Similique
                    facilis vel quia distinctio.</p>
            </div>
            <div class="images-proyect">
                <div class="image-item">
                    <img src="../assets/imgs/Proyectos/img_weather_app.png" alt="img">
                </div>
                <div class="image-item">
                    <img src="../assets/imgs/Proyectos/img_weather_app.png" alt="img">
                </div>
                <div class="image-item">
                    <img src="../assets/imgs/Proyectos/img_weather_app.png" alt="img">
                </div>
            </div>
            <div>
                <h2 class="text-center pt-4 black-dark-blue-xlg">MUESTRA DEL PROYECTO</h2>
                <img class="centered-image" src="../assets/imgs/Proyectos/img_weather_app.png" alt="img">
            </div>
            <hr class="divider">
            <div class="comunMarginx pt-2">
                <p class=" black-dark-blue-xlg">Relacionados</p>
            </div>
            <div class="images-proyect margin-b">
                <div class="image-item">
                    <div class="overlay">
                        <p class="overlay-text">TonyJEF</p>
                        <img style="width: 35px; height: 25px;" class="overlay-img"
                            src="../assets/imgs/Proyectos/proyects.png" alt="img">
                        <img src="../assets/imgs/Proyectos/img_magic.png" alt="img">
                    </div>
                    <p class="margin-top-cart-proyects txt-name-student">Juego hecho en Java</p>
                </div>
                <div class="image-item">
                    <div class="overlay">
                        <p class="overlay-text">TonyJEF</p>
                        <img style="width: 35px; height: 25px;" class="overlay-img"
                            src="../assets/imgs/Proyectos/proyects.png" alt="img">
                        <img src="../assets/imgs/Proyectos/img_magic.png" alt="img">
                    </div>
                    <p class="margin-top-cart-proyects txt-name-student">Juego hecho en Java</p>
                </div>
                <div class="image-item">
                    <div class="overlay">
                        <p class="overlay-text">TonyJEF</p>
                        <img style="width: 35px; height: 25px;" class="overlay-img"
                            src="../assets/imgs/Proyectos/proyects.png" alt="img">
                        <img src="../assets/imgs/Proyectos/img_magic.png" alt="img">
                    </div>
                    <p class="margin-top-cart-proyects txt-name-student">Juego hecho en Java</p>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer-proyects">
            <p class="text-center txt-footer1 margin-top-cart-proyects">Facebook</p>
            <p class="text-center txt-footer1 margin-top-cart-proyect">infoitm.com</p>
            <p class="text-center txt-footer1 margin-top-cart-proyect">Creado por y para estudiantes de ITM</p>
        </footer>
</template>
  
<script>

export default {
    name: 'DetailsProyects'
}
</script>

<style scoped>

.txt-footer1{
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
    justify-content: space-between;
    align-items: center;
    margin: 20px;
}

.image-container {

    border: solid rgba(23, 82, 127, 1) 4px;
    width: 60%;
}

.image-container img {
    width: 100%;
    height: 21rem;
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

  
  