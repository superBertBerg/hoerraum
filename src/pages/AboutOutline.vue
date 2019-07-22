<template>
  <div id="aboutOutline" class="transitionWrap">
    <div class="midFontSize aboutOutFlexWrap paddigText">
      <p>
        Wir unterhalten: Ob Family Entertainment, Musikshow oder Hörspielklassiker - wir machen Programme für ein großes Publikum.
      </p>
      <h1 style="display: none">
        hoerraum
      </h1>
    </div>
  </div>
</template>


<style scoped>
@media only screen and (max-width: 768px) {
  .aboutOutFlexWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    height: 100%;
  }
}
</style>


<script>
export default {
  metaInfo: {
    title: "Hoerraum - Über Uns",
    meta: [
      {
        name: "description",
        content:
          "Hoerraum - Der dreidimensionale Sound gibt uns dort die Möglichkeit, das Hörspiel auf eine neue Erlebnisebene zu bringen. Der Zuhörer fühlt sich mittendrin statt nur dabei. - Markus Schäfer - Matthias Krauße"
      }
    ]
  }
};
</script>
