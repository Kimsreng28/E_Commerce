import { defineStore } from "pinia";

export const usePaymentStore = defineStore("paymentStore", {
  state: () => ({
    payments: JSON.parse(localStorage.getItem("payments")) || [],
    selectedPayment: null,
  }),
  actions: {
    addPayment(payment) {
      this.payments.push(payment);
      this.saveToLocalStorage();
    },
    setSelectedPayment(payment) {
      this.selectedPayment = payment;
    },
    saveToLocalStorage() {
      localStorage.setItem("payments", JSON.stringify(this.payments));
    },
  },
});
