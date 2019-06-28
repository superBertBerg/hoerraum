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
import Imag from "./pages/About.vue";

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
      routes: {
        ["/"]: 0,
        ["/dive"]: 1,
        ["/landscape"]: 2,
        ["/portfolio"]: 3,
        ["/about"]: 4,
        ["/info/detail/contact"]: 5,
        ["/about/gf/markus_schaefer"]: 6,
        ["/about/gf/matthias_krause"]: 7,
        ["/info/detail/imprint"]: 8,
        ["/portfolio/das_versunkene_schiff"]: 10,
        ["/portfolio/die_schwarze_katze"]: 11,
        ["/portfolio/der_dreiaeugige_totenkopf"]: 12,
        ["röferHotifot"]: 13
      },
      hide: [
        ["line", 0],
        ["bigStars", 1],
        ["star", 2],
        ["bigLand", 2],
        ["midLand", 2],
        ["smallLand", 2],
        ["head", 2],
        ["matthias", 4, 7],
        ["markus", 4, 6],
        ["ellipse", 5, 8, 9]           
      ],
      current: 0,
      transitonEffect: "slideSwitch",

      mob: false,
      maxScrollDepth: 6,
      scrolled: false,
      touchSwipe: {
        startX: 0,
        startY: 0,
        threshold: window.innerHeight*0.2,
        restraint: 100,
        allowedTime: 300,
        startTime: 0
      }
    };
  },
  methods: {
    init: function() {
      this.onResize();
      var cur = this.$router.currentRoute.path;
      if (this.routes[cur] !== undefined) {
        this.current = this.routes[cur];
        this.animation(this.current);
      } else {
        this.$router.replace("/");
      }
    },
    validPath: function(to, from) {
      var routeNumber = this.routes[to]
      if (routeNumber !== undefined) {
        if(this.maxScrollDepth>routeNumber) this.current = routeNumber;
        this.animation(routeNumber);
      } else {
        this.$router.replace("/");
      }
    },
    hideAllAnimation: function(currentSlide) {
      var tempPoniter = this.$props.three;
      for(var i = 0; i<this.hide.length; ++i) {
        var toHide = true
        for(var j = 1; j<this.hide[i].length; ++j) {
          if(this.hide[i][j] == currentSlide) {
            toHide = false;
          }
        }
        if(toHide) {
          tempPoniter[this.hide[i][0]]["hide"]()
        }
      }
    },
    animation: function(to) {
      this.hideAllAnimation(to);
      switch (to) {
        case 0:
          this.$props.three.line.start();
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three);
          break;
        case 1:
          this.$props.three.bigStars.start();
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three);
          break;
        case 2:
          this.$props.three.head.start();
          this.$props.three.star.start();
          this.$props.three.bigLand.start(0.8, -2300, -2140);
          this.$props.three.midLand.start(0.8, -2300, -2100);
          this.$props.three.smallLand.start(0.8, -2300, -2070);
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three);
          break;
        case 3:
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three);
          break;
        case 4:
          this.$props.three.matthias.start();
          this.$props.three.markus.start();
          if (this.mob) {
            this.moveFaces(0, -50, 0, 55);
          } else {
            this.moveFaces(100, 0, -100, 0);
          }
          // console.log(to, "  ", this.$props.three);
          break;
        case 5:
          this.$props.three.ellipse.start();
          this.$props.three.ellipse.deSpread(2, 2);
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three);
          break;
        case 6:
          this.$props.three.markus.start();
          if (this.mob) {
            this.moveFaces(0, 55, 0, -50);
          } else {
            this.moveFaces(100, 0, 100, 0);
          }
          this.$props.three.matthias.moveToStart();
          // console.log(to, "  ", this.$props.three);
          break;
        case 7:
          this.$props.three.matthias.start();
          if (this.mob) {
            this.moveFaces(0, 55, 0, 55);
          } else {
            this.moveFaces(-100, 0, -100, 0);
          }
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three);
          break;
        case 8:
          this.$props.three.ellipse.start();
          this.$props.three.ellipse.spread(2, 2);
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          break;
        default:
          // clear anymation
          break;
      }
    },
    moveFaces: function(xMat, yMat, xMark, yMark) {
      this.$props.three.matthias.move(xMat, yMat);
      this.$props.three.markus.move(xMark, yMark);
      if (this.mob) {
        this.$props.three.matthias.setScale(0.57);
        this.$props.three.markus.setScale(0.57);
      } else {
        this.$props.three.matthias.setScale(0.7);
        this.$props.three.markus.setScale(0.7);
      }
    },
    keyCalc(event) {
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        this.handleScroll(-100);
      } else if (event.key === "ArrowDown" || event.key === "PageDown") {
        this.handleScroll(100);
      }
    },
    touchStart: function(event) {
      let touchobj = event.changedTouches[0];
      this.touchSwipe.startX = touchobj.pageX;
      this.touchSwipe.startY = touchobj.pageY;
      this.touchSwipe.startTime = new Date().getTime();
    },
    touchEnd: function(event) {
      let touchobj = event.changedTouches[0];
      let time = new Date().getTime() - this.touchSwipe.startTime;
      let distX = touchobj.pageX - this.touchSwipe.startX;
      let distY = touchobj.pageY - this.touchSwipe.startY;
      let swipedir = 0;
      if (this.touchSwipe.allowedTime > time) {
        if (
          Math.abs(distY) > this.touchSwipe.threshold &&
          Math.abs(distX) < this.touchSwipe.restraint
        ) {
          // 2nd condition for horizontal swipe met
          swipedir = distX < 0 ? -100 : 100; // if dist traveled is negative, it indicates left swipe
        }
      }
      this.handleScroll(swipedir);
    },
    mod: function(n, m) {
      var remain = n % m;
      return Math.floor(remain >= 0 ? remain : remain + m);
    },
    handleScroll: function(event) {
      if (!this.scrolled) {
      console.log("handle",this.current)
        if (event > 0) {
          this.current = this.mod(this.current + 1, this.maxScrollDepth);
          this.$router.push({
            path: this.getKeyByValue(this.routes, this.current)
          });
          this.scrolled = true;
        } else if (event < 0) {
          this.current = this.mod(this.current - 1, this.maxScrollDepth);
          this.$router.push({
            path: this.getKeyByValue(this.routes, this.current)
          });
          this.scrolled = true;
        }
        setTimeout(() => {
          this.scrollThrottle();
        }, 1500);
      }
    },
    scrollThrottle: function() {
      this.scrolled = false;
    },
    onResize: function() {
      if (window.innerWidth < 769) {
        this.mob = true;
      } else {
        this.mob = false;
      }
      this.animation(this.current)
    },
    getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
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
  },
  created() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("wheel", event => this.handleScroll(event.deltaY));
    window.addEventListener("keyup", this.keyCalc);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchend", this.touchEnd);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("wheel", event =>
      this.handleScroll(event.deltaY)
    );
    window.removeEventListener("keyup", this.keyCalc);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchend", this.touchEnd);
  }
};
</script>
