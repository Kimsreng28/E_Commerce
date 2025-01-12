import { defineStore } from "pinia";

export const useOrderHistory = defineStore("orderHistory", {
  state: () => ({
    orderHistory: JSON.parse(localStorage.getItem("orderHistory")) || [],
  }),

  actions: {
    addOrderFromCheckout(checkoutItems, totalPrice, paymentMethod, shippingLocation) {
      const items = Array.isArray(checkoutItems) ? checkoutItems : [];
    
      const order = {
        id: `TXN${Date.now()}`,
        date: new Date().toLocaleString(),
        paymentMethod,
        shippingLocation,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          size: item.size || "N/A",
          color: item.color || "N/A",
          price: item.price,
          quantity: item.quantity,
          image: item.image && item.image.trim() ? item.image : "default-image-url.jpg",
        })),
        totalPrice,
      };
    
      this.orderHistory.unshift(order);
      this.saveToLocalStorage();
    },
    

    saveToLocalStorage() {
      localStorage.setItem("orderHistory", JSON.stringify(this.orderHistory));
    },
  },

  getters: {
    mostRecentOrderTotalPrice(state) {
      return state.orderHistory.length > 0 ? state.orderHistory[0].totalPrice : 0;
    },
  },
});
