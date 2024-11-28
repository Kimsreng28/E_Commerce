<template>
  <div class="cardWistList">
    <!-- Category Image -->
    <div class="cardImage">
      <div class="delete">
        <p>{{ discountProduct }}</p>
        <button @click="deleteItem">
          <span class="material-icons">delete</span>
        </button>
      </div>

      <div class="image">
        <img :src="imageWistList" alt="" />
      </div>
    </div>

    <!-- Add To Cart -->
    <div class="addToCart">
      <Button_Component
        name-button="Add To Cart"
        color-button="#FFFFFF"
        background-color-button="#958383"
        height-button="50px"
        width-button="270px"
        icon="shopping_cart"
        @click="handleAddToCart"
      />
    </div>

    <!-- Category Name -->
    <div class="cardName">
      <div class="name">
        <p>{{ productName }}</p>
      </div>
      <div class="price">
        <div class="oldPrice">
          <p>$ {{ oldPrice }}</p>
        </div>
        <div class="currentPrice">
          <p>${{ currentPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Button_Component from "./Button_Component.vue";
export default {
  name: "CardWistList_Component",
  components: {
    Button_Component,
  },
  props: {
    id: Number,
    imageWistList: String,
    discountProduct: String,
    productName: String,
    oldPrice: Number,
    currentPrice: Number,
    colorProduct: Array,
    sizeProduct: Array,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    console.log("ID received in setup:", props.id);
    const cartStore = useCartStore();
    const router = useRouter();
    const wishlistStore = useWishlistStore();

    // Default color and size
    const selectedColor = computed(() => {
      return props.colorProduct && props.colorProduct.length > 0
        ? props.colorProduct[0]
        : "#A0BCE0"; // Default color
    });

    const selectedSize = computed(() => {
      return props.sizeProduct && props.sizeProduct.length > 0
        ? props.sizeProduct[0]
        : "S"; // Default size
    });

    // Handle Add To Cart
    const handleAddToCart = () => {
      const productToAdd = {
        id: props.id,
        name: props.productName,
        price: props.currentPrice,
        image: props.imageWistList,
        quantity: props.quantity,
        color: selectedColor.value,
        size: selectedSize.value,
        discount: props.discountProduct,
      };

      cartStore.addToCart(productToAdd);
      alert("Product added to cart!");

      router.push("/cart");
    };

    // Handle Remove From Wishlist
    const deleteItem = () => {
      console.log("Deleting item with ID:", props.id);
      if (props.id !== undefined && props.id !== null) {
        wishlistStore.removeFromWishlist(props.id);
        alert("Product removed from wishlist!");
      } else {
        alert("Failed to remove product: Missing product ID.");
      }
    };

    return {
      handleAddToCart,
      selectedSize,
      selectedColor,
      deleteItem,
    };
  },
};
</script>

<style scoped>
.cardWistList {
  width: 320px;
  height: 450px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e7e2e2;
}

.cardImage {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e7e2e2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.delete {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
}

.delete p {
  width: 15%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #958383;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  font-family: Quicksand, sans-serif;
  color: aliceblue;
}

.delete button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  width: 30px;
  height: 30px;
}
.delete button span {
  color: #958383;
}

.delete button span:hover {
  color: rgb(231, 14, 14);
  transform: scale(1.1);
  transition: all 0.3s;
  cursor: pointer;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image img {
  width: 90%;
  height: 50%;
  margin-right: 10px;
}

.image img:hover {
  transform: scale(1.1);
  transition: all 0.3s;
  cursor: pointer;
}

.addToCart {
  width: 100%;
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cardName {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: #000000;
  margin-left: 16%;
  margin-top: 1%;
}
.name p {
  font-size: 18px;
  font-weight: bold;
  font-family: Quicksand, sans-serif;
}
.price {
  margin-top: 2%;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.oldPrice {
  margin-left: 8%;

  width: 50%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}
.oldPrice p {
  font-size: 16px;
  font-weight: 700;
  font-family: Quicksand, sans-serif;
  text-decoration: line-through;
  color: #9e9e9e;
}
.currentPrice {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}
.currentPrice p {
  font-size: 16px;
  font-weight: bold;
  font-family: Quicksand, sans-serif;
  color: #000000;
}
.cardName .price div {
  width: 50%;
}

/* Adjust layout when old price is hidden */
.cardName .price .currentPrice {
  margin-left: 60%;
}
</style>
