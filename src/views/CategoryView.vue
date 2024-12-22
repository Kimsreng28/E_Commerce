<template>
  <div class="categoryScreen">
    <!--Search Bar in NavBar-->
    <Navbar_Component :on-search="handleSearch" />

    <div v-if="isLoading" class="load">
      <LoadingView />
    </div>
    <div v-else>
      <Breadcrumb_Component />

      <h1 style="font-family: Saira, sans-serif">Category</h1>

      <div class="filterProduct">
        <div class="div">
          <div class="select">
            <Filter_Component @apply-filter="handleFilterChange" />
          </div>
          <div v-if="isSearching" class="loadSearch">
            <LoadingView />
          </div>
          <div v-else class="showProduct">
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
          <div v-if="isLoadMoreLoading" class="loadSearch">
            <LoadingView />
          </div>
          <Button_Component
            v-else
            name-button="Load More"
            color-button="#FFFFFF"
            background-color-button="#958383"
            height-button="50px"
            width-button="200px"
            @click="loadMoreProducts"
          />
        </div>
      </div>

      <Footer_Component />
    </div>
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
import LoadingView from "@/views/LoadingView.vue";
import { computed, onMounted, ref } from "vue";
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
    LoadingView,
  },
  setup() {
    const isLoading = ref(true);
    const isSearching = ref(false);
    const isLoadMoreLoading = ref(false);
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false; // Set loading to false after 3 seconds
      }, 1000);
    });
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
        const matchesSearch =
          !searchQuery.value ||
          product.title
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());

        console.log(`Checking product ${product.title}:`, {
          matchesTab,
          matchesSubCategory,
          matchesColor,
          matchesSize,
          matchesPrice,
          matchesSearch,
        });

        return (
          matchesTab &&
          matchesSubCategory &&
          matchesColor &&
          matchesSize &&
          matchesSearch &&
          matchesPrice
        );
      });
    });

    const handleSearch = (query) => {
      searchQuery.value = query;
      isSearching.value = true;

      setTimeout(() => {
        isSearching.value = false;
      }, 1000); // Wait for 1 second before resetting isSearching to false
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
      isLoadMoreLoading.value = true;
      setTimeout(() => {
        isLoadMoreLoading.value = false;
        const nextIndex = displayedCount.value + 3;
        displayedProducts.value = allProducts.value.slice(0, nextIndex);
        displayedCount.value = nextIndex;
      }, 1000); // Wait for 1 second before resetting isLoadMoreLoading to false

      console.log("Next index: ", nextIndex);
      console.log("Displayed products: ", displayedProducts.value);
    };

    return {
      displayedProducts,
      goToProductDetail,
      loadMoreProducts,
      handleSearch,
      handleFilterChange,
      isLoading,

      isSearching,
      isLoadMoreLoading,
    };
  },
};
</script>

<style scoped>
.loadSearch {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.load {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.categoryScreen {
  width: 100%;
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
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: centers;
}
.div {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.select {
  width: 30%;
  height: 1021px;
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
  margin-top: 3%;
  margin-bottom: 5%;
}
/* For mobile and smaller screens */
@media (max-width: 768px) {
  .div {
    flex-direction: column; /* Stack the filter and products */
    align-items: center;
  }

  .select {
    width: 100%;
    margin-left: 0;
    margin-bottom: 20px;
  }

  .showProduct {
    width: 100%;
    grid-template-columns: repeat(2, 1fr); /* Show 2 columns */
  }

  .product-card {
    margin: 0 10px;
  }

  .loadMore {
    margin-left: 35%;
  }
}

/* For very small screens (mobile devices) */
@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem; /* Smaller font size for mobile */
  }

  .select {
    width: 100%;
  }

  .showProduct {
    grid-template-columns: 1fr; /* Single column for mobile */
  }

  .loadMore {
    margin-left: 30%;
  }
}
</style>
