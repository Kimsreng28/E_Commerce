<template>
  <div class="paymentAlert">
    <div class="success-animation">
      <svg
        class="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path
          class="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
    <p class="success-message">Payment successful!</p>
    <div class="thank">
      Thank you for your payment. Your order has been processed successfully.
    </div>
    <div class="info">
      <p class="totalPrice">Amount: ${{ totalPrice.toFixed(2) }}</p>
      <p class="paymentMethod">Payment Method: {{ paymentMethod }}</p>

      <!--Generate Transaction ID and auto Date-->
      <p class="transactionId">Transaction ID: {{ transactionId }}</p>
      <p class="transactionDate">Transaction Date: {{ transactionDate }}</p>
    </div>
    <div class="btn">
      <router-link to="/order">
        <div class="history">
          <Button_Component
            name-button="View Order History"
            width-button="200px"
            height-button="50px"
            background-color-button="#564949"
            color-button="#FFFFFF"
          />
        </div>
      </router-link>
      <div class="returnHome">
        <Button_Component
          name-button="Return to Home"
          width-button="200px"
          height-button="50px"
          color-button="#EC2929"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button_Component from "../Button_Component.vue";

export default {
  name: "PaymentSuccess_Component",
  components: {
    Button_Component,
  },
  props: {
    totalPrice: {
      type: [String, Number],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    transactionDate: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToOrderHistory() {
      this.$router.push("/order");
    },
  },
};
</script>

<style scoped>
.paymentAlert {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: auto;
  background-color: #d8d1d1;
  border-radius: 5px;
}
.success-message {
  font-size: 28px;
  font-weight: bold;
  color: #4bb71b;
  font-family: Quicksand, sans-serif;
  animation: checkmarkText 1.5s ease-in-out;
}
.thank {
  font-size: 16px;
  font-weight: bold;
  color: #2a2c29;
  font-family: Quicksand, sans-serif;
  margin-top: 2%;
}
.info {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 4%;
}
.info p {
  font-family: Quicksand, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #2a2c29;
  margin-bottom: 2%;
}
.btn {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2%;
  padding: 4%;
}

.success-animation {
  margin: 70px auto;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #4bb71b;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
  position: relative;
  top: 5px;
  right: 5px;
  margin: 0 auto;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #fff;
  fill: #4bb71b;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #4bb71b;
  }
}

@keyframes checkmarkText {
  0% {
    opacity: 0;
    transform: scale(0.8);
    color: #d8d1d1;
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
    color: #4bb71b; /* Success color */
  }
  100% {
    opacity: 1;
    transform: scale(1);
    color: #4bb71b;
  }
}
</style>
