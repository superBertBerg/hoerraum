<template>
  <svg
    class="animated-lines"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 120"
  >
    <!-- <defs>
      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.2"></feGaussianBlur>
      </filter>
    </defs>-->
  </svg>
</template>


<style scoped>
svg {
  height: auto;
  width: 100%;
}
</style>


<script>
export default {
  data: function() {
    return {
      framesPerSecond: 24,
      ampl: 10,
      minSpeed: 40,
      maxSpeed: 90,
      numberOfLines: 3,
      lineDataArr: [],
      newPathEl: document.createElementNS("http://www.w3.org/2000/svg", "path")
    };
  },
  methods: {
    createPathString: function() {
      var completedPath = "",
        comma = ",";
      for (var i = 0; i < this.numberOfLines; i++) {
        var path = this.lineDataArr[i];

        var current = {
          x: this.ampl * Math.sin(path.counter / path.sin) + path.startX,
          y: this.ampl * Math.cos(path.counter / path.cos) + path.startY
        };

        var newPathSection =
          "M" +
          // starting point
          path.startX +
          comma +
          path.startY +
          // quadratic control point
          " Q" +
          // P2 xachse
          path.pointX +
          // P2 yachse
          comma +
          (current.y * 1).toFixed(3) + // 1.5 to amp up the bend a little
          " " +
          // P3 xachse
          (current.x / 10 + path.centerX).toFixed(3) +
          comma +
          // P3 yachse
          (current.y / 5 + path.centerY).toFixed(3) +
          // end point with quadratic reflection (T) (so the bottom right mirrors the top left)
          " T" +
          path.endX +
          comma +
          path.endY;
        path.counter++;

        completedPath += newPathSection;
      }

      return completedPath;
    },
    animLoop: function() {
      var scope = this;
      setTimeout(function() {
        scope.newPathEl.setAttribute("d", scope.createPathString());
        requestAnimationFrame(function() {
          scope.animLoop();
        });
      }, 1000 / this.framesPerSecond);
    },
    createLines: function() {
      var svgEl = document.querySelector(".animated-lines");
      for (var i = 0; i < this.numberOfLines; i++) {
        var lineDataObj = {
          counter: this.randomRange(1, 500), // a broad counter range ensures lines start at different cycles (will look more random)
          startX: -20,
          startY: 90,
          endX: 220, // viewbox = 200
          endY: 80, // viewbox = 120
          sin: this.randomRange(this.minSpeed, this.maxSpeed),
          cos: this.randomRange(this.minSpeed, this.maxSpeed),
          pointX: this.randomRange(50, 50),
          centerX: this.randomRange(75, 125),
          centerY: 80
        };

        this.lineDataArr.push(lineDataObj);
      }

      // once the path elements are created, start the animation loop
      svgEl.appendChild(this.newPathEl);
      // newPathEl.setAttribute("style", "filter:url(#blur)");
      this.animLoop();
    },
    randomRange: function(min, max) {
      return ~~(Math.random() * (max - min + 1)) + min;
    },
    impactWater: function() {
      this.lineDataArr.forEach(element => {
        element.sin = this.randomRange(5, 15);
        element.cos = this.randomRange(5, 15);
      });
      this.ampl = this.randomRange(20, 30);
    }
  },
  mounted: function() {
    this.createLines();
  }
};
</script>
