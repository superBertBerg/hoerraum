<template>
  <div id="dive" class="transitionWrap">
    <div class="landFlexWrap">
      <div class="landFlexContainer paddigText">
        <div>
          <p class="pageHeadline folio">3</p>
          <h3 class="midFontSize">
            Sie steht u.a. für den qualitativen Anspruch unserer Produktionen: Mittels hochwertiger Technik schaffen wir dreidimensionale, räumliche Hörerlebnisse an sehr besonderen Orten - in Planetarien und Mediendomes. Dem Besucher wird so ein regelrechtes
            <span
              class="theRed"
            >Eintauchen</span> in die Handlung ermöglicht - entweder ganz ohne visuelle Ablenkung oder mit visueller Begleitung ohne Sichtfeldbeschränkung
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
    height: 100%;
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
          "Hoerraum - Mittels hochwertiger Technik schaffen wir dreidimensionale, räumliche Hörerlebnisse an sehr besonderen Orten - in Planetarien und Mediendomes. Dem Besucher wird so ein regelrechtes in die Handlung ermöglicht"
      }
    ]
  }
};
</script>


