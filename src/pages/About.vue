<template>
  <div id="about" class="transitionWrap">
    <transition name="slideSwitch">
      <div class="flexWrapImag" v-if="visible">
        <router-link class="midFontSize flexLMR starts link" to="/about/gf/markus_schaefer">
          <h2 class="name">Markus Schäfer</h2>
        </router-link>
        <div class="midFontSize flexCenter centerImag">
          <p>
            Wir unterhalten: Ob Family Entertainment, Musikshow oder Hörspielklassiker - wir machen Programme für ein großes Publikum.
          </p>
          <h1>
            HO<span class="theRed">3</span>RRAUM
          </h1>
        </div>
        <router-link class="midFontSize flexLMR end link" to="/about/gf/matthias_krause">
          <h2 class="name">Matthias Krauße</h2>
        </router-link>
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
  width: 60%;
}
.starts {
  justify-content: flex-start;
}
.end {
  justify-content: flex-end;
}
.flexWrapImag {
  display: flex;
  justify-content: center;
  height: 100%;
}
.display {
  display: none;
}
.name {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
}
@media only screen and (max-width: 768px) {
  .flexLMR {
    width: 5%;
  }
  .centerImag {
    display: none;
    width: 90%;
  }
  .flexWrapImag {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .flexLMR {
    width: 80%;
    height: 48%;
    align-items: flex-end;
    justify-content: center;
  }
  .display {
    display: block;
  }
  .name {
    margin-bottom: 0;
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
  },
  metaInfo: {
    title: "Hoerraum - Über Uns",
    meta: [
      {
        name: "description",
        content:
          "Hoerraum - Der dreidimensionale Sound gibt uns dort die Möglichkeit, das Hörspiel auf eine neue Erlebnisebene zu bringen. Der Zuhörer fühlt sich mittendrin statt nur dabei. - Markus Schäfer - Matthias Krauße"
      }
    ]
  }
};
</script>
