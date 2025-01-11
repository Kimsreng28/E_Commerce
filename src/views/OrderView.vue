<template>
  <div class="orderScreen">
    <Navbar_Component />

    <div class="load" v-if="isLoading">
      <LoadingView />
    </div>
    <div class="container" v-else>
      <Breadcrumb_Component />

      <div class="title">
        <p>Ordered</p>
      </div>

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
import { useCartStore } from "@/stores/useCartStore";
import { useCheckOut } from "@/stores/useCheckOut";
import { useOrderHistory } from "@/stores/useOrderHistory";
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
    const orderHistoryStore = useOrderHistory();
    const checkoutStore = useCheckOut();
    const cartStore = useCartStore();

    onMounted(() => {
      if (checkoutStore.checkOut.length > 0) {
        orderHistoryStore.addOrderFromCheckout(checkoutStore.checkOut);
        checkoutStore.clearCheckOut();
      }

      cartStore.clearCart();

      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    });

    return {
      isLoading,
    };
  },
};
</script>

<style scoped>
.title {
  width: 95%;
  margin-top: 2%;
  margin-left: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.title p {
  font-family: Saira, sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #564949;
}

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
