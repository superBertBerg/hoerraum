<template>
  <div id="imag" class="transitionWrap">
    <transition name="slideSwitch">
      <div class="flexWrap" v-if="visible">
        <router-link class="midFontSize flexLMR start" to="/imag/gf/markus_schaefer"></router-link>
        <div class="flexCenter midFontSize centerImag">
          <p>
            „An keinem anderen Ort kann man gemeinschaftlich so gut in andere Welten
            eintauchen, wie unter der Kuppel eines Planetariums. Der dreidimensionale Sound gibt uns dort die Möglichkeit,
            das Hörspiel auf eine neue Erlebnisebene zu bringen. Der Zuhörer fühlt sich mittendrin statt nur dabei“,
            erklären Krauße und Schäfer.
          </p><h1>HO<span class="theRed">3</span>RRAUM</h1>
        </div>
        <router-link class="midFontSize flexLMR end" to="/imag/gf/matthias_krause"></router-link>
      </div>
    </transition>
    <transition name="slideSwitch">
      <router-view></router-view>
    </transition>
  </div>
</template>


<style scoped>
.centerImag {
  text-align: center;
  width: 30%;
}
.flexLMR {
  display: flex;
  width: 35%;
}
.start {
  justify-content: flex-start;
}
.end {
  justify-content: flex-end;
}

@media only screen and (max-width: 500px) {
  .flexLMR {
    width: 5%;
  }
  .centerImag {
    width: 90%;
  }
}
</style>


<script>
export default {
  data: function() {
    return {
      id: 1,
      visible: true
    };
  },
  methods: {
    init(check) {
      if (check) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.params.id);
    next();
  },
  created() {
    this.init(this.$route.params.id);
  }
};
</script>
