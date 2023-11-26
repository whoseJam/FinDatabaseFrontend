import axios from "axios";
import Vue from "vue";

axios.defaults.timeout = 200;
axios.defaults.baseURL = "http://localhost:8080"

Vue.prototype.$http = axios;