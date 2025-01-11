<template>
  <div class="priceSummary">
    <div class="titleSummary">
      <p>{{ titleSummary }}</p>
    </div>

    <div class="subtotalPrice">
      <p>Subtotal:</p>
      <!-- <p>${{ subtotalPrice.toFixed(2) }}</p> -->
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

    <div class="totalPrice">
      <p>Total:</p>
      <p>${{ totalPrice.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref } from "vue";
import { useCartStore } from "@/stores/useCartStore";

export default {
  name: "ConfirmSum_Component",
  props: {
    titleSummary: {
      type: String,
      default: "Confirmed Payment",
    },
  },
  setup() {
    const cartStore = useCartStore();

    const subtotalPrice = computed(() => cartStore.getSubtotal);

    const discountPrice = ref(parseFloat(localStorage.getItem("discountPrice")) || 0);

    const shippingPrice = 0.25;

    const totalPrice = computed(() => {
      return subtotalPrice.value + shippingPrice - discountPrice.value;
    }
  );

  let subPrice = subtotalPrice;
  let totalAmount = totalPrice;


    watch(discountPrice, (newValue) => {
      if (newValue <= 0) {
        localStorage.setItem("discountPrice", "0");
      }
    });

    return {
      subtotalPrice,
      discountPrice,
      shippingPrice,
      totalPrice,
    };
  },
};
</script>



  <style scoped>
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
  }
  
  @media (max-width: 480px) {
    .priceSummary {
      flex-direction: column; 
    }
  }
  </style>
  