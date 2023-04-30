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
  // {
  //   path: '/',
  //   name: 'karta',
  //   meta: {
  //     type: 'karta',
  //   },
  //   component: () => import(/*nvm  webpackChunkName: "Map" */ '../views/Map.vue'),
  // },
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
