import Vue from 'vue';
import firebase from 'firebase/app';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { authRequired: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { anonymousRequired: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: { anonymousRequired: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      next({ name: 'login' });
    }
  }

  if (to.matched.some((record) => record.meta.anonymousRequired)) {
    if (firebase.auth().currentUser) {
      next({ name: 'home' });
    } else {
      next();
    }
  }

  next();
});

export default router;
