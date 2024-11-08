<template>
  <div class="navBar">
    <div class="imgLogo">
      <img src="../assets/images/Logo/LogoEcommerce.png" alt="" />
    </div>
    <div class="contents">
      <p @click="this.$router.push('/')">Home</p>
      <p @click="this.$router.push('/contact')">Contact</p>
      <p @click="this.$router.push('/about')">About</p>
    </div>
    <div class="search">
      <span class="material-icons">search</span>
      <input type="text" placeholder="Search product here..." />
    </div>

    <div class="cart">
      <span class="material-icons" id="cart">shopping_cart</span>
      <span class="material-icons" id="favorite">favorite</span>
      <p style="color: white">|</p>
      <span class="material-icons" id="account" @click="handleAccountClick"
        >account_circle</span
      >
    </div>
  </div>
</template>

<script>
import { useUserSignupStore } from "@/stores/useUserSignupStore";
import { useRouter } from "vue-router";
export default {
  name: "NavbarComponent",

  setup() {
    const authStore = useUserSignupStore();
    const router = useRouter();

    const handleAccountClick = () => {
      if (authStore.isLoggedIn) {
        router.push("/profile");
      } else {
        router.push("/signIn");
      }
    };

    return {
      handleAccountClick,
    };
  },
};
</script>

<style scoped>
.navBar {
  width: 1440px;
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

.cart p {
  margin: 0;
  font-size: 18px;
  color: #000000;
}
</style>
