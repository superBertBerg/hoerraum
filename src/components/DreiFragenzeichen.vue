<template>
  <div id="dreiFragezeichen" class="portDetFlexItem overFlow preventSwipe">
    <div class="portDetFlexSubItem wCopy">
      <h1 class="midFontSize" v-html="message.h1" style="display: none"></h1>
      <p class="paddigText midFontSize" v-html="message.p"></p>
      <p class="copyRight paddingTop" v-html="message.copy"></p>
    </div>
    <div class="portDetFlexSubItem">
      <div class="imgContainer paddigText">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dreifragezeichen.de/live/planetarium"
        >
          <img
            class="roundedImg"
            src="/static/images/portfolio/HO3RRAUM_Das-Grab-der-Inka-Mumie.png"
            alt="Die-Drei-Fragezeichen, Mediendom, Planetarium, Hoerraum, Das-Grab-der-Inka-Mumie"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dreifragezeichen.de/live/planetarium"
        >
          <img
            class="roundedImg"
            src="/static/images/portfolio/HO3RRAUM_Das-kalte-Auge.png"
            alt="Die-Drei-Fragezeichen, Mediendom, Planetarium, Hoerraum, Das-kalte-Auge"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dreifragezeichen.de/live/planetarium"
        >
          <img
            class="roundedImg"
            src="/static/images/portfolio/HO3RRAUM_Das-versunkene-Schiff.png"
            alt="Die-Drei-Fragezeichen, Mediendom, Planetarium, Hoerraum, Das-versunkene-Schiff"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dreifragezeichen.de/live/planetarium"
        >
          <img
            class="roundedImg"
            src="/static/images/portfolio/HO3RRAUM_Der-dreiaeugige-Totenkopf.png"
            alt="Die-Drei-Fragezeichen, Mediendom, Planetarium, Hoerraum, Der-dreiaeugige-Totenkopf"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dreifragezeichen.de/live/planetarium"
        >
          <img
            class="roundedImg"
            src="/static/images/portfolio/HO3RRAUM_Die-Schwarze-Katze.png"
            alt="Die-Drei-Fragezeichen, Mediendom, Planetarium, Hoerraum, Die-Schwarze-Katze"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dreifragezeichen.de/live/planetarium"
        >
          <img
            class="roundedImg"
            src="/static/images/portfolio/HO3RRAUM_und-der-Tornadojäger.png"
            alt="Die-Drei-Fragezeichen, Mediendom, Planetarium, Hoerraum, und-der-Tornadojäger"
          />
        </a>
      </div>
    </div>
  </div>
</template>


<style scoped>
#dreiFragezeichen {
  height: 80%;
}
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
  width: 100%;
  height: 45%;
  flex-direction: row;
}
.portDetFlexItem.overFlow {
  overflow-y: auto;
}
.portDetFlexSubItem {
  display: flex;
  text-align: center;
  align-items: center;
  width: 50%;
}
.imgContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
}
.roundedImg {
  width: 200px;
  height: 200px;
}
.portDetFlexSubItem.wCopy {
  justify-content: center;
  flex-direction: column;
}
.paddingTop {
  padding-top: 20px
}
@media only screen and (max-width: 1100px) {
  .roundedImg {
    width: 150px;
    height: 150px;
  }
}
@media only screen and (max-width: 768px) {
  .portDetFlexSubItem .wCopy {
    justify-content: normal;
    flex-direction: column;
  }
  #dreiFragezeichen {
    height: 75%;
    margin-bottom: 5%;
  }
  .roundedImg {
    width: 130px;
    height: 130px;
  }
  .portDetFlexItem {
    flex-direction: column;
    justify-content: normal;
  }
  .portDetFlexSubItem {
    display: block;
    width: 100%;
    align-items: flex-start;
  }
  .imgContainer {
    width: 100%;
    padding-top: 20px;
    align-content: normal;
  }
}
</style>


<script>
export default {
  metaInfo: {
    title: "Hoerraum - Unsere Produktionen",
    meta: [
      {
        name: "description",
        content:
          "Hoerraum - 3 berühmte Detektive, 3 unveröffentlichte Geschichten, 3-dimesionaler Sound! – mit " +
          "diesen USP-Bausteinen haben wir mittlerweile 2 Staffeln produziert, gemeinsam mit d" +
          "em EUROPA-Label von Sony Music. In einer Art Evolutionsprozess haben wir mit unsere" +
          "n Produktionen dabei eine neue Format-Kategorie geschaffen: Das immersive, illustri" +
          "erte Hörspiel. Was als reine 3D-Audioproduktion unterm Sternenhimmel begann, ist he" +
          "ute visuell von 360°-Projektionen begleitet."
      }
    ]
  },
  data: function() {
    return {
      message: {
        h1: "",
        p: "",
        copy: ""
      },
      ger: {
        h1: "Die drei ???",
        p:
          "3 berühmte Detektive, 3 unveröffentlichte Geschichten, 3-dimensionaler Sound! – mit " +
          "diesen USP-Bausteinen haben wir mittlerweile zwei Staffeln produziert, gemeinsam mit d" +
          "em EUROPA-Label von Sony Music.<br>In einer Art Evolutionsprozess haben wir mit unsere" +
          "n Produktionen dabei eine neue Format-Kategorie geschaffen: Das immersive, illustri" +
          "erte Hörspiel. Was als reine 3D-Audioproduktion unterm Sternenhimmel begann, wird he" +
          "ute visuell von 360°-Projektionen begleitet. Das sieht mal abstrakt künstlerisch, m" +
          "al mysteriös nebelig, mal semi-realistisch aus, aber nie „filmisch“. So bleibt der " +
          "Fokus immer auf dem Hörerlebnis, das Justus Jonas, Peter Shaw und Bob Andrews schon" +
          " vor langer Zeit zu Kultfiguren gemacht hat.<br>Weit über 200.000 Fans der drei <span " +
          "class='theRed'>?</span><span class='theBlue'>?</span>? haben die bislang 6 Folgen " +
          "in 7 deutschen Planetarien besucht.",
        copy: "„Die drei <span class='theRed'>?</span><span class='theBlue'>?</span>?“ ist eine eingetragene Marke der <a href='https://www.kosmos.de/'>Franckh-Kosmos</a> Verlags-GmbH &amp; Co.KG"
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
    this.message.copy = this.ger.copy;
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