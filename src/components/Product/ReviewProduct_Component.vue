<template>
  <div class="reviewProduct">
    <div class="tabs">
      <div class="tabBtn">
        <button v-for="tab in tabs" :key="tab" :class="{ active: selectedTab === tab }" @click="changeTab(tab)">
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="tabContent">
      <div v-show="selectedTab === 'Details'" class="detail">
        <p>{{ description || "No details available for this product." }}</p>
      </div>

      <div v-show="selectedTab === 'RelateItems'" class="contain">
        <div v-if="relatedProducts && relatedProducts.length > 0">
          <div v-if="isSearching" class="loadSearch">
            <LoadingView />
          </div>
          <div v-else class="productContain">
            <ProductCard_Component
              v-for="product in relatedProducts"
              :key="product.id"
              :product="product"
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
              class="productCard"
              @click="goToDetail(product.id)"
            />
          </div>
        </div>
      </div>

      <!-- Review Section -->
      <div class="reviews" v-if="selectedTab === 'Reviews'">
        <form @submit.prevent="addReview" class="review-form">
          <div class="review-actions">
            <div>
              <input
                v-model="comment"
                type="text"
                placeholder="Write your review..."
              />
              <label for="rating" class="rating-label">Rating(0-5):</label>
              <input
                v-model="rating"
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
              />
            </div>
            <input type="file" @change="onImageUpload" />
            <button @click="postReview">Post</button>
          </div>
        </form>

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
        class="edit-rating"
      />
      <div class="edit-actions">
        <button @click="saveReview" class="save-btn">Save</button>
        <button @click="cancelEdit" class="cancel-btn">Cancel</button>
      </div>
    </div>
    <p>Comments</p>
    <div class="showReview" v-for="(review, index) in filteredReviews" :key="review.id">
      <div>
        <img :src="review.image" alt="Review Image" style="max-width: 200px" />
        <p>{{ review.comment }}</p>
        <p>⭐{{ review.rating }}</p>
      </div>
      <div class="but-action">
        <button @click="editReview(index)">Edit</button>
        <button @click="deleteReview(index)">Delete</button>
      </div>
    </div>
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
import { useRouter } from "vue-router";
import LoadingView from "@/views/LoadingView.vue";
export default {
  name: "ReviewProduct_Component",
  components: {
    ProductCard_Component,
    LoadingView,
  },

  props: {
    productId: {
      type: [String, Number],
      required: true,
    },
    description: {
      type: String,
      required: true, // or false, depending on whether it's mandatory
    },
  },
  setup(props) {
    const router = useRouter();
    const productStore = useProductStore();
    const reviewStore = useReviewStore();
    const userSignupStore = useUserSignupStore();

    const tabs = ["Details", "RelateItems", "Reviews"];
    const selectedTab = ref("Details");
    const isEditing = ref(false);
    const editingIndex = ref(null);
    const editingComment = ref("");
    const editingRating = ref(0);
    const newComment = ref("");
    const newRating = ref(0);
    const reviews = ref([]);
    const isSearching = ref(false);
    const isLoading = ref(true);

    const comment = ref("");
    const rating = ref(null);
    const image = ref(null);

    const profileImage = computed(() => userSignupStore.profileImage);
    const firstName = computed(() => userSignupStore.firstName);
    const lastName = computed(() => userSignupStore.lastName);
    const productDetails = computed(() => {
      const detail = productStore.products.find((product) => {
        return product.id == props.productId;
      });
      return detail;
    });

    const relatedProducts = computed(() => {
      const filteredProducts = productStore.products.filter((product) => {
        return product.category == productDetails.value.category;
      });
      return filteredProducts.length > 0 ? [...filteredProducts] : [];
    });

    const goToDetail = (productId) => {
      console.log("DetailllllProducts:", productId);
      router.push({ name: "productDetail", params: { id: productId } });
    };

    const loadReviewsForProduct = () => {
      const productReviews = reviewStore.reviews.filter(
        (review) => review.productId === props.productId
      );
      reviews.value = productReviews;
    };

    onMounted(() => {
      reviewStore.loadReviews();
      loadReviewsForProduct();
      setTimeout(() => {
        isLoading.value = false; // Set loading to false after 3 seconds
      }, 1000);
    });

    watch(
      () => props.productId,

      () => props.category,

      () => loadReviewsForProduct(),
      { immediate: true }
    );

    // Function for adding a new review
    const postReview = () => {
      try {
        reviewStore.addReview(props.productId, comment.value, rating.value, image.value);
        comment.value = "";
        rating.value = null;
        image.value = null;
        alert("Review posted successfully!");
      } catch (error) {
        alert(error.message);
      }
    };
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

    const editReview = (index) => {
      const review = filteredReviews.value[index];
      isEditing.value = true;
      editingIndex.value = index;
      editingComment.value = review.comment;
      editingRating.value = review.rating;
    };

    const saveReview = () => {
      if (editingIndex.value === null) return;

      const updatedReview = {
        ...filteredReviews.value[editingIndex.value],
        comment: editingComment.value,
        rating: editingRating.value,
        date: new Date().toISOString(),
      };

      reviewStore.updateReview(updatedReview.id, updatedReview);
      loadReviewsForProduct();
      cancelEdit();
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editingIndex.value = null;
      editingComment.value = "";
      editingRating.value = 0;
    };

    const deleteReview = (index) => {
      const reviewId = filteredReviews.value[index].id;
      reviewStore.deleteReview(reviewId);
    };

    const filteredReviews = computed(() => {
      return reviewStore.reviews.filter(review => review.productId === props.productId);
    });

    const changeTab = (tab) => {
      selectedTab.value = tab;
    };

    // Function to compress the image before uploading
    function compressImage(file, callback) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 800; // Maximum width for the compressed image
          const maxHeight = 800; // Maximum height for the compressed image
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7); // Adjust the quality as needed
          callback(compressedDataUrl);
        };
      };
    }

    // Usage in your component
    const onImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        compressImage(file, (compressedDataUrl) => {
          image.value = compressedDataUrl; // Store the compressed base64 representation of the image
        });
      }
    };

    return {
      tabs,
      selectedTab,
      relatedProducts,
      reviews,
      profileImage,
      firstName,
      lastName,
      newComment,
      newRating,
      addReview,
      isEditing,
      editingComment,
      editingRating,
      editReview,
      saveReview,
      cancelEdit,
      deleteReview,
      changeTab,
      productDetails,
      goToDetail,
      isSearching,
      isLoading,
      comment,
      rating,
      image,
      postReview,
      onImageUpload,
      filteredReviews,
    };
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
.productContain {
  width: 100%;
  height: auto;
  margin: 2%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2%;
  margin-bottom: 5%;
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
  border-radius: 10px;
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
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
  background: white;
  border: 5px solid #faf5ec;
  padding: 20px;
  border-radius: 10px;
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

.review-actions input[type="text"] {
  outline: none;
  border: 2.5px solid #faf5ec;
  padding: 10px;
  width: 79%;
  border-radius: 10px;
  margin-right: 10px;
}
.review-actions input[type="number"] {
  outline: none;
  border: 2.5px solid #faf5ec;
  padding: 10px;
  width: 10.6%;
  border-radius: 10px;
}

.review-actions input[type="file"]::file-selector-button {
  outline: none;
  border: 2.5px solid #faf5ec;
  background: white;
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
}
.review-actions button {
  background: white;
  border: 2.5px solid #faf5ec;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 10%;
  align-self: center;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
}
.showReview {
  display: flex;
  border-radius: 12px;
  justify-content: space-between;
  padding: 10px;
  background: #faf5ec;
}
.showReview img {
  border-radius: 10px;
}
.but-action {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.but-action button {
  background: white;
  border: 2.5px solid #faf5ec;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  align-self: center;
  font-size: 16px;
  transition: all 0.3s ease;
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
