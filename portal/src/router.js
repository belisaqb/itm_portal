// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './App.vue'; // Asegúrate de tener la ruta correcta
import DetailsProyects from './components/DetailsProyects.vue'; // Asegúrate de tener la ruta correcta

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details-proyects',
    name: 'DetailsProyects',
    component: DetailsProyects
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
