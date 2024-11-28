<template>
  <div class="couponScreen">
    <Navbar_Component />
    <Breadcrumb_Component />

    <h1 style="font-family: Saira, sans-serif">Coupon Service</h1>

    <div class="couponCard">
      <CardDiscount
        v-for="card in cards"
        :key="card.id"
        :discountNum="card.discountNum"
        :gradientStart="card.gradientStart"
        :gradientEnd="card.gradientEnd"
        :button-color="card.buttonColor"
      />
    </div>
    <Footer_Component style="margin-left: 4px;"/>
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import CardDiscount from "@/components/CardDiscount.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
export default {
  name: "CouponView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
    CardDiscount,
    Footer_Component
  },

  data() {
    return {
      cards: [
        {
          id: 1,
          discountNum: "50%",
          gradientStart: "#AAA79E",
          gradientEnd: "#D6D6D6",
          buttonColor: "#0DCC46",
        },
      ],
    };
  },
};
</script>

<style scoped>
.couponScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
}

h1 {
  padding: 2%;
  margin-left: 1%;
}
.couponCard {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-grow: 1;
}
</style>
