<template>
  <div class="checkoutScreen">
    <Navbar_Component />
    <Breadcrumb_Component />

    <h1 style="font-family: Saira, sans-serif">Check Out</h1>
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
export default {
  name: "CheckOutView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
  },
};
</script>

<style scoped>
.checkoutScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
}
</style>
