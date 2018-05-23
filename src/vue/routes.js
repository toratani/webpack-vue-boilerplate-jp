import VueRouter from 'vue-router';

// Components
import Home from './components/05-pages/Home.vue';
import Notfound from './components/05-pages/Notfound.vue';

export default new VueRouter({
  routes: [
    // Home
    {
      path: '/',
      component: Home
    },
    // Notfound
    {
      path: '*',
      component: Notfound
    }
  ],
  mode: 'history'
});
