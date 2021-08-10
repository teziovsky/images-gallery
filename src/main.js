import Vue from 'vue';
import App from './App.vue';
import VueImg from 'v-img';

Vue.use(VueImg, {
  altAsTitle: true,
});
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
