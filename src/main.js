// import './assets/main.css'

import { createApp } from "vue";
import App from './App.vue';
import router from './router/Router';
import axios from "axios";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

axios.defaults.timeout = 2000;
axios.defaults.baseURL = "http://localhost:8000"

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(router);
app.use(ElementPlus);
app.mount('#app');