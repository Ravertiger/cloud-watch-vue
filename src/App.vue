<template>
  <div id="app">
    <router-view />
    <div class="footer">
      <h3>CopyRights @TGTSirius</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

h3 {
  text-align: center;
  font-size: 0.5rem;
  font-weight: 400;
}
</style>
