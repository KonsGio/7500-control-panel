import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import home from '@/views/home/home.vue'
import Register from '@/views/Register'
import login from "@/views/login";
import Posts from "@/views/Posts";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: login,
    meta: { guest: true },
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/posts");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
