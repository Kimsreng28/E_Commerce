<template>
  <div class="cardCategory">
    <div class="categoryImage">
      <img :src="imageCategory" alt="" />
    </div>
    <div class="categoryName">
      <p :style="{ color: colorName }">{{ nameCategory }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCategory_Component",
  props: {
    imageCategory: String,
    nameCategory: String,
    colorName: String,
  },
};
</script>

<style scoped>
.cardCategory {
  width: 100%;
  max-width: 160px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f1f1f1;
  padding: 2%;
}

.cardCategory:hover {
  transform: scale(1.03);
  background-color: #554e4f;
}

.categoryImage {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.categoryImage img {
  object-fit: cover;
  width: 80%;
  height: 80%;
  filter: drop-shadow(0 0 0.3rem #554e4f);
}

.cardCategory p {
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
}

.cardCategory:hover p {
  color: #ffffff;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .cardCategory {
    max-width: 140px; /* Slightly smaller width for tablets */
    padding: 8px; /* Adjust padding */
  }
  .categoryImage {
    width: 80px; /* Smaller image for tablets */
    height: 80px;
  }
  .categoryImage img {
    width: 70%; /* Adjust image size */
    height: 70%;
  }
  .cardCategory p {
    font-size: 14px; /* Smaller font for tablets */
  }
}

@media (max-width: 480px) {
  .cardCategory {
    max-width: 120px; /* Further reduce width for mobile */
    padding: 6px; /* Adjust padding for mobile */
  }
  .categoryImage {
    width: 60px; /* Smaller image size for mobile */
    height: 60px;
  }
  .categoryImage img {
    width: 60%; /* Reduce image size for mobile */
    height: 60%;
  }
  .cardCategory p {
    font-size: 12px; /* Reduce font size for mobile */
  }
}
</style>
