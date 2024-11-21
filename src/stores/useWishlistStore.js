import { defineStore } from "pinia";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  }),

  actions: {
    addToWishlist(product) {
      if (!this.wishlist.find((item) => item.id === product.id)) {
        this.wishlist.push(product);
        this.saveWishlistToLocalStorage();
      } else {
        alert("Product already in wishlist!");
      }
    },

    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter((item) => item.id !== productId);
      this.saveWishlistToLocalStorage();
    },

    clearWishlist() {
      this.wishlist = [];
      this.saveWishlistToLocalStorage();
    },

    saveWishlistToLocalStorage() {
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    },
  },
});
