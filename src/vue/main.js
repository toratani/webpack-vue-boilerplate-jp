import 'babel-polyfill';

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import storeData from './store/store.js';

// Root component
import AppRoot from './components/AppRoot.vue';

// Plugin
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

// Router
import router from './routes.js';

// Store
const store = new Vuex.Store(storeData);

// Vue設定
new Vue({
  render(createElement) {
    return createElement(AppRoot);
  },
  router,
  store
}).$mount('#app-root');
