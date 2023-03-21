<template>
  <div class="toggle-wrapper">
    <label class="toggle">
      <input
        class="checkbox"
        type="checkbox"
        :checked="mode === 'dark' ? 'checked' : false"
        @change="$emit('toggle')"
      />
      <span class="toggler"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["mode"],

  
//   mounted() {
//     if (localStorage.moder) this.moder = localStorage.moder;
//   },
//   watch: {
//     moder(newMode) {
//       localStorage.moder = newMode;
//     },
//   },
};
</script>

<style>
.toggle {
  position: relative;
  display: inline-block;
  height: 34px;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
  
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggler {
  position: absolute;
  cursor: pointer;
  background: #15202b;
  height: 34px;
  width: 20px;
  height: 20px;
  left: 0;
  background: url("../assets/images/icon-moon.svg") no-repeat;
}

input:checked + .toggler {
  background: url("../assets/images/icon-sun.svg") no-repeat;
}
</style>
