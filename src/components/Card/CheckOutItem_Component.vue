<template>
    <div class="cartCheck">
      <div class="image">
        <img :src="imageProduct" alt="" />
      </div>
  
      <div class="detail">
        <div class="set">
          <div class="name">
            <p>{{ nameProduct }}</p>
          </div>
          <div class="size">
            <p>Size: {{ sizeProduct }}</p>
          </div>
          <div class="color" v-if="colorProduct">
            <p>Color:</p>
            <div
              class="colorDisplay"
              :style="{ backgroundColor: colorProduct }"
            ></div>
          </div>
          <div class="price">
            <p>${{ totalPrice }}</p>
          </div>
        </div>
  
        <div class="quantity">
          <div class="quantityProduct">
            <div class="number">
              <p>x{{ quantity }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from "vue";
  
  export default {
    name: "CheckOutItem_Component",
    props: {
      id: Number,
      imageProduct: String,
      nameProduct: String,
      sizeProduct: Array,
      colorProduct: Array,
      priceProduct: Number,
      quantity: {
        type: Number,
        default: 1,
      },
    },
    setup(props) {
      const totalPrice = computed(() => props.priceProduct * props.quantity);
  
      return {
        totalPrice,
      };
    },
  };
  </script>
  
  <style scoped>
  .colorDisplay {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
  .cartCheck {
    width: 625px;
    height: 200px;
    border: 1px solid #564949;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 10px;
    padding: 1%;
  }
  
  .image {
    width: 20%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2%;
    object-fit: cover;
    object-position: center;
  }
  
  .image img {
    width: 100%;
    height: 100%;
  }
  
  .image img:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.3s;
  }
  
  .detail {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .set {
    margin-top: 2%;
    margin-left: 5%;
    width: 40%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
  
  .name {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 3%;
  }
  .name p {
    color: #000000;
    font-family: Quicksand, sans-serif;
    font-weight: bold;
    font-size: 16px;
  }
  
  .size {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 3%;
  }
  .size p {
    color: #000000;
    font-family: Quicksand, sans-serif;
    font-weight: bold;
    font-size: 12px;
  }
  
  .color {
    margin-top: 2%;
    width: 100%;
    height: 20%;
    display: inline-flex;
    justify-content: start;
    align-items: center;
    gap: 3%;
  }
  .color p {
    color: #000000;
    font-family: Quicksand, sans-serif;
    font-weight: bold;
    font-size: 12px;
  }
  
  .price {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 2%;
  }
  .price p {
    color: #2fab16;
    font-family: Quicksand, sans-serif;
    font-weight: bold;
    font-size: 16px;
  }
  
  .quantity {
    width: 20%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .quantityProduct {
    width: 80%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5%;
  }
  
  .number {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .number p {
    color: #000000;
    font-family: Quicksand, sans-serif;
    font-weight: bold;
    font-size: 16px;
  }
  
  @media (max-width: 768px) {
    .cartCheck {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .image {
      width: 100%;
      margin: 0 auto;
    }
  
    .detail {
      width: 100%;
      flex-direction: column;
    }
  
    .set {
      margin-left: 0;
      align-items: flex-start;
    }
  
    .quantity {
      width: 100%;
      justify-content: flex-start;
      align-items: flex-start;
    }
  
    .quantityProduct {
      width: 100%;
      margin-top: 2%;
    }
  }
  
  @media (max-width: 480px) {
    .cartCheck {
      padding: 3%;
    }
  
    .name p {
      font-size: 14px;
    }
  
    .size p,
    .color p,
    .price p {
      font-size: 12px;
    }
  
    .quantityProduct {
      width: 100%;
      margin-top: 5%;
    }
  }
  </style>