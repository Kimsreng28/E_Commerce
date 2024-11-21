import { defineStore } from "pinia";
import Accessories from "../assets/images/Categories/accessories.png";
import Cloth from "../assets/images/Categories/shirt.png";
import Shoe from "../assets/images/Categories/shoes.png";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [
      {
        id: 1,
        title: "Clothes",
        images: Cloth,
      },
      {
        id: 2,
        title: "Shoes",
        images: Shoe,
      },
      {
        id: 3,
        title: "Accessories",
        images: Accessories,
      },
    ],
  }),
  getters: {
    //by id
    getCategoriesByIds: (state) => (ids) => {
      return state.categories.filter((category) => ids.includes(category.id));
    },
  },
});
