<template>
  <div id="schiff" class="transitionWrap">
    <div class="subFlex">
      <img class="imgContainer" src="/static/images/portfolio/das_versunken_schiff_res.png">
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
@media only screen and (max-width: 500px) {
    .imgContainer {
    max-width: 90%;
}

.subFlex {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 60px;
}

.subFlex.Pa {
    padding-left: 20%;
    padding-right: 20%;
    text-align: center;
}
}
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
        h2: "Die drei ?<span class=\"theRed\">?</span><span class=\"theBlue\">?</span> und das versunkene Schiff",
        p:
          "Liegt tatsächlich ein alter Goldschatz vor der Küste des Ferienortes von Justus, Peter und Bob? Prompt vergessen die drei ?<span class=\"theRed\">?</span><span class=\"theBlue\">?</span> " +
          "ihren Ärger über den verregneten Urlaub und nehmen die Jagd nach den versunkenen Reichtümern auf. " +
          " Sie tauchen ein in die geheimnisvolle Geschichte des berühmtesten Dorfbewohners und heben ein dunkles " +
          "Geheimnis… <br>Autor André Marx, Hörspielbearbeitung Kai Schwind"
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
