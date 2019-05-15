<template>
  <div id="menu" v-click-outside="closeMenu">
    <div class="hamburger" v-on:click="toggleNav()" v-bind:class="{openH: toggled}">
      <span class="hamburger__top-bun"></span>
      <span class="hamburger__bottom-bun"></span>
    </div>
    <!-- <span style="font-size:30px;cursor:pointer" v-on:click="toggleNav()">&#9776;</span> -->
    <div class="sideNav midFontSize" v-bind:class="{open: toggled}">
      <!-- <a href="#" class="closebtn" v-on:click="closeNav(this)">&times;</a> -->
      <router-link to="/">Start</router-link>
      <router-link to="/dive">Dive</router-link>
      <router-link to="/landscape">Landscape</router-link>
      <router-link to="/portfolio">Portfolio</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/imag">Imag</router-link>
    </div>
  </div>
</template>



<style scoped>
/* Hamburger */

.hamburger {
    cursor: pointer;
    position: absolute;
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
    height: auto;
    width: auto;
    padding: 10px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    transition: 0.25s;
    margin-top: 200px;
    transform: translateX(-250px)
}

.sideNav.open {
    transform: translateX(0px)
}

.sideNav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    color: #818181;
    display: block;
    transition: 0.25s;
}

.sideNav a:hover {
    color: #f1f1f1;
}

.sideav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
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
      toggled: false
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
