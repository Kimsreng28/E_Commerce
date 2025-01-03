import { defineStore } from "pinia";

export const useOrderHistory = defineStore("orderHistory", {
  state: () => ({
    orderHistory: JSON.parse(localStorage.getItem("orderHistory")) || [],
  }),

  actions: {
    addToOrderHistory(order) {
      this.orderHistory.push(order);
      this.saveToLocalStorage();
    },

    clearOrderHistory() {
      this.orderHistory = [];
      this.saveToLocalStorage();
    },

    deleteOrder(id) {
      this.orderHistory = this.orderHistory.filter((order) => order.id !== id);
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("orderHistory", JSON.stringify(this.orderHistory));
    },
  },
});
