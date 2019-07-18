<template>
  <div id="hotzenplotz" class="preventSwipe overFlow">
    <div class="portDetFlexItem">
      <div class="imgContainer paddigText">
        <router-link to="/portfolio">
          <img
            class="roundedImg"
            src="/static/images/portfolio/HO3RRAUM_Raeuber-Hotzenplotz-und-die-Mondrakete.png"
            alt="Mediendom, Planetarium, Hoerraum, Räuber-Hotzenplotz-und-die-Mondrakete"
          />
        </router-link>
      </div>
    </div>
    <div class="portDetFlexItem midFontSize">
      <div>
        <h1 class="paddigText dis" v-html="message.h1"></h1>
        <p class="paddigText" v-html="message.p"></p>
      </div>
    </div>
  </div>
</template>


<style scoped>
#hotzenplotz {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;
}
.dis {
  display: none;
}
.portDetFlexItem {
  display: flex;
  justify-content: center;
  width: 60%;
  margin-bottom: 50px;
}
.overFlow {
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
  #hotzenplotz {
    display: block;
    height: 95%;
    margin-bottom: 5%;
  }
  .portDetFlexItem {
    width: 100%;
    margin-bottom: 20px;
  }
  .imgContainer {
    width: 100%;
    height: 100%;
    text-align: center;
  }
}
</style>


<script>
export default {
  metaInfo: {
    title:
      "Hoerraum - Unsere Produktionen, Der Räuber Hotzenplotz und die Mondrakete",
    meta: [
      {
        name: "description",
        content:
          "Hoerraum - Was liegt näher als die Adaption eines der erfolgreichsten Kinderbuch-T" +
          "hemen für die Kuppel eines Planetariums ? Noch dazu, wenn es sogar um eine Mondrak" +
          "ete geht ? Dies war unser erster Gedanke, als 2018 quasi aus dem Nichts, nach über" +
          " 40 Jahren ein neues Buch vom Räuber Hotzenplotz erschien."
      }
    ]
  },
  data: function() {
    return {
      message: {
        h1: "",
        p: ""
      },
      ger: {
        h1: "Der Räuber Hotzenplotz und die Mondrakete",
        p:
          "Eigentlich hatte Ottfried Preußler mit der ersten Geschichte vom Räuber Hotzenplo" +
          "tz lediglich etwas Abwechslung von der Arbeit an Krabat gesucht, am Ende verkauft" +
          "en sich die drei Bände insgesamt 6Millionen-fach, die Bücher wurden in 34 Sprache" +
          "n übersetzt und mehrfach verfilmt. Was liegt näher als die Adaption eines der erf" +
          "olgreichsten Kinderbuch-Themen für die Kuppel eines Planetariums ? Noch dazu, wen" +
          "n es sogar um eine Mondrakete geht ? Dies war unser erster Gedanke, als 2018 quas" +
          "i aus dem Nichts, nach über 40 Jahren ein neues Buch vom Räuber Hotzenplotz ersch" +
          "ien. Basis unserer Produktion ist eine liebevolle und lebendige Hörspielfassung d" +
          "es WDR, die wir um Visualisierungen und Animationen der originalen Buch-Illustrat" +
          "ionen erweitert haben, und mit einem didaktischem Bonusteil zum Thema Raumfahrt e" +
          "rgänzen. Das Ergebnis ist ein einstündiges 360°-Erlebnis, in das Kinder ab 5 Jahr" +
          "en und alle, die mit dem Räuber Hotzenplotz aufgewachsen sind, ab Herbst 2019 im " +
          "Planetarium erleben können ."
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
      var elements = document.getElementsByClassName("preventSwipe");
      Array.from(elements).forEach(el => {
        el.addEventListener("wheel", this.stopPropagate);
        el.addEventListener("touchstart", this.stopPropagate);
        el.addEventListener("touchend", this.stopPropagate);
      });
      return true;
    },
    removePrevent: function() {
      var elements = document.getElementsByClassName("preventSwipe");
      Array.from(elements).forEach(el => {
        el.removeEventListener("wheel", this.stopPropagate);
        el.removeEventListener("touchstart", this.stopPropagate);
        el.removeEventListener("touchend", this.stopPropagate);
      });
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