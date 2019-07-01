<template>
  <div id="hotzenplotz" class="transitionWrap">
    <div class="portDetFlexWrap">
        <div class="portDetFlexItem">
            <div class="imgContainer">
                <img class="roundedImg" src="/static/images/portfolio/HO3RRAUM_Raeuber-Hotzenplotz-und-die-Mondrakete.png" alt="">
            </div>
        </div>
        <div class="portDetFlexItem overFlow preventSwipe midFontSize">
            <div>
                <h1 v-html="message.h1"></h1>
                <p v-html="message.p"></p>
            </div>
        </div>
    </div>
  </div>
</template>


<style scoped>
.portDetFlexWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
}
.portDetFlexItem {
  display: flex;
  justify-content: center;
  width: 60%;
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 50px;
}
.portDetFlexItem.overFlow {
  overflow-y: auto;
}
.portDetFlexSubItem {
    display: flex;
    text-align: left;
    align-items: center;
    padding-right: 50px;
    width: 50%;
}
.imgContainer {
    width: 50%;
    height: 100%;
    text-align: center;
}
.roundedImg {
  max-height: 100%;
  max-width: 100%;
}
@media only screen and (max-width: 768px) {
  .portDetFlexItem {
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    margin-bottom: 20px;
  }
  .imgContainer {
    width: 90%;
    height: 100%;
    text-align: center;
  }
}

</style>


<script>
export default {
  data: function() {
    return {
      message: {
        h1: "",
        p: ""
      },
      ger: {
        h1: "Der Räuber Hotzenplotz und die Mondrakete",
        p:
          "Was liegt näher als die Adaption eines der erfolgreichsten Kinderbuch-Themen" +
          " für die Kuppel eines Planetariums ? Noch dazu, wenn es sogar um eine Mondra" +
          "kete geht ? Dies war unser erster Gedanke, als 2018 quasi aus dem Nichts, na" +
          "ch über 40 Jahren ein neues Buch vom Räuber Hotzenplotz erschien. Basis unse" +
          "rer Produktion ist eine liebevolle und lebendige Hörspielfassung des WDR, da" +
          "s wir mit Visualisierungen und Animationen der originalen Buch-Illustratione" +
          "n ergänzen, und mit einem didaktischem Bonusteil zum Thema Raumfahrt anreich" +
          "ern. Das Ergebnis ist ein knapp einstündiges 360°-Erlebnis, in das Kinder ab" +
          " 5 Jahren und alle, die mit dem Räuber Hotzenplotz aufgewachsen sind, ab Her" +
          "bst 2019 im Planetarium regelrecht eintauchen können ."
      },
      eng: { h2: "", p: "" }
    };
  },
  methods: {
    changeContent: function(id) {
      if (id === "contact") {
        this.ishow = false;
        this.cshow = true;
      } else if (id === "imprint") {
        this.ishow = true;
        this.cshow = false;
      }
    },
    stopPropagate: function(e) {
      e.stopPropagation();
    },
    preventSwipe: function() {
      var elements = document.getElementsByClassName('preventSwipe');
      Array.from(elements).forEach((el) => {
        el.addEventListener("wheel", this.stopPropagate)
        el.addEventListener("touchstart", this.stopPropagate);
        el.addEventListener("touchend", this.stopPropagate);
        
      })
      return true;
    },
    removePrevent: function() {
      var elements = document.getElementsByClassName('preventSwipe');
      Array.from(elements).forEach((el) => {
        el.removeEventListener("wheel", this.stopPropagate)
        el.removeEventListener("touchstart", this.stopPropagate);
        el.removeEventListener("touchend", this.stopPropagate);
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.changeContent(to.params.id);
    next();
  },
  created: function() {
    this.message.h1 = this.ger.h1;
    this.message.p = this.ger.p;
    this.changeContent(this.$route.params.id);
  },
  mounted() {
    this.preventSwipe();
  },
  destroyed() {
    this.removePrevent();
  }
};
</script>