import { createApp } from 'vue'
import App from './App.vue'
import './css/main.css'
import './css/register.css'
import router from './router'; 

createApp(App).mount('#app')
.use(router) // Asegúrate de usar el router
.mount('#app')
