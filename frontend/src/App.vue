<template>
  <div id="app">
    <h1>Welcome to your diary!</h1>
    <Diary/>
  </div>
</template>

<script>
import Diary from './views/Diary.vue'

export default {
  name: 'App',
  components: {
    Diary
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
