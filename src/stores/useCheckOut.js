import { defineStore } from "pinia";

export const useCheckOut = defineStore("checkOut", {
  state: () => ({
    checkOut: JSON.parse(localStorage.getItem("checkOut")) || [], // Ensure the key matches the one used in localStorage
  }),

  actions: {
    addToCheckOut(product) {
      this.checkOut.push(product);

      this.saveToLocalStorage();
    },

    clearCheckOut() {
      this.checkOut = [];

      this.saveToLocalStorage();
    },

    deleteItem(id) {
      this.checkOut = this.checkOut.filter((item) => item.id !== id);
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
      localStorage.setItem("checkOut", JSON.stringify(this.checkOut)); // Use the same key as in state
    },
  },
});
