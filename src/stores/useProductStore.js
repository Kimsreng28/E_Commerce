import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [
      {
        id: 1,
        title: "Shoes Modern Pop",
        discount: "20%",
        image:
          "https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-dropshipping-men-hole-sole-jogging-shoes-png-image_11389148.png",
        description: "This is a trendy wallet with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-dropshipping-men-hole-sole-jogging-shoes-png-image_11389148.png",
          "https://png.pngtree.com/png-vector/20230501/ourmid/pngtree-sneakers-running-shoes-trendy-shoe-shapes-png-image_7078175.png",
          "https://png.pngtree.com/png-vector/20240830/ourmid/pngtree-white-and-orange-running-shoes-png-image_13680450.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        ],
        stock: 5,
        category: "Shoes",
        subCategory: "Sneakers",
        selectColor: "#A0BCE0",
        selectSize: "36",
      },
      {
        id: 2,
        title: "Shoes Shape Color Pop",
        discount: "30%",
        image:
          "https://png.pngtree.com/png-vector/20230501/ourmid/pngtree-sneakers-running-shoes-trendy-shoe-shapes-png-image_7078175.png",
        description: "This is a trendy wallet with a 20% discount.",
        oldPrice: 120,
        price: 90,
        rating: 4,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "https://png.pngtree.com/png-vector/20230501/ourmid/pngtree-sneakers-running-shoes-trendy-shoe-shapes-png-image_7078175.png",
          "https://png.pngtree.com/png-vector/20230501/ourmid/pngtree-sneakers-running-shoes-trendy-shoe-shapes-png-image_7078175.png",
          "https://png.pngtree.com/png-vector/20230501/ourmid/pngtree-sneakers-running-shoes-trendy-shoe-shapes-png-image_7078175.png",
          "https://png.pngtree.com/png-vector/20230501/ourmid/pngtree-sneakers-running-shoes-trendy-shoe-shapes-png-image_7078175.png",
        ],
        stock: 5,
        category: "Shoes",
        subCategory: "shoe-sport",
      },
      {
        id: 3,
        title: "Shoes Vector Pop",
        discount: "20%",
        image:
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        description: "This is a trendy wallet with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 5,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "shoe-sport",
      },
      {
        id: 4,
        title: "Shoes Vector Pop",
        discount: "20%",
        image:
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        description: "This is a trendy wallet with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 5,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        ],
        category: "Clothes",
      },
      {
        id: 5,
        title: "Shoes Vector Pop",
        discount: "20%",
        image:
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        description: "This is a trendy wallet with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 5,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        ],
        category: "Clothes",
      },
      {
        id: 6,
        title: "Shoes Vector Pop",
        discount: "20%",
        image:
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        description: "This is a trendy wallet with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 5,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        ],
        category: "Clothes",
      },
      {
        id: 7,
        title: "Shoes Vector Pop",
        discount: "20%",
        image:
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        description: "This is a trendy wallet with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 5,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        ],
        category: "Clothes",
      },
      {
        id: 8,
        title: "Shoes Vector Pop",
        discount: "20%",
        image:
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        description: "This is a trendy wallet with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 5,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        ],
        category: "Clothes",
      },
      {
        id: 9,
        title: "Shoes Vector Pop",
        discount: "20%",
        image:
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        description: "This is a trendy wallet with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 5,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
          "https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-sports-shoes-png-image_13082777.png",
        ],
        category: "Clothes",
      },
    ],
  }),

  actions: {
    addProduct(product) {
      const id = product.id || this.products.length + 1;
      const newProduct = { ...product, id };
      this.products.push(newProduct);
    },

    removeProduct(id) {
      this.products = this.products.filter((product) => product.id !== id);
    },

    updateProduct(id, updatedDetails) {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...updatedDetails,
        };
      }
    },
    getProductById(id) {
      return this.products.find((product) => product.id === id);
    },

    // Updated getProductByCategory function with console.log
    getProductByCategory(category) {
      console.log("Filtering products for category:", category); // Log category input
      const filteredProducts = this.products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      console.log("Filtered Products:", filteredProducts); // Log the filtered result
      return filteredProducts;
    },
  },

  getters: {
    getProductsByIds: (state) => (ids) => {
      return state.products.filter((product) => ids.includes(product.id));
    },

    searchProducts: (state) => (query) => {
      if (!query) return state.products;
      const lowerCaseQuery = query.toLowerCase();
      return state.products.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery)
      );
    },
  },
});
