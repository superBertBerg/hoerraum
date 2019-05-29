import '../assets/css/style.css'

import Vue from 'vue'
import VueAnime from 'vue-animejs'
import VueRouter from 'vue-router'

import App from './App.vue'

import Contact from './pages/Contact.vue'
import Dive from './pages/Dive.vue'
import Imag from './pages/Imag.vue'
import Landing from './pages/Landing.vue'
import Landscape from './pages/Landscape.vue'
import Portfolio from './pages/Portfolio.vue'
// Components
import Schiff from './components/Schiff.vue'
import DreiAuge from './components/DreiAuge.vue'
import Katze from './components/Katze.vue'
// import Ellipse from './three/ellipse';
import Controler from './three/controler'


Vue.use(VueRouter)
Vue.use(VueAnime)



const router = new VueRouter({
    routes: [
        { path: '/', component: Landing }, { path: '/dive', component: Dive },
        { path: '/landscape', component: Landscape }, {
            path: '/portfolio/',
            component: Portfolio,
            children: [
                { path: 'das_versunkene_schiff', component: Schiff },
                { path: 'die_schwarze_katze', component: Katze },
                { path: 'der_dreiaeugige_totenkopf', component: DreiAuge },
                // { path: '', component: Schiff}
            ]
        },
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


let control3 = new Controler()


setTimeout(
    () => {
        new Vue({
            el: '#app',
            router,
            render: h => h(App, { props: { three: control3 } }),
            mounted: function() {
                // console.log(this)
            }
        })
    },
    500);