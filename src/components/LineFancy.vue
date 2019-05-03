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
    </defs> -->
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
      ampl: 10,
      minSpeed: 40,
      maxSpeed: 90
    };
  },
  mounted: function() {
    var svgEl = document.querySelector(".animated-lines");
    var framesPerSecond = 24;
    var randomRange = function(min, max) {
      return ~~(Math.random() * (max - min + 1)) + min;
    };
    var numberOfLines = 3,
      lineDataArr = [];

    var createPathString = function(ampl) {
      var completedPath = "",
        comma = ",";
      for (var i = 0; i < numberOfLines; i++) {
        var path = lineDataArr[i];

        var current = {
          x: ampl * Math.sin(path.counter / path.sin) + path.startX,
          y: ampl * Math.cos(path.counter / path.cos) + path.startY
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
    };

    var createLines = function(ampl, minSpeed, maxSpeed) {
      var newPathEl = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        )
        // higher is slower
        // minS = minSpeed,
        // maxS = maxSpeed;

      // create an arr which contains objects for all lines
      // createPathString() will use this array
      for (var i = 0; i < numberOfLines; i++) {
        var lineDataObj = {
          counter: randomRange(1, 500), // a broad counter range ensures lines start at different cycles (will look more random)
          startX: -20,
          startY: 90,
          endX: 220, // viewbox = 200
          endY: 90, // viewbox = 120
          sin: randomRange(minSpeed, maxSpeed),
          cos: randomRange(minSpeed, maxSpeed),
          pointX: randomRange(50, 50),
          centerX: randomRange(75, 125),
          centerY: 80
        };

        lineDataArr.push(lineDataObj);
      }

      function animLoop(ampl) {
        setTimeout(function() {
          newPathEl.setAttribute("d", createPathString(ampl));
          requestAnimationFrame(function() {
            animLoop(ampl);
          });
        }, 1000 / framesPerSecond);
      }

      // once the path elements are created, start the animation loop
      svgEl.appendChild(newPathEl);
     // newPathEl.setAttribute("style", "filter:url(#blur)");
      animLoop(ampl);
    };

    createLines(this.ampl, this.minSpeed, this.maxSpeed);
  }
};
</script>
