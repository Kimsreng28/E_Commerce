<template>
  <div class="orderHistory">
    <div v-if="visibleOrders.length === 0">
      No orders found.
    </div>
    <div v-else>
      <div v-for="order in visibleOrders" :key="order.id" class="order">
        <div class="order-card-container">
          <div v-for="item in order.items" :key="item.id">
            <div class="order-card">
              <img
                :src="getImageById(item.id)"
                alt="Product image"
                class="product-image"
              />
              <div class="order-details">
                <div class="product-info">
                  <div class="item-header">
                    <p class="item-name">{{ item.name }}</p>
                    <div class="price-section">
                      <h2 class="item-price">
                        ${{ (item.price * item.quantity).toFixed(2) }}
                      </h2>
                      <p class="quantity">x{{ item.quantity }}</p>
                    </div>
                  </div>
                  <p style="font-weight: bold;">Size: {{ item.size || "N/A" }}</p>
                  <div class="color-section">
                    <span style="font-weight: bold;">Color:</span>
                    <div
                      class="colorOption"
                      :style="{ backgroundColor: item.color || '#ccc' }"
                      :title="item.color || 'No color provided'"
                    ></div>
                  </div>
                  <p class="order-date">{{ order.date }}</p>
                </div>
              </div>
            </div>
  
            <div class="button-row">
              <Button_Component id="button-border"
                name-button="Delivery Details"
                color-button="#958383"
                background-color-button="#FFFFFF"
                height-button="40px"
                width-button="150px"
              />
              <Button_Component id="button-border"
                name-button="Refund"
                color-button="#958383"
                background-color-button="#FFFFFF"
                height-button="40px"
                width-button="150px"
              />
              <Button_Component
                name-button="Re-Order"
                color-button="#FFFFFF"
                background-color-button="#564949"
                height-button="40px"
                width-button="150px"
              />
              <Button_Component
                name-button="Rate Us!"
                color-button="#FFFFFF"
                background-color-button="#564949"
                height-button="40px"
                width-button="150px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { ref, watch, onMounted } from "vue";
import { useOrderHistory } from "@/stores/useOrderHistory";
import { useCartStore } from "@/stores/useCartStore";
import Button_Component from "@/components/Button_Component.vue";

export default {
  name: "OrderHistory_Component",
  components: {
    Button_Component,
  },
  setup() {
    const orderHistoryStore = useOrderHistory();
    const cartStore = useCartStore();
    const visibleOrders = ref([]);

    const addOrdersSequentially = () => {
      const allOrders = orderHistoryStore.orderHistory;
      let index = 0;

      const intervalId = setInterval(() => {
        if (index < allOrders.length) {
          visibleOrders.value.push(allOrders[index]);
          index++;
        } else {
          clearInterval(intervalId); 
        }
      }, 500);
    };

    const getImageById = (id) => {
      const product = cartStore.cartItems.find((item) => item.id === id);
      return product ? product.image : "default-image-url.jpg";
    };

    onMounted(() => {
      addOrdersSequentially();
    });

    return {
      visibleOrders,
      getImageById,
    };
  },
};
</script>


<style scoped>

#button-border {
  border: 1px solid #9E9E9E;
  border-radius: 8px;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  margin-right: 5em;
  gap: 10px;
  margin-bottom: 5px;
}

.orderHistory {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px; 
}

.order {
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

.order-card-container {
  display: flex;
  flex-direction: column; 
  gap: 15px; 
}

.order-card {
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid #ddd;
  width: 90%; 
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.product-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-left: 1em;
  margin-right: 2em;
}

.order-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-right: 2em;
}

.product-info {
  flex-grow: 1;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.item-name {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.price-section {
  text-align: right;
}

.item-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.quantity {
  margin-top: 5px;
  color: #777;
  font-size: 14px;
}

.color-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.colorOption {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
}

.order-date {
  color: #aaa;
  font-size: 14px;
}
</style>
