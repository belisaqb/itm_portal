<template>

<div class="addF-container">
        <h1 class="bold-dark-blue-xlg" style="text-align: center">PUBLICAR PROYECTO</h1>


        <div class="add-col">

        
        <div class="addF-col2 form-group">
            <label class="light-dark-blue-xm" for="categoria">CATEGORÍA:</label>
            <select id="categoria" class="select-input">
                <option value="categoria1">Categoría 1</option>
                <option value="categoria2">Categoría 2</option>
                <option value="categoria3">Categoría 3</option>
            </select>
        </div>
        <div class="addF-col2 form-group">
            <label class="light-dark-blue-xm" for="tipoProyecto">TIPO DE PROYECTO:</label>
            <select id="tipoProyecto" class="select-input">
                <option value="tipo1">Tipo 1</option>
                <option value="tipo2">Tipo 2</option>
                <option value="tipo3">Tipo 3</option>
            </select>
        </div>
        <div class="addF-col2 form-group">
            <label class="light-dark-blue-xm" for="participantes">PARTICIPANTES:</label>
            <div class="multi-input-group">
                <input type="text" id="participantes" placeholder="Nombre del participante">
                <input type="text" placeholder="Nombre del participante">
                <div class="add-button">+ Agregar Participante</div>
            </div>
        </div>
        <div class="addF-col2 form-group">
            <label class="light-dark-blue-xm" for="softwares">SOFTWARES:</label>
            <div class="multi-input-group">
                <input type="text" id="softwares" placeholder="Nombre del software">
                <input type="text" placeholder="Nombre del software">
                <div class="add-button">+ Agregar Software</div>
            </div>
        </div>

        </div>

        <div class="addF-center">

        
        <div class="form-group">
            <label class="description-group light-dark-blue-xm">DESCRIPCIÓN:</label>
            <textarea id="descripcion" rows="4" placeholder="Descripción del proyecto"></textarea>
        </div>
        <div class="form-group">
            <label class="light-dark-blue-xm">CARGAR IMÁGENES:</label>
            <label for="upload" class="upload-button">
                Arrastra y suelta las imágenes o haz clic aquí para subirlas.
                <input type="file" id="upload" class="file-input" multiple>
            </label>
        </div>
        </div>

        <div class="form-group">
        <button id="post-button" type="button" class="login-button" style="width: 10rem; background-color: rgba(0, 45, 92, 1); color: white">PUBLICAR</button>
        </div>
    </div>

</template>


<script>
export default {
    name: 'AddForm'
}
</script>

