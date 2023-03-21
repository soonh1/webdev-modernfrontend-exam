<template>
  <div class="app" :class="mode">
    <NavigationBar :mode="mode" @toggle="toggle"/>
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  data() {
    return {
      mode: "light",
      
    };
    
  },
  components: {
    NavigationBar,
  },

  methods: {
    toggle() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    },
  },

  created() {
    this.$store.dispatch("getInvoicesItems");
  },

  mounted() {
    if(localStorage.mode) this.mode = localStorage.mode;
  },
  watch: {
    mode(newMode) {
      localStorage.mode = newMode;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/typography.scss";

// .dark .sidenav {
//   background: #192734
// }

.app {
  min-height: 100vh;
  background-color: #f3f3f3;
  color: #15202b;
  transition: background 0.3s ease-in-out;
}

.dark {
  background-color: $colorPrimaryDark;
  color: #f3f3f3;
}
</style>
