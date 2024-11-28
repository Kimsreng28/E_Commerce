import { defineStore } from "pinia";

export const useCheckOut = defineStore("checkOut", {
  state: () => ({
    checkOut: JSON.parse(localStorage.getItem("checkOut")) || [],
  }),

  actions: {
    addToCart(product) {
      this.checkOut.push(product);
      this.saveToLocalStorage();
    },
    removeFromCart(productId) {
      this.checkOut = this.checkOut.filter((item) => item.id !== productId);
      this.saveToLocalStorage();
    },
    clearCart() {
      this.checkOut = [];
      this.saveToLocalStorage();
    },

    updateQuantity(productId, quantity) {
      const product = this.checkOut.find((item) => item.id === productId);
      if (product) {
        product.quantity = quantity;
        this.saveToLocalStorage();
      }
    },

    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.checkOut));
    },
  },

  getters: {
    getCheckOut: (state) => state.checkOut,

    getSubtotal: (state) => {
      return state.checkOut.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    getDiscount: (state) => {
      return state.checkOut.reduce((totalDiscount, product) => {
        if (product.discount) {
          const itemDiscount =
            (product.discount / 100) * product.price * product.quantity;
          return totalDiscount + itemDiscount;
        }
        return totalDiscount;
      }, 0);
    },
  },
});
