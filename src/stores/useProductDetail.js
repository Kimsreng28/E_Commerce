import { defineStore } from "pinia";

export const useProductDetailStore = defineStore("productDetail", {
  state: () => ({
    // Initialize with the product details stored in localStorage, or an empty array if not available
    productDetail: JSON.parse(localStorage.getItem("productDetail")) || [],
  }),

  actions: {
    // Add product to the product detail store
    addToProductDetail(product) {
      // Ensure all product properties are passed correctly
      const existingProduct = this.productDetail.find(
        (item) => item.id === product.id
      );

      if (!existingProduct) {
        // Push the full product data to the productDetail array
        this.productDetail.push(product);

        // Save the updated product details to localStorage
        this.saveProductDetailToLocalStorage();
      } else {
        console.log("Product already in productDetail");
      }
    },

    // Clear product detail from the store and localStorage
    clearProductDetail() {
      this.productDetail = [];
      this.saveProductDetailToLocalStorage();
    },

    // Save the product details array to localStorage
    saveProductDetailToLocalStorage() {
      localStorage.setItem("productDetail", JSON.stringify(this.productDetail));
    },
  },

  getters: {
    // Optionally, create any necessary getters for product details
    getProductDetailById: (state) => (id) => {
      return state.productDetail.find((product) => product.id === id);
    },
  },
});
