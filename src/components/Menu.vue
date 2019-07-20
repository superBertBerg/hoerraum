<template>
  <div id="menu" v-click-outside="closeMenu">
    
    <!-- <span style="font-size:30px;cursor:pointer" v-on:click="toggleNav()">&#9776;</span> -->
    <div class="sideNav" v-bind:class="{open: toggled}">
      <!-- <a href="#" class="closebtn" v-on:click="closeNav(this)">&times;</a> -->
      <router-link class="midFontSize" to="/">Start</router-link>
      <router-link class="midFontSize" to="/expose">Die <span class="theRed">3</span></router-link>
      <!-- <router-link to="/expose/dream">- - <span class="theRed">-</span> - -</router-link> -->
      <router-link class="midFontSize" to="/portfolio">Produktionen</router-link>
      <router-link v-show="production" class="subLink smallFontSize" to="/portfolio/die_drei_fragezeichen">Die drei <span class="theRed">?</span><span class="theBlue">?</span>?</router-link>
      <router-link v-show="production" class="subLink last smallFontSize" to="/portfolio/der_raeuber_hotzenplotz">Der Räuber Hotzenplotz</router-link>
      <router-link class="midFontSize" to="/about">Über uns</router-link>
      <router-link v-show="about" class="subLink smallFontSize" to="/about/gf/markus_schaefer">Markus Schäfer</router-link>
      <router-link v-show="about" class="subLink last smallFontSize" to="/about/gf/matthias_krause">Matthias Krauße</router-link>
      <router-link class="midFontSize" to="/info/detail/contact">Kontakt</router-link>
    </div>
    <div class="hamburger" v-on:click="toggleNav()" v-bind:class="{openH: toggled}">
      <span class="hamburger__top-bun"></span>
      <span class="hamburger__bottom-bun"></span>
    </div>
  </div>
</template>


<style scoped>
/* Hamburger */

.hamburger {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    width: 96px;
    height: 48px;
    top: 20px;
    transition: all 0.25s;
}

.hamburger__top-bun,
.hamburger__bottom-bun {
    content: '';
    display: block;
    position: absolute;
    left: 30px;
    width: 45px;
    height: 2px;
    background: #f1f1f1;
    transform: rotate(0);
    transition: all 0.25s;
}

.hamburger:hover [class*="-bun"] {
    background: #818181;
}

.hamburger__top-bun {
    top: 23px;
    transform: translateY(-6px);
}

.hamburger__bottom-bun {
    bottom: 23px;
    transform: translateY(6px);
}

.openH {
    transform: rotate(90deg);
}

.openH .hamburger__top-bun {
    transform: rotate(45deg) translateY(0px);
}

.openH .hamburger__bottom-bun {
    transform: rotate(-45deg) translateY(0px);
}

/* Menu */

.sideNav {
    position: fixed;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: black;
    height: 100%;
    width: auto;
    padding: 10px;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    transition: all 0.25s;
    transform: translateX(-250px)
}
.sideNav.open {
    transform: translateX(0px)
}
.sideav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}
.subLink {
  /* text-align: left; */
}
.last {
  margin-bottom: 20px;
}
@media only screen and (max-width: 500px) {
    /* Menu */
    .hamburger {
        width: 48px;
        top: 10px;
    }
    .hamburger__top-bun,
    .hamburger__bottom-bun {
        left: 15px;
        width: 18px;
        height: 1px;
    }
    .hamburger__top-bun {
        transform: translateY(-3px);
    }
    .hamburger__bottom-bun {
        transform: translateY(3px);
    }
}
</style>

<script>
export default {
  data: function() {
    return {
      toggled: false,
      about: false,
      production: false
    };
  },
  methods: {
    toggleNav: function() {
      if (!this.toggled) {
        this.toggled = true;
      } else {
        this.toggled = false;
      }
    },
    closeMenu: function(event) {
      if (this.toggled) {
        this.toggled = false;
      }
    }
  },
  watch: {
    '$route' (to, from) {
      (to.path.includes("portfolio")) ? this.production = true : this.production = false;
      (to.path.includes("about")) ? this.about = true : this.about = false;
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          console.warn(warn);
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>
