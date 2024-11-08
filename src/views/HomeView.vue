<template>
  <div class="homeScreen">
    <Navbar_Component />
    <Button_Component
      name-button="Sign In"
      backgroundColor-button="#958383"
      height-button="40px"
      width-button="120px"
      color-button="white"
    />
    <CardFuture_Component
      v-for="cardFuture in cardFutures"
      :key="cardFuture.id"
      :title-card="cardFuture.title"
      :description-card="cardFuture.description"
      :image-card="cardFuture.image"
      :color-card="cardFuture.color"
      :width-card="cardFuture.width"
      :height-card="cardFuture.height"
    />
  </div>
</template>

<script>
import CustomerService from "@/assets/images/CardFuture/customer-service.png";
import Button_Component from "@/components/Button_Component.vue";
import CardFuture_Component from "@/components/CardFuture_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
export default {
  name: "HomeView",
  components: {
    Navbar_Component,
    Button_Component,
    CardFuture_Component,
  },
  data() {
    return {
      cardFutures: [
        {
          id: 1,
          title: "Fast Delivery",
          description:
            "Get your items delivered to your doorsteps in just 2 hours.",
          image: CustomerService,
          color: "#FAF5EC",
          width: "546px",
          height: "343px",
        },
      ],
    };
  },
};
</script>

<style scoped>
.homeScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
}
</style>
