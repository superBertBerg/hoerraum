<template>
  <div id="landscape">
    <div class="transitionWrap">
    <div class="landFlexWrap">
        <div class="landFlexContainer">
          <h3 class="midFontSize">
            Alle setzen auf Bewegtbild. Wir setzen auf die Magie der
            <span class="theRed">Töne</span>,
            <span class="theRed">Klänge</span> un des gesprochenen Wortes, die Bilder zuallererst im Kopf entstehen läßt.
          </h3>
        </div>
        <div class="landFlexContainer start">
          <h2 class="midFontSize">
            Wir stehen also für das Gegenteil von Kopfhörer, VR-Brille und Einzelerlebnis.
          </h2>
        </div>
    </div>
    </div>
  </div>
</template>


<style scoped>
.landFlexWrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
.landFlexContainer {
  display: flex;
  align-items: center;
  align-self: flex-end;
  height: 60%;
  width: 300px;
}
.landFlexContainer.start {
  align-self: flex-start;
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
      padding: 20px;
      width: auto;
    }
    .landFlexContainer, .landFlexContainer.start {
      align-self: center;
      height: auto;
    }
}
</style>


<script>
export default {
  props: ["id"]
};
</script>
