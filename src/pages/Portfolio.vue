<!-- TODO routelink toggle -->
<template>
  <div id="portfolio" class="transitionWrap">
    <div class="portFlexWrap">
      <div class="portFlexItem width">
        <!-- <transition name="portfolio"> -->
        <router-link
          v-show="drfshow || !hotshow"
          class="portFlexProduct borderRight bigFontSize"
          :to="droute"
        >
          Die drei ?
          <span class="theRed">?</span>
          <span class="theBlue">?</span>
        </router-link>
        <!-- </transition> -->
        <!-- <div >  -->
        <!-- <transition name="portfolio"> -->
        <router-link
          v-show="hotshow || !drfshow"
          class="portFlexProduct borderLeft bigFontSize"
          :to="hroute"
        >
          Der Räuber
          <br>Hotzenplotz
        </router-link>
        <!-- </transition> -->
        <!-- </div> -->
      </div>
      <router-view></router-view>
      <div
        v-show="!drfshow && !hotshow"
        class="portFlexItem width paddigText midFontSize"
      >Unser Spielfeld sind sog. ‚immersive‘ Medien. Medien also, in die man wirklich eintauchen kann. Das funktioniert z. B. in Planetarien, weil man dort in der 360°-runden und 180°-gewölbten Kuppel Bild und Ton viel intensiver wahrnimmt, als vor einer Kinoleinwand oder Mattscheibe.</div>
      <div v-show="!drfshow && !hotshow" class="portFlexItem width paddigText midFontSize">
        <ul>
          <li>Leistungsportfolio:</li>
          <li>Produktion</li>
          <li>Marketing</li>
          <li>Vertrieb</li>
          <li>Lizenzierung</li>
          <li>Beratung</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped>
.portFlexWrap {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  width: 100%;
}
.portFlexItem {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
}
.portFlexProduct {
  width: 100%;
}
/* .borderRight {
  border-right: 1px solid white;
} */
.borderLeft {
  border-left: 1px solid white;
}
.portFlexItem.width {
  align-self: center;
  width: 60%;
}

@media only screen and (max-width: 768px) {
  .portFlexItem.width {
    width: 90%;
  }
}
</style>


<script>
export default {
  data: function() {
    return {
      drfshow: false,
      hotshow: false,
      routershort: this.$router.options.routes[3],
      droute: "",
      hroute: ""
    };
  },
  methods: {
    route: function(to) {
      if (to == "dreiF") {
        this.droute = this.routershort.path;
        this.drfshow = true;
        this.hotshow = false;
      } else if (to == "hotzen") {
        this.hroute = this.routershort.path;
        this.drfshow = false;
        this.hotshow = true;
      } else {
        (this.droute = this.routershort.children[0].path),
          (this.hroute = this.routershort.children[1].path);
        this.drfshow = false;
        this.hotshow = false;
      }
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.route(to.name)
    next();
  },
  mounted() {
    this.droute = this.routershort.children[0].path;
    this.hroute = this.routershort.children[1].path;
    this.route(this.$router.currentRoute.name)
  }
};
</script>
