import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "./views/home/home.css"
import store from './store'
import axios from "axios";
import router from "./router";

Vue.use(BootstrapVue)

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://gabbyblog.herokuapp.com/";

axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      return router.push("/login");
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

