// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import axios from 'axios';

// importeer components
import Header from './components/Header.vue';
import Tutorklas from './components/Tutorklas.vue';
import Login from './components/Login.vue';
import Verplaatsen from './components/Verplaatsen.vue';

// Defineer components
Vue.component('Header', Header);
Vue.component('Tutorklas', Tutorklas);
Vue.component('Login', Login);
Vue.component('Verplaatsen', Verplaatsen);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
