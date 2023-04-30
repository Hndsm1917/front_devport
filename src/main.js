import Vue from 'vue';

import VeeValidate from 'vee-validate';

import router from './router';

import App from './App.vue';
import '@/assets/scss/app.scss';

import store from './store';

Vue.config.productionTip = false;
Vue.use(VeeValidate, {
  locale: 'ru',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  data() {
    return {
      isMobile: false,
    };
  },
  created() {
    this.$on('onChangeMobileStatus', (status) => {
      this.isMobile = status;
    });
  },
}).$mount('#app');
