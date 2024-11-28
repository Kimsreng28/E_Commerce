<template>
  <div class="cardDiscount" :style="containerStyle">
    <div class="save">
      <div class="saveUp">
        <h1>Save</h1>
      </div>
      <div class="saveDown">
        <h1>{{ discountNum }}</h1>
      </div>
    </div>

    <div class="discountTitle">
      <div class="dis">Discount</div>
      <div class="off">of each</div>
      <div class="pro">Products</div>
    </div>

    <div class="button-get">
      <button
        :style="{ backgroundColor: buttonColor }"
        @click="generateCouponCode"
      >
        Get It Now
      </button>
    </div>

    <div v-if="couponCode" class="couponCode">
      <p>
        Your coupon code: <strong>{{ couponCode }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardDiscount",
  props: {
    discountNum: Number,
    gradientStart: {
      type: String,
      default: "rgba(255, 204, 104, 1)",
    },
    gradientEnd: {
      type: String,
      default: "rgba(249, 209, 74, 1)",
    },
    buttonColor: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      couponCode: null,
    };
  },
  computed: {
    containerStyle() {
      return {
        background: `linear-gradient(180deg, ${this.gradientStart} 0%, ${this.gradientEnd} 100%)`,
      };
    },
  },
  methods: {
    generateCouponCode() {
      // Fixed coupon code for 50% discount
      this.couponCode = "DISCOUNT50";
      this.$emit("couponGenerated", this.couponCode); // Emit the coupon code to the parent
      alert(`Coupon code generated: ${this.couponCode}`);
    },
  },
};
</script>

<style scoped>
.cardDiscount {
  width: 1309px;
  height: 440px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  margin: 1%;
  border-radius: 10px;
  overflow: hidden;
}
.cardDiscount::before,
.cardDiscount::after {
  content: "";
  position: absolute;
  width: 550px;
  height: 350px;
  background: url(../assets/images/Background/clouds.png) no-repeat;
  background-size: contain;
}
.cardDiscount::before {
  top: 160px;
  left: -200px;
  transform: rotate(45.59deg);
  z-index: 0;
}
.cardDiscount::after {
  top: -160px;
  left: 860px;
  transform: rotate(-140.59deg);
  z-index: 1;
}

.save {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  font-family: Quicksand, sans-serif;
}

.saveUp {
  width: 500px;
  margin-left: 30%;
}

.saveUp h1 {
  font-weight: bold;
  font-size: 86px;
  color: #ffffff;
}

.saveDown {
  margin-left: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 150px;
  border-radius: 10px;
}

.saveDown h1 {
  font-weight: bold;
  font-size: 86px;
  color: #e51527;
}

.discountTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: Quicksand, sans-serif;
  margin-right: 5%;
}

.discountTitle .dis {
  font-size: 86px;
  font-weight: bold;
  color: #000000;
}

.discountTitle .off {
  font-size: 38px;
  color: #000000;
  margin-right: 20%;
}

.discountTitle .pro {
  font-size: 48px;
  color: #ffffff;
  margin-bottom: 20%;
  margin-left: 50%;
  font-weight: bold;
}

.button-get {
  z-index: 2;
  margin-top: 23%;
}

.button-get button {
  width: 200px;
  height: 70px;
  transition: transform 0.3s, filter 0.3s;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.button-get button:hover {
  transform: scale(1.03);
  filter: brightness(90%);
}
.couponCode {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  font-family: Quicksand, sans-serif;
}
</style>
