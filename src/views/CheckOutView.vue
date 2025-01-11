<template>
  <div class="checkoutScreen">
    <Navbar_Component />

    <div class="load" v-if="isLoading">
      <LoadingView />
    </div>

    <div v-else>
      <Breadcrumb_Component />

      <div class="title">
        <h1 style="font-family: Saira, sans-serif">Check Out</h1>
      </div>

      <div class="container">
        <div class="left">
          <Location_Component @update:location="updateLocation" />
          <PaymentMethod_Component
            style="margin-top: 5%"
            @update:paymentMethod="updatePaymentMethod"
          />
        </div>
        <div class="right">
          <CardCheckProduct_Component
            style="margin-bottom: 3%"
            class="cardCheck"
            v-for="item in checkOutItems"
            :key="item.id"
            :id="item.id"
            :imageProduct="item.image"
            :discountProduct="item.discount"
            :nameProduct="item.name"
            :priceProduct="item.price"
            :quantity="item.quantity"
            :color-product="item.color"
            :size-product="item.size"
            :fromCheckout="true"
            :showDeleteButton="false"
          />
          <ConfirmSum_Component />
        </div>
      </div>

      <div class="payNow">
        <Button_Component
          name-button="Pay Now"
          color-button="#FFFFFF"
          background-color-button="#958383"
          height-button="50px"
          width-button="200px"
          @click="handlePayNow"
        />
      </div>

      <Footer_Component style="margin-top: 5%" />
    </div>

    <div class="showSuccess" v-if="isPaymentSuccess">
      <PaymentSuccess_Component
        :key="isPaymentSuccess"
        :totalPrice="recentTotalPrice"
        :paymentMethod="selectedPaymentMethod"
        :transactionId="transactionId"
        :transactionDate="transactionDate"
        :location="selectedLocation"
      />
    </div>

    <!-- Display recent total price -->
    <div v-if="recentTotalPrice > 0" class="recent-order-summary">
      <h2>Most Recent Order</h2>
      <p>Total Price: ${{ recentTotalPrice.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import { useCheckOut } from "@/stores/useCheckOut";
import { useOrderHistory } from "@/stores/useOrderHistory";
import { useCartStore } from "@/stores/useCartStore";
import Location_Component from "@/components/Checkout/Location_Component.vue";
import PaymentMethod_Component from "@/components/Checkout/PaymentMethod_Component.vue";
import ConfirmSum_Component from "@/components/Card/ConfirmSum_Component.vue";
import Button_Component from "@/components/Button_Component.vue";
import CardCheckProduct_Component from "@/components/Card/CardCheckProduct_Component.vue";
import PaymentSuccess_Component from "@/components/Checkout/PaymentSuccess_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import LoadingView from "./LoadingView.vue";

export default {
  name: "CheckOutView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
    Location_Component,
    PaymentMethod_Component,
    CardCheckProduct_Component,
    Footer_Component,
    Button_Component,
    LoadingView,
    PaymentSuccess_Component,
    ConfirmSum_Component,
  },
  setup() {
    const cartStore = useCartStore();
    const isLoading = ref(true);
    const isPaymentSuccess = ref(false);
    const selectedPaymentMethod = ref("");
    const transactionId = ref("TXN123456789");
    const transactionDate = ref(new Date().toLocaleString());

    const subtotalPrice = computed(() => cartStore.getSubtotal);

    const discountPrice = ref(parseFloat(localStorage.getItem("discountPrice")) || 0);

    const shippingPrice = 0.25;

    const totalPrice = computed(() => {
      return subtotalPrice.value + shippingPrice - discountPrice.value;
    });

    watch(discountPrice, (newValue) => {
      if (newValue <= 0) {
        localStorage.setItem("discountPrice", "0");
      }
    });

    const checkOutStore = useCheckOut();
    const orderHistoryStore = useOrderHistory();
    const selectedLocation = ref("");

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    });

    const updateLocation = (location) => {
      console.log("Selected Location:", location);
      selectedLocation.value = location;
    };

    const updatePaymentMethod = (method) => {
      console.log("Selected Payment Method:", method);
      selectedPaymentMethod.value = method;
    };

    const resetDiscount = () => {
      localStorage.setItem("discountPrice", "0");
    };

    const handlePayNow = () => {
      if (!selectedPaymentMethod.value) {
        alert("Please select a payment method.");
        return;
      }

      if (!selectedLocation.value) {
        alert("Please select a shipping location.");
        return;
      }

      console.log("Processing payment with method:", selectedPaymentMethod.value);

      isPaymentSuccess.value = true;

      resetDiscount();

      transactionId.value = `TXN${Math.floor(Math.random() * 1000000000)}`;
      const order = {
        id: transactionId.value,
        date: transactionDate.value,
        items: checkOutStore.checkOut.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount,
          finalPrice: item.finalPrice,
          color: item.color,
          size: item.size,
        })),
        totalPrice: totalPrice.value,
        paymentMethod: selectedPaymentMethod.value,
        shippingLocation: selectedLocation.value,
      };

      orderHistoryStore.addOrderFromCheckout(
        order.items,
        order.totalPrice,
        order.paymentMethod,
        order.shippingLocation
      );

       setTimeout(() => {
    cartStore.clearCart(); 
  }, 20000); 


      setTimeout(() => {
        isPaymentSuccess.value = false;
      }, 5000);
    };

    const recentTotalPrice = computed(() => {
      return orderHistoryStore.mostRecentOrderTotalPrice;
    });

    return {
      isLoading,
      isPaymentSuccess,
      selectedPaymentMethod,
      transactionId,
      transactionDate,
      updateLocation,
      updatePaymentMethod,
      handlePayNow,
      totalPrice,
      selectedLocation,
      recentTotalPrice,
    };
  },

  computed: {
    checkOutItems() {
      const store = useCheckOut();
      return store.checkOut.map((item) => {
        const discountPercentage = parseFloat(item.discount.replace("%", "")) || 0;
        const discountPrice = (item.price * discountPercentage) / 100;
        const finalPrice = item.price - discountPrice;
        return { ...item, discountPrice, finalPrice };
      });
    },
    shippingPrice() {
      return 0.25;
    },
    subtotalPrice() {
      return this.checkOutItems.reduce(
        (total, item) => total + item.finalPrice * item.quantity,
        0
      );
    },
    totalDiscountPrice() {
      return this.checkOutItems.reduce(
        (total, item) => total + item.discountPrice * item.quantity,
        0
      );
    },
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
.checkoutScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
  position: relative;
}
.showSuccess {
  position: absolute;
  top: 30%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2%;
  margin-left: 1%;
}

#history {
  cursor: pointer;
  color: #7b7474;
  font-size: 26px;
}
#history:hover {
  transition: all 0.3s ease;
  color: #d90f0f;
}
.container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  padding: 2%;
}
.left {
  width: 50%;
  margin-left: 5%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.cardCheck {
  width: 624px;
  height: 180px;
}

.right {
  height: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
.payNow {
  width: 100%;
  margin-left: 23%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}

@media (max-width: 480px) {
  .checkoutScreen {
    margin-top: 5%; 
  }

  .cardCheck {
    width: 100%; 
    height: auto;
  }

  .payNow {
    margin-left: 0;
    margin-top: 20px; 
    justify-content: center;
  }

  h1 {
    font-size: 1.5rem; 
  }

  .container {
    padding: 5%;
    width: 100%;
  }

  .left,
  .right {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
