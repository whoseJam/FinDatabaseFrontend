import axios from "axios";
import Vue from "vue";

axios.defaults.timeout = 2000;
axios.defaults.baseURL = "http://localhost:8080"

Vue.prototype.$http = axios;