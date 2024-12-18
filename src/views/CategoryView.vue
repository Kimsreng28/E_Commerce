<template>
  <div class="categoryScreen">
    <!--Search Bar in NavBar-->
    <Navbar_Component :on-search="handleSearch" />
    <Breadcrumb_Component />

    <h1 style="font-family: Saira, sans-serif">Category</h1>

    <div class="filterProduct">
      <div class="select">
        <Filter_Component @apply-filter="handleFilterChange" @clear-filters="resetFilters"/>
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

    <Footer_Component style="margin-left: 4px;"/>
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
    const router = useRouter();
    const store = useProductStore();

    const allProducts = ref(store.products); // List of all products
    const displayedCount = ref(6); // Number of products to display initially
    const searchQuery = ref("");

    // Default filters
    const defaultFilters = {
      tab: "All", // "All" means no category filtering
      color: null,
      subCategory: null,
      size: null,
      price: 100,
    };

    const filters = ref({ ...defaultFilters });

    // Compute filtered products based on current filters and search query
    const filteredProducts = computed(() => {
      return allProducts.value.filter((product) => {
        const matchesTab =
          filters.value.tab === "All" || product.category === filters.value.tab;
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

    // Compute displayed products (slice to show limited number)
    const displayedProducts = computed(() => {
      return filteredProducts.value.slice(0, displayedCount.value);
    });

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
      filters.value = { ...filters.value, ...newFilters };
      displayedCount.value = 6; // Reset displayed products count
    };

    // Reset all filters and search query
    const resetFilters = () => {
      filters.value = { ...defaultFilters };
      searchQuery.value = "";
      displayedCount.value = 6; // Reset displayed products count
    };

    // Handle search input
    const handleSearch = (query) => {
      searchQuery.value = query;
      displayedCount.value = 6; // Reset displayed products count
    };

    // Navigate to product detail page
    const goToProductDetail = (productId) => {
      router.push({ name: "productDetail", params: { id: productId } });
    };

    // Load more products
    const loadMoreProducts = () => {
      displayedCount.value = filteredProducts.value.length;
    };

    return {
      displayedProducts,
      goToProductDetail,
      loadMoreProducts,
      handleSearch,
      handleFilterChange,
      resetFilters,
    };
  },
};
</script>

<style scoped>
.categoryScreen {
  width: 100%;
  margin-top: 2%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  padding: 2%;
  margin-left: 1%;
}

.filterProduct {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2%;
}

.select {
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-left: 2%;
}

.showProduct {
  width: 70%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 2%;
}

.product-card {
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
  padding-bottom: 20px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card img {
  width: 100%;
  height: 100px; /* Fixed image height */
  object-fit: cover; /* Prevents stretching */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.loadMore {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.footer {
  margin-top: auto; /* Push footer to the bottom */
}

</style>
