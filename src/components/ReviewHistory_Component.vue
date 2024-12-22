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
      <div class="reviewCard">
        <img
          class="reviewImage"
          src="@/assets/images/ReviewHistory/shoes.jpg"
          alt=""
        />
        <div class="cardFooter">
          <p class="productName">Kimsreng</p>
          <p class="rating">⭐ 4.5</p>
        </div>
      </div>
      <div class="reviewCard">
        <img
          class="reviewImage"
          src="@/assets/images/ReviewHistory/shoes.jpg"
          alt=""
        />
        <div class="cardFooter">
          <p class="productName">Kimsreng</p>
          <p class="rating">⭐ 4.5</p>
        </div>
      </div>
      <div class="reviewCard">
        <img
          class="reviewImage"
          src="@/assets/images/ReviewHistory/shoes.jpg"
          alt=""
        />
        <div class="cardFooter">
          <p class="productName">Kimsreng</p>
          <p class="rating">⭐ 4.5</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewHistoryComponent",
  data() {
    return {
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
    };
  },
  methods: {
    startDrag(e) {
      this.isDragging = true;
      this.startX = e.clientX;
      this.scrollLeft = this.$refs.reviewContainer.scrollLeft;
    },
    drag(e) {
      if (!this.isDragging) return;
      const x = e.clientX;
      const walk = (x - this.startX) * 2; // Multiplier for scroll speed
      this.$refs.reviewContainer.scrollLeft = this.scrollLeft - walk;
    },
    stopDrag() {
      this.isDragging = false;
    },
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
  width: 100%;
  height: 200px;
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

.productName {
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
