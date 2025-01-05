<template>
  <div>
    <p class="reviewTitle">What customers say about</p>
    <p class="reviewTitle">Fast Collection?</p>

    <div
      class="reviewContainer"
      ref="reviewContainer"
      @mousedown="startDrag"
      @mousemove="drag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
    >
      <!-- Loop through displayed reviews -->
      <div
        class="reviewCard"
        v-for="review in displayedReviews"
        :key="review.id"
      >
      <img v-if="review.image" :src="review.image" alt="Product Image" class="reviewImage"/>
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

    // State for dragging
    const isDragging = ref(false);
    const startX = ref(0);
    const scrollLeft = ref(0);

    // Computed property for all reviews
    const allReviews = computed(() => reviewStore.reviews);

    // State for managing displayed reviews
    const displayedReviews = ref([]);
    const currentIndex = ref(0);

    // Update displayed reviews every 5 items
    const updateDisplayedReviews = () => {
      if (!allReviews.value.length) return;

      const start = currentIndex.value;
      const end = start + 5;
      displayedReviews.value = allReviews.value.slice(
        start,
        end > allReviews.value.length ? undefined : end
      );

      // Update the index for the next batch
      currentIndex.value = end >= allReviews.value.length ? 0 : end;
    };

    // Start automatic updates
    const startAutoUpdate = () => {
      updateDisplayedReviews(); // Initial display
      setInterval(updateDisplayedReviews, 5000); // Change every 5 seconds
    };

    // Methods for drag functionality
    const startDrag = (e) => {
      isDragging.value = true;
      startX.value = e.clientX;
      scrollLeft.value = e.target.scrollLeft;
    };

    const drag = (e) => {
      if (!isDragging.value) return;
      const walk = (e.clientX - startX.value) * 2; // Multiplier for scroll speed
      e.target.scrollLeft = scrollLeft.value - walk;
    };

    const stopDrag = () => {
      isDragging.value = false;
    };

    // Load reviews when the component is mounted
    onMounted(() => {
      reviewStore.loadReviews();
      startAutoUpdate();
    });

    return {
      isDragging,
      startX,
      scrollLeft,
      displayedReviews,
      startDrag,
      drag,
      stopDrag,
    };
  },
};
</script>

<style>
.reviewTitle {
  margin-left: 40px;
  font-size: 24px;
  font-weight: bold;
  color: #372f2f;
  font-family: Quicksand, sans-serif;
}

.reviewContainer {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 20px;
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

/* Responsive adjustments */
@media (max-width: 1024px) {
  .reviewContainer {
    gap: 15px;
  }

  .reviewCard {
    flex: 0 0 45%; /* Two cards per row */
    height: auto;
  }

  .reviewImage {
    height: 180px; /* Adjust image height for better fit */
  }
}

@media (max-width: 768px) {
  .reviewTitle {
    font-size: 20px;
    margin-left: 20px;
  }

  .reviewContainer {
    gap: 10px;
    padding: 10px;
  }

  .reviewCard {
    flex: 0 0 90%; /* One card per row */
    height: auto;
  }

  .reviewImage {
    height: 150px; /* Reduce image height */
  }

  .productName {
    font-size: 14px;
  }

  .rating {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .reviewTitle {
    font-size: 18px;
    margin-left: 10px;
  }

  .reviewContainer {
    gap: 8px;
    padding: 5px;
  }

  .reviewCard {
    flex: 0 0 85%; /* One card per row with more margin */
    height: auto;
  }

  .reviewImage {
    height: 130px; /* Further reduce image height for mobile */
  }

  .productName {
    font-size: 12px;
  }

  .rating {
    font-size: 12px;
  }
}
</style>
