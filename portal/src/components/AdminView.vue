<template>
    <div>
        <section class="container">
            <div class=" mt-3">

                <!--------------- TAB NAVEGADOR ---------------->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active text-dark" id="news-tab" data-bs-toggle="tab" data-bs-target="#news"
                            type="button" role="tab">Novedades</button>
                    </li>
                    <li class="nav-item " role="presentation">
                        <button class="nav-link unlink" id="users-tab" data-bs-toggle="tab" data-bs-target="#users"
                            type="button" role="tab">Usuarios</button>
                    </li>
                    <li class="nav-item " role="presentation">
                        <button class="nav-link unlink" id="projects-tab" data-bs-toggle="tab" data-bs-target="#projects"
                            type="button" role="tab">Proyectos</button>
                    </li>              
                </ul>

                <!--------------- NOVEDADES ---------------->
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="news" role="tabpanel">
                        <div class="d-flex justify-content-end">
                            <a class=" btn-dark nav-link me-2 fw-bold my-3" href="">Crear novedad</a>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item" aria-current="true">
                                <div class="row d-flex justify-content-between px-2 pt-2">
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Título</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Fecha</h6>
                                    <h6 class="col-lg-6 col-sm-6 fw-bold">Descripción</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Editar</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                            <div>
                                <li class='list-group-item'>
                                    <div class='row d-flex justify-content-between px-2 pt-1'>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>Nombre de la novedad</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>25/10/23</p>
                                        <p class='col-lg-6 col-sm-6-2 m-0'>La coordinación de carrera de...</p>
                                        <a class='col-lg-1 col-sm-3 m-0' href='#'>Editar</a>
                                        <a class='col-lg-1 col-sm-3 m-0' href='#'>Eliminar</a>
                                    </div>
                                </li>

                            </div>

                        </ul>
                    </div>


                    <!--------------- USUARIOS ---------------->
                    <div class="tab-pane fade" id="users" role="tabpanel">
                        <ul class="list-group mt-4">
                            <li class="list-group-item" aria-current="true">
                                <div class="row d-flex justify-content-between px-2 pt-2">
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Nombre</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Email</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Carnet</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Editar</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                            <div>
                                <li class='list-group-item'>
                                    <div class='row d-flex justify-content-between px-2 pt-1'>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>Juan</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>juan@gmail.com</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>B94545</p>
                                        <a class='col-lg-1 col-sm-3 m-0' href='#'>Editar</a>
                                            <a class='col-lg-1 col-sm-3 m-0' href='#'>Eliminar</a>
                                    </div>
                                </li>
                            </div>

                        </ul>
                    </div>


                    <!--------------- PROYECTOS ---------------->
                    <div class="tab-pane fade" id="projects" role="tabpanel">
                        <ul class="list-group mt-4">
                            <li class="list-group-item" aria-current="true">
                                <div class="row d-flex justify-content-between px-2 pt-2">
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Nombre</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Autor</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Categoría</h6>
                                    <h6 class="col-lg-2 col-sm-6 fw-bold">Fecha</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Editar</h6>
                                    <h6 class="col-lg-1 col-sm-3 fw-bold">Eliminar</h6>
                                </div>
                            </li>

                            <div>
                                <li class='list-group-item'>
                                    <div class='row d-flex justify-content-between px-2 pt-1'>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>Nombre del proyecto</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>Juan</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>Audiovisuales</p>
                                        <p class='col-lg-2 col-sm-6-2 m-0'>25/10/23</p>
                                        <a class='col-lg-1 col-sm-3 m-0' href='#'>Editar</a>
                                            <a class='col-lg-1 col-sm-3 m-0' href='#'>Eliminar</a>
                                    </div>
                                </li>
                            </div>

                        </ul>
                    </div>
                </div>


            </div>

        </section>
    </div>
</template>


<script>
export default {
    name: 'AdminView'
}
</script>