<template>
  <div>
    <!-- <router-link class="button" to="/"><div id="menuButtonWrapper"></div></router-link> -->
    <div :id="transitonEffect"></div>
    <transition :name="transitonEffect">
      <router-view></router-view>
    </transition>
    <Menu></Menu>
  </div>
</template>

<script>
import Landing from "./Landing.vue";
import Dive from "./Dive.vue";
import Diver from "./Diver.vue";
import Menu from "./Menu.vue";

export default {
  components: {
    Landing,
    Dive,
    Diver,
    Menu
  },
  data: function() {
    return {
      ['/']: 0,
      ['/dive']: 1,
      ['/diver']: 2,
      current: 0,
      transitonEffect: 'slideTopBot'
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
        this.transitonEffect = 'slideBotTop'
      } else if(Math.abs(jumpCalc) == 1 && jumpCalc<0) {
        //backward
        console.log('case2')
        this.transitonEffect = 'slideTopBot'
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
