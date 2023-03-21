<template>
  <header>
    <div class="sidenav">
      <a class="logo" href="/"><svg class="logo__svg"></svg></a>
      <div class="personals">
        
        <!-- Toggle -->
        <Toggle :mode="mode" @toggle="$emit('toggle')" />
        <img
          alt="text"
          src="@/assets/images/image-avatar.jpg"
          class="personals__profile"
        />
      </div>
    </div>
  </header>
</template>

<script>
import Toggle from "@/components/Toggle";
export default {
  props: ["mode"],
  components: {
    Toggle,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.dark .sidenav {
  background-color: $backgroundColorPrimaryDark;
}

.sidenav {
  height: 100%;
  width: 100px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: $btnEditDarkModeColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px 20px 20px 0px;

  @include screenMin {    
      flex-direction: row;
      width: 100%;
      height: 93px;
      position: relative;
      border-radius: 0px;
   }
}

.logo {
  padding: 2rem;
  background-color: $backgroundDeepPurple;
  border-radius: 0px 20px 20px 0px;
}

.logo__svg {
  width: 36px;
  height: 26px;
  background-size: 28px 26px;
  background: url("../assets/images/logo.svg") no-repeat;
}

.personals {
  display: flex;
  flex-direction: column;
  align-items: center;

  @include screenMin {    
      flex-direction: row;
   }

  &__profile {
    border-radius: 40px;
    width: 2.5rem;
    margin: 2rem;
  }
}
</style>
