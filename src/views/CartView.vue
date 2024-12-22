<template>
  <div class="cartScreen">
    <Navbar_Component />
    <div v-if="isLoading" class="load">
      <LoadingView />
    </div>

    <div v-else>
      <Breadcrumb_Component />

      <div class="title">
        <p>Cart Check</p>
      </div>

      <div class="cartCheck">
        <div class="itemCheck">
          <CardCheckProduct_Component
            class="cardCheck"
            v-for="item in cartItems"
            :key="item.id"
            :id="item.id"
            :imageProduct="item.image"
            :discountProduct="item.discount"
            :nameProduct="item.name"
            :priceProduct="item.price"
            :quantity="item.quantity"
            :color-product="item.color"
            :size-product="item.size"
          />
        </div>

        <div class="totalSummary">
          <PriceSummary_Component
            titleSummary="Order summary"
            :subtotalPrice="subtotalPrice"
            :shippingPrice="shippingPrice"
            :discountPrice="totalDiscountPrice"
            :totalPrice="totalPrice"
            :coupon-price="couponPrice"
          />
        </div>
      </div>

      <div class="buttonOfScreen">
        <Button_Component
          nameButton="Return To Shop"
          backgroundColorButton="#958383"
          widthButton="250px"
          heightButton="60px"
          colorButton="#FFFFFF"
          @click="moveAllToShop"
        />
        <Button_Component
          class="btnCheckOut"
          name-button="Process To Check Out"
          backgroundColor-button="#564949"
          height-button="60px"
          width-button="300px"
          color-button="#FFFFFF"
          @click="goToCheckOut"
        />
      </div>

      <Footer_Component class="footer" />
    </div>
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Button_Component from "@/components/Button_Component.vue";
import CardCheckProduct_Component from "@/components/Card/CardCheckProduct_Component.vue";
import PriceSummary_Component from "@/components/Card/PriceSummary_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import { useCartStore } from "@/stores/useCartStore";
import { useCheckOut } from "@/stores/useCheckOut";
import LoadingView from "./LoadingView.vue";
export default {
  name: "CartView",
  components: {
    Navbar_Component,
    Footer_Component,
    Breadcrumb_Component,
    Button_Component,
    CardCheckProduct_Component,
    PriceSummary_Component,
    LoadingView,
  },
  data() {
    return {
      isLoading: true, // Flag to show loading view
      couponCode: "", // Coupon code input
      couponPrice: 0, // Variable to store the applied coupon price
    };
  },
  computed: {
    cartItems() {
      const store = useCartStore();
      return store.cartItems.map((item) => {
        console.log("Cart Item:", item); // Log each item
        const discount = item.discount || "0%";
        const discountPercentage = parseFloat(discount.replace("%", "")) || 0;
        const discountPrice = (item.price * discountPercentage) / 100;
        console.log(
          "Discount Percentage:",
          discountPercentage,
          "Discount Price:",
          discountPrice
        );
        return {
          ...item,
          discountPrice: discountPrice, // Add calculated discountPrice to each item
        };
      });
    },
    shippingPrice() {
      return 0.25;
    },
    subtotalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    totalDiscountPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.discountPrice * item.quantity, // Ensure the discount price is multiplied by quantity
        0
      );
    },
    totalPrice() {
      return (
        this.subtotalPrice -
        this.totalDiscountPrice +
        this.shippingPrice -
        this.couponPrice
      );
    },
  },

  methods: {
    loadData() {
      // Simulate loading process with a delay (e.g., API call or fetching data)
      setTimeout(() => {
        this.isLoading = false; // After loading, set isLoading to false
      }, 1000); // 2 seconds delay for simulation
    },
    moveAllToShop() {
      const store = useCartStore();
      store.clearCart();
      alert("All items return to shop! Return.");
    },
    goToCheckOut() {
      const cartStore = useCartStore();
      const checkoutStore = useCheckOut();

      checkoutStore.clearCheckOut();
      cartStore.cartItems.forEach((item) => {
        checkoutStore.addToCheckOut(item);
      });

      this.$router.push({
        path: "/checkout",
        query: { totalPrice: this.totalPrice },
      });
    },
  },
  mounted() {
    this.loadData();
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
.cartScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
.cartCheck {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
  margin-left: 2%;
  margin-top: 2%;
}
.cardCheck {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.itemCheck {
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.totalSummary {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.buttonOfScreen {
  margin-top: 5%;
  margin-left: 2%;
  width: 96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer {
  margin-top: 5%;
}

/* Responsive design adjustments */
@media (max-width: 1024px) {
  .cartCheck {
    flex-direction: column;
    align-items: center;
  }

  .itemCheck {
    width: 100%; /* Full width on smaller screens */
    margin-bottom: 10px; /* Space between items */
  }

  .totalSummary {
    width: 100%; /* Full width for the total summary */
    margin-top: 20px; /* Add space between item and total */
  }

  .buttonOfScreen {
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }

  .title p {
    font-size: 28px; /* Adjust font size for smaller screens */
  }
}

@media (max-width: 768px) {
  .cartScreen {
    height: auto;
    margin-top: 3%;
  }

  .title p {
    font-size: 24px; /* Smaller font for title */
  }

  .itemCheck {
    width: 100%; /* Full width for cart items */
  }

  .totalSummary {
    width: 100%; /* Full width for total summary */
  }

  .buttonOfScreen {
    flex-direction: column;
    width: 100%;
    gap: 15px;
  }

  .footer {
    margin-top: 20px;
  }
}

@media (max-width: 480px) {
  .cartScreen {
    margin-top: 5%;
  }

  .title p {
    font-size: 20px; /* Reduce title font size for very small screens */
  }

  .itemCheck {
    width: 100%; /* Full width */
    margin-bottom: 15px; /* Add space between items */
  }

  .totalSummary {
    width: 100%; /* Full width for summary */
    margin-top: 20px;
  }

  .buttonOfScreen {
    flex-direction: column;
    width: 100%;
    gap: 15px;
    justify-content: center;
  }

  .footer {
    margin-top: 20px;
  }
}
</style>
