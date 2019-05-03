<template>
  <div id="menu" v-click-outside="closeMenu">
    <div class="hamburger" v-on:click="toggleNav()" v-bind:class="{openH: toggled}">
      <span class="hamburger__top-bun"></span>
      <span class="hamburger__bottom-bun"></span>
    </div>
    <!-- <span style="font-size:30px;cursor:pointer" v-on:click="toggleNav()">&#9776;</span> -->
    <div class="sideNav midFontSize" v-bind:class="{open: toggled}">
      <!-- <a href="#" class="closebtn" v-on:click="closeNav(this)">&times;</a> -->
      <a><router-link to="/">Start</router-link></a>
      <a><router-link to="/dive">Dive</router-link></a>
      <a><router-link to="/diver">Diver</router-link></a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
  </div>
</template>



<style scoped>
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
