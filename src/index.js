import '../assets/css/style.css'

import Vue from 'vue'
import VueAnime from 'vue-animejs'
import VueRouter from 'vue-router'

import App from './App.vue'

import Contact from './pages/Contact.vue'
import Dive from './pages/Dive.vue'
import About from './pages/About.vue'
import Landing from './pages/Landing.vue'
import Landscape from './pages/Landscape.vue'
import Portfolio from './pages/Portfolio.vue'
// Components
import GFslide from './components/GFslide.vue'
import Schiff from './components/Schiff.vue'
import DreiAuge from './components/DreiAuge.vue'
import Katze from './components/Katze.vue'
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
        {
            path: '/info/',
            component: Contact,
            children: [
                { path: 'detail/:id' }
            ]
        },
        // { path: '/imag', component: Imag },
        {
            path: '/about/',
            component: About,
            children: [
                { path: 'gf/:id', component: GFslide }
            ]
        }
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