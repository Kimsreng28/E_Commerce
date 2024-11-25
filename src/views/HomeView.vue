<template>
  <div class="homeScreen">
    <!-- NAVBAR -->
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
        <Arrivals_Component
          v-for="(arrival, index) in arrivals"
          :key="arrival.id"
          v-show="index === currentArrivalIndex"
          :imageArrivals="arrival.image"
        />
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
          :class="category.title === selectedCategory ? 'selectedCategory' : ''"
          @click="selectCategory(category)"
        />
      </div>
      <div class="products">
        <ProductCard_Component
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

    <div class="serviceFeature">
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
        />
      </div>
    </div>

    <!-- Comments -->
    <div class="titleFeature">
      <p>What customers say about Fast Collection?</p>
    </div>

    <Footer_Component />
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
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useProductStore } from "@/stores/useProductStore";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import oneArrival from "../assets/images/Arrivals/2nd.jpg";
import twoArrival from "../assets/images/Arrivals/3nd.jpg";
import Service from "../assets/images/CardFuture/customer-service.png";
import Coupon from "../assets/images/CardFuture/voucher.png";

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
  },
  data() {
    return {
      cardFutures: [
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
      ],
    };
  },
  setup() {
    // Initialize the router
    const router = useRouter();
    const store = useProductStore();
    // Reactive state for selected category
    const selectedCategory = ref("Clothes");

    const currentArrivalIndex = ref(0);

    const arrivals = [
      {
        id: 1,
        image: oneArrival,
      },
      {
        id: 2,
        image: twoArrival,
      },
    ];

    // Reactive state for current arrival index
    onMounted(() => {
      setInterval(() => {
        currentArrivalIndex.value =
          (currentArrivalIndex.value + 1) % arrivals.length; // Cycle through the images
      }, 5000); // 5000ms = 5 seconds
    });

    // Function to handle category selection
    const selectCategory = (category) => {
      selectedCategory.value = category.title; // Set selected category title
      console.log("Selected category:", category); // Debugging
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

    return {
      filteredProducts,
      filteredCategories,
      goToProductDetail,
      selectCategory,
      currentArrivalIndex,
      arrivals,
    };
  },
};
</script>

<style scoped>
.selectedCategory {
  background-color: #4c4040; /* Default background color */
  color: white; /* Text color for selected category */
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

.serviceFeature {
  width: 96%;
  height: 100%;
  margin-top: 2%;
  margin-left: 2%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2%;
}

.titleService {
  width: 20%;
  height: 100%;
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 2%;
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
  width: 80%;
  height: 100%;
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 2%;
}

.newArrivals {
  width: 1440px;
  height: 763px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2%;
  margin-top: 2%;
  position: relative;
  background-color: #faf5ec;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}
.arrivalImage {
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease-in-out; /* Smooth fade-in */
}

.arrivalImage.active {
  opacity: 1;
}
</style>
