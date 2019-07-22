<template>
  <div id="dive" class="transitionWrap">
    <div class="landFlexWrap">
      <div class="landFlexContainer paddigText">
        <div>
          <p class="pageHeadline folio"><span class="theRed">3</span></p>
          <h3 class="midFontSize">
            Sie steht u.a. für den qualitativen Anspruch unserer Produktionen: Mittels innovativer Technik schaffen wir dreidimensionale, räumliche Hörerlebnisse an sehr besonderen Orten – in Planetarien und Mediendomes, denn in der 360°-runden und 180°-gewölbten Kuppel nimmt man Bild und Ton viel intensiver wahr, als vor einer Kinoleinwand oder Mattscheibe.
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.landFlexWrap {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
.landFlexContainer {
  display: flex;
  align-items: center;
  align-self: flex-end;
  height: 100%;
  width: 300px;
}
@media only screen and (max-width: 768px) {
  .landFlexWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 75%;
  }
  .landFlexContainer {
    width: auto;
    align-self: center;
    height: auto;
  }
}
</style>

<script>
export default {
  metaInfo: {
    title: "Hoerraum - Mittels hochwertiger Technik: Magie der Töne",
    meta: [
      {
        name: "description",
        content:
          "Hoerraum - Mittels innovativer Technik schaffen wir dreidimensionale, räumliche Hörerlebnisse an sehr besonderen Orten – in Planetarien und Mediendomes. weil man dort in der 360°-runden und 180°-gewölbten Kuppel Bild und Ton viel intensiver wahrnimmt, als vor einer Kinoleinwand oder Mattscheibe."
      }
    ]
  }
};
</script>


