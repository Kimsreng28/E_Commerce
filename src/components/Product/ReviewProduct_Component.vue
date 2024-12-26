<template>
  <div class="reviewProduct">
    <div class="tabs">
      <div class="tabBtn">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: selectedTab === tab }"
          @click="changeTab(tab)"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="tabContent">
      <div v-if="selectedTab === 'Details'">
        <!-- Catch details of product from product in store -->
        <p>
          {{ detail || "No details available for this product." }}
        </p>
      </div>
      <div v-if="selectedTab === 'RelateItems'">
        <div v-if="relatedProducts.length">
          <ProductCard_Component
            class="productCard"
            v-for="product in relatedProducts"
            :key="product.id"
            :id="product.id"
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
          />
        </div>
        <p v-else>No related items found for this category.</p>
      </div>

      <div class="reviews" v-if="selectedTab === 'Reviews'">
        <form @submit.prevent="addReview" class="review-form">
          <textarea
            v-model="newComment"
            placeholder="Write a review..."
            class="review-input"
          ></textarea>
          <div class="review-actions">
            <label for="rating" class="rating-label">Rating(0-5):</label>
            <input
              type="number"
              v-model.number="newRating"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              class="rating-input"
            />
            <button type="submit" class="submit-btn">Post</button>
          </div>
        </form>

        <!-- Edit Form -->
        <div v-if="isEditing" class="edit-form">
          <h3>Edit Review</h3>
          <textarea
            v-model="editingComment"
            placeholder="Edit your comment"
            class="edit-input"
          ></textarea>
          <input
            type="number"
            v-model.number="editingRating"
            min="1"
            max="5"
            placeholder="Edit rating (1-5)"
            class="edit-rating"
          />
          <div class="edit-actions">
            <button @click="saveReview" class="save-btn">Save</button>
            <button @click="cancelEdit" class="cancel-btn">Cancel</button>
          </div>
        </div>

        <ul class="review-list">
          <li
            v-for="(review, index) in reviews"
            :key="index"
            class="review-item"
          >
            <div class="review-header">
              <img :src="profileImage" alt="" class="profile-pic" />
              <div class="review-info">
                <p class="review-name">{{ firstName }} {{ lastName }}</p>
                <p class="review-date">
                  {{ new Date(review.date).toLocaleDateString() }}
                </p>
              </div>
            </div>
            <div class="review-content">
              <p class="review-text">{{ review.comment }}</p>
              <div class="review-rating">
                <span v-for="n in review.rating" :key="n" class="star">★</span>
                <span
                  v-for="n in 5 - review.rating"
                  :key="'empty' + n"
                  class="star empty"
                  >☆</span
                >
              </div>
            </div>
            <div class="review-actions">
              <button @click="editReview(index)" class="edit-btn">Edit</button>
              <button @click="deleteReview(index)" class="delete-btn">
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/useProductStore";
import { useReviewStore } from "@/stores/useReviewStore";
import { useUserSignupStore } from "@/stores/useUserSignupStore";
import { computed, onMounted, ref, watch } from "vue";
import ProductCard_Component from "./ProductCard_Component.vue";

export default {
  name: "ReviewProduct_Component",
  components: {
    ProductCard_Component,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const reviewStore = useReviewStore();
    const productStore = useProductStore();
    const userSignupStore = useUserSignupStore();

    const tabs = ["Details", "Relate Items", "Reviews"];
    const selectedTab = ref("Relate Items");

    const isEditing = ref(false);
    const editingIndex = ref(null);
    const editingComment = ref("");
    const editingRating = ref(0);

    // profile images
    const profileImage = computed(() => {
      return userSignupStore.profileImage;
    });
    // first name
    const firstName = computed(() => {
      return userSignupStore.firstName;
    });
    // last name
    const lastName = computed(() => {
      return userSignupStore.lastName;
    });

    // function for edit
    const editReview = (index) => {
      isEditing.value = true;
      editingIndex.value = index;
      editingComment.value = reviews.value[index].comment;
      editingRating.value = reviews.value[index].rating;
    };

    // function for save when edit
    const saveReview = () => {
      if (editingIndex.value === null) return;

      const updatedReview = {
        ...reviews.value[editingIndex.value],
        comment: editingComment.value,
        rating: editingRating.value,
        date: new Date().toISOString(),
      };

      reviewStore.updateReview(updatedReview.id, updatedReview);

      loadReviewsForProduct();
      cancelEdit();
    };

    // function for cancel
    const cancelEdit = () => {
      isEditing.value = false;
      editingIndex.value = null;
      editingComment.value = "";
      editingRating.value = 0;
    };

    // For deleting a review
    const deleteReview = (index) => {
      const reviewId = reviews.value[index].id; // Get the id of the review to delete
      reviewStore.deleteReview(reviewId);

      loadReviewsForProduct();
    };

    // Get the reviews from the store and update them when the store emits a change event
    const reviews = ref([]);

    const newComment = ref("");
    const newRating = ref(0);

    // Function for adding a new review
    const addReview = () => {
      if (!newComment.value || newRating.value <= 0) {
        console.error("Invalid review data.");
        return;
      }

      reviewStore.addReview({
        productId: props.productId,
        comment: newComment.value,
        rating: newRating.value,
        date: new Date().toISOString(),
      });

      // Refresh reviews after adding
      loadReviewsForProduct();
      newComment.value = "";
      newRating.value = 0;
    };

    // Load the reviews when the component is mounted
    onMounted(() => {
      reviewStore.loadReviews();
    });

    const relatedProducts = computed(() => {
      // Get the category from the store
      return productStore.getProductByCategory(category);
    });

    const loadReviewsForProduct = () => {
      const allReviews = reviewStore.reviews; // Assuming this gets all reviews
      reviews.value = allReviews.filter(
        (review) => review.productId === props.productId
      );
    };

    watch(
      () => props.productId,
      (newId) => {
        reviewStore.loadReviews(newId); // Reload reviews for the new product
      },
      { immediate: true }
    );

    return {
      relatedProducts,
      tabs,
      selectedTab,
      newComment,
      newRating,
      addReview,
      reviews,
      isEditing,
      editingComment,
      editingRating,
      editReview,
      saveReview,
      cancelEdit,
      deleteReview,
      profileImage,
      firstName,
      lastName,
    };
  },
  methods: {
    changeTab(tab) {
      this.selectedTab = tab;
    },
  },
};
</script>

<style scoped>
.reviewProduct {
  display: flex;
  width: 1440px;
  height: auto;
  flex-direction: column;
}
.tabs {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
}
.tabBtn {
  width: 80%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 1%;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.tabBtn button {
  padding: 10px 20px;
  margin-right: 20px;
  border: none;
  background-color: #f2f3f4;
  border-radius: 20px;
  cursor: pointer;
  color: #b6b6b6;
  font-family: Quicksand, serif;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}
.tabBtn button.active {
  background-color: #f2f3f4;
  color: #000000;
}
.tabContent {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Main Review Section */
.reviews {
  width: 80%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Review Form */
.review-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.review-input {
  width: 100%;
  height: 120px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
  color: #333;
  font-family: Quicksand, sans-serif;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.review-input:focus {
  border-color: #4267b2;
  outline: none;
  box-shadow: inset 0 2px 6px rgba(66, 103, 178, 0.2);
}

.rating-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  text-align: center;
  font-family: Quicksand, sans-serif;
  transition: all 0.3s ease;
}

.rating-input:focus {
  border-color: #4267b2;
  outline: none;
}

.submit-btn {
  background-color: #4267b2;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background-color: #365899;
}

/* Review List */
.review-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.review-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.review-info {
  display: flex;
  flex-direction: column;
}

.review-name {
  font-family: Quicksand, sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.review-date {
  font-family: Quicksand, sans-serif;
  font-size: 14px;
  color: #888;
}

.review-content {
  font-family: Quicksand, sans-serif;
  padding: 0.5rem 0;
  font-size: 16px;
  color: #555;
}

.review-text {
  margin-bottom: 0.5rem;
}

.review-rating {
  display: flex;
  align-items: center;
}

.review-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
}

.review-actions label {
  font-size: 16px;
  color: #888;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  font-family: Quicksand, sans-serif;
}

.star {
  font-size: 20px;
  color: #f4c542;
}

.star.empty {
  color: #ddd;
}
/* Edit Form Styling */
.edit-btn {
  background-color: #4267b2;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  font-family: Quicksand, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.edit-btn:hover {
  background-color: #365899;
}

.delete-btn {
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  font-family: Quicksand, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.delete-btn:hover {
  background-color: #c62828;
}
.edit-form {
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  animation: fadeIn 0.3s ease-in-out;
}

.edit-form h3 {
  font-size: 20px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #4267b2;
  margin-bottom: 1rem;
  text-align: center;
}

.edit-input,
.edit-rating {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  color: #333;
  margin-bottom: 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.edit-input:focus,
.edit-rating:focus {
  border-color: #4267b2;
  outline: none;
  box-shadow: inset 0 2px 6px rgba(66, 103, 178, 0.2);
}

.edit-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.save-btn,
.cancel-btn {
  flex: 1;
  background-color: #4267b2;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  font-family: Quicksand, sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.save-btn:hover {
  background-color: #365899;
}

.cancel-btn {
  background-color: #f44336;
}

.cancel-btn:hover {
  background-color: #d32f2f;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
