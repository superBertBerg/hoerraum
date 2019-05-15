import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import '../assets/css/style.css'
import VueAnime from 'vue-animejs';



// Components

import Landing from "./pages/Landing.vue"
import Dive from "./pages/Dive.vue"
import Landscape from "./pages/Landscape.vue"
import Portfolio from "./pages/Portfolio.vue"
import Contact from "./pages/Contact.vue"
import Imag from "./pages/Imag.vue"

Vue.use(VueRouter)
Vue.use(VueAnime)



const router = new VueRouter({
    routes: [
        { path: '/', component: Landing },
        { path: '/dive', component: Dive },
        { path: '/landscape', component: Landscape },
        { path: '/portfolio', component: Portfolio },
        { path: '/contact', component: Contact },
        { path: '/imag', component: Imag }
    ]
})


// Custom Directive
Vue.directive('click-outside', {
    bind: function(el, binding, vnode) {
        this.event = function(event) {
            if (!(el == event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', this.event)
    },
    unbind: function(el) {
        document.body.removeEventListener('click', this.event)
    },
});



new Vue({
    el: '#app',
    router,
    render: h => h(App),
    mounted: function() {
        console.log(this)
    }
})