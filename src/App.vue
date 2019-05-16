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
import Portfolio from "./pages/Portfolio.vue";
import Contact from "./pages/Contact.vue";
import Imag from "./pages/Imag.vue";

// test ugly
import Test from "./components/Test.vue";

export default {
  props: {
    three: null
  },
  components: {
    Landing,
    Dive,
    Landscape,
    Menu,
    Test
  },
  data: function() {
    return {
      ["/"]: 0,
      ["/dive"]: 1,
      ["/landscape"]: 2,
      ["/portfolio"]: 3,
      ["/contact"]: 4,
      ["/imag"]: 5,
      current: 0,
      transitonEffect: "slideSwitch"
    };
  },
  methods: {
    init: function() {
      var cur = this.$router.currentRoute.path;
      if (this[cur] !== undefined) {
        this.current = cur;
        this.animation(cur);
      } else {
        this.$router.replace("/");
      }
      console.log();
    },
    validPath: function(to, from) {
      if (this[to] !== undefined) {
        this.transitionCalc(to, from);
        this.animation(to, from);
      } else {
        this.$router.replace("/");
      }
    },
    transitionCalc: function(to, from) {
      var jumpCalc = this[to] - this[from];
      if (Math.abs(jumpCalc) == 1 && jumpCalc > 0) {
        //forward
        console.log("case1");
        // this.$props.three.start();
        this.transitonEffect = "slideSwitch";
      } else if (Math.abs(jumpCalc) == 1 && jumpCalc < 0) {
        //backward
        console.log("case2");
        this.transitonEffect = "slideSwitch";
      } else {
        console.log("case3");
        // this.$props.three.hide(true);
        this.transitonEffect = "slideSwitch";
        //abort all animation switch to site
      }
    },
    animation: function(to, from) {
      switch (this[to]) {
        case 1:
          this.$props.three.hide(true);
          break;
        case 2:
          this.$props.three.hide(true);
          break;
        case 3:
          console.log("stop");
          this.$props.three.hide(true);
          break;
        case 4:
          this.$props.three.start();
          break;
        case 5:
          this.$props.three.hide(true);
          break;
        case 6:
          this.$props.three.hide(true);
          break;
        default:
          this.$props.three.hide(true);
          // clear anymation
          break;
      }
    }
  },
  watch: {
    $route(to, from) {
      var toP = to.path;
      var fromP = from.path;
      this.validPath(toP, fromP);
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>
