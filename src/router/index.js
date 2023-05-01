import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'auth',
    meta: {
      requiresAuth: false,
    },
    component: () => import(/* webpackChunkName: "Home" */ '@/pages/Auth.vue'),
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* nvm  webpackChunkName: "Map" */ '@/pages/Main.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters['users/getCurrentUser']) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
