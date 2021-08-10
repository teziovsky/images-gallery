<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import Home from '@/views/Home.vue';

export default {
  name: 'App',
  components: {
    Home,
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: $background-color;
}
</style>
