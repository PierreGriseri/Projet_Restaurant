import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import * as VueGoogleMaps from 'vue2-google-maps'

import ListeRestaurants from './components/Restaurants'
import Hello from './components/Hello'
import DetailRestaurant from './components/DetailRestaurant'


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA4FAuUyr5cWYTBS6eqtwayb-WOTqDX58c',
    librairies: 'places'
  }
})
Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Hello
    },
    {
      path: '/restaurants',
      component: ListeRestaurants
    },
    {
      path: '/restaurant/:id',
      component: DetailRestaurant,
    }
  ],
  mode: 'history'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
