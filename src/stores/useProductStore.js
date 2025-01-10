import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [
      {
        id: 1,
        title: "Babby Pants",
        discount: "20%",
        image: "src/assets/images/Product/Clothes/baggy_pant(1).png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Clothes/baggy_pant(1).png",
          "src/assets/images/Product/Clothes/baggy_pant(2).png",
        ],
        stock: 5,
        category: "Clothes",
        subCategory: "Pants",
      },
      {
        id: 2,
        title: "Cargo Pants",
        discount: "20%",
        image: "src/assets/images/Product/Clothes/Cargo_pant1.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Clothes/Cargo_pant1.png",
          "src/assets/images/Product/Clothes/Cargo_pant2.png",
        ],
        stock: 5,
        category: "Clothes",
        subCategory: "Pants",
      },
      {
        id: 3,
        title: "Full_Outfit",
        discount: "20%",
        image: "src/assets/images/Product/Clothes/full_set.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Clothes/full_set.png",
          "src/assets/images/Product/Clothes/full_set3.png",
        ],
        stock: 5,
        category: "Clothes",
        subCategory: "Full Outfit",
      },
      {
        id: 4,
        title: "Winter Outfit",
        discount: "20%",
        image: "src/assets/images/Product/Clothes/man_jacket.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Clothes/man_jacket.png",
          "src/assets/images/Product/Clothes/man_jacket2.png",
          "src/assets/images/Product/Clothes/man_jacket3.png",
        ],
        stock: 5,
        category: "Clothes",
        subCategory: "Jacket",
      },
      {
        id: 5,
        title: "Oversize T-Shirt",
        discount: "20%",
        image: "src/assets/images/Product/Clothes/skull.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Clothes/skull.png",
          "src/assets/images/Product/Clothes/White_t-shirt.png",
          "src/assets/images/Product/Clothes/woman_whiteshirt.png",
        ],
        stock: 5,
        category: "Clothes",
        subCategory: "T-shirts",
      },
      {
        id: 6,
        title: "Floral Dress",
        discount: "20%",
        image: "src/assets/images/Product/Clothes/dress.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Clothes/dress.png",
          "src/assets/images/Product/Clothes/flowerdress.png",
          "src/assets/images/Product/Clothes/pinkdress.png",
        ],
        stock: 5,
        category: "Clothes",
        subCategory: "T-shirts",
      },
      {
        id: 7,
        title: " Woman Flat Shoes",
        discount: "20%",
        image: "src/assets/images/Product/Shoes/blue_flat.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Shoes/blue_flat.png",
          "src/assets/images/Product/Shoes/gold_flat.png",
          "src/assets/images/Product/Shoes/grey_flat.png",
        ],
        stock: 5,
        category: "Shoes",
        subCategory: "Flats",
      },
      {
        id: 8,
        title: "Men Formal Shoes",
        discount: "20%",
        image: "src/assets/images/Product/Shoes/flat_shoes.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Shoes/flat_shoes.png",
          "src/assets/images/Product/Shoes/crocodile.png",
          "src/assets/images/Product/Shoes/leather_shoes.png",
        ],
        stock: 5,
        category: "Shoes",
        subCategory: "Formal",
      },
      {
        id: 9,
        title: "Heels Shoes",
        discount: "20%",
        image: "src/assets/images/Product/Shoes/leather_heel.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Shoes/leather_heel.png",
          "src/assets/images/Product/Shoes/pink_heel.png",
        ],
        stock: 5,
        category: "Shoes",
        subCategory: "Formal",
      },
      {
        id: 10,
        title: "Offices Shoes",
        discount: "20%",
        image: "src/assets/images/Product/Shoes/footwear.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Shoes/footwear.png",
          "src/assets/images/Product/Shoes/med_heel.png",
        ],
        stock: 5,
        category: "Shoes",
        subCategory: "Formal",
      },
      {
        id: 11,
        title: "Sport Shoes",
        discount: "20%",
        image: "src/assets/images/Product/Shoes/sport_shoes.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/Shoes/sport_shoes.png",
          "src/assets/images/Product/Shoes/pink_shoes.png",
          "src/assets/images/Product/Shoes/white-casual-shoes-for-men.png",
          "src/assets/images/Product/Shoes/black_shoes.png",
        ],
        stock: 5,
        category: "Shoes",
        subCategory: "Formal",
      },
      {
        id: 12,
        title: "Headpiece",
        discount: "20%",
        image:
          "src/assets/images/Product/accessory/earring&bow/flower-headpiece.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/earring&bow/flower-headpiece.png",
          "src/assets/images/Product/accessory/earring&bow/headpiece.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Earring & Bow",
      },
      {
        id: 13,
        title: "Earring",
        discount: "20%",
        image:
          "src/assets/images/Product/accessory/earring&bow/copper_earring.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/earring&bow/copper_earring.png",
          "src/assets/images/Product/accessory/earring&bow/heart_earring.png",
          "src/assets/images/Product/accessory/earring&bow/pearl_earring.png",
          "src/assets/images/Product/accessory/earring&bow/rose_earring.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Earring & Bow",
      },
      {
        id: 14,
        title: "Glasses",
        discount: "20%",
        image: "src/assets/images/Product/accessory/glasses/brown_glasses.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/glasses/brown_glasses.png",
          "src/assets/images/Product/accessory/glasses/designer_glasses.png",
          "src/assets/images/Product/accessory/glasses/koromi_glasses.png",
          "src/assets/images/Product/accessory/glasses/pink_glasses.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Earring & Bow",
      },
      {
        id: 15,
        title: "Colar",
        discount: "20%",
        image: "src/assets/images/Product/accessory/necklace/colar.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/necklace/gold-a.a.png",
          "src/assets/images/Product/accessory/necklace/gold-a.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Necklaces",
      },
      {
        id: 16,
        title: "Lotus Necklace",
        discount: "20%",
        image:
          "src/assets/images/Product/accessory/necklace/lotus_necklace.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/necklace/lotus_necklace.png",
          "src/assets/images/Product/accessory/necklace/lotus_necklace-a.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Necklaces",
      },
      {
        id: 17,
        title: "Pearl Necklace",
        discount: "20%",
        image:
          "src/assets/images/Product/accessory/necklace/pearl_necklace.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/necklace/pearl_necklace.png",
          "src/assets/images/Product/accessory/necklace/pearl_necklace-b.png",
          "src/assets/images/Product/accessory/necklace/pearl_necklace-c.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Necklaces",
      },
      {
        id: 18,
        title: "Silver Necklace",
        discount: "20%",
        image: "src/assets/images/Product/accessory/necklace/silver-a.a.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/necklace/silver-a.a.png",
          "src/assets/images/Product/accessory/necklace/silver-a.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Necklaces",
      },
      {
        id: 19,
        title: "Ring A",
        discount: "20%",
        image: "src/assets/images/Product/accessory/ring/gold-1.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/ring/gold-1.png",
          "src/assets/images/Product/accessory/ring/silver-1.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Rings",
      },
      {
        id: 20,
        title: "Ring B",
        discount: "20%",
        image: "src/assets/images/Product/accessory/ring/gold-2.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/ring/gold-2.png",
          "src/assets/images/Product/accessory/ring/silver-2.png",
          "src/assets/images/Product/accessory/ring/silver-2.2.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Rings",
      },
      {
        id: 21,
        title: "Ring C",
        discount: "20%",
        image: "src/assets/images/Product/accessory/ring/gold-3.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/ring/gold-3.png",
          "src/assets/images/Product/accessory/ring/gold-3.3.png",
          "src/assets/images/Product/accessory/ring/silver-3.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Rings",
      },
      {
        id: 22,
        title: "Ring D",
        discount: "20%",
        image: "src/assets/images/Product/accessory/ring/gold-4.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/ring/gold-4.png",
          "src/assets/images/Product/accessory/ring/silver-4.4.png",
          "src/assets/images/Product/accessory/ring/silver-4.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Rings",
      },
      {
        id: 23,
        title: "Ring E",
        discount: "20%",
        image: "src/assets/images/Product/accessory/ring/silver-5.png",
        description: "This is a trendy pant with a 20% discount.",
        oldPrice: 100,
        price: 80,
        rating: 3,
        size: ["S", "M", "L", "XL"],
        color: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E"],
        imageDetails: [
          "src/assets/images/Product/accessory/ring/silver-5.png",
          "src/assets/images/Product/accessory/ring/silver-5.5.png",
        ],
        stock: 5,
        category: "Accessories",
        subCategory: "Rings",
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

    getProductByCategory(category) {
      // Ensure category is a string and not empty
      if (typeof category !== 'string' || !category) {
        console.warn("Invalid category provided:", category);
        return [];
      }
      return this.products.filter(product => product.category === category);
    }
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

    productByCategory: (state) => (category) => {
      return state.products.filter(product => product.category === category);
    },

    productBySubCategory: (state) => (subCategory) => {
      return state.products.filter(product => product.subCategory === subCategory);
    },
  },
});
