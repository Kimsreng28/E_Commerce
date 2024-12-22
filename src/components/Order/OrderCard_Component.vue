<template>
  <div class="orderCard">
    <div class="container">
      <div class="image">
        <img :src="imageProduct" alt="" />
      </div>
      <div class="detail">
        <div class="up">
          <div class="left">
            <p>{{ nameProduct }}</p>
            <p>{{ sizeProduct }}</p>
            <p>{{ colorProduct }}</p>
          </div>
          <div class="right">
            <p>${{ productPrice }}</p>
            <p>x{{ productQuantity }}</p>
          </div>
        </div>
        <div class="down">
          <div class="dateAndTime"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderCard_Component",
  props: {
    imageProduct: String,
    nameProduct: String,
    sizeProduct: String,
    colorProduct: String,
    productPrice: String,
    productQuantity: String,
  },
};
</script>
