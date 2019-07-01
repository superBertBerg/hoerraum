<template>
  <div id="portfolio" class="transitionWrap">
    <div class="portFlexWrap">
      <div class="portFlexItem bigFontSize"> 
        <div class="portFlexProduct borderRight"> 
          <router-link to="/portfolio/die_drei_fragezeichen">Die drei ?<span class="theRed">?</span><span class="theBlue">?</span> </router-link>
        </div>
        <div class="portFlexProduct borderLeft"> 
          <router-link to="/portfolio/der_raeuber_hotzenplotz">  Der Räuber <br> Hotzenplotz </router-link>
        </div>
      </div>
      <div class="portFlexItem width midFontSize">
        Unser Spielfeld sind sog. ‚immersive‘ Medien. Medien also, in die man wirklich eintauchen kann. Das funktioniert z. B. in Planetarien, weil man dort in der 360°-runden und 180°-gewölbten Kuppel Bild und Ton viel intensiver wahrnimmt, als vor einer Kinoleinwand oder Mattscheibe.
      </div>
      <div class="portFlexItem width midFontSize">
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
    <!-- <div class="flexCenter bigFontSize">Portfolio</div>

    <transition :name="transitonEffect">
      <router-view></router-view>
    </transition>
    <div v-if="!mobile" class="stickRight">
      <div class="flexer">
        <h1 class="midFontSize self">
          Die Drei ?
          <span class="theRed">?</span>
          <span class="theBlue">?</span>
        </h1>
        <router-link
          class="subLink midFontSize"
          to="/portfolio/das_versunkene_schiff"
        >Das Versunkene Schiff</router-link>
        <router-link
          class="subLink midFontSize"
          to="/portfolio/die_schwarze_katze"
        >Die schwarze Katze</router-link>
        <router-link
          class="subLink midFontSize"
          to="/portfolio/der_dreiaeugige_totenkopf"
        >Der dreiäugige Totenkopf</router-link>

        <h1 class="midFontSize self marg">Räuber Hotzenplotz</h1>
        <router-link
          class="subLink midFontSize"
          to="/portfolio/der_dreiaeugige_totenkopf"
        >Voll Versepplung</router-link>
      </div>
    </div>
    <div v-if="mobile" class="footerNav bigFontSize">
      <router-link :to="prev" class="arrow">&#x3C;</router-link>
      <router-link :to="next" class="arrow">&#x3e;</router-link>
    </div> -->

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
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
}
.portFlexProduct {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.borderRight {
  border-right: 1px solid white;
}
.borderLeft {
  border-left: 1px solid white
}
.portFlexItem.width {
  align-self: center;
  width: 60%;
}
/*
@media only screen and (max-width: 500px) {
  .stickRight {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0;
  }
} */
</style>


<script>
export default { 
};
</script>
