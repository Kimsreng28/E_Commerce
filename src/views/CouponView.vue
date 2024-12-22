<template>
  <div class="couponScreen">
    <Navbar_Component />

    <div v-if="isLoading" class="load">
      <LoadingView />
    </div>

    <div v-else>
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
    </div>
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import CardDiscount from "@/components/CardDiscount.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import LoadingView from "../views/LoadingView.vue";
export default {
  name: "CouponView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
    CardDiscount,
    LoadingView,
  },

  data() {
    return {
      isLoading: true,
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
  mounted() {
    // Simulating data loading (you can replace this with actual data fetching logic)
    this.loadData();
  },
  methods: {
    loadData() {
      // Simulate loading process with a delay (e.g., API call or fetching data)
      setTimeout(() => {
        this.isLoading = false; // After loading, set isLoading to false
      }, 1000); // 2 seconds delay for simulation
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
}

/* For tablets and below (max-width: 768px) */
@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem; /* Reduce font size for smaller screens */
    text-align: center; /* Center-align the heading */
  }

  .couponCard {
    justify-content: center; /* Center the coupon cards */
    flex-direction: column; /* Stack cards vertically */
    margin-left: 0; /* Remove unnecessary left margin */
  }

  .couponCard > * {
    width: 80%; /* Make each card take more space */
  }
}

/* For mobile devices (max-width: 480px) */
@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem; /* Make title font even smaller for mobile */
  }

  .couponCard {
    flex-direction: column; /* Stack cards vertically */
    justify-content: center; /* Center-align cards */
    margin-top: 10%;
  }

  .couponCard > * {
    width: 90%; /* Increase card width for mobile */
  }
}
</style>
