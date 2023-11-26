// import './assets/main.css'

import { createApp } from "vue";
import App from './App.vue';
import router from './router/Router';
import axios from "axios";

axios.defaults.timeout = 2000;
axios.defaults.baseURL = "http://localhost:8080"

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(router);
app.mount('#app');