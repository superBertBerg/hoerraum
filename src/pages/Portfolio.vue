<!-- TODO routelink toggle -->
<template>
  <div id="portfolio" class="transitionWrap">
    <div class="portFlexWrap">
      <div v-show="!hotshow" class="portFlexItem width mag">
        <router-link v-show="drfshow || !hotshow" class="portFlexProduct bigFontSize" :to="droute">
          <img
            class="img"
            :class="{expand: drfshow}"
            src="/static/images/DDF.png"
            alt="Die drei Fragezeichen, Hoerraum"
          />
        </router-link>
        <!-- <transition name="portfolio"> -->
        <!-- <div >  -->
        <router-link
          v-show="!hotshow && !drfshow"
          class="portFlexProduct bigFontSize"
          :class="{borderLeft: !hotshow}"
          :to="hroute"
        >
          <img
            class="img"
            :class="{expand: drfshow}"
            src="/static/images/Hotzenplotz.png"
            alt="Der Räuber Hotzenplotz, Hoerraum"
          />
        </router-link>
        <!-- </transition> -->
        <!-- </div> -->
      </div>
      <transition name="slideSwitchAb">
        <router-view></router-view>
      </transition>
      <transition name="slideSwitchAb">
      <h3
        v-show="!drfshow && !hotshow"
        class="portFlexItem width extrawurst paddigText midFontSize"
      >Unser Spielfeld sind sog. ‚immersive‘ Medien. Medien also, in die man wirklich eintauchen kann. Das funktioniert z. B. in Planetarien, weil man dort in der 360°-runden und 180°-gewölbten Kuppel Bild und Ton viel intensiver wahrnimmt, als vor einer Kinoleinwand oder Mattscheibe.</h3>
      </transition>
      <div v-show="!drfshow && !hotshow" class="portFlexItem width paddigText midFontSize">
      <!-- <transition-group name="slideSwitchAb"> -->
        <ul>
          <li>
            <h1>Unser Leistungsportfolio:</h1>
          </li>
          <li>
            <h2>Produktion</h2>
          </li>
          <li>
            <h2>Marketing</h2>
          </li>
          <li>
            <h2>Vertrieb</h2>
          </li>
          <li>
            <h2>Lizenzierung</h2>
          </li>
          <li>
            <h2>Beratung</h2>
          </li>
        </ul>
      <!-- </transition-group> -->
      </div>
    </div>
  </div>
</template>


<style scoped>
.portFlexWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
}
.portFlexItem {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  /* margin-top: 10%; */
  height: 20%;
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
  width: 70%;
}
.portFlexItem.width.extrawurst {
  width: 556px;
}
.img {
  max-height: 100%;
  max-width: 300px;
  padding-left: 50px;
  padding-right: 50px;
}
.expand {
  width: 70%;
}
@media only screen and (max-width: 768px) {
  .portFlexWrap { 
    justify-content: space-around;
  }
  .portFlexItem.width {
    width: 90%;
    flex-direction: column;
  }
  .portFlexItem.width.extrawurst {
    width: 90%;
  }
  .portFlexItem.width.mag {
    margin-top: 30px;
  }
  .borderLeft {
    border-left: none;
  }
  .img {
    max-width: 70%;
    padding: 5%;
  }
  .img .expand {
    width: 60%;
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
    this.route(to.name);
    next();
  },
  mounted() {
    this.droute = this.routershort.children[0].path;
    this.hroute = this.routershort.children[1].path;
    this.route(this.$router.currentRoute.name);
  },
  metaInfo: {
    title: "Hoerraum - Leisungen und Portfolio",
    meta: [
      {
        name: "description",
        content:
          "Hoerraum - Produktionen für 'Immersive' Medien - Produktion - Marketing - Vertireb - Lizenzierung - Beratung"
      }
    ]
  }
};
</script>
