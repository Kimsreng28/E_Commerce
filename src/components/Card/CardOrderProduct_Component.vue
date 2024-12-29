<template>
    <div class="card-order-product">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <div class="product-details">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-quantity">Quantity: {{ product.quantity }}</p>
        <p class="product-price">Price: ${{ product.price }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CardOrderProduct_Component",
    props: {
      product: {
        type: Object,
        required: true,
        default: () => ({}),
      },
    },
  };
  </script>
  
  <style scoped>
  .card-order-product {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 20px;
  }
  
  .product-details {
    display: flex;
    flex-direction: column;
  }
  
  .product-name {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 5px;
  }
  
  .product-quantity,
  .product-price {
    font-size: 14px;
    color: #555;
    margin: 2px 0;
  }
  </style>
  