import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import '../assets/css/style.css'

// Components

import Landing from "./components/Landing.vue"
import Dive from "./components/Dive.vue"
import Diver from "./components/Diver.vue"

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    { path: '/', component: Landing },
    { path: '/diver', component: Diver },
    { path: '/dive', component: Dive }
  ]
})


// Custom Directive
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    this.event = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', this.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', this.event)
  },
});



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})




