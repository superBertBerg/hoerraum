<template>
  <div id="gfslide" class="transitionWrap">
    <div :class="{reverseD: isMatt}" class="verticalFlex Pa midFontSize">
      <p v-html="message.p" class="leftImag midFontSize"></p>
      <router-link class="leftImagHead midFontSize" to="/imag"><h2 v-html="message.h2"></h2></router-link>
    </div>
  </div>
</template>
      


<style scoped>
.verticalFlex {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  /* padding-left: 100px; */
}
.reverseD {
  flex-direction: row-reverse;
}
.leftImag {
  width: 60%;
  padding-left: 10%;
  padding-right: 10%;
}
.leftImagHead {
  text-decoration: none;
  color: #818181;
  width: 30%;
  text-align: center;
  padding-top: 40%;
  transition: 0.25s;
}
.leftImagHead:hover {
  color: #f1f1f1;
}
</style>


<script>
export default {
  data: function() {
    return {
      isMatt: false,
      message: {
        h2: "",
        p: ""
      },
      markus: {
        ger: {
          h2: "Markus Schäfer",
          p:
            'Liegt tatsächlich ein alter Goldschatz vor der Küste des Ferienortes von Justus, Peter und Bob? Prompt vergessen die drei ?<span class="theRed">?</span><span class="theBlue">?</span> ' +
            "ihren Ärger über den verregneten Urlaub und nehmen die Jagd nach den versunkenen Reichtümern auf. " +
            " Sie tauchen ein in die geheimnisvolle Geschichte des berühmtesten Dorfbewohners und heben ein dunkles " +
            "Geheimnis… <br>Autor André Marx, Hörspielbearbeitung Kai Schwind"
        },
        eng: { h2: "", p: "" }
      },
      matthias: {
        ger: {
          h2: "Matthias Krause",
          p:
            'Liegt tatsächlich ein alter Goldschatz vor der Küste des Ferienortes von Justus, Peter und Bob? Prompt vergessen die drei ?<span class="theRed">?</span><span class="theBlue">?</span> ' +
            "ihren Ärger über den verregneten Urlaub und nehmen die Jagd nach den versunkenen Reichtümern auf. " +
            " Sie tauchen ein in die geheimnisvolle Geschichte des berühmtesten Dorfbewohners und heben ein dunkles " +
            "Geheimnis… <br>Autor André Marx, Hörspielbearbeitung Kai Schwind"
        },
        eng: { h2: "", p: "" }
      }
    };
  },
  methods: {
    who: function() {
      if (this.$route.params.id === "markus_schaefer") {
        this.message.h2 = this.markus.ger.h2;
        this.message.p = this.markus.ger.p;
        this.isMatt = false;
        console.log(this);
      } else {
        this.message.p = this.matthias.ger.p;
        this.message.h2 = this.matthias.ger.h2;
        this.isMatt = true;
      }
    }
  },
  created: function() {
    this.who();
  }
};
</script>
