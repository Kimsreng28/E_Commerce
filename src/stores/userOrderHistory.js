import { defineStore } from "pinia";

export const useOrderHistoryStore = defineStore("orderHistory", {
  state: () => ({
    orderHistory: JSON.parse(localStorage.getItem("orderHistory")) || [],
  }),

  actions: {
    addOrder(order) {
      this.orderHistory.push(order);
      this.saveToLocalStorage();
    },
    clearOrders() {
      this.orderHistory = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      try {
        localStorage.setItem("orderHistory", JSON.stringify(this.orderHistory));
      } catch (error) {
        console.error("Failed to save order history:", error);
      }
    },
  },

  getters: {
    getOrderHistory: (state) => state.orderHistory,
  },
});
