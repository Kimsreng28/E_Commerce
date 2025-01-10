<template>
  <div>
    <!-- Add scrollable container -->
    <div class="reviewContainer" ref="reviewContainer">
      <!-- Loop through displayed reviews with filter -->
      <div
        class="reviewCard"
        v-for="review in displayedReviews.filter(review => review.image)"
        :key="review.id"
      >
        <img
          :src="review.image"
          alt="Product Image"
          class="reviewImage"
        />
        <div class="cardFooter">
          <p class="command-product">{{ review.comment }}</p>
          <p class="rating">⭐ {{ review.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useReviewStore } from "@/stores/useReviewStore";
import { computed, onMounted, ref } from "vue";

export default {
  name: "ReviewHistoryComponent",
  setup() {
    const reviewStore = useReviewStore();

    const allReviews = computed(() => reviewStore.reviews);
    const displayedReviews = ref([]);

    const updateDisplayedReviews = () => {
      if (!allReviews.value.length) return;

      displayedReviews.value = allReviews.value.slice(0, 10); // Show first 10 reviews
    };

    onMounted(() => {
      reviewStore.loadReviews();
      updateDisplayedReviews();
    });

    return {
      displayedReviews,
    };
  },
};
</script>

<style>
.reviewTitle {
  margin-left: 60px;
  font-size: 24px;
  font-weight: bold;
  color: #372f2f;
  font-family: Quicksand, sans-serif;
}

.reviewContainer {
  display: flex;
  gap: 15px;
  padding: 15px;
  scroll-behavior: smooth;
  user-select: none;
  cursor: grab;
}

.reviewContainer img {
  pointer-events: none; /* Disable image dragging */
}

.reviewContainer::-webkit-scrollbar {
  height: 0;
}

.reviewContainer::-webkit-scrollbar-thumb {
  display: none;
}

.reviewContainer::-webkit-scrollbar-track {
  display: none;
}

.reviewCard {
  flex: 0 0 495px;
  height: 327px;
  background-color: #faf5ec;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
}

.reviewImage {
  max-width: 450px;
  object-fit: cover;
  border-radius: 10px;
}

.cardFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: auto;
}

.command-product {
  font-size: 16px;
  font-weight: bold;
  color: #4a4a4a;
}

.rating {
  font-size: 16px;
  color: #ff9800;
}
</style>
