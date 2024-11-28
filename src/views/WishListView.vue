<template>
  <div class="wishListPage">
    <Navbar_Component />

    <Breadcrumb_Component />

    <div class="title">
      <p>Wish List</p>

      <Button_Component
        class="btnStyle"
        name-button="Move All To Shop"
        backgroundColor-button="#FFFFFF"
        height-button="50px"
        width-button="200px"
        color-button="#958383"
        @click="moveAllToShop"
      />
    </div>

    <div class="showItemCount">
      <p>Showing List: {{ wishlistItems.length }} Item(s)</p>
      <div class="sortBy">
        <label for="sort-options">Sort By:</label>
        <select id="sort-options" v-model="selectedSort" @change="sortWishlist">
          <option value="date">Time</option>
          <option value="priceAsc">PriceLTH</option>
          <option value="priceDesc">PriceHTL</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>

    <div class="wishList" v-if="wishlistItems.length > 0">
      <CardWistList_Component
        class="cardWistList"
        v-for="item in wishlistItems"
        :key="item.id"
        :id="item.id"
        :imageWistList="item.images"
        :discountProduct="item.productDiscount"
        :productName="item.title"
        :oldPrice="item.oldPrice"
        :currentPrice="item.price"
        :colorProduct="Array.isArray(item.color) ? item.color : [item.color]"
        :sizeProduct="item.size"
      />
    </div>

    <Button_Component
      class="view"
      name-button="View All"
      backgroundColor-button="#958383"
      height-button="50px"
      width-button="200px"
      color-button="#FFFFFF"
      @click="goToCategoryProduct"
    />

    <Footer_Component class="footer" />
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Button_Component from "@/components/Button_Component.vue";
import CardWistList_Component from "@/components/CardWistList_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "WishListView",
  components: {
    Navbar_Component,
    Footer_Component,
    Breadcrumb_Component,
    Button_Component,
    CardWistList_Component,
  },
  setup() {
    const wishlistStore = useWishlistStore();
    const router = useRouter();

    // Access wishlist data from the store
    const wishlistItems = computed(() => wishlistStore.wishlist);

    // Define a reactive variable to store the selected sort option
    const selectedSort = ref("date");

    const sortWishlist = () => {
      const sortOption = selectedSort.value;
      if (sortOption === "date") {
        wishlistItems.value.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
      }
    };

    const goToCategoryProduct = () => {
      router.push("/category");
    };

    return {
      wishlistItems,
      sortWishlist,
      selectedSort,
      goToCategoryProduct,
    };
  },
  methods: {
    // move all product to store function
    moveAllToShop() {
      const store = useWishlistStore();
      store.clearWishlist(); // Clear the wishlist when the button is clicked
      alert("All items moved to shop! Wishlist cleared.");
    },
  },
};
</script>

<style scoped>
.wishListPage {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.wishList {
  width: 100%;
  height: 100%;
  margin-top: 2%;
  margin-left: 2%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2%;
}

.cardWistList {
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.cardWistList:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
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
  font-family: Quicksand, sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #564949;
}
.showItemCount {
  width: 95%;
  margin-top: 2%;
  margin-left: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.showItemCount p {
  font-family: Quicksand, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #564949;
}

.sortBy {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.sortBy label {
  font-family: Quicksand, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #564949;
}

.sortBy select {
  height: 30px;
  width: 90px;
  border: none;
  outline: none;
  font-family: Quicksand, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1f1d1d;
}

.btnStyle {
  border: 1px solid #564949;
  border-radius: 10px;
}
.footer {
  margin-top: 5%;
}
.view {
  margin-top: 5%;
}
</style>
