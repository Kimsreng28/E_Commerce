import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    coupon: "", 
    couponDiscount: 0, 
  }),

  actions: {
    addToCart(product) {
      this.cartItems.push(product);
      this.saveToLocalStorage();
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      this.saveToLocalStorage();
    },
    clearCart() {
      this.cartItems = [];
      this.saveToLocalStorage();
    },
    deleteItem(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      this.saveToLocalStorage();
    },
    updateQuantity(productId, quantity) {
      const product = this.cartItems.find((item) => item.id === productId);
      if (product) {
        product.quantity = quantity;
        this.saveToLocalStorage();
      }
    },
    applyCoupon(code) {
      if (code === "SAVE10") {
        this.coupon = code;
        this.couponDiscount = 10;
      } else if (code === "SAVE20") {
        this.coupon = code;
        this.couponDiscount = 20; 
      } else {
        this.coupon = "";
        this.couponDiscount = 0;
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
  },

  getters: {
    getCartItems: (state) => state.cartItems,

    getSubtotal: (state) => {
      return state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    getDiscount: (state) => {
      const productDiscount = state.cartItems.reduce((totalDiscount, product) => {
        if (product.discount) {
          const itemDiscount =
            (product.discount / 100) * product.price * product.quantity;
          return totalDiscount + itemDiscount;
        }
        return totalDiscount;
      }, 0);

      const couponDiscount =
        (state.couponDiscount / 100) * state.getSubtotal;

      return productDiscount + couponDiscount;
    },
  },
});
