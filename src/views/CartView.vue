<template>
  <div class="cartScreen">
    <Navbar_Component />
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
          :imageProduct="item.image"
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
          :discountPrice="discountPrice"
          :totalPrice="totalPrice"
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
        @click="this.$router.push('/checkout')"
      />
    </div>

    <Footer_Component class="footer" />
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
export default {
  name: "CartView",
  components: {
    Navbar_Component,
    Footer_Component,
    Breadcrumb_Component,
    Button_Component,
    CardCheckProduct_Component,
    PriceSummary_Component,
  },
  computed: {
    cartItems() {
      const store = useCartStore();
      return store.cartItems;
    },
  },
  methods: {
    moveAllToShop() {
      const store = useCartStore();
      store.clearCart();
      alert("All items return to shop! Return.");
    },
  },
};
</script>

<style scoped>
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
</style>
