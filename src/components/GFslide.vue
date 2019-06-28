<template>
  <div id="gfslide" class="transitionWrap">
    <div :class="{reverseD: isMatt}" class="gfWrapFlex midFontSize">
      <p v-html="message.p" class="preventSwipe gfTextWrap"></p>
      <router-link class="gfClickWrap" to="/about">
        <h2 class="display" v-html="message.h2"></h2>
      </router-link>
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
}
.reverseD {
  flex-direction: row-reverse;
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
  width: 30%;
}
.display {
  margin-bottom: 50%;
  align-self: flex-end;
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
    height: 50%;
    padding: 0px;
  }
  .gfWrapFlex {
    flex-direction: column;
    justify-content: center;
  }
  .reverseD {
    flex-direction: column-reverse;
  }
  .display {
    display: none;
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
            "• hat 2013 <a href=\"https://www.thecontentdome.de/#/\">the content dome GmbH</a> gegründet und „Tabaluga und die Zeichen der Zeit“ als 360°-Erlebnis produziert<br><br>" +
            "• und hat noch einiges vor ! ...<br><br><br>"
        },
        eng: { h2: "", p: "" }
      },
      matthias: {
        ger: {
          h2: "Matthias Krause",
          p:
            'Liegt tatsächlich ein alter Goldschatz vor der Küste des Ferienortes von Justus, Peter und Bob? Prompt vergessen die drei ?<span class="theRed">?</span><span class="theBlue">?</span> ' +
            "ihren Ärger über den verregneten Urlaub und nehmen die Jagd nach den versunkenen Reichtümern auf. " +
            " Sie tauchen ein in die geheimnisvolle Geschichte des berühmtesten Dorfbewohners und heben ein dunkles " +
            "Geheimnis… <br>Autor André Marx, Hörspielbearbeitung Kai Schwind"
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
      var elements = document.getElementsByClassName('preventSwipe');
      Array.from(elements).forEach((el) => {
        el.addEventListener("wheel", this.stopPropagate)
        el.addEventListener("touchstart", this.stopPropagate);
        el.addEventListener("touchend", this.stopPropagate);
        
      })
    },
    removePrevent: function() {
      var elements = document.getElementsByClassName('preventSwipe');
      Array.from(elements).forEach((el) => {
        el.removeEventListener("wheel", this.stopPropagate)
        el.removeEventListener("touchstart", this.stopPropagate);
        el.removeEventListener("touchend", this.stopPropagate);
      })
    }
  },
  created: function() {
    this.changeContent();
  },
  mounted: function() {
    this.preventSwipe();
  }, destroyed() {
    this.removePrevent();
  }
};
</script>
