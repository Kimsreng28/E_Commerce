<template>
  <div class="categoryScreen">
    <!--Search Bar in NavBar-->
    <Navbar_Component :on-search="handleSearch" />
    <Breadcrumb_Component />

    <h1 style="font-family: Saira, sans-serif">Category</h1>

    <div class="filterProduct">
      <div class="select">
        <Filter_Component @apply-filter="handleFilterChange" />
      </div>
      <div class="showProduct">
        <ProductCard_Component
          v-for="product in displayedProducts"
          :id="product.id"
          :key="product.id"
          :name-product="product.title"
          :image-product="product.image"
          :rating-product="product.rating"
          :price-product="product.price"
          :size-product="product.size"
          :color-product="product.color"
          :stock-product="product.stock"
          :description-product="product.description"
          :discount-product="product.discount"
          :image-details="product.imageDetails"
          :old-price="product.oldPrice"
          class="product-card"
          @click="goToProductDetail(product.id)"
        />
      </div>
    </div>

    <div class="loadMore">
      <Button_Component
        name-button="Load More"
        color-button="#FFFFFF"
        background-color-button="#958383"
        height-button="50px"
        width-button="200px"
        @click="loadMoreProducts"
      />
    </div>

    <Footer_Component />
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Button_Component from "@/components/Button_Component.vue";
import Filter_Component from "@/components/Category/Filter_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import ProductCard_Component from "@/components/Product/ProductCard_Component.vue";
import { useProductStore } from "@/stores/useProductStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "CategoryView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
    Filter_Component,
    ProductCard_Component,
    Button_Component,
    Footer_Component,
  },
  setup() {
    // Initialize the router
    const router = useRouter();
    const store = useProductStore();
    const allProducts = ref(store.products); // Assuming products is an array of products in your store
    const displayedCount = ref(6);
    const searchQuery = ref("");
    const filters = ref({
      tab: "Clothes",
      color: null,
      subCategory: null,
      size: null,
      price: 100,
    });

    const filteredProducts = computed(() => {
      return store.products.filter((product) => {
        const matchesTab =
          product.category === filters.value.tab || filters.value.tab === "All";
        const matchesSubCategory =
          !filters.value.subCategory ||
          product.subCategory === filters.value.subCategory;
        const matchesColor =
          !filters.value.color || product.color.includes(filters.value.color);
        const matchesSize =
          !filters.value.size || product.size.includes(filters.value.size);
        const matchesPrice = product.price <= filters.value.price;

        return (
          matchesTab &&
          matchesSubCategory &&
          matchesColor &&
          matchesSize &&
          matchesPrice
        );
      });
    });

    const handleSearch = (query) => {
      searchQuery.value = query;
    };

    // Handle Filter Change
    const handleFilterChange = (newFilters) => {
      filters.value = newFilters;
    };

    // Display products based on current filters and displayedCount
    const displayedProducts = computed(() => {
      return filteredProducts.value.slice(0, displayedCount.value);
    });

    // Function to navigate to product detail by ID
    const goToProductDetail = (productId) => {
      console.log("Navigating to product detail with ID:", productId);
      router.push({ name: "productDetail", params: { id: productId } });
    };

    // Function to load more products
    const loadMoreProducts = () => {
      const nextIndex = displayedCount.value + 3;
      displayedProducts.value = allProducts.value.slice(0, nextIndex);
      displayedCount.value = nextIndex;
      console.log("Next index: ", nextIndex);
      console.log("Displayed products: ", displayedProducts.value);
    };

    return {
      displayedProducts,
      goToProductDetail,
      loadMoreProducts,
      handleSearch,
      handleFilterChange,
    };
  },
};
</script>

<style scoped>
.categoryScreen {
  width: 94%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
}

h1 {
  padding: 2%;
  margin-left: 1%;
}
.filterProduct {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: centers;
}
.select {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 2%;
}
.showProduct {
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 2%;
}
.product-card {
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.loadMore {
  margin-left: 40%;
  margin-top: 30%;
  margin-bottom: 5%;
}
</style>
