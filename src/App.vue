<template>
  <div id="app" class="">
    <DiceCalc/>
  </div>
</template>

<script>
  import DiceCalc from './components/DiceCalc.vue'

  export default {
    name: 'App',
    components: {
      DiceCalc
    }
  }
</script>

<style>
  body {
    background-color: lightgray !important;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
  }
</style>
