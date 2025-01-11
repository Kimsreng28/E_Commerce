<template>
  <div class="orderHistory">
    <div class="sortBy">
      <label for="sort">Sort By:</label>
      <select id="sort" v-model="selectedSort">
        <option value="date">Date</option>
        <option value="alphabetical">Product Name</option>
      </select>
    </div>
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
import { useProductStore } from "@/stores/useProductStore";
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
    const selectedSort = ref("date");

    const addOrdersSequentially = () => {
  const allOrders = orderHistoryStore.orderHistory;
  let index = 0;

  const intervalId = setInterval(() => {
    if (index < allOrders.length) {
      const newOrder = allOrders[index];
      
      if (!visibleOrders.value.some(order => order.id === newOrder.id)) {
        visibleOrders.value.push({
          ...newOrder,
          items: newOrder.items.filter(item => {
            return !visibleOrders.value.some(order =>
              order.items.some(existingItem => existingItem.id === item.id)
            );
          })
        });
      }
      
      sortOrders(); 
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 500);
};


    const getImageById = (id) => {
  const productStore = useProductStore();
  const product = productStore.products.find((item) => item.id === id); // Assuming `products` is the array in `useProductStore.js`
  return product ? product.image : "default-image-url.jpg";
};

    const sortOrders = () => {
      const ordersCopy = [...visibleOrders.value];
      if (selectedSort.value === "date") {
        ordersCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (selectedSort.value === "alphabetical") {
        ordersCopy.sort((a, b) => a.items[0].name.localeCompare(b.items[0].name));
      }
      visibleOrders.value = ordersCopy;
    };

    watch(selectedSort, sortOrders);

    onMounted(() => {
      console.log("Fetched Orders:", orderHistoryStore.orderHistory);
      addOrdersSequentially();
    });

    return {
      visibleOrders,
      getImageById,
      selectedSort,
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
  padding-bottom: 10px;
  padding-top: 10px;
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

.sortBy {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: flex-end;
  padding-right: 5em;
}

.sortBy label {
  font-family: Quicksand, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #564949;
}

.sortBy select {
  height: 30px;
  width: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  font-family: Quicksand, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1f1d1d;
}
</style>
