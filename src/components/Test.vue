<template>
  <div id="testFrame">
    <!-- <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="912.000000pt"
      height="1280.000000pt"
      viewBox="0 0 912.000000 1280.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path id="men"
          d="M4290 12794 c-30 -2 -125 -8 -210 -14 -1022 -72 -1923 -384 -2679
-927 -471 -339 -903 -767 -1297 -1285 l-105 -138 3 -87 3 -87 1184 -793 c651
-436 1188 -793 1192 -793 5 0 53 66 108 148 128 188 211 291 337 417 283 281
615 467 968 541 165 34 437 44 576 20 348 -60 670 -280 814 -555 130 -251 137
-616 16 -878 -48 -104 -84 -156 -161 -233 -175 -174 -448 -285 -788 -320 -61
-6 -376 -10 -767 -10 l-664 0 0 -1265 0 -1265 648 0 c842 0 1091 -13 1398 -75
321 -65 576 -195 709 -363 54 -67 136 -231 159 -318 26 -96 46 -260 46 -374 0
-452 -199 -763 -625 -975 -286 -143 -595 -205 -954 -192 -482 17 -886 187
-1351 570 -147 121 -387 372 -535 559 l-139 176 -41 -36 c-23 -21 -512 -496
-1088 -1056 l-1047 -1019 0 -79 0 -80 109 -121 c481 -537 1025 -952 1656
-1263 878 -432 1881 -644 2935 -621 1148 26 2077 316 2865 895 325 239 648
560 876 872 464 633 700 1430 676 2275 -7 227 -17 333 -48 520 -93 554 -315
1034 -686 1482 -172 208 -496 502 -727 659 -47 33 -86 63 -86 68 0 5 31 41 68
80 38 40 111 124 163 187 622 749 862 1412 819 2256 -30 582 -144 1035 -377
1492 -283 556 -760 1050 -1368 1416 -521 314 -1078 495 -1761 570 -131 15
-693 28 -824 19z"
        ></path>
      </g>
    </svg>-->
    <!-- <span class="dot"></span> -->
  </div>
</template>


<style scoped>
.dot {
  position: absolute;
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  -webkit-filter: blur(2px);
  filter: blur(2px);
}
</style>

<script>
// customelem define fuer initPointcloud!!
export default {
  data: function() {
    return {
      shiftPlot: {
        x: 300,
        y: 300
      },
      pointcoun: 100,
      scaleFact: 100,
      xelipsmax: 1,
      xelipsmin: 1.2,
      yelipsmax: 1.5,
      yelipsmin: 2.7,
      defuseFac: 100
    };
  },
  methods: {
    intiPointCloud: function() {
      var wrapel = document.getElementById("testFrame");
      var content = document.createAttribute;
      for (var i = 0; i < this.pointcoun; i++) {
        var temp = document.createElement("span");
        temp.classList.add("dot");
        var b = this.getCoords(i);
        temp.style.top = b.x + "px";
        temp.style.left = b.y + "px";
        wrapel.appendChild(temp);
      }

      // console.log(this.getCoords(2))
    },
    intiPointCloudArr: function() {
      var arr = [];
      var content = document.createAttribute;
      for (var i = 0; i < this.pointcoun; i++) {
        var temp = document.createElement("span");
        temp.classList.add("dot");
        var b = this.getCoords(i);
        temp.style.top = b.x + "px";
        temp.style.left = b.y + "px";
        arr.push(temp);
      }
      return arr;
      // console.log(this.getCoords(2))
    },
    getRandomArbitrary: function(min, max) {
      return Math.random() * (max - min) + min;
    },
    getCoords: function(t) {
      return {
        x:
          this.getRandomArbitrary(this.xelipsmin, this.xelipsmax) *
            Math.cos(t) *
            this.scaleFact +
          Math.round(Math.random()) * (this.defuseFac - this.defuseFac / 2) +
          this.shiftPlot.x,
        y:
          this.getRandomArbitrary(this.yelipsmin, this.yelipsmax) *
            Math.sin(t) *
            this.scaleFact +
          Math.round(Math.random()) * (this.defuseFac - this.defuseFac / 2) +
          this.shiftPlot.y
      };
    }
  },
  mounted: function() {
    //         console.log(this.$anime)
    //         this.$anime({
    //   targets: "#men",
    //   d: {
    //       value: "M11430 10260 c-39 -42 -64 -114 -90 -256 -12 -65 -28 -146 -36 -179 -35 -138 -170 -480 -190 -480 -6 0 -82 -92 -169 -205 -211 -274 -633 -800-788 -983 -314 -371 -337 -395 -432 -456 -230 -148 -621 -342 -1204 -598 -118-51 -215 -92 -217 -90 -1 1 4 17 13 35 22 46 99 98 159 106 493 71 972 7531101 1568 26 161 25 574 0 703 -84 422 -280 682 -561 742 -111 23 -261 3 -381-53 -151 -70 -357 -252 -479 -423 -489 -685 -602 -1742 -243 -2271 47 -69 148-164 216 -202 56 -32 60 -36 47 -54 -7 -10 -48 -86 -90 -169 -153 -300 -352-527 -716 -815 -407 -322 -858 -593 -1865 -1122 -518 -273 -635 -340 -710-408 l-30 -28 -180 13 c-99 8 -369 23 -600 35 -845 42 -1250 82 -1635 162l-145 30 -114 111 c-265 261 -666 719 -917 1047 -125 164 -127 166 -114 190 611 8 30 5 40 -8 25 -54 26 -198 5 -442 -66 -741 -215 -822 -409 -13 -31 -28-122 -42 -266 l-6 -55 54 47 c162 143 393 255 734 358 l160 48 14 56 c7 31 1656 20 56 3 -1 24 -26 45 -57 175 -252 705 -861 1013 -1165 l108 -106 115 -26c308 -68 601 -106 1065 -140 192 -15 364 -24 805 -46 286 -14 529 -29 565 -3522 -4 36 -15 49 -39 10 -18 29 -39 42 -46 13 -8 24 -18 24 -23 0 -5 -31 -80-69 -166 -102 -229 -159 -367 -380 -914 -221 -548 -304 -741 -400 -932 l-66-130 -165 -122 c-874 -648 -1300 -980 -1500 -1169 -47 -44 -93 -83 -102 -87-10 -3 -20 -18 -24 -32 -14 -56 56 -177 215 -374 51 -62 114 -147 142 -187 69-102 100 -136 193 -208 98 -76 121 -89 146 -81 29 9 25 28 -29 129 -61 113-99 225 -100 293 l0 51 -88 85 c-115 110 -206 190 -271 240 l-53 40 33 35c122 127 777 640 1416 1107 l272 200 94 190 c113 228 179 383 412 960 167 416295 723 397 950 31 69 41 102 33 107 -6 4 9 8 34 8 156 1 504 128 886 321 621316 1179 692 1649 1111 346 309 612 650 709 909 l17 45 222 42 c337 64 519 90777 112 298 26 423 41 690 86 l215 36 570 193 c730 247 1301 428 1317 419 7-5 33 -23 57 -42 73 -55 140 -84 207 -90 113 -9 166 25 264 167 33 47 107 133165 191 58 57 105 112 105 121 0 34 -26 43 -86 30 -108 -24 -390 -118 -459-153 -81 -40 -136 -59 -607 -209 -366 -116 -274 -93 -2168 -543 -245 -58 -494-113 -555 -121 -60 -9 -188 -29 -284 -45 -96 -17 -175 -29 -177 -27 -2 1 5929 134 62 518 222 1073 504 1251 633 96 70 666 753 1135 1360 82 105 155 192162 192 19 0 133 117 305 311 l146 165 5 80 c4 57 13 94 32 134 33 70 33 1190 212 -61 170 -138 229 -204 158z m-2346 -264 c224 -111 349 -386 380 -836 l5-75 -30 55 c-58 106 -116 144 -219 144 -79 0 -128 -22 -187 -87 -52 -57 -69-90 -89 -174 -34 -147 21 -304 130 -368 115 -67 258 -27 338 96 17 27 33 4834 46 7 -7 -49 -277 -80 -383 -81 -279 -226 -573 -369 -749 -23 -27 -42 -51-43 -53 -7 -11 -92 47 -163 113 l-83 77 -27 -27 -26 -26 70 -65 c39 -35 91-79 117 -96 26 -18 48 -36 48 -39 0 -13 -111 -108 -177 -152 -38 -24 -99 -57-138 -73 -63 -26 -82 -29 -180 -29 -102 0 -114 2 -170 30 -36 18 -88 57 -131100 -235 234 -315 738 -203 1287 119 588 435 1093 794 1270 44 22 73 31 16052 11 3 53 3 94 1 60 -3 88 -10 145 -39z m213 -868 c41 -39 57 -86 56 -163 -1-101 -55 -191 -130 -216 -121 -39 -210 156 -139 306 53 113 141 143 213 73zm-2037 -3262 c-8 -7 -74 -61 -147 -119 -487 -388 -1104 -766 -1638 -1002 -128-57 -357 -137 -425 -150 -31 -5 -26 -1 35 36 39 23 237 129 440 236 898 4721371 746 1690 977 51 37 71 47 45 22z"
    //   },
    //   easing: "easeOutQuad",
    //   duration: 2000,
    //   loop: false
    // });
    // let anime = this.$anime;

    // let tl = anime.timeline({
    //   //duration: 100,
    //   complete: function() { tl.restart(); }
    // });
    // var wrapel = document.getElementById("testFrame");
    // this.intiPointCloudArr().forEach(dot => {
    //   tl.add({
    //     begin: function() {
    //       anime({
    //         targets: dot,
    //         //filter: "blur(1px)",
    //         duration: 5000,
    //         // keyframes: [
    //         //   { rotate: 1800, translateX: 150, easing: 'linear', rotate: 1800 },
    //         //   // { rotate: 0, translateX: 150, rotate: 0 },
    //         //   // { rotate: 360, translateX: 150, rotate: 360 },
    //         // ],
    //         rotate: [{ vlaue: 360}],
    //         translateX: [{ value: 150, duration: 0 }],
    //         rotate: [{ vlaue: 360 }],
    //         easing: "linear",
    //         // loop: true,
    //         //delay: this.$anime.stagger(5) // increase delay by 100ms for each elements
    //       });
    //     }
    //   });

    //   wrapel.appendChild(dot);
    // });

    
    this.intiPointCloud();
    this.$anime({
      targets: ".dot",
      //filter: "blur(1px)",
      duration: 5000,
      keyframes: [
        { rotate: 1800, translateX: 150, easing: 'linear', rotate: 1800 },
        // { rotate: 0, translateX: 150, rotate: 0 },
        // { rotate: 360, translateX: 150, rotate: 360 },
      ],
      // rotate: [
      //   {vlaue: 360}
      // ],
      // translateX: [
      //   {value: 150, duration:0}
      // ],
      // rotate: [
      //   {vlaue: 360}
      // ],
      easing: "linear",
      loop: true,
      delay: this.$anime.stagger(5), // increase delay by 100ms for each elements
    });
  }
};
</script>
