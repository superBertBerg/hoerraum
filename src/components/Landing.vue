<template>
  <div class="transitionWrap">
    <div class="centered pageHeadline">
      HO<span class="theRed">3</span>RRAUM
      <br>
      <div class="coming"> COMING SOON </div>
    </div>
    <div class="placeBottom fixedWidth">
      <LineFancy></LineFancy>
    </div>
  </div>
</template>

<style scoped>
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
<script>
import LineFancy from "./LineFancy.vue";

export default {
  props: ['id'],
  components: {
    LineFancy
  }
};
</script>
