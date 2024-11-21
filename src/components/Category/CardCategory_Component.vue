<template>
  <div class="cardCategory">
    <div class="categoryImage">
      <img :src="imageCategory" alt="" />
    </div>
    <div class="categoryName">
      <p>{{ nameCategory }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCategory_Component",
  props: {
    imageCategory: String,
    nameCategory: String,
  },
};
</script>

<style scoped>
.cardCategory {
  width: 160px;
  height: 166px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f1f1f1;
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
  height: 805;
  filter: drop-shadow(0 0 0.3rem #554e4f);
}

.cardCategory p {
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #000000;
}

.cardCategory:hover p {
  color: #ffffff;
}
</style>
