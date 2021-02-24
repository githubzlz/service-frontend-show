import Vue from 'vue'
import App from './App.vue'
import Header from './components/common/Header.vue';
import Footer from './components/common/Footer.vue';
import router from './router';
import waterfall from 'vue-waterfall2';
import './assets/css/global.css';
import './assets/css/loading.css';
import '../src/plugins/element';
import 'element-ui/lib/theme-chalk/index.css';

Vue.component("v-header", Header);
Vue.component("v-footer", Footer);
Vue.config.productionTip = false
Vue.use(waterfall)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

