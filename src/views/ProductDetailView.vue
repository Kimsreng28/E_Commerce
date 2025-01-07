<template>
  <div class="productDetailScreen">
    <Navbar_Component />

    <div v-if="isLoading" class="load">
      <LoadingView />
    </div>

    <div v-else>
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

      <ReviewProduct_Component :productId="$route.params.id" :description="product.description"/>

      <Footer_Component class="footer" />
    </div>
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
  height: 100vh;
}
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
@media (max-width: 1024px) {
  .productDetailScreen {
    margin-top: 1%;
  }

  .pdDt {
    margin-left: 0;
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .productDetailScreen {
    margin-top: 2%;
    flex-direction: column;
  }

  .pdDt {
    margin-left: 0;
    padding: 10px;
    flex-direction: column;
  }

  .load {
    height: auto;
    margin-top: 20%;
  }
}

@media (max-width: 480px) {
  .pdDt {
    margin-left: 0;
    padding: 5px;
  }

  .load {
    height: auto;
    margin-top: 20%;
  }
}
</style>
