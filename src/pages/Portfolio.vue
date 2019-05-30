<template>
  <div id="portfolio" class="transitionWrap">
    <!-- <div class="flexCenter bigFontSize">Portfolio</div> -->

    <transition :name="transitonEffect">
      <router-view></router-view>
    </transition>
    <div v-if="!mobile" class="stickRight">
      <div class="flexer">
        <h1 class="midFontSize self">
          Die Drei ?
          <span class="theRed">?</span>
          <span class="theBlue">?</span>
        </h1>
        <router-link
          class="subLink midFontSize"
          to="/portfolio/das_versunkene_schiff"
        >Das Versunkene Schiff</router-link>
        <router-link
          class="subLink midFontSize"
          to="/portfolio/die_schwarze_katze"
        >Die schwarze Katze</router-link>
        <router-link
          class="subLink midFontSize"
          to="/portfolio/der_dreiaeugige_totenkopf"
        >Der dreiäugige Totenkopf</router-link>

        <h1 class="midFontSize self marg">Räuber Hotzenplotz</h1>
        <router-link
          class="subLink midFontSize"
          to="/portfolio/der_dreiaeugige_totenkopf"
        >Voll Versepplung</router-link>
      </div>
    </div>
    <div v-if="mobile" class="footerNav bigFontSize">
      <router-link :to="prev" class="arrow">&#x3C;</router-link>
      <router-link :to="next" class="arrow">&#x3e;</router-link>
    </div>
  </div>
</template>


<style scoped>
.flexer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.stickRight {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 20px;
}
.stickRight a {
  text-decoration: none;
  color: #818181;
  display: block;
  transition: 0.25s;
}
.stickRight a:hover {
  color: #f1f1f1;
}
.self {
  align-self: center;
}
.marg {
  padding-top: 50px;
}
.arrow {
  text-align: center;
  width: 50%;
}

.footerNav {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #131313;
}

.footerNav a {
  text-decoration: none;
  color: #818181;
  transition: 0.25s;
}

.footerNav a:hover {
  color: #f1f1f1;
}
@media only screen and (max-width: 500px) {
  .stickRight {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0;
  }
}
</style>


<script>
export default {
  data: function() {
    return {
      prev: "",
      next: "",
      possRout: [
        "/portfolio/die_schwarze_katze",
        "/portfolio/der_dreiaeugige_totenkopf",
        "/portfolio/das_versunkene_schiff"
      ],
      mobile: false,
      transitonEffect: "slideSwitch"
    };
  },
  methods: {
    handleUI: function(path) {
      console.log(this.$route.fullPath);
      if (window.innerWidth < 501 && path !== "/portfolio") {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },
    mod: function (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
    },
    getCurrentRoute: function(path) {
      for (var i = 0; i < this.possRout.length; ++i) {
        if (this.possRout[i] === path) {
          this.prev = this.possRout[this.mod((i - 1), this.possRout.length)];
          this.next = this.possRout[this.mod((i + 1), this.possRout.length)];
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.handleUI(to.fullPath);
    this.getCurrentRoute(to.fullPath);
    next();
  },
  created: function() {
    this.handleUI(this.$route.fullPath);
    this.getCurrentRoute(this.$route.fullPath);
  },
  ready: function() {
    window.addEventListener("resize", this.handleUI(this.$route.fullPath));
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleUI(this.$route.fullPath));
  }
};
</script>
