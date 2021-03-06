import '../assets/css/style.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

import App from './App.vue'

import Contact from './pages/Contact.vue'
import Dive from './pages/Dive.vue'
import About from './pages/About.vue'
import Landing from './pages/Landing.vue'
import Landscape from './pages/Landscape.vue'
import Portfolio from './pages/Portfolio.vue'
import AboutOut from './pages/AboutOutline.vue'
// Components
import GFslide from './components/GFslide.vue'
import DreiFragenzeichen from './components/DreiFragenzeichen.vue'
import Hotzenplotz from './components/Hotzenplotz.vue'
import Controler from './three/controler'


Vue.use(VueRouter)
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})



const router = new VueRouter({
    routes: [
        { path: '/', name: 'landing', component: Landing }, { path: '/expose', component: Dive },
        { path: '/expose/dream', component: Landscape }, {
            path: '/portfolio/',
            name: 'portfolio',
            component: Portfolio,
            children: [{
                    path: '/portfolio/die_drei_fragezeichen',
                    name: 'dreiF',
                    component: DreiFragenzeichen,
                },
                {
                    path: '/portfolio/der_raeuber_hotzenplotz',
                    name: 'hotzen',
                    component: Hotzenplotz
                }
            ]
        },
        {
            path: '/info/',
            component: Contact,
            children: [
                { path: 'detail/:id' }
            ]
        },
        {
            path: '/about/',
            component: About,
            children: [
                { path: 'gf/:id', component: GFslide }
            ]
        },
        {
            path: '/about/outline/',
            component: AboutOut
        }
    ]
})


// Custom Directive
// Vue.directive('click-outside', {
//     bind: function(el, binding, vnode) {
//         this.event = function(event) {
//             if (!(el == event.target || el.contains(event.target))) {
//                 vnode.context[binding.expression](event);
//             }
//         };
//         document.body.addEventListener('click', this.event)
//     },
//     unbind: function(el) {
//         document.body.removeEventListener('click', this.event)
//     },
// });


let control3
let vueApp

if (!window.__NOWEBGL__) {
    control3 = new Controler();
}
window.__READY__ = true;

function checkIfStart() {
    if(window.__START__) {
        vueApp = new Vue({
            el: '#app',
            router,
            render: h => h(App, { props: { three: control3 } }),
            mounted: function() {
                // console.log(this)
            }
        })
    } else {
        setTimeout(() => {
            checkIfStart()
        }, 40);
    }
}
checkIfStart();
