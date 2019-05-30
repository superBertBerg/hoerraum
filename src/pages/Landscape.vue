<template>
  <div id="landscape">
    <div class="textLeft">
      <div class="flexWrap">
        <div class="flexCenter">
          <h3 class="midFontSize">
            Alle setzen auf Bewegtbild. Wir setzen auf die Magie der
            <span class="theRed">Töne</span>,
            <span class="theRed">Klänge</span> un des gesprochenen Wortes, die Bilder zuallererst im Kopf entstehen läßt.
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.textLeft {
  position: absolute;
  height: 60%;
  width: 300px;
  left: 0;
  bottom: 0;
}
@media only screen and (max-width: 500px) {
    .textLeft {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
}
</style>


<script>
export default {
  props: ["id"]
};
</script>
