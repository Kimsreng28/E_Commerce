<template>
  <div class="productDetailComponent">
    <!-- Product Detail -->
    <div class="productDetail">
      <!-- Product Detail Image -->
      <div class="imagesOfProducts">
        <div class="fourImages">
          <img
            v-for="img in imageDetails"
            :key="img"
            :src="'http://localhost:5173/' + img"
            alt=""
            @click="selectImage(img)"
            :class="{ selected: img === imageProduct }"
          />
        </div>
        <div class="mainImage">
          <img :src="'http://localhost:5173/' + imageProduct" alt="" />
        </div>
      </div>

      <!-- Product Detail Name color size price ...-->
      <div class="detailOfProduct">
        <div class="name">
          <p>{{ nameProduct }}</p>
        </div>
        <div class="discount">
          <p>{{ discountProduct }}</p>
        </div>
        <div class="rating">
          <span
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{
              filled: i <= Math.floor(ratingProduct),
              half:
                i === Math.ceil(ratingProduct) &&
                !Number.isInteger(ratingProduct),
            }"
          >
            ★
          </span>
          <p>({{ ratingProduct }})</p>
          <p>|</p>
          <p
            :style="{
              color: stock === 'In Stock' ? '#0fb763' : '#ff3d3d',
            }"
          >
            {{ stock }}
          </p>
        </div>
        <div class="price">
          <p>$ {{ priceProduct }}</p>
          <p class="oldPrice">$ {{ oldPrice }}</p>
        </div>
        <div class="description">
          <p>{{ descriptionProduct }}</p>
        </div>
        <hr />
        <div class="colorSelection" v-if="colorProduct.length > 0">
          <p>Colors:</p>
          <div class="colorOptions">
            <span
              v-for="(color, index) in colorProduct"
              :key="index"
              class="colorOption"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
              :class="{ selected: selectedColor === color }"
            >
            </span>
          </div>
        </div>

        <div class="sizeSelection">
          <p>Size:</p>
          <div class="sizeOptions">
            <span
              v-for="(size, index) in sizeProduct"
              :key="index"
              class="sizeOption"
              @click="selectedSize = size"
              :class="{ selected: selectedSize === size }"
            >
              {{ size }}
            </span>
          </div>
        </div>

        <div class="detailMethod">
          <div class="wishlist">
            <button @click="handleAddToWishlist">
              <span class="material-icons">favorite</span>
            </button>
          </div>

          <div class="buttonIncrementAndDecrement">
            <button id="add" @click="incrementQuantity">
              <span id="plus" class="material-icons">add</span>
            </button>
            <div class="number">
              <p>{{ quantity }}</p>
            </div>
            <button id="subtract" @click="decrementQuantity">
              <span id="minus" class="material-icons">remove</span>
            </button>
          </div>
          <div class="addToCart">
            <Button_Component
              name-button="Add To Cart"
              color-button="#FFFFFF"
              background-color-button="#958383"
              height-button="45px"
              width-button="140px"
              icon="shopping_cart"
              @click="handleAddToCart"
            />
          </div>
        </div>

        <div class="tellAbout">
          <div class="freeDelivery">
            <div class="img">
              <img src="@/assets/images/CardFuture/free-shipping.png" alt="" />
            </div>
            <div class="text">
              <p>Free Delivery</p>
              <a>Click your line go to detail. </a>
            </div>
          </div>

          <div class="returnDelivery">
            <div class="img">
              <img src="@/assets/images/CardFuture/product-return.png" alt="" />
            </div>
            <div class="text">
              <p>Return Delivery</p>
              <p>Free 30 Days Delivery Return.<a> Detail</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useUserSignupStore } from "@/stores/useUserSignupStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Button_Component from "../Button_Component.vue";

export default {
  name: "DetailProduct_Component",
  components: { Button_Component },
  props: {
    id: Number,
    imageDetails: Array,
    imageProduct: String,
    nameProduct: String,
    priceProduct: String,
    ratingProduct: String,
    descriptionProduct: String,
    colorProduct: Array,
    sizeProduct: Array,
    discountProduct: String,
    oldPrice: Number,
    stock: String,
    quantity: { type: Number, default: 1 },
  },
  setup(props) {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const router = useRouter();
    const useStore = useUserSignupStore();

    const quantity = ref(props.quantity);
    const selectedColor = ref(props.colorProduct[0] || "#A0BCE0");
    const selectedSize = ref(props.sizeProduct[0] || "S");
    const imageProduct = ref(props.imageProduct);

    const selectImage = (img) => {
      imageProduct.value = img;
    };

    const discountPrice = computed(() => props.discountProduct || "0%");
    const stockQuantity = Number(props.stock);
    const stock = ref(stockQuantity > 0 ? "In Stock" : "Out of Stock");

    const incrementQuantity = () => {
      quantity.value += 1;
    };
    const decrementQuantity = () => {
      if (quantity.value > 1) quantity.value -= 1;
    };

    const handleAddToCart = (event) => {
      event.stopPropagation();
      if (!useStore.isLoggedIn) {
        alert("Please login to add product to cart!");
        router.push("/signIn");
        return;
      }

      cartStore.addToCart({
        id: props.id,
        name: props.nameProduct,
        price: parseFloat(props.priceProduct),
        image: imageProduct.value,
        quantity: quantity.value,
        color: selectedColor.value,
        size: selectedSize.value,
        discount: discountPrice.value,
      });
      alert("Product added to cart!");
      router.push("/cart");
    };

    const handleAddToWishlist = (event) => {
      event.stopPropagation();
      if (!useStore.isLoggedIn) {
        alert("Please login to add product to wishlist!");
        router.push("/signIn");
        return;
      }

      wishlistStore.addToWishlist({
        id: props.id,
        title: props.nameProduct,
        images: props.imageProduct,
        price: parseFloat(props.priceProduct),
        productDiscount: discountPrice.value,
        oldPrice: props.oldPrice,
        quantity: quantity.value,
        color: selectedColor.value,
        size: selectedSize.value,
      });
      alert("Product added to wishlist!");
    };

    return {
      handleAddToWishlist,
      handleAddToCart,
      incrementQuantity,
      decrementQuantity,
      quantity,
      selectedColor,
      selectedSize,
      selectImage,
      stock,
      imageProduct,
      discountPrice,
    };
  },
};
</script>

<style scoped>
.productDetailComponent {
  width: 100%;
  max-width: 1440px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.productDetail {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1%;
  gap: 4%;
}
.addToCart {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.imagesOfProducts {
  width: 50%;
  height: 700px;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: row;
  padding: 1%;
  gap: 1%;
}

.fourImages {
  background-color: #e9e7e7;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #a29595;
  border-radius: 5px;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
}
.fourImages img {
  background-color: rgb(216, 216, 216);
  width: 80%;
  cursor: pointer;
  border-radius: 5px;
  height: auto;
  object-fit: contain;
}
.fourImages img.selected {
  border: 1px solid #4c4040;
  border-radius: 5px;
}
.fourImages img:hover {
  transform: scale(1.03);
  transition: all 0.3s;
}
.mainImage {
  background-color: #e9e7e7;
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #a29595;
  border-radius: 5px;
}

.mainImage img {
  width: auto; /* Adjusts based on the aspect ratio */
  height: 100%; /* Ensures it fills the container's height */
  max-width: 100%; /* Prevents overflow within the container */
  object-fit: contain; /* Ensures the entire image is visible within the container */
  object-position: center; /* Centers the image */
}

.detailOfProduct {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1%;
}

.name {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}

.name p {
  font-size: 26px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #393737;
}

.discount {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 1%;
  gap: 2%;
}

.discount p {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #958383;
  border-radius: 5px;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #f5ebeb;
}

.rating {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 2%;
  gap: 2%;
}

.star {
  color: #554343;
}

.filled {
  color: #ffc107;
}

.half::before {
  content: "★";
  color: #ffc107;
  position: absolute;
  width: 50%;
  overflow: hidden;
}

.rating p {
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #564949;
}

.price {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 2%;
  gap: 2%;
}
.price .oldPrice {
  text-decoration: line-through;
  color: #9a9090;
}
.price p {
  font-size: 24px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #0fb763;
}

.colorSelection,
.sizeSelection {
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-top: 3%;
  gap: 3%;
}

.colorSelection p,
.sizeSelection p {
  font-size: 20px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #000000;
}
.detailMethod {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2%;
  margin-top: 3%;
}
.wishlist {
  width: 10%;
}
.wishlist button {
  width: 40px;
  height: 40px;
  border: 1px solid #554343;
  border-radius: 5px;
  background-color: #958383;
  cursor: pointer;
}
.wishlist button:hover {
  background-color: #564949;
  transition: all 0.3s;
}
.wishlist button span {
  color: aliceblue;
}
.wishlist button span:hover {
  color: #eb1717;
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
}
.buttonIncrementAndDecrement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  gap: 1%;
  border-radius: 5px;
  border: 1px solid #aa9a9a;
}
.buttonIncrementAndDecrement button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #b0a5a5;
  cursor: pointer;
}
.buttonIncrementAndDecrement #add:hover {
  background-color: #087df2;
  transition: all 0.3s;
  color: aliceblue;
}
.buttonIncrementAndDecrement #subtract:hover {
  background-color: #ec2525;
  transition: all 0.3s;
  color: aliceblue;
}
.number {
  display: flex;
  justify-content: center;
  align-items: center;
}
.number p {
  color: #000000;
  font-size: 20px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
}
.description {
  margin-top: 2%;
  display: flex;
  justify-content: start;
  align-items: center;
}
.description p {
  color: #7b7373;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
}
.tellAbout {
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.returnDelivery {
  margin-top: 1%;
  width: 60%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  padding: 2%;
  gap: 10px;
  border: 1px solid #a8a1a1;
}
.freeDelivery {
  width: 60%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  padding: 2%;
  gap: 10px;
  border: 1px solid #a8a1a1;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
}
.text {
  width: 100%;
}
.text p {
  color: #3f3d3d;
  font-size: 14px;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
}
.text a {
  color: #aa9a9a;
  font-size: 14px;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
  text-decoration: underline;
}
.colorOptions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.colorOption {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.colorOption:hover {
  filter: brightness(90%);
}

.colorOption.selected {
  border-color: black;
}

.sizeOptions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.sizeOption {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: Quicksand, sans-serif;
  width: 50px;
  height: 40px;
  border: 1px solid #ccc;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;
  border-radius: 10px;
}

.sizeOption:hover {
  filter: brightness(90%);
}

.sizeOption.selected {
  background-color: #958383;
  color: white;
  border-color: #958383;
}

@media (max-width: 768px) {
  .productDetail {
    gap: 15px;
  }

  .fourImages img {
    max-height: 60px;
  }

  .price p {
    font-size: 20px;
  }

  .description p {
    font-size: 14px;
  }

  .colorOption,
  .sizeOption {
    width: 25px;
    height: 25px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .productDetailComponent {
    padding: 5px;
  }

  .productDetail {
    gap: 10px;
  }

  .fourImages img {
    max-height: 50px;
  }

  .name p {
    font-size: 20px;
  }

  .price p {
    font-size: 18px;
  }

  .description p {
    font-size: 12px;
  }

  .colorOption,
  .sizeOption {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }

  .wishlist button {
    width: 30px;
    height: 30px;
  }

  .buttonIncrementAndDecrement button {
    width: 30px;
    height: 30px;
  }

  .buttonIncrementAndDecrement .number p {
    font-size: 16px;
  }
}
</style>
