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
import * as routeConf from "./three/config/routes.json";

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

      scrolled: false,
      touchSwipe: {
        startX: 0,
        startY: 0,
        threshold: window.innerHeight * 0.1,
        restraint: 100,
        allowedTime: 300,
        startTime: 0
      }
    };
  },
  methods: {
    calcRoutes: function() {
      if (window.__MOB__) {
        this.routes = routeConf.mobile;
        this.hide = routeConf.mobile.hide;
        this.maxNavDepth = routeConf.mobile.maxNavDepth;
      } else {
        this.routes = routeConf.desktop;
        this.hide = routeConf.desktop.hide;
        this.maxNavDepth = routeConf.desktop.maxNavDepth;
      }
    },
    init: function() {
      this.onResize();
      this.validPath(this.$router.currentRoute.path);
    },
    validPath: function(to, from) {
      var route = this.routes[to.replace(/\/$/, "")];
      if (route == undefined) {
        route = this.routes["/"];
      }
      this.currentNavigate = route[0];
      this.currentAnimation = route[1];
      this.animation(route[1]);
    },
    hideAllAnimation: function(currentSlide) {
      var tempPoniter = this.$props.three;
      for (var i = 0; i < this.hide.length; ++i) {
        var toHide = true;
        for (var j = 1; j < this.hide[i].length; ++j) {
          if (this.hide[i][j] == currentSlide) {
            toHide = false;
          }
        }
        if (toHide) {
          tempPoniter[this.hide[i][0]]["hide"]();
        }
      }
    },
    animation: function(to) {
      this.hideAllAnimation(to);
      let anime = this.$props.three;
      switch (to) {
        case 0:
          anime.line.start();
          anime.matthias.moveToStart();
          anime.markus.moveToStart();
          setTimeout(() => {
            if (this.$router.currentRoute.name == "landing")
              this.$router.push("/expose/dream");
          }, 3000);
          break;
        case 1:
          if (window.__MOB__) {
            anime.men.expose(1.5);
          } else {
            anime.men.expose();
          }
          anime.matthias.moveToStart();
          anime.markus.moveToStart();

          break;
        case 2:
          anime.men
            .dispose()
            .then(() => {})
            .catch(e => {});
          anime.head.start();
          anime.bigLand
            .start(4.2, -2450, -2140)
            .then(() => {
              anime.star.start();
            })
            .catch(e => {
              anime.star.start();
            });
          anime.midLand.start(2.6, -2400, -2100);
          anime.smallLand.start(1.5, -2300, -2070);
          anime.matthias.moveToStart();
          anime.markus.moveToStart();
          // prom
          break;
        case 3:
          anime.matthias.moveToStart();
          anime.markus.moveToStart();
          break;
        case 4:
          anime.matthias.start();
          anime.markus.start();
          if (window.__MOB__) {
            this.moveFaces(0, -45, 0, 55, 1);
          } else {
            this.moveFaces(125, 0, -125, 0, 1);
          }
          break;
        case 5:
          anime.ellipse.start();
          anime.ellipse.deSpread(2, 2);
          anime.matthias.moveToStart();
          anime.markus.moveToStart();
          break;
        case 6:
          anime.mattImg.stop();
          anime.markus
            .start()
            .then(() => {
              anime.markImg.show(window.__MOB__);
              anime.markus.hide(2);
            })
            .catch(e => {
              anime.markImg.show(window.__MOB__);
              anime.markus.hide(2);
            });
          if (window.__MOB__) {
            this.moveFaces(0, 55, 0, 55, 2);
            // anime.matthias.moveToStart(0);
          } else {
            this.moveFaces(125, 0, 125, 0, 1);
            // anime.matthias.moveToStart(0.8);
          }
          break;
        case 7:
          anime.markImg.stop();
          anime.matthias
            .start()
            .then(() => {
              anime.mattImg.show(window.__MOB__);
              anime.matthias.hide(2);
            })
            .catch(e => {
              anime.mattImg.show(window.__MOB__);
              anime.matthias.hide(2);
            });
          if (window.__MOB__) {
            this.moveFaces(0, 55, 0, 55, 3);
            // anime.markus.moveToStart(0);
          } else {
            this.moveFaces(-125, 0, -125, 0, 1);
            // anime.markus.moveToStart(0.8);
          }
          break;
        case 8:
          anime.ellipse.start();
          anime.ellipse.spread(2, 2);
          anime.matthias.moveToStart();
          anime.markus.moveToStart();
          break;
        default:
          anime.matthias.moveToStart();
          anime.markus.moveToStart();

          break;
      }
    },
    moveFaces: function(xMat, yMat, xMark, yMark, state) {
      let anime = this.$props.three;
      switch (state) {
        case 1:
          anime.markus.move(xMark, yMark);
          anime.matthias.move(xMat, yMat);
          break;
        case 2:
          anime.matthias.stop();
          // anime.markus.move(xMark, yMark);
          anime.matthias.move(xMat, yMat, 0);
          break;
        case 3:
          anime.markus.move(xMark, yMark, 0);
          anime.matthias.move(xMat, yMat);
          break;
      }

      if (window.__MOB__) {
        anime.matthias.setScale(0.3);
        anime.markus.setScale(0.3);
        anime.markImg.setScale(3.4);
        anime.mattImg.setScale(3.4);
      } else {
        anime.matthias.setScale(0.5);
        anime.markus.setScale(0.5);
        anime.markImg.setScale(5.5);
        anime.mattImg.setScale(5.5);
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
            path: this.getKeyByValue(
              this.routes,
              this.mod(this.currentNavigate + 1, this.maxNavDepth)
            )
          });
          this.scrolled = true;
        } else if (event < 0) {
          this.$router.push({
            path: this.getKeyByValue(
              this.routes,
              this.mod(this.currentNavigate - 1, this.maxNavDepth)
            )
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
        window.__MOB__ = true;
      } else {
        window.__MOB__ = false;
      }
      this.calcRoutes();
      this.validPath(this.$router.currentRoute.path);
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
