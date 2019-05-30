<template>
  <div id="contact" class="transitionWrap">
    <div class="height midFontSize textCenter">
      <div v-if="contact.show" class="verticalyHoriontalyFlex">
        <h1 class="padding">Hoerraum Media GbR • Bindestr. 24 • 20146 Hamburg</h1>
        <p class="padding">+49 40 244 37 132</p>
        <p class="padding">ms@hoerraum.media</p>
      </div>

      <div v-if="imprint.show" class="verticalyHoriontalyFlex">
        <h1>Impressum</h1>
        <p class="padding">Inhaltlich verantwortlich i.S. des Presserechtes bzw. des Telemediengesetzes (§ 5 TMG):</p>
        <p>Hoerraum Media GbR • Bindestr. 24 • 20146 Hamburg</p>
        <p class="padding">
          GF: Markus Schäfer, Matthias Krause
          <br>HRB: XXXXXX | USt-IdNr.: XXXXXXXXXXX
        </p>
        <p class="padding">HAFTUNGSAUSSCHLUSS</p>
        <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmn wir keine Haftung 
          für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind
           ausschließlich deren Betreiber verantwortlich. Alle Inhalte unterliegen dem Urheberrecht.</p>
      </div>
    </div>
    <div class="stickRight">
      <div class="flexer">
        <router-link class="subLink midFontSize" to="/contact/detail/imprint">Impressum</router-link>
        <router-link class="subLink midFontSize" to="/contact/detail/contact">Kontakt</router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
.verticalyHoriontalyFlex {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
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
</style>


<script>
export default {
  data: function() {
    return {
      imprint: {
        show: false
      },
      contact: {
        show: true
      }
    };
  },
  methods: {
    changeContent: function(id) {
      if (id === "contact") {
        this.imprint.show = false;
        this.contact.show = true;
      } else if (id === "imprint") {
        this.imprint.show = true;
        this.contact.show = false;
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.changeContent(to.params.id);
    next();
  },
  created: function() {
    this.changeContent(this.$route.params.id);
  }
};
</script>
