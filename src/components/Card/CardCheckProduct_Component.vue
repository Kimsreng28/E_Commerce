<template>
  <div class="cartCheck">
    <div class="image">
      <img :src="imageProduct" alt="" />
    </div>

    <div class="detail">
      <div class="set">
        <div class="name">
          <p>{{ nameProduct }}</p>
        </div>
        <div class="size">
          <p>Size: {{ sizeProduct }}</p>
        </div>
        <div class="color">
          <p>Color:</p>
          <div
            class="colorDisplay"
            :style="{ backgroundColor: colorProduct }"
          ></div>
        </div>
        <div class="price">
          <p>${{ totalPrice }}</p>
        </div>
      </div>

      <div class="quantity">
        <div class="delete">
          <button @click="deleteItem">
            <span class="material-icons">delete</span>
          </button>
        </div>

        <div class="quantityProduct">
          <div class="number">
            <p>{{ quantity }}</p>
          </div>
          <div class="buttonIncrementAndDecrement">
            <button @click="incrementQuantity">
              <span class="material-icons">keyboard_arrow_up</span>
            </button>
            <button @click="decrementQuantity">
              <span class="material-icons">keyboard_arrow_down</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/useCartStore";
import { computed, ref } from "vue";
export default {
  name: "CardCheckProduct_Component",
  props: {
    id: Number,
    imageProduct: String,
    nameProduct: String,
    sizeProduct: Array,
    colorProduct: Array,
    priceProduct: Number,
    quantity: {
      type: Number,
      default: 1,
    },
  },

  setup(props) {
    const cartStore = useCartStore();
    const quantity = ref(props.quantity);

    const totalPrice = computed(() => props.priceProduct * quantity.value);

    const incrementQuantity = () => {
      quantity.value += 1;
      cartStore.updateQuantity(props.id, quantity.value);
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) {
        quantity.value -= 1;
        cartStore.updateQuantity(props.id, quantity.value);
      }
    };

    const deleteItem = () => {
      cartStore.removeFromCart(props.id);
    };

    return {
      incrementQuantity,
      decrementQuantity,
      deleteItem,
      quantity,
      totalPrice,
    };
  },
};
</script>

<style scoped>
.colorDisplay {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.cartCheck {
  width: 625px;
  height: 200px;
  border: 1px solid #564949;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 10px;
  padding: 1%;
}

.image {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2%;
  object-fit: cover;
  object-position: center;
}

.image img {
  width: 100%;
  height: 100%;
}

.image img:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: all 0.3s;
}

.detail {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.set {
  margin-top: 2%;
  margin-left: 5%;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.name {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: start;
  align-items: center;
}
.name p {
  color: #000000;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  font-size: 16px;
}

.size {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 2%;
}
.size p {
  color: #000000;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  font-size: 12px;
}

.color {
  margin-top: 2%;
  width: 100%;
  height: 20%;
  display: inline-flex;
  justify-content: start;
  align-items: center;
  gap: 3%;
}
.color p {
  color: #000000;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  font-size: 12px;
}

.price {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 2%;
}
.price p {
  color: #000000;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  font-size: 16px;
}

.quantity {
  width: 20%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.delete {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete button {
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.delete button span {
  color: #000000;
  font-weight: bold;
  font-size: 16px;
}
.delete button span:hover {
  color: #eb1e1e;
  transition: all 0.3s ease;
}

.quantityProduct {
  width: 80%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000000;
  border-radius: 5px;
  margin-top: 5%;
}
.number {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.number p {
  color: #000000;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  font-size: 16px;
}
.buttonIncrementAndDecrement {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
}
.buttonIncrementAndDecrement button {
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.buttonIncrementAndDecrement button:hover {
  background-color: #8c8484;
  cursor: pointer;
  transition: all 0.3s ease;
}
.buttonIncrementAndDecrement button span {
  color: #000000;
  font-weight: bold;
  font-size: 16px;
}
</style>
