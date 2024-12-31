<template>
  <div class="orderHistory">
    <div v-if="orderHistoryStore.orderHistory.length === 0">No orders found.</div>
    <div v-else>
      <div v-for="order in orderHistoryStore.orderHistory" :key="order.id">
        <OrderCard_Component
          v-for="item in order.items"
          :key="item.id"
          :imageProduct="item.image"
          :nameProduct="item.name"
          :sizeProduct="item.size"
          :colorProduct="item.color"
          :productPrice="item.price"
          :productQuantity="item.quantity"
          :orderDate="order.date"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useOrderHistory } from "@/stores/useOrderHistory";
import OrderCard_Component from "@/components/Order/OrderCard_Component.vue";

export default {
  name: "OrderHistory_Component",
  components: {
    OrderCard_Component,
  },
  setup() {
    const orderHistoryStore = useOrderHistory();

    return {
      orderHistoryStore,
    };
  },
};
</script>

<style scoped>
.orderHistory {
  padding: 20px;
}
</style>