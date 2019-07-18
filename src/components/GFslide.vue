<template>
  <div id="gfslide" class="transitionWrap">
    <div :class="{reverseD: isMatt}" class="gfWrapFlex midFontSize">
      <router-link class="gfClickWrap" to="/about">
        <h2 class="display" v-html="message.h2"></h2>
      </router-link>
      <h2 class="name" v-html="message.h2"></h2>
      <p v-html="message.p" class="preventSwipe gfTextWrap"></p>
    </div>
  </div>
</template>
      


<style scoped>
.gfWrapFlex {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  /* padding-left: 100px; */
  flex-direction: row-reverse;
}
.reverseD {
  flex-direction: row;
}
.gfTextWrap {
  overflow-y: auto;
  width: 45%;
  height: 50%;
  padding-left: 10%;
  padding-right: 10%;
}
.gfClickWrap {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 60%;
}
.display {
  margin-bottom: 50px;

  /* padding: 5%; */
  align-self: flex-end;
}
.name {
  display: none;
}
@media only screen and (max-width: 1024px) {
  .gfTextWrap {
    width: 55%;
  }
}
@media only screen and (max-width: 768px) {
  .gfTextWrap {
    width: 70%;
    height: 40%;
    padding: 0px;
  }
  .gfClickWrap {
    width: 90%;
    height: 40%;
    padding: 0px;
  }
  .gfWrapFlex {
    flex-direction: column;
    justify-content: center;
  }
  .reverseD {
    flex-direction: column;
  }
  .display {
    display: none;
  }
  .name {
    display: flex;
    height: 10%;
    justify-content: center;
    align-items: center;
  }
}
</style>


<script>
export default {
  data: function() {
    return {
      isMatt: false,
      message: {
        h2: "",
        p: ""
      },
      markus: {
        ger: {
          h2: "Markus Schäfer",
          p:
            "<br>• Werbekaufmann, Diplom-Betriebswirt, Marketing- und Content-Experte<br><br>" +
            "• arbeitet seit mehr als 30 Jahren in den Bereichen Content, Marken und Medien<br><br>" +
            "• war angestellt bei BMG Ariola, The Walt Disney Company EMEA, [PIAS] Recordings<br><br>" +
            "• als selbstständiger Unternehmer seit 2002 u.a. tätig für OTTO Group, InBev, STAGE Entertainment, G+J, Warner Strategic Marketing, Union Investment, Reeperbahnfestival<br><br>" +
            "• hat 2013 the content dome GmbH gegründet und „Tabaluga und die Zeichen der Zeit“ als 360°-Erlebnis produziert<br><br>" +
            "<br><br><br>"
        },
        eng: { h2: "", p: "" }
      },
      matthias: {
        ger: {
          h2: "Matthias Krause",
          p:
            "<br>• Rechtsanwalt, Medien- und Lizenz-Experte<br><br>" +
            "• startete seine Tätigkeit im Medienbereich zunächst als Trickfilmer, Produktions – und Herstellungsleiter (Mitarbeit u.a. „Werner-beinhart“, „Der kleene Punker“, „Die Ottfianten“<br><br>" +
            "• ab 1993 in der Musikindustrie als Anwalt bei BMG Ariola und SONY MUSIC," +
            "• seit 2012 mit eigener Kanzlei in Hamburg<br><br>" +
            "<br><br><br>"
        },
        eng: { h2: "", p: "" }
      }
    };
  },
  methods: {
    changeContent: function() {
      if (this.$route.params.id === "markus_schaefer") {
        this.message.h2 = this.markus.ger.h2;
        this.message.p = this.markus.ger.p;
        this.isMatt = false;
        console.log(this);
      } else {
        this.message.p = this.matthias.ger.p;
        this.message.h2 = this.matthias.ger.h2;
        this.isMatt = true;
      }
    },
    stopPropagate: function(e) {
      e.stopPropagation();
    },
    preventSwipe: function() {
      var elements = document.getElementsByClassName("preventSwipe");
      Array.from(elements).forEach(el => {
        el.addEventListener("wheel", this.stopPropagate);
        el.addEventListener("touchstart", this.stopPropagate);
        el.addEventListener("touchend", this.stopPropagate);
      });
    },
    removePrevent: function() {
      var elements = document.getElementsByClassName("preventSwipe");
      Array.from(elements).forEach(el => {
        el.removeEventListener("wheel", this.stopPropagate);
        el.removeEventListener("touchstart", this.stopPropagate);
        el.removeEventListener("touchend", this.stopPropagate);
      });
    }
  },
  created: function() {
    this.changeContent();
  },
  mounted: function() {
    this.preventSwipe();
  },
  destroyed() {
    this.removePrevent();
  }
};
</script>
