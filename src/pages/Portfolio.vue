<template>
  <div id="portfolio" class="transitionWrap">
    <!-- <div class="flexCenter bigFontSize">Portfolio</div> -->

    <transition :name="transitonEffect">
      <router-view></router-view>
    </transition>
    <div class="stickRight">
      <div class="flexer">
        <h1 class="midFontSize self">Die Drei ?<span class="theRed">?</span><span class="theBlue">?</span></h1>
        <router-link class="subLink midFontSize" to="/portfolio/das_versunkene_schiff">Das Versunkene Schiff</router-link>
        <router-link class="subLink midFontSize" to="/portfolio/die_schwarze_katze">Die schwarze Katze</router-link>
        <router-link class="subLink midFontSize" to="/portfolio/der_dreiaeugige_totenkopf">Der dreiäugige Totenkopf</router-link>

        <h1 class="midFontSize self marg">Räuber Hotzenplotz</h1>
        <router-link class="subLink midFontSize" to="/portfolio/der_dreiaeugige_totenkopf">Voll Versepplung</router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
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
.self {
  align-self: center;
}
.marg {
  padding-top: 50px;
}
</style>


<script>
export default {
  data: function() {
    return {
      transitonEffect: "slideSwitch"
    }
  }
};
</script>
