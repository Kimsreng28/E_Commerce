<template>
  <div class="wishListPage">
    <Navbar_Component />

    <div v-if="isLoading" class="load">
      <LoadingView />
    </div>

    <div v-else>
      <Breadcrumb_Component />

      <!-- Display this block if the wishlist is empty -->
      <div v-if="sortedWishlist.length === 0" class="emptyWishlist">
        <img src="@/assets/images/Wishlist/empty-wishlist.jpg" alt="Empty Wishlist" class="emptyImage" />
        <p class="emptyMessage">Your wishlist is empty.</p>
        <Button_Component
          class="shopNowBtn"
          name-button="Shop Now"
          backgroundColor-button="#958383"
          height-button="50px"
          width-button="200px"
          color-button="#FFFFFF"
          @click="goToCategoryProduct"
        />
      </div>

      <!-- Display wishlist items if not empty -->
      <div v-else>
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
          <p>Showing List: {{ sortedWishlist.length }} Item(s)</p>
          <div class="sortBy">
            <label for="sort-options">Sort By:</label>
            <select id="sort-options" v-model="selectedSort">
              <option value="date">Time</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div class="wishList">
          <CardWistList_Component
            class="cardWistList"
            v-for="item in sortedWishlist"
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
      </div>

      <Footer_Component class="footer" />
    </div>
  </div>
</template>



<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Button_Component from "@/components/Button_Component.vue";
import CardWistList_Component from "@/components/CardWistList_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import LoadingView from "./LoadingView.vue";

export default {
  name: "WishListView",
  components: {
    Navbar_Component,
    Footer_Component,
    Breadcrumb_Component,
    Button_Component,
    LoadingView,
    CardWistList_Component,
  },
  setup() {
    const isLoading = ref(true);


    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    });

    const wishlistStore = useWishlistStore();
    const router = useRouter();

    // Access wishlist data from the store
    const wishlistItems = computed(() => wishlistStore.wishlist);

    // Local reactive copy of the wishlist for sorting
    const sortedWishlist = ref([...wishlistItems.value]);

    const selectedSort = ref("date");

    // Sort the wishlist based on the selected option
    const sortWishlist = () => {
      const sortOption = selectedSort.value;
      if (sortOption === "date") {
        sortedWishlist.value.sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : new Date(0); // Default to epoch if no date
          const dateB = b.date ? new Date(b.date) : new Date(0);
          return dateB - dateA; // Descending order
        });
      } else if (sortOption === "name") {
        sortedWishlist.value.sort((a, b) => a.title.localeCompare(b.title));
      }
    };

    // Watch for changes in selectedSort and wishlistItems
    watch(
      [selectedSort, wishlistItems],
      () => {
        sortedWishlist.value = [...wishlistItems.value];
        sortWishlist();
      },
      { immediate: true } // Apply sorting immediately on initialization
    );

    const goToCategoryProduct = () => {
      router.push("/category");
    };

    return {
      wishlistItems,
      sortedWishlist,
      sortWishlist,
      selectedSort,
      goToCategoryProduct,
      isLoading,
    };
  },
  methods: {
    // Move all items to the shop function
    moveAllToShop() {
      const store = useWishlistStore();
      store.clearWishlist(); // Clear the wishlist when the button is clicked
      alert("All items moved to shop! Wishlist cleared.");
    },
  },
};
</script>

<style scoped>
.emptyWishlist {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 50px 0;
}

.emptyImage {
  max-width: 225px;
  margin-bottom: 20px;
}

.emptyMessage {
  font-family: Saira, sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #564949;
  margin-bottom: 20px;
}

.shopNowBtn {
  border: none;
  border-radius: 10px;
}

.load {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.wishListPage {
  width: 100%;
  height: auto;
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
@media (max-width: 1024px) {
  .cardWistList {
    flex: 1 1 calc(50% - 2%);
  }
}
@media (max-width: 768px) {
  .cardWistList {
    flex: 1 1 100%;
  }
  .title p {
    font-size: 24px;
  }
}
</style>