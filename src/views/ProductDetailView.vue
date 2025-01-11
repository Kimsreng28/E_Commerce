<template>
  <div class="productDetailScreen">
    <Navbar_Component />

    <div v-if="isLoading" class="load">
      <LoadingView />
    </div>

    <div v-else class="wrapper">
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

      <ReviewProduct_Component :productId="$route.params.id" :description="product.description" :product-title="product.title"/>
    </div>
    <Footer_Component/>
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import DetailProduct_Component from "@/components/Product/DetailProduct_Component.vue";
import ReviewProduct_Component from "@/components/Product/ReviewProduct_Component.vue";
import { useProductStore } from "@/stores/useProductStore";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import LoadingView from "./LoadingView.vue";
export default {
  name: "ProductDetailView",
  components: {
    Navbar_Component,
    Footer_Component,
    Breadcrumb_Component,
    DetailProduct_Component,
    LoadingView,
    ReviewProduct_Component,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  setup() {
    const isLoading = ref(true);
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false; // Set loading to false after 3 seconds
      }, 1000);
    });
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

    return { product, isLoading };
  },
};
</script>

<style scoped>
.load {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}
.productDetailScreen {
  width: fit-content;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.wrapper{
  width: 100%;
}
.pdDt {
  width: 100%;
  margin-top: 2%;

}
@media (max-width: 1124px) {
  .productDetailScreen {
    flex-direction: column;
    margin-left: 20%;
    padding: 10px;
    width: 100%;
    
  }
  .load {
    height: auto;
    margin-top: 20%;
  }

}

@media (max-width: 828px) {
  .productDetailScreen {
    flex-direction: column;
    margin-left: 27%;
    padding: 10px;
    width: 100%;
  }

  .load {
    height: auto;
    margin-top: 20%;
  }

}

@media (max-width: 420px) {
  .productDetailScreen {
    flex-direction: column;
    margin-left: 35%;
    padding: 10px;
    width: 100%;
  }
  .load {
    height: auto;
    margin-top: 20%;
  }
}
</style>
