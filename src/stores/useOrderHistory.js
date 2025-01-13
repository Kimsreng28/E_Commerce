import { defineStore } from "pinia";

export const useOrderHistory = defineStore("orderHistory", {
  state: () => ({
    orderHistory: JSON.parse(localStorage.getItem("orderHistory")) || [],
  }),

  actions: {
    addOrderFromCheckout(checkoutItems) {
      if (!Array.isArray(checkoutItems)) {
        return; // Exit the function if input is invalid
      }
      const order = {
        id: `TXN${Date.now()}`, // Unique transaction ID
        date: new Date().toLocaleString(), // Purchase date
        items: checkoutItems.map((item) => ({
          id: item.id, // Store product ID
          name: item.name, // Store product name
          size: item.size || "N/A", // Store product size
          color: item.color || "N/A", // Store product color
          price: item.price, // Store product price
          quantity: item.quantity, // Store product quantity
          image: item.image || "default-image-url.jpg", // Store product image URL
        })),
      };

      // Add the new order to the top of the history (most recent order first)
      this.orderHistory.unshift(order);
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("orderHistory", JSON.stringify(this.orderHistory));
    },
  },
});
