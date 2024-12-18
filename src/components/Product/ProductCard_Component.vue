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
        <img :src="'http://localhost:5173/'+ imageProduct" alt="" />
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
.productCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 322px;
  height: 500px;
  background-color: #d9d6d6;
  border-radius: 10px;
}

.productImage {
  position: relative; /* Ensures absolute children are positioned relative to this */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 350px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #edebeb;
}

.discount {
  position: absolute;
  top: 10px;
  right: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #665d5d;
  color: #ffffff;
  border-radius: 5px;
  padding: 5px 8px;
  font-size: 14px;
  font-weight: bold;
}

.discount p {
  margin: 0;
  font-family: Arial, sans-serif;
}

.wishlist {
  position: absolute;
  top: 10px;
  right: 10px;
}

.wishlist button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.wishlist button span {
  font-size: 20px;
  color: #564949;
}

.wishlist button:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}

.wishlist button span:hover {
  color: #fa3307;
}

.image {
  width: 300px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  object-position: center;
}

.image img {
  width: 90%;
  height: 80%;
  transition: transform 0.5s ease;
}

.image img:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.productName {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 130px;
  margin-left: 5%;
}

.name p {
  font-size: 24px;
  font-weight: bold;
  color: #564949;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.star {
  color: #554343;
}

.filled {
  color: #ffc107;
}

.price p {
  font-size: 18px;
  font-weight: bold;
  color: #9e9e9e;
}

.buttonAdd {
  display: flex;
  justify-content: end;
  width: 95%;
}

.buttonAdd button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 40px;
  border: none;
  background-color: #a89e9e;
  border-radius: 10px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.buttonAdd button:hover {
  background-color: #949191;
  cursor: pointer;
}

.buttonAdd button span {
  color: #3a3636;
}

</style>
