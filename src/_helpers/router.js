import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/components/home/home' 
import login from '@/components/login/login'

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: home },
    { path: '/login', component: login },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// })