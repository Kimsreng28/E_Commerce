<template>
  <div class="aboutScreen">
    <Navbar_Component />
    <h1>About</h1>
  </div>
</template>

<script>
import Navbar_Component from "@/components/Navbar_Component.vue";
export default {
  name: "AboutView",
  components: {
    Navbar_Component,
  },
};
</script>

<style scoped>
.aboutScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
}
</style>
