import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueImg from 'v-img';

Vue.use(VueImg, {
  altAsTitle: true,
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
