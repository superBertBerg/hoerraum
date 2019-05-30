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
      ["/imag/gf/markus_schaefer"]: 6,
      ["/imag/gf/matthias_krause"]: 7,
      ["/portfolio/das_versunkene_schiff"]: 10,
      ["/portfolio/die_schwarze_katze"]: 11,
      ["/portfolio/der_dreiaeugige_totenkopf"]: 12,
      ["röferHotifot"]: 13,

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
        // console.log("case1");
        // this.$props.three.start();
        this.transitonEffect = "slideSwitch";
      } else if (Math.abs(jumpCalc) == 1 && jumpCalc < 0) {
        //backward
        // console.log("case2");
        this.transitonEffect = "slideSwitch";
      } else {
        // console.log("case3");
        // this.$props.three.hide(true);
        this.transitonEffect = "slideSwitch";
        //abort all animation switch to site
      }
    },
    hideAllAnimation: function() {
    },
    animation: function(to, from) {
      switch (this[to]) {
        case 0:
          this.$props.three.ellipse.hide(true);
          this.$props.three.matthias.hide(true);
          this.$props.three.markus.hide(true);
          this.$props.three.star.hide(true);
          this.$props.three.bigStars.hide();
          this.$props.three.bigLand.hide(0.8, -2300);
          this.$props.three.midLand.hide(0.8, -2300);
          this.$props.three.smallLand.hide(0.8, -2300);
          this.$props.three.line.start();
          this.$props.three.head.hide()
          this.$props.three.matthias.moveToStart()
          this.$props.three.markus.moveToStart()
          console.log(this[to], "  ", this.$props.three);
          break;
        case 1:
          this.$props.three.ellipse.hide(true);
          this.$props.three.line.hide(true);
          this.$props.three.matthias.hide(true);
          this.$props.three.markus.hide(true);
          this.$props.three.bigLand.hide(0.8, -2300);
          this.$props.three.midLand.hide(0.8, -2300);
          this.$props.three.smallLand.hide(0.8, -2300);
          this.$props.three.star.hide(true);
          this.$props.three.bigStars.start();
          this.$props.three.head.hide()
          this.$props.three.matthias.moveToStart()
          this.$props.three.markus.moveToStart()
          console.log(this[to], "  ", this.$props.three);
          break;
        case 2:
          this.$props.three.ellipse.hide(true);
          this.$props.three.line.hide(true);
          this.$props.three.matthias.hide(true);
          this.$props.three.markus.hide(true);
          this.$props.three.bigStars.hide();
          this.$props.three.head.start()
          this.$props.three.star.start();
          this.$props.three.bigLand.start(0.8, -2300, -2140);
          this.$props.three.midLand.start(0.8, -2300, -2100);
          this.$props.three.smallLand.start(0.8, -2300, -2070);
          this.$props.three.matthias.moveToStart()
          this.$props.three.markus.moveToStart()
          console.log(this[to], "  ", this.$props.three);
          break;
        case 3:
          this.$props.three.ellipse.hide(true);
          this.$props.three.line.hide(true);
          this.$props.three.matthias.hide(true);
          this.$props.three.markus.hide(true);
          this.$props.three.star.hide(true);
          this.$props.three.bigStars.hide();
          this.$props.three.bigLand.hide(0.8, -2300);
          this.$props.three.midLand.hide(0.8, -2300);
          this.$props.three.smallLand.hide(0.8, -2300);
          this.$props.three.head.hide()
          this.$props.three.matthias.moveToStart()
          this.$props.three.markus.moveToStart()
          console.log(this[to], "  ", this.$props.three);
          break;
        case 4:
          this.$props.three.line.hide(true);
          this.$props.three.matthias.hide(true);
          this.$props.three.markus.hide(true);
          this.$props.three.star.hide(true);
          this.$props.three.bigStars.hide();
          this.$props.three.bigLand.hide(0.8, -2300);
          this.$props.three.midLand.hide(0.8, -2300);
          this.$props.three.smallLand.hide(0.8, -2300);
          this.$props.three.ellipse.start();
          this.$props.three.head.hide()
          this.$props.three.matthias.moveToStart()
          this.$props.three.markus.moveToStart()
          console.log(this[to], "  ", this.$props.three);
          break;
        case 5:
          this.$props.three.ellipse.hide(true);
          this.$props.three.line.hide(true);
          this.$props.three.star.hide(true);
          this.$props.three.bigStars.hide();
          this.$props.three.bigLand.hide(0.8, -2300);
          this.$props.three.midLand.hide(0.8, -2300);
          this.$props.three.smallLand.hide(0.8, -2300);
          this.$props.three.matthias.start();
          this.$props.three.markus.start();
          this.$props.three.head.hide()
          this.$props.three.matthias.moveToStart()
          this.$props.three.markus.moveToStart()
          console.log(this[to], "  ", this.$props.three);
          break;
        case 6:
          this.$props.three.ellipse.hide(true);
          this.$props.three.line.hide(true);
          this.$props.three.bigStars.hide();
          this.$props.three.star.hide(true);
          this.$props.three.head.hide()
          this.$props.three.matthias.hide();
          this.$props.three.markus.start();
          this.$props.three.markus.move(100, 0)
          this.$props.three.matthias.moveToStart()
          console.log(this[to], "  ", this.$props.three);
          break;
        case 7:
          this.$props.three.ellipse.hide(true);
          this.$props.three.line.hide(true);
          this.$props.three.bigStars.hide();
          this.$props.three.star.hide(true);
          this.$props.three.head.hide()
          this.$props.three.markus.hide();
          this.$props.three.matthias.start();
          this.$props.three.matthias.move(-100, 0)
          this.$props.three.markus.moveToStart()
          console.log(this[to], "  ", this.$props.three);
          break;
        default:
          this.$props.three.ellipse.hide(true);
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
