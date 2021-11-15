import { createWebHistory, createRouter } from "vue-router";
import home from "@/components/home/home";
import login from "@/components/login/login";
import technician from '@/components/technician/technician';
const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/home",
    component: home,
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/technician",
    component: technician,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;