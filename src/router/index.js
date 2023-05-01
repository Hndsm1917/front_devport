import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'auth',
    meta: {
      type: 'auth',
    },
    component: () => import(/* webpackChunkName: "Home" */ '@/pages/Auth.vue'),
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      type: 'main',
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

export default router;
