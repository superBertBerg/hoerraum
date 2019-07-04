<template>
  <div id="contact" class="transitionWrap">
    <div class="height textCenter flexBoxCon">
      <div v-show="cshow" class="infoFlex1 midFontSize">
        <h1 class="padding">Hoerraum Media GbR • Binderstr. 24 • 20146 Hamburg</h1>
        <p class="padding">
          Telefon: +49 40 244 37 131
          <br>Telefax: +49 40 244 37 133
        </p>
        <p class="padding">info@hoerraum.media</p>
      </div>
      <div v-show="ishow" class="preventSwipe infoFlex2 smallFontSize">
        <h1>Impressum</h1>
        <p class="padding">Angaben gemäß § 5 TMG:</p>
        <p>HO3RRAUM Media GbR • Matthias Krauße & the content dome Gesellschaft für immersive Medien mbH • Binderstr. 24 • 20146 Hamburg</p>
        <p class="padding">
          GF: Markus Schäfer, Matthias Krauße
          <br>USt-IdNr.: DE295596354
        </p>
        <p class="padding">Verantwortlicher i.S.d. Presserechts:</p>
        <p>Markus Schäfer, Matthias Krauße</p>
        <p class="padding">Streitschlichtung:</p>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          <a
            href="https://ec.europa.eu/consumers/odr"
          >https://ec.europa.eu/consumers/odr</a>.
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        <p class="padding">Haftung für Inhalte:</p>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
        <p class="padding">Haftung für Links:</p>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
        <p class="padding">Urheberrecht:</p>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Schrankenbestimmungen der $$ 44a bis 63a UrhG bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind ausschließlich für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </div>
    </div>
    <div class="stickRight">
      <div class="flexer midFontSize">
        <router-link class="size" :class="{highlight: ishow}" to="/info/detail/imprint">Impressum</router-link>
        <router-link class="size" :class="{highlight: cshow}" to="/info/detail/contact">Kontakt</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flexBoxCon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.infoFlex1 {
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  margin-left: 25%;
  margin-right: 25%;
}
.infoFlex2 {
  display: flex;
  flex-direction: column;
  height: 50%;
  overflow-y: auto;
  margin-left: 25%;
  margin-right: 25%;
}
.padding {
  padding-top: 30px;
}
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
  padding-left: 20px;
  padding-right: 20px;
}
.highlight {
  color: #e9e9e9;
}
@media only screen and (max-width: 500px) {
  .infoFlex1 {
    margin-left: 10%;
    margin-right: 10%;
  }
  .infoFlex2 {
    margin-left: 10%;
    margin-right: 10%;
  }
  .stickRight {
    position: absolute;
    top: auto;
    right: auto;
    height: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0;
  }
  .flexer {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  .size {
    width: 30%;
    padding: 10px;
  }
}
</style>


<script>
export default {
  data: function() {
    return {
        ishow: false,
        cshow: true
    };
  },
  computed: {
    prevent: function() {
      if(this.ishow) {
        this.preventSwipe()
      }
    }
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
    this.changeContent(this.$route.params.id);
  },
  mounted() {
    this.preventSwipe();
  },
  destroyed() {
    this.removePrevent();
  },
  metaInfo: {
    title: "Hoerraum - Kontakt | Impressunm",
    meta: [
      {
        name: "description",
        content:
          "Hoerraum - Kontakt: Hoerraum Media GbR • Binderstr. 24 • 20146 Hamburg | Telefon: +49 40 244 37 131 | info at hoerraum.media"
      }
    ]
  }
};
</script>
