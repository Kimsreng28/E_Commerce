<template>
  <div class="orderCard">
    <div class="container">
      <div class="image">
        <img :src="imageProduct" alt="" />
      </div>
      <div class="detail">
        <div class="up">
          <div class="left">
            <p class="product-name">{{ nameProduct }}</p>
            <p class="product-size">Size: {{ sizeProduct }}</p>
            <p class="product-color">Color: {{ colorProduct }}</p>
          </div>
          <div class="right">
            <p class="product-price">${{ productPrice }}</p>
            <p class="product-quantity">x{{ productQuantity }}</p>
          </div>
        </div>
        <div class="down">
          <div class="dateAndTime">
            <p class="order-date">Order Date: {{ orderDate }}</p>
          </div>
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
    productPrice: Number, 
    productQuantity: Number, 
    orderDate: String, 
  },
};
</script>

<style scoped>
.orderCard {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
}

.container {
  display: flex;
  width: 100%;
}

.image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.detail {
  flex-grow: 1;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.up {
  display: flex;
  justify-content: space-between;
}

.left p,
.right p {
  margin: 0;
  font-size: 14px;
}

.product-name {
  font-weight: bold;
}

.product-size,
.product-color,
.product-price,
.product-quantity {
  font-size: 13px;
  color: #666;
}

.down {
  margin-top: 10px;
}

.order-date {
  font-size: 12px;
  color: #999;
}
</style>
