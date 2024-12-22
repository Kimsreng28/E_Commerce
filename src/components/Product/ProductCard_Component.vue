<template>
  <div class="productCard">
    <!-- Category Image -->
    <div class="productImage">
      <div class="wishlist">
        <div v-if="discountProduct" class="discount">
          <p>{{ discountProduct }}</p>
        </div>
        <button @click="handleAddToWishlist($event)">
          <span class="material-icons">favorite</span>
        </button>
      </div>

      <div class="image">
        <img :src="'http://localhost:5173/' + imageProduct" alt="" />
      </div>
    </div>

    <!-- Category Name -->
    <div class="productName">
      <div class="name">
        <p>{{ nameProduct }}</p>
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
        <p>({{ ratingProduct.toFixed(1) }})</p>
      </div>

      <div class="price">
        <p>${{ priceProduct }}</p>
      </div>

      <div class="buttonAdd">
        <button @click="handleToProductDetail(product)">
          <span class="material-icons"> add_shopping_cart </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductDetailStore } from "@/stores/useProductDetail";
import { useProductStore } from "@/stores/useProductStore";
import { useUserSignupStore } from "@/stores/useUserSignupStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Button_Component from "../Button_Component.vue";

export default {
  name: "ProductCard",
  components: {
    Button_Component,
  },
  props: {
    id: Number,
    imageProduct: String,
    nameProduct: String,
    ratingProduct: Number,
    priceProduct: Number,
    discountProduct: String,
    oldPrice: Number,
    descriptionProduct: String,
    imageDetails: Array,
    colorProduct: Array,
    sizeProduct: Array,
    stockProduct: String,
  },

  setup(props) {
    const wishlistStore = useWishlistStore();
    const productStore = useProductDetailStore();
    const router = useRouter();
    const userStore = useUserSignupStore();
    const storeProduct = useProductStore();

    console.log("Products from store:", storeProduct.products);

    // Computed property to fetch product by its ID
    const product = computed(() => {
      const foundProduct = storeProduct.products.find(
        (item) => item.id === props.id
      );
      if (!foundProduct) {
        console.log("No product found with ID:", props.id);
      }
      return foundProduct;
    });

    // Computed properties
    const discountProduct = computed(() =>
      product.value ? product.value.discount : ""
    );
    const oldPrice = computed(() => product.value?.oldPrice || "");
    const descriptionProduct = computed(() =>
      product.value ? product.value.description : ""
    );
    const imageDetails = computed(() => product.value?.imageDetails || []);
    const sizeProduct = computed(() => product.value?.size || []);
    const colorProduct = computed(() => product.value?.color || []);
    const stockProduct = computed(() => product.value?.stock || "Out of Stock");

    // Handle Add To Wishlist
    const handleAddToWishlist = (event) => {
      event.stopPropagation();

      if (!userStore.isLoggedIn) {
        alert("Please sign in or sign up to add items to your wishlist.");
        router.push("/signIn");
        return;
      }
      const productToAdd = {
        id: props.id,
        title: props.nameProduct,
        images: props.imageProduct,
        price: props.priceProduct,
        productDiscount: discountProduct.value,
        oldPrice: oldPrice.value,
        colorProduct: props.colorProduct || [],
        sizeProduct: props.sizeProduct || [],
      };
      console.log("Adding to wishlist:", productToAdd);

      wishlistStore.addToWishlist(productToAdd);
      alert("Product added to wishlist!");
    };

    // Handle To Product Detail
    const handleToProductDetail = () => {
      if (!userStore.isLoggedIn) {
        alert("Please sign in or sign up to view product details.");
        router.push("/signIn");
      } else {
        const product = {
          id: props.id,
          title: props.nameProduct,
          image: props.imageProduct,
          description: descriptionProduct.value,
          price: props.priceProduct,
          rating: props.ratingProduct,
          size: sizeProduct.value,
          color: colorProduct.value,
          imageDetails: imageDetails.value,
          stock: stockProduct.value,
          productDiscount: discountProduct.value,
          oldPrice: oldPrice.value,
        };

        productStore.addToProductDetail(product);
        alert("Go To Product Detail!");

        // Navigate to product detail by Id when click on product to detail
        router.push({ name: "productDetail", params: { id: props.id } });
      }
    };

    return {
      handleAddToWishlist,
      handleToProductDetail,
      discountProduct,
      oldPrice,
      descriptionProduct,
      imageDetails,
      sizeProduct,
      colorProduct,
      stockProduct,
    };
  },
};
</script>

<style scoped>
.discount {
  width: 80%;
  display: flex;
  justify-content: start;
  align-items: center;
  z-index: 1;
}
.discount p {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  border-radius: 5px;
  background-color: #665d5d;
  color: #fffbfb;
}
.productCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  max-width: 322px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.productImage {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 350px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  object-fit: cover;
  background-color: #d9d9d9;
}
.wishlist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2%;
}

.wishlist button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: #efebeb;
  border-radius: 10px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}

.wishlist button span {
  font-size: 20px;
  font-weight: bold;
  color: #564949;
}

.wishlist button span:hover {
  color: #fa3307;
  cursor: pointer;
}

.image {
  width: 250px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  object-position: center;
}
.image img {
  width: 80%;
  height: auto;
}
.image img:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: transform 0.5s;
}
.productName {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 130px;
  border-radius: 10px;
  margin-left: 5%;
}
.name p {
  font-size: 24px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #564949;
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
.price p {
  font-size: 18px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #9e9e9e;
}
.buttonAdd {
  display: flex;
  justify-content: end;
  align-items: center;
  width: 95%;
  margin-top: -5%;
}

.buttonAdd button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 40px;
  border: none;
  background-color: #a89e9e;
  border-radius: 10px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}

.buttonAdd button:hover {
  background-color: #949191;
  cursor: pointer;
}

.buttonAdd button span {
  color: #3a3636;
}

.buttonAdd button span:hover {
  transform: scale(1.1);
  transition: transform 0.5s;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .productCard {
    width: 100%;
    max-width: 280px; /* Slightly smaller for tablets */
  }

  .image {
    height: 250px; /* Reduce image height for smaller screens */
  }

  .name p {
    font-size: 16px; /* Adjust font size for text */
  }

  .price p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .productCard {
    width: 100%;
    max-width: 100%; /* Take full width for small screens */
  }

  .image {
    height: 200px; /* Smaller height for mobile */
  }

  .name p {
    font-size: 14px; /* Further adjust text size */
  }

  .price p {
    font-size: 12px;
  }

  .buttonAdd button {
    width: 80px;
    height: 35px;
  }
}
</style>
