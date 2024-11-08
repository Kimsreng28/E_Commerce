<template>
  <div class="contactScreen">
    <Navbar_Component />
    <h1>Contact</h1>
  </div>
</template>

<script>
import Navbar_Component from "@/components/Navbar_Component.vue";
export default {
  name: "ContactView",
  components: {
    Navbar_Component,
  },
};
</script>

<style scoped>
.contactScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
}
</style>
