<template>
    <div>
        <h1>HOLA</h1>
        <h2>{{ firstName }}</h2>
        <h2>{{ lastName }}</h2>
        <h2>{{ email }}</h2>
        <h2>{{ carnet }}</h2>
        <h2>{{ uid }}</h2>
    </div>
</template>

<script>


export default {
    name: 'PruebaProfile',
    props: {
        firstName: String,
        lastName: String,
        email: String,
        carnet: String,
        uid: String
    },
    
}
</script>