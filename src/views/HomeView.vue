<template>
  <div class="homeScreen">
    <!-- NAVBAR -->
    <div v-if="isLoading" class="load">
      <LoadingView />
    </div>

    <div v-else>
      <Navbar_Component />
      <!-- Show Case -->
      <div class="showCase">
        <div class="title">
          <p>SHOW OUR NEW COLLECTION NOW!</p>
          <Button_Component
            class="btnCase"
            name-button="Shop Now"
            color-button="#FFFFFF"
            background-color-button="#958383"
            height-button="50px"
            width-button="200px"
            icon="shopping_cart"
            @click="this.$router.push('/category')"
          />
        </div>
        <div class="imgOne">
          <img src="../assets/images/Home/model.png" alt="" />
        </div>
        <div class="imgTwo">
          <img src="../assets/images/Home/showStyle.png" alt="" />
        </div>
      </div>

      <!-- Feature Title -->
      <div class="titleFeature">
        <p>New Arrival</p>
        <div class="newArrivals">
          <Arrivals_Component :arrivals="arrivalsData" />
        </div>
      </div>

      <!-- Feature Title -->
      <div class="titleFeature">
        <p>Explore Popular Categories</p>
        <div class="categories">
          <CardCategory_Component
            v-for="category in filteredCategories"
            :key="category.id"
            :image-category="category.images"
            :name-category="category.title"
            :color-name="category.color"
            :class="{ selectedCategory: category.title === selectedCategory }"
            @click="handleCategorySelection(category)"
          />
        </div>
        <div v-if="isProductLoading" class="productLoading">
          <LoadingView />
        </div>
        <div v-else class="products">
          <ProductCard_Component
            class="productCard"
            v-for="product in filteredProducts"
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
            @click="goToProductDetail(product.id)"
          />
        </div>
        <Button_Component
          class="btnLoad"
          name-button="View More"
          color-button="#FFFFFF"
          background-color-button="#958383"
          height-button="50px"
          width-button="200px"
          icon="shopping_cart"
          @click="this.$router.push('/category')"
        />
      </div>

      <!-- Service Feature -->
      <div class="container">
        <div
          class="serviceFeature"
          id="draggableContainer"
          @mousedown="startDragging"
          @mousemove="onDrag"
          @mouseup="stopDragging"
          @mouseleave="stopDragging"
          @touchstart="startDragging"
          @touchmove="onDrag"
          @touchend="stopDragging"
        >
          <div class="titleService">
            <p class="main">Trying The Best Experience</p>
            <p class="description">
              Easiest way to buy the new collections of clothes
            </p>
          </div>
          <div class="cardFeature">
            <CardFuture_Component
              v-for="cardFuture in cardFutures"
              :key="cardFuture.id"
              :title-card="cardFuture.title"
              :description-card="cardFuture.description"
              :image-card="cardFuture.image"
              :color-card="cardFuture.color"
              :width-card="cardFuture.width"
              :height-card="cardFuture.height"
              :cardId="cardFuture.id"
            />
          </div>
        </div>
      </div>

      <!-- Comments -->
      <p class="reviewTitle">What customers say about</p>
      <p class="reviewTitle">Fast Collection?</p>
      <div class="container">
        <div
          class="reviewHistory"
          id="reviewDraggableContainer"
          @mousedown="startDragging"
          @mousemove="onDrag"
          @mouseup="stopDragging"
          @mouseleave="stopDragging"
          @touchstart="startDragging"
          @touchmove="onDrag"
          @touchend="stopDragging"
        >
          <ReviewHistory_Component />
        </div>
      </div>

      <!-- Footer -->
      <div>
        <Footer_Component />
      </div>
    </div>
  </div>
</template>

<script>
import Arrivals_Component from "@/components/Arrivals_Component.vue";
import Button_Component from "@/components/Button_Component.vue";
import CardFuture_Component from "@/components/CardFuture_Component.vue";
import CardCategory_Component from "@/components/Category/CardCategory_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import ProductCard_Component from "@/components/Product/ProductCard_Component.vue";
import ReviewHistory_Component from "@/components/ReviewHistory_Component.vue";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useProductStore } from "@/stores/useProductStore";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import thirdArrival from "../assets/images/Arrivals/1st.jpg";
import oneArrival from "../assets/images/Arrivals/2nd.jpg";
import twoArrival from "../assets/images/Arrivals/3nd.jpg";
import Service from "../assets/images/CardFuture/customer-service.png";
import Coupon from "../assets/images/CardFuture/voucher.png";
import LoadingView from "./LoadingView.vue";

export default {
  name: "HomeView",
  components: {
    Navbar_Component,
    Button_Component,
    CardFuture_Component,
    ProductCard_Component,
    CardCategory_Component,
    Footer_Component,
    Arrivals_Component,
    ReviewHistory_Component,
    LoadingView,
  },
  setup() {
    const isLoading = ref(true);
    const isProductLoading = ref(false);

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false; // Set loading to false after 3 seconds
      }, 1000);
    });
    // Initialize the router
    const router = useRouter();
    const store = useProductStore();

    // Reactive state for selected category
    const selectedCategory = ref("Clothes");

    const arrivalsData = ref([
      {
        id: 1,
        image: oneArrival,
      },
      {
        id: 2,
        image: twoArrival,
      },
      {
        id: 3,
        image: thirdArrival,
      },
    ]);

    const loadProducts = async (category) => {
      isProductLoading.value = true; // Show loading spinner
      selectedCategory.value = category.title;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      filteredProducts.value = store
        .getProductByCategory(category.title)
        .slice(0, 4);
      isProductLoading.value = false; // Hide loading spinner
    };

    // Category selection handler
    const handleCategorySelection = async (category) => {
      console.log("Selected category:", category.title);
      selectedCategory.value = category.title; // Update selected category
      await loadProducts(category); // Fetch products for the category
    };

    // Function to navigate to product detail by ID
    const goToProductDetail = (productId) => {
      console.log("Navigating to product detail with ID:", productId);
      router.push({ name: "productDetail", params: { id: productId } });
    };

    // Computed properties to filter products and categories
    const filteredProducts = computed(() => {
      console.log("Selected Category:", selectedCategory.value); // Log the category being passed
      const products = store.getProductByCategory(selectedCategory.value); // Call the store action with the correct category
      console.log("Filtered Products in Component:", products); // Log the result in the component
      return products.slice(0, 4); // Return empty array if no category is selected max 4
    });

    const filteredCategories = computed(() => {
      const store = useCategoryStore();
      return store.getCategoriesByIds([1, 2, 3]);
    });

    const cardFutures = [
      {
        id: 1,
        title: "24/7 Customer Service",
        description: "Friendly 24/7 customer support",
        image: Service,
        color: "#FAF5EC",
        width: "546px",
        height: "343px",
      },
      {
        id: 2,
        title: "Coupons",
        description: "Give free when pay start from 20$ up.",
        image: Coupon,
        color: "#FAF5EC",
        width: "546px",
        height: "343px",
      },
      {
        id: 3,
        title: "Vouchers",
        description: "Discount 50% with free Delivery",
        image: Coupon,
        color: "#FAF5EC",
        width: "546px",
        height: "343px",
      },
    ];

    // Mouse drag scrolling logic
    const isDragging = ref(false);
    const startX = ref(0);
    const scrollLeft = ref(0);
    const container = ref(null);

    const startDragging = (event) => {
      isDragging.value = true;
      startX.value = event.pageX || event.touches[0].pageX;
      container.value = event.currentTarget;
      scrollLeft.value = container.value.scrollLeft;
      container.value.style.scrollBehavior = "auto"; // Disable smooth scroll during drag
    };

    const onDrag = (event) => {
      if (!isDragging.value) return;
      const x = event.pageX || event.touches[0].pageX;
      const walk = x - startX.value;
      container.value.scrollLeft = scrollLeft.value - walk;
    };

    const stopDragging = () => {
      isDragging.value = false;
      if (container.value) {
        container.value.style.scrollBehavior = "smooth"; // Re-enable smooth scroll
      }
    };

    return {
      filteredProducts,
      filteredCategories,
      goToProductDetail,

      selectedCategory,
      arrivalsData,
      cardFutures,

      startDragging,
      onDrag,
      stopDragging,

      isLoading,
      isProductLoading,
      handleCategorySelection,
    };
  },
};
</script>

<style scoped>
.productLoading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  margin-left: 2%;
}
.load {
  width: 1440px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.productCard {
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.productCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.selectedCategory {
  background-color: #4c4040;
  color: #fff;
  transition: all 0.3s ease-in-out;
}
.homeScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.showCase {
  width: 100%;
  height: 645px;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 2%;
}

.showCase::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/images/Home/newpaper.jpg) no-repeat center;
  background-size: cover;
  filter: blur(1px);
  opacity: 0.8;
  transition: all 0.3s;
  z-index: -1;
}
.imgOne img,
.imgTwo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: all 0.3s;
  filter: drop-shadow(10px 10px 4px rgb(255, 255, 255));
}

.title {
  width: 30%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-top: 2%;
  margin-left: 2%;
  padding: 2%;
}
.title p {
  font-size: 60px;
  font-weight: bold;
  background: -webkit-linear-gradient(
    rgba(26, 28, 28, 1) 22%,
    rgb(75, 79, 81) 55%,
    rgb(43, 45, 43) 83%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Salsa, sans-serif;
}

.btnCase {
  margin-top: 30%;
  box-shadow: 0 5px 5px rgb(189, 183, 183);
}

.imgOne {
  width: 40%;
  height: 90%;
  margin-left: 2%;
  margin-top: 2%;
}
.imgOne img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.imgTwo {
  width: 30%;
  height: 90%;
  margin-left: 2%;
}
.imgTwo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.titleFeature {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  padding: 2%;
}
.titleFeature p {
  font-size: 40px;
  font-weight: bold;
  color: #372f2f;
  font-family: Quicksand, sans-serif;
}
.categories,
.products,
.btnLoad {
  width: 100%;
  height: 100%;
  margin-top: 2%;
  margin-left: 2%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1515px;
  height: auto;
}

.serviceFeature {
  width: 100%;
  height: 400px; /* Ensure the height is fixed */
  margin-top: 2%;
  margin-left: 2%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2%;
  overflow-x: auto; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Hide vertical overflow (optional) */
  padding: 0; /* Avoid unnecessary space causing scroll issues */
  box-sizing: border-box;
  cursor: grab;
  scroll-behavior: smooth;
  user-select: none;
  transition: all 0.3s;
}

.serviceFeature:active {
  cursor: grabbing; /* Indication when dragging */
}

.serviceFeature::-webkit-scrollbar {
  display: none; /* Hide scrollbar */
}

.titleService {
  flex-shrink: 0; /* Prevent shrinking */
  width: 20%; /* Fixed width */
  height: 100%; /* Match parent height */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2%;
  box-sizing: border-box;
}
.titleService .main {
  font-size: 24px;
  font-weight: bold;
  color: #372f2f;
  font-family: Quicksand, sans-serif;
}
.titleService .description {
  font-size: 18px;
  font-weight: 500;
  color: #9a9191;
  font-family: Quicksand, sans-serif;
}

.cardFeature {
  flex-shrink: 0; /* Prevent shrinking */
  min-width: 150%; /* Wider than the parent for horizontal scroll */
  height: 100%; /* Match parent height */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2%;
  box-sizing: border-box;
}

.newArrivals {
  height: 763px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  position: relative;
  background-color: #faf5ec;
}
.arrivalImage {
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease-in-out; /* Smooth fade-in */
}
.reviewHistory {
  width: auto;
  height: 400px; /* Ensure the height is fixed */
  margin-top: 2%;
  margin-left: 2%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2%;
  overflow-x: hidden; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Hide vertical overflow (optional) */
  padding: 0; /* Avoid unnecessary space causing scroll issues */
  box-sizing: border-box;
  cursor: grab;
  scroll-behavior: smooth;
  user-select: none;
  transition: all 0.3s;
}

/* Media Queries for Responsiveness */
@media (max-width: 1200px) {
  .showCase {
    flex-direction: column;
    height: auto;
  }
  .title {
    font-size: 20px;
  }
  .btnCase {
    width: 100%;
  }
  .imgOne,
  .imgTwo {
    width: 90%;
    margin-left: 0;
    margin-top: 2%;
  }
  .productCard {
    width: 100%;
  }
  .categories,
  .products {
    flex-direction: column;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .homeScreen {
    padding: 0 10px;
  }
  .showCase {
    flex-direction: column;
    height: auto;
  }
  .title p {
    font-size: 22px;
  }
  .btnCase {
    width: 100%;
  }
  .imgOne,
  .imgTwo {
    width: 100%;
    height: 250px;
  }
  .newArrivals {
    flex-direction: column;
    width: 100%;
    height: auto;
  }
  .cardFeature {
    flex-direction: column;
    min-width: 100%;
  }
  .serviceFeature {
    flex-direction: column;
    height: auto;
    gap: 10px;
  }
  .titleService {
    width: 100%;
    margin-bottom: 15px;
  }
  .titleService .main {
    font-size: 18px;
  }
  .titleService .description {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .title p {
    font-size: 18px;
  }
  .showCase {
    flex-direction: column;
    height: auto;
  }
  .btnCase {
    width: 100%;
  }
  .imgOne,
  .imgTwo {
    width: 100%;
    height: 200px;
  }
  .categories,
  .products {
    flex-direction: column;
    width: 100%;
  }
}
</style>
