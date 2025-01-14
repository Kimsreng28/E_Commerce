<template>
  <div class="orderScreen">
    <Navbar_Component />

    <div class="load" v-if="isLoading">
      <LoadingView />
    </div>
    <div class="container" v-else>
      <Breadcrumb_Component />

      <!-- Show this block if the order history is empty -->
      <div
        v-if="orderHistoryStore.orderHistory.length === 0"
        class="emptyOrder"
      >
        <img
          src="@/assets/images/Order/empty-order.png"
          alt="No Orders"
          class="emptyImage"
        />
        <p class="emptyMessage">You have no orders yet.</p>
        <Button_Component
          class="shopNowBtn"
          name-button="Shop Now"
          backgroundColor-button="#958383"
          height-button="50px"
          width-button="200px"
          color-button="#FFFFFF"
          @click="goToShop"
        />
      </div>

      <!-- Show order history if it exists -->
      <div v-else>
        <div class="title">
          <p>Ordered</p>
        </div>
        <OrderHistory_Component />
      </div>
    </div>

    <Footer_Component class="footer" />
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Button_Component from "@/components/Button_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import OrderHistory_Component from "@/components/OrderHistory_Component.vue";
import { useCheckOut } from "@/stores/useCheckOut";
import { useOrderHistory } from "@/stores/useOrderHistory";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import LoadingView from "./LoadingView.vue";

export default {
  name: "OrderView",
  components: {
    Navbar_Component,
    LoadingView,
    Breadcrumb_Component,
    Footer_Component,
    OrderHistory_Component,
    Button_Component,
  },
  setup() {
    const isLoading = ref(true);
    const orderHistoryStore = useOrderHistory();
    const checkoutStore = useCheckOut();
    const router = useRouter();
    // Redirect to the shop page
    const goToShop = () => {
      router.push("/category");
    };

    onMounted(() => {
      if (checkoutStore.checkOut.length > 0) {
        orderHistoryStore.addOrderFromCheckout(checkoutStore.checkOut);
        checkoutStore.clearCheckOut();
      }

      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    });

    return {
      isLoading,
      orderHistoryStore,
      goToShop,
    };
  },
};
</script>

<style scoped>
.emptyOrder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 50px 0;
}
.emptyImage {
  max-width: 225px;
  margin-bottom: 20px;
}
.emptyMessage {
  font-family: Saira, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #564949;
  margin-bottom: 20px;
}
.shopNowBtn {
  border: none;
  border-radius: 10px;
}

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
