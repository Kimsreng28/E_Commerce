<template>
  <div class="priceSummary">
    <div class="titleSummary">
      <p>{{ titleSummary }}</p>
    </div>

    <div class="subtotalPrice">
      <p>Subtotal:</p>
      <p>${{ subtotalPrice }}</p>
    </div>
    <div class="hr">
      <hr />
    </div>

    <div class="shipping">
      <p>Shipping:</p>
      <p>${{ shippingPrice }}</p>
    </div>
    <div class="hr">
      <hr />
    </div>

    <div class="discount">
      <p>Discount:</p>
      <p>${{ discountPrice.toFixed(2) }}</p>
    </div>
    <div class="hr">
      <hr />
    </div>

    <div class="discount">
      <p>Coupon:</p>
    </div>

    <div class="coupon">
      <input type="text" placeholder="Coupon Code" v-model="couponCode" />
      <Button_Component
        name-button="Apply coupon"
        backgroundColor-button="#958383"
        height-button="60px"
        width-button="245px"
        color-button="#FFFFFF"
        @click="applyCoupon"
      />
    </div>

    <div class="totalPrice">
      <p>Total:</p>
      <p>${{ calculatedTotalPrice.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/useCartStore";
import { computed, ref } from "vue";
import Button_Component from "../Button_Component.vue";

export default {
  name: "PriceSummary_Component",
  components: {
    Button_Component,
  },
  props: {
    titleSummary: String,
    subtotalPrice: String,
    shippingPrice: {
      type: String,
      default: 0,
    },
    discountPrice: {
      type: String,
      default: "0%",
    },
    totalPrice: String,
    couponPrice: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const cartStore = useCartStore();
    const couponCode = ref("");
    const couponPrice = ref(0);

    // discount catch from DetailProduct
    const discountPrice = ref(parseFloat(props.discountPrice) || 0);

    const subtotalPrice = computed(() => cartStore.getSubtotal);

    // Compute total price
    const calculatedTotalPrice = computed(() => {
      return (
        subtotalPrice.value +
        props.shippingPrice -
        discountPrice.value -
        couponPrice.value
      );
    });

    // Apply a discount based on the coupon code
    const applyCoupon = () => {
      if (couponCode.value === "DISCOUNT50") {
        couponPrice.value = subtotalPrice.value * 0.5; // Apply 50% discount
        alert("Coupon Applied! 50% discount.");
      } else {
        alert("Invalid coupon code!");
        couponPrice.value = 0; // Reset coupon if invalid
      }
    };
    // Handle the coupon code received from CardDiscount
    const handleCouponGenerated = (generatedCoupon) => {
      couponCode.value = generatedCoupon; // Store generated coupon code
    };

    return {
      subtotalPrice,
      calculatedTotalPrice,
      couponCode,
      discountPrice,
      applyCoupon,
      handleCouponGenerated,
    };
  },
};
</script>

<style scoped>
.priceSummary {
  width: 620px;
  height: 660px;
  border-radius: 10px;
  border: 1px solid #564949;
  display: flex;
  flex-direction: column;
}

.titleSummary {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 2%;
  padding: 2%;
}
.titleSummary p {
  font-size: 26px;
  font-weight: bold;
  color: #000000;
  font-family: Quicksand, sans-serif;
}

.subtotalPrice,
.shipping,
.discount {
  padding: 2%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
}

.subtotalPrice p,
.shipping p,
.discount p {
  font-size: 18px;
  font-weight: 500;
  color: #564949;
  font-family: Quicksand, sans-serif;
}

.hr {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2%;
}
.hr hr {
  width: 100%;
  margin-top: 1%;
  background-color: #564949;
}

.coupon {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  gap: 2%;
}
.coupon input {
  border-radius: 10px;
  border: none;
  padding: 1.5%;
  width: 50%;
  height: 60px;
  font-size: 14px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  background: #f2e9e9;
  transition: background-color 0.3s;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}
.totalPrice {
  padding: 2%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3%;
}
.totalPrice p {
  font-size: 24px;
  font-weight: 700;
  color: #131212;
  font-family: Quicksand, sans-serif;
}
</style>
