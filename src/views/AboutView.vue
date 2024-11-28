<template>
  <div class="aboutScreen">
    <Navbar_Component />
    <Breadcrumb_Component />
    <h1>About</h1>
    <div>
      

      
    </div>
    <Footer_Component style="margin-left: 4px;"/>
  </div>

</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
export default {
  name: "AboutView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
    Footer_Component
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
