<template>
    <div class="orderScreen">
      <Navbar_Component />
      <Breadcrumb_Component />
      <div class="order-products">
        <CardOrderProduct_Component
          v-for="(product, index) in products"
          :key="index"
          :product="product"
        />
      </div>
      <Footer_Component class="footer" style="margin-top: 200px;" />
    </div>
  </template>
  
  <script>
  import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
  import Navbar_Component from "@/components/Navbar_Component.vue";
  import Footer_Component from "@/components/Footer_Component.vue";
  import CardOrderProduct_Component from "@/components/Card/CardOrderProduct_Component.vue";
  
  export default {
    name: "OrderView",
    components: {
      Navbar_Component,
      Breadcrumb_Component,
      Footer_Component,
      CardOrderProduct_Component,
    },
    data() {
      return {
        products: [
          {
            name: "Product 1",
            image: "https://via.placeholder.com/80",
            quantity: 1,
            price: 29.99,
          },
          {
            name: "Product 2",
            image: "https://via.placeholder.com/80",
            quantity: 2,
            price: 59.98,
          },
          {
            name: "Product 3",
            image: "https://via.placeholder.com/80",
            quantity: 1,
            price: 15.99,
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .order-products {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px;
  }
  </style>
  