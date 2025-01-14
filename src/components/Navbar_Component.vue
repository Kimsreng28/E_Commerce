<template>
  <div class="navBar">
    <div class="imgLogo">
      <img
        src="../assets/images/Logo/LogoEcommerce.png"
        alt=""
        @click="this.$router.push('/')"
      />
    </div>
    <div class="contents">
      <p @click="this.$router.push('/')">Home</p>
      <p @click="this.$router.push('/category')">Shop</p>
      <p @click="this.$router.push('/contact')">Contact</p>
      <p @click="this.$router.push('/about')">About</p>
    </div>
    <div class="search">
      <span class="material-icons">search</span>
      <input
        type="text"
        placeholder="Search product here..."
        @input="emitSearch"
        v-model="searchQuery"
      />
      <span class="material-icons">shopping_cart</span>
    </div>

    <div class="cart">
      <!-- Deployment History -->

      <!-- Cart -->
      <span class="material-icons" id="cart" @click="this.$router.push('/cart')"
        >shopping_cart</span
      >

      <span v-if="cartCount > 0" class="cart-count"
        ><p>{{ cartCount }}</p></span
      >

      <!-- Wishlist -->
      <span
        class="material-icons"
        id="favorite"
        @click="$router.push('/wishlist')"
        >favorite</span
      ><span v-if="wishlistCount > 0" class="wishlist-count"
        ><p>{{ wishlistCount }}</p></span
      >

      <!-- Order History -->
      <span
        class="material-icons"
        id="order_history"
        @click="$router.push('/order')"
        >history</span
      >

      <!-- Account -->
      <p style="color: white">|</p>

      <!-- Profile Account -->
      <span
        v-if="isLoggedIn && profileImage"
        class="profile-image"
        @click="handleAccountClick"
      >
        <img :src="profileImage" alt="" />
      </span>

      <span
        v-else
        class="material-icons"
        id="account"
        @click="handleAccountClick"
        >account_circle</span
      >
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/useCartStore";
import { useUserSignupStore } from "@/stores/useUserSignupStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "NavbarComponent",
  props: ["onSearch"],

  setup(props) {
    const authStore = useUserSignupStore();
    const router = useRouter();
    const profileImage = ref(null);
    const searchQuery = ref("");

    // function for control account
    const handleAccountClick = () => {
      if (authStore.isLoggedIn) {
        router.push("/profile");
      } else {
        router.push("/signIn");
      }
    };

    // function for emit search event when user types
    const emitSearch = () => {
      props.onSearch(searchQuery.value);
    };

    // load profile image from local storage when component mounts
    onMounted(() => {
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) {
        profileImage.value = storedImage;
      }
    });

    return {
      handleAccountClick,
      emitSearch,
      searchQuery,
      profileImage,
      isLoggedIn: computed(() => authStore.isLoggedIn),
      wishlistCount: computed(() => useWishlistStore().wishlist.length),
      cartCount: computed(() => useCartStore().cartItems.length),
    };
  },

  computed: {
    wishlistCount() {
      const store = useWishlistStore();
      return store.wishlist.length;
    },

    cartCount() {
      const store = useCartStore();
      return store.cartItems.length;
    },
  },
};
</script>

<style scoped>
.navBar {
  width: 1519px;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 2%;
}
.imgLogo img {
  width: auto;
  height: 40px;
  cursor: pointer;
}

.contents {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.contents p {
  margin: 0;
  cursor: pointer;
  font-size: 18px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #000000;
  position: relative;
  transition: color 0.3s;
}

.contents p::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 2px;
  background-color: #000000;
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: right;
}

.contents p:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
.search {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: #f0f0f0;
  width: 300px;
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
}

.search span {
  font-size: 18px;
  color: #666666;
  margin-right: 0.5rem;
}

.search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-family: Quicksand, sans-serif;
  color: #666666;
}

.cart {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.2rem 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  background-color: #666666;
}

.cart span {
  font-size: 24px;
  color: #ffffff;
  transition: color 0.3s, transform 0.3s;
}

.cart span:hover {
  transform: scale(1.1);
}

#cart:hover {
  color: #41e20b;
}
#favorite:hover {
  color: #eb1e1e;
}
#account:hover {
  color: rgb(10, 219, 238);
}

#order_history:hover {
  color: rgb(10, 219, 238);
}

.cart p {
  margin: 0;
  font-size: 18px;
  color: #000000;
}
.wishlist-count,
.cart-count {
  position: relative;
  top: -10px;
  right: 20px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgb(228, 21, 21);
  transition: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wishlist-count p,
.cart-count p {
  color: rgb(173, 169, 169);
  font-size: 14px;
  margin: 0;
}

.profile-image img {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 2px solid #f6f0f0;
}
.profile-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.material-icons {
  cursor: pointer;
}
/* Responsive adjustments */
@media (max-width: 1024px) {
  .navBar {
    padding: 2% 1rem;
  }

  .contents {
    gap: 1rem;
  }

  .search {
    width: 200px;
  }

  .cart,
  .contents {
    gap: 0.5rem;
  }

  .cart span,
  .material-icons {
    font-size: 20px;
  }
}

@media (max-width: 500px) {
  .navBar {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 1rem;
  }

  .imgLogo img {
    height: 30px;
  }

  .contents {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .contents p {
    font-size: 16px;
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    margin-top: 1rem;
  }

  .search input {
    width: 100%;
  }

  .cart {
    margin-top: 1rem;
  }

  .profile-image img {
    width: 25px;
    height: 25px;
  }
}
</style>
