<template>
  <div id="dreiAuge" class="transitionWrap">
    <div class="subFlex">
      <img class="imgContainer" src="/static/images/portfolio/die_schwarze_katze_res.png">
    </div>

    <div class="subFlex Pa midFontSize">
      <h2 v-html="message.h2"></h2>
    </div>

    <div class="subFlex Pa midFontSize bottomMarg">
      <p v-html="message.p"></p>
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
        h2: "Die drei ?<span class=\"theRed\">?</span><span class=\"theBlue\">?</span> und  die schwarze Katze, (Neufassung):",
        p:
          "In einem kleinen Wanderzirkus wittern die drei Detektive Justus, Peter und Bob ihren neuesten Fall. " + 
          " Denn wenn ein finster aussehender Mann mit Gewalt eine hässliche Stoffkatze an sich bringen will, " + 
          "sie stiehlt und am nächsten Tag per Zeitungsanzeige weitere Katzen sucht, muss doch etwas dahinter " +
          "stecken? Hierbei handelt es sich um eine neue und erweiterte Fassung des beliebten Klassikers von 1971 " +
          ".<br>Autor William Arden, Hörspielbearbeitung André Minninger"
      },
      eng: { h2: "", p: "" }
    };
  },
  created: function() {
    this.message.h2 = this.ger.h2;
    this.message.p = this.ger.p;
  }
};
</script>
