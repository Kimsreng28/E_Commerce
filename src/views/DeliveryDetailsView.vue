<template>
  <div class="delivery-details">
    <h1>Delivery Details</h1>
    <div v-if="order">
      <!-- Order Details -->
      <p><strong>Order ID:</strong> {{ order.id }}</p>
      <p><strong>Date:</strong> {{ order.date }}</p>
      <p>
        <strong>Shipping Location:</strong>
        {{ order.shippingLocation || "N/A" }}
      </p>
      <p><strong>Payment Method:</strong> {{ order.paymentMethod || "N/A" }}</p>

      <!-- Delivery Information -->
      <h2>Delivery Information</h2>
      <p><strong>Delivery Name:</strong> {{ deliveryDetails.name }}</p>
      <p><strong>Contact:</strong> {{ deliveryDetails.contact }}</p>
      <p>
        <strong>Expected Arrival:</strong> {{ deliveryDetails.arrivalTime }}
      </p>
      <p>
        <strong>Special Instructions:</strong>
        {{ deliveryDetails.instructions || "None" }}
      </p>

      <!-- Products in Order -->
      <h2>Products</h2>
      <div v-for="item in order.items" :key="item.id">
        <p><strong>Product:</strong> {{ item.name }}</p>
        <p><strong>Quantity:</strong> {{ item.quantity }}</p>
        <p><strong>Price:</strong> ${{ item.price }}</p>
      </div>
    </div>
    <p v-else>Order not found!</p>
  </div>
</template>

<script>
import { useOrderHistory } from "@/stores/useOrderHistory";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "DeliveryDetailsView",
  setup() {
    const route = useRoute();
    const orderHistoryStore = useOrderHistory();
    const orderId = route.params.orderId;

    const order = orderHistoryStore.orderHistory.find(
      (order) => order.id === orderId
    );

    const deliveryDetails = ref({
      name: "John Doe",
      contact: "+855 999 999 99",
      arrivalTime: "January 15, 2025, 10:00 AM",
      instructions: "Leave the package at the front door.",
    });

    return {
      order,
      deliveryDetails,
    };
  },
};
</script>
