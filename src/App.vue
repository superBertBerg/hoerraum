<template>
  <div>
    <!-- <router-link class="button" to="/"><div id="menuButtonWrapper"></div></router-link> -->
    <!-- <div :id="transitonEffect"></div> -->
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
import * as routeConf from './three/config/routes.json'

export default {
  props: {
    three: null
  },
  components: {
    Landing,
    Dive,
    Landscape,
    Menu
  },
  data: function() {
    return {
      routes: routeConf.desktop,
      hide: routeConf.desktop.hide,
      maxNavDepth: 6,
      currentNavigate: 0,
      currentAnimation: 0,
      transitonEffect: "slideSwitch",

      mob: false,
      scrolled: false,
      touchSwipe: {
        startX: 0,
        startY: 0,
        threshold: window.innerHeight*0.1,
        restraint: 100,
        allowedTime: 300,
        startTime: 0
      }
    };
  },
  methods: {
    calcRoutes: function() {
      if(this.mob) {
        this.routes = routeConf.mobile
        this.hide = routeConf.mobile.hide
        this.maxNavDepth = routeConf.mobile.maxNavDepth
      } else {
        this.routes = routeConf.desktop
        this.hide = routeConf.desktop.hide
        this.maxNavDepth = routeConf.desktop.maxNavDepth
      }
    },
    init: function() {
      this.onResize();
      this.validPath(this.$router.currentRoute.path)
    },
    validPath: function(to, from) {
      var route = this.routes[to.replace(/(?<=.{2,})\/$/, "")]
      if (route[0] !== undefined) {
        this.currentNavigate  = route[0]
        this.currentAnimation = route[1]
        this.animation(route[1]);
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
          // this.$props.three.renderer
          // console.log(to, "  ", this.$props.three.renderer.info);
          break;
        case 1:
          this.$props.three.bigStars.start();
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three.renderer.info);
          // console.log(to, "  ", this.$props.three);
          break;
        case 2:
          this.$props.three.head.start();
          var prom = this.$props.three.bigLand.start(4.2, -2450, -2140);
          this.$props.three.midLand.start(2.6, -2400, -2100);
          this.$props.three.smallLand.start(1.5, -2300, -2070);
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          // prom.then(function() {
          prom.then(() => {
            this.$props.three.star.start()}
            )
          // })
          // console.log(to, "  ", this.$props.three.renderer.info);
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
            this.moveFaces(125, 0, -125, 0);
          }
          // console.log(to, "  ", this.$props.three.renderer.info);
          // console.log(to, "  ", this.$props.three);
          break;
        case 5:
          this.$props.three.ellipse.start();
          this.$props.three.ellipse.deSpread(2, 2);
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three.renderer.info);
          // console.log(to, "  ", this.$props.three);
          break;
        case 6:
          this.$props.three.markus.start();
          if (this.mob) {
            this.moveFaces(0, 55, 0, -50);
          } else {
            this.moveFaces(125, 0, 125, 0);
          }
          this.$props.three.matthias.moveToStart();
          // console.log(to, "  ", this.$props.three.renderer.info);
          // console.log(to, "  ", this.$props.three);
          break;
        case 7:
          this.$props.three.matthias.start();
          if (this.mob) {
            this.moveFaces(0, 55, 0, 55);
          } else {
            this.moveFaces(-125, 0, -125, 0);
          }
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three.renderer.info);
          // console.log(to, "  ", this.$props.three);
          break;
        case 8:
          this.$props.three.ellipse.start();
          this.$props.three.ellipse.spread(2, 2);
          this.$props.three.matthias.moveToStart();
          this.$props.three.markus.moveToStart();
          // console.log(to, "  ", this.$props.three.renderer.info);
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
        this.$props.three.matthias.setScale(0.3);
        this.$props.three.markus.setScale(0.3);
      } else {
        this.$props.three.matthias.setScale(0.5);
        this.$props.three.markus.setScale(0.5);
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
          swipedir = distY < 0 ? 100 : -100; 
        }
      }
      this.handleScroll(swipedir);
    },
    // REFRAC
    mod: function(n, m) {
      var remain = n % m;
      return Math.floor(remain >= 0 ? remain : remain + m);
    },
    // REFRAC
    handleScroll: function(event) {
      if (!this.scrolled) {
        if (event > 0) {
          this.$router.push({
            path: this.getKeyByValue(this.routes, this.mod(this.currentNavigate + 1, this.maxNavDepth))
          });
          this.scrolled = true;
        } else if (event < 0) {

          this.$router.push({
            path: this.getKeyByValue(this.routes, this.mod(this.currentNavigate - 1, this.maxNavDepth))
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
      this.calcRoutes()
      this.animation(this.currentAnimation)
    },
    // REFRAC
    getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key][0] === value);
    }
    // REFRAC
  },
  watch: {
    $route(to, from) {
      var toP = to.path;
      var fromP = from.path;
      this.validPath(toP, fromP);
    }
  },
  mounted: function() {
    setTimeout(() => {
      
      this.init();
    }, 200);
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
