<template>
  <div>
    <!-- <router-link class="button" to="/"><div id="menuButtonWrapper"></div></router-link> -->
    <div :id="transitonEffect"></div>
    <!-- <Test></Test> -->
    <transition :name="transitonEffect">
      <router-view></router-view>
    </transition>
    <Menu></Menu>
  </div>
</template>

<script>
import Landing from "./pages/Landing.vue";
import Dive from "./pages/Dive.vue";
import Landscape from "./pages/Landscape.vue";
import Menu from "./components/Menu.vue";
import Portfolio from "./pages/Portfolio.vue"
import Contact from "./pages/Contact.vue"
import Imag from "./pages/Imag.vue"

// test ugly
import Test from "./components/Test.vue";

export default {
  components: {
    Landing,
    Dive,
    Landscape,
    Menu,
    Test
  },
  data: function() {
    return {
      ['/']: 0,
      ['/dive']: 1,
      ['/landscape']: 2,
      ['/portfolio']: 3,
      ['/contact']: 4,
      ['/imag']: 5,
      current: 0,
      transitonEffect: 'slideSwitch'
    }
  },
  methods: {
    init: function() {
      var cur = this.$router.currentRoute.path
      if(this[cur]!==undefined){
        this.current = cur
      } else {
        this.$router.replace('/')
      }
    },
    validPath: function(to, from) {
      if(this[to]!==undefined){
        this.transitionCalc(to, from)
      } else {
        this.$router.replace('/')
      }
    },
    transitionCalc: function(to, from) {
      var jumpCalc = this[to]-this[from]
      if( Math.abs(jumpCalc) == 1 && jumpCalc>0) {
        //forward
        console.log('case1')
        this.transitonEffect = 'slideSwitch'
      } else if(Math.abs(jumpCalc) == 1 && jumpCalc<0) {
        //backward
        console.log('case2')
        this.transitonEffect = 'slideSwitch'
      } else {
        console.log('case3')
        this.transitonEffect = 'slideSwitch'
        //abort all animation switch to site
      }
    }
  },
  watch: {
    $route(to, from) {
      var toP = to.path
      var fromP = from.path
      this.validPath(toP, fromP)
    }
  },
  mounted: function() {
    this.init()
  }
};
</script>
