<template>
  <div class="checkoutScreen">
    <Navbar_Component />
    <Breadcrumb_Component />

    <h1 style="font-family: Saira, sans-serif">Check Out</h1>

    <div class="container">
      <div class="left">
      <Location_Component />
      </div>
      <div class="right"></div>
    </div>
    <Footer_Component style="margin-left: 4px;"/>
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Location_Component from "@/components/Checkout/Location_Component.vue";
export default {
  name: "CheckOutView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
    Footer_Component,
    Location_Component
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
h1 {
  padding: 2%;
  margin-left: 1%;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  flex-grow: 1;
}
.left {
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-left: 5%;
}

.right {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

</style>
