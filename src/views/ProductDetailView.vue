<template>
  <div class="productDetailScreen">
    <Navbar_Component />
    <Breadcrumb_Component />

    <DetailProduct_Component
      class="pdDt"
      v-if="product"
      :key="product.id"
      :id="product.id"
      :imageProduct="product.image"
      :nameProduct="product.title"
      :ratingProduct="product.rating"
      :priceProduct="product.price"
      :descriptionProduct="product.description"
      :colorProduct="product.color"
      :sizeProduct="product.size"
      :discountProduct="product.discount"
      :oldPrice="product.oldPrice"
      :imageDetails="product.imageDetails"
      :stock="product.stock"
    />

    <Footer_Component class="footer" />
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import DetailProduct_Component from "@/components/Product/DetailProduct_Component.vue";
import { useProductStore } from "@/stores/useProductStore";
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "ProductDetailView",
  components: {
    Navbar_Component,
    Footer_Component,
    Breadcrumb_Component,
    DetailProduct_Component,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const productId = route.params.id; // Get the product ID from the route

    const productStore = useProductStore();
    // Use the product store

    // Computed property to fetch product by its ID
    const product = computed(() => {
      return productStore.products.find(
        (item) => item.id === Number(productId)
      );
    });

    return { product };
  },
};
</script>

<style scoped>
.productDetailScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.pdDt {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2%;
}
</style>
