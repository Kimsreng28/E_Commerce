<template>
  <div class="orderScreen">
    <Navbar_Component />

    <div class="load" v-if="isLoading">
      <LoadingView />
    </div>
    <div class="container" v-else>
      <Breadcrumb_Component />
      <OrderHistory_Component />
    </div>

    <Footer_Component class="footer" />
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import OrderHistory_Component from "@/components/OrderHistory_Component.vue";
import { onMounted, ref } from "vue";
import LoadingView from "./LoadingView.vue";
export default {
  name: "OrderView",
  components: {
    Navbar_Component,
    LoadingView,
    Breadcrumb_Component,
    Footer_Component,
    OrderHistory_Component,
  },
  setup() {
    const isLoading = ref(true);

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false; // Set loading to false after 3 seconds
      }, 1000);
    });

    return {
      isLoading,
    };
  },
};
</script>

<style scoped>
.load {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.orderScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
