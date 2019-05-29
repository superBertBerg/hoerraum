<template>
  <div id="dreiAuge" class="transitionWrap">
    <div class="subFlex">
      <img class="imgContainer" src="/static/images/portfolio/der_dreiaeugige_totenkopf_res.png">
    </div>

    <div class="subFlex Pa midFontSize">
      <h2 v-html="message.h2" class="midFontSize"></h2>
    </div>

    <div class="subFlex Pa midFontSize">
      <p v-html="message.p" class="midFontSize"></p>
    </div>
  </div>
</template>


<style scoped>
</style>


<script>
export default {
  data: function() {
    return {
      message: {
        h2: "",
        p: ""
      },
      ger: {
        h2: "Die drei ?<span class=\"theRed\">?</span><span class=\"theBlue\">?</span>  und der dreiäugige Totenkopf",
        p:
          "Horror-Regisseur James Kushing erwacht eines Morgens mit einer mysteriösen " + 
          "Tätowierung auf dem Arm: ein dreiäugiger Totenkopf! Was hat das Tattoo mit " +
          "dem Film zu tun, den Kushing niemals fertiggestellt hat? Und welches Geheimnis " + 
          "steckt hinter dem gestohlenen Smaragd, der vor Jahren spurlos vom Filmset verschwand?" + 
          " Justus, Peter und Bob stürzen sich in den Fall und entdecken nach und nach die Wahrheit" +
          " hinter dem Rätsel... <br>Autoren und Hörspielbearbeiter: Ivar Leon Menger und John Beckmann"
      },
      eng: { h2: "", p: "" }
    };
  },
  mounted: function() {
    this.message.h2 = this.ger.h2;
    this.message.p = this.ger.p;
  }
};
</script>
