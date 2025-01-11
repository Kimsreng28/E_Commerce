<template>
  <div class="priceSummary">
    <div class="titleSummary">
      <p>{{ titleSummary }}</p>
    </div>

    <div class="subtotalPrice">
      <p>Subtotal:</p>
      <p>${{ subtotalPrice.toFixed(2) }}</p>
    </div>
    <div class="hr">
      <hr />
    </div>

    <div class="shipping">
      <p>Shipping:</p>
      <p>${{ shippingPrice.toFixed(2) }}</p>
    </div>
    <div class="hr">
      <hr />
    </div>

    <div class="discount">
      <p>Discount:</p>
      <p v-if="discountPrice > 0" class="negative">- ${{ discountPrice.toFixed(2) }}</p>
      <p v-else>$0.00</p>
    </div>
    <div class="hr">
      <hr />
    </div>

    <div class="coupon" v-show="showCoupon">
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
    <p v-if="invalidCoupon" class="error-message">Invalid coupon code!</p>
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
    subtotalPrice: Number,
    shippingPrice: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    couponPrice: {
      type: Number,
      default: 0,
    },
    showCoupon: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const couponCode = ref("");
    const discountPrice = ref(0);
    const invalidCoupon = ref(false);

    const calculatedTotalPrice = computed(() => {
      return props.subtotalPrice + props.shippingPrice - discountPrice.value;
    });

    const applyCoupon = () => {
      if (couponCode.value === "DISCOUNT50") {
        let discount = props.subtotalPrice * 0.5;
        discount = Math.min(discount, 40); 

        discountPrice.value = discount;

        localStorage.setItem("discountPrice", discount.toFixed(2));

        invalidCoupon.value = false;
        
        alert(`Coupon Applied! Discount: -$${discount.toFixed(2)}`);
      } else {
        invalidCoupon.value = true;
        discountPrice.value = 0; 
        localStorage.setItem("discountPrice", "0");
      }
    };

    return {
      couponCode,
      discountPrice,
      invalidCoupon,
      calculatedTotalPrice,
      applyCoupon,
    };
  },
};
</script>

<style scoped>

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.priceSummary {
  width: 100%;
  max-width: 625px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #564949;
  display: flex;
  flex-direction: column;
  padding: 2%;
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
  font-size: 24px;
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
  width: 100%;
  max-width: 60%;
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


@media (max-width: 768px) {
  .priceSummary {
    padding: 4%; 
  }
  .titleSummary p {
    font-size: 20px; 
  }
  .subtotalPrice p,
  .shipping p,
  .discount p,
  .totalPrice p {
    font-size: 14px; 
  }
  .coupon input {
    max-width: 100%; 
    height: 40px; 
  }
  .totalPrice p {
    font-size: 18px; 
  }
}

@media (max-width: 480px) {
  .priceSummary {
    flex-direction: column; 
  }
  .coupon {
    flex-direction: column; 
    gap: 10px; 
  }
  .coupon input {
    max-width: 100%; 
  }
}
</style>
