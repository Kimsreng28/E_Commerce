<template>
  <div class="location">
    <div class="title">
      <p>Select Payment Method</p>
    </div>
    <hr />

    <!-- Payment methods -->
    <div class="method">
      <div
        class="payment-option"
        v-for="(method, index) in paymentMethods"
        :key="index"
        @click="togglePaymentMethod(method)"
        :class="{ selected: selectedPaymentMethod === method.name }"
      >
        <img :src="method.icon" :alt="method.name" />
        <p>{{ method.name }}</p>
      </div>
    </div>

    <!-- Conditional content based on selected method -->
    <div class="details">
      <!-- Visa or MasterCard -->
      <div
        v-if="
          (selectedPaymentMethod === 'Visa' ||
            selectedPaymentMethod === 'MasterCard') &&
          !selectedCard
        "
        class="card-details"
      >
        <div class="titleCard">
          <p>
            Add a New Card for <span>{{ selectedPaymentMethod }}</span>
          </p>
        </div>
        <div class="inputName">
          <p>Name on Card</p>
          <input
            type="text"
            placeholder="Enter name"
            v-model="cardDetails.name"
          />
        </div>
        <div class="inputCardNumber">
          <p>Card Number</p>
          <input
            type="text"
            placeholder="Enter card number"
            v-model="cardDetails.cardNumber"
          />
        </div>
        <div class="inputExpired">
          <p>Expiry Date</p>
          <input type="text" placeholder="MM/YY" v-model="cardDetails.expiry" />
        </div>
        <div class="inputCVV">
          <p>CVV</p>
          <input type="text" placeholder="CVV" v-model="cardDetails.cvv" />
        </div>
        <div class="buttonAdd">
          <Button_Component
            name-button="Add Card"
            color-button="#FFFFFF"
            background-color-button="#564949"
            height-button="40px"
            width-button="115px"
            @click="addCard"
          />
        </div>
      </div>

      <!-- ABA or ACLEDA -->
      <div
        v-if="
          selectedPaymentMethod === 'ABA' || selectedPaymentMethod === 'ACLEDA'
        "
        class="qr-code"
      >
        <p>
          Scan the QR Code below to proceed with payment
          {{ selectedPaymentMethod }}:
        </p>
        <img :src="getQrCode(selectedPaymentMethod)" alt="QR Code" />
      </div>
    </div>

    <!-- Show card -->
    <div class="showCard">
      <p>Your Cards</p>
      <div
        v-for="(card, index) in savedCards"
        :key="index"
        class="saved-card"
        @click="toggleSavedCard(card)"
        :class="{ selected: selectedCard === card }"
      >
        <div class="detailCard">
          <img
            :src="getCardIcon(card.type)"
            alt="Card Icon"
            class="card-icon"
          />
          <p>Card Number: {{ maskCardNumber(card.cardNumber) }}</p>
        </div>
        <span class="material-icons">
          {{
            selectedCard === card ? "check_circle" : "radio_button_unchecked"
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import mastercard from "@/assets/images/PaymentMethod/card.png";
import visa from "@/assets/images/PaymentMethod/visa.png";
import { usePaymentStore } from "@/stores/usePaymentStore";
import { computed, ref } from "vue";
import Button_Component from "../Button_Component.vue";

export default {
  name: "Payment_Component",
  components: {
    Button_Component,
  },
  props: {
    paymentMethod: String,
  },
  setup(props, { emit }) {
    const paymentStore = usePaymentStore();

    // Payment methods
    const paymentMethods = ref([
      { name: "Visa", icon: visa },
      { name: "MasterCard", icon: mastercard },
      {
        name: "ABA",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUIHKcKRFtUDWjJ2A0SHGyDvzcXhkCfy7m9WfpiUn23JRSGccFqF_0g9G7qS7_3ePLerM&usqp=CAU",
      },
      {
        name: "ACLEDA",
        icon: "https://ibccambodia.com/wp-content/uploads/2021/02/ACLEDA-Logo-Existing-New-one-07-2-e1613988422171.png",
      },
    ]);

    // Selected payment method
    const selectedPaymentMethod = ref(null);

    // QR Code
    const qrCodeImages = {
      ABA: "https://i.ibb.co/t3fpgxv/photo-2024-12-01-18-21-24.jpg",
      ACLEDA: "https://i.ibb.co/tKnK4T8/photo-2024-12-01-18-21-18.jpg",
    };

    // Function to add a QR code
    const getQrCode = (method) => {
      return qrCodeImages[method] || "https://via.placeholder.com/150x150";
    };
    const cardDetails = ref({
      name: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });

    // List of saved cards
    const savedCards = computed(() => paymentStore.payments);

    // Selected saved card
    const selectedCard = ref(null);

    // Function to mask the card number
    const maskCardNumber = (cardNumber) =>
      cardNumber.replace(/\d(?=\d{4})/g, "*");

    // Function to toggle payment method selection
    const togglePaymentMethod = (method) => {
      if (selectedPaymentMethod.value === method.name) {
        selectedPaymentMethod.value = null; // Deselect if already selected
      } else {
        selectedPaymentMethod.value = method.name; // Select if not selected
      }
      emit("update:paymentMethod", selectedPaymentMethod.value);
    };

    // Function to toggle saved card selection
    const toggleSavedCard = (card) => {
      if (selectedCard.value === card) {
        selectedCard.value = null; // Deselect if already selected
        paymentStore.selectedPayment = null; // Clear selected payment
      } else {
        selectedCard.value = card; // Select the card
        paymentStore.selectedPayment = card; // Save selected payment
        selectedPaymentMethod.value = card.type; // Set payment method type
      }
      emit("update:paymentMethod", selectedPaymentMethod.value);
    };

    // Function to get the card icon
    const getCardIcon = (type) => {
      return type === "Visa" ? visa : type === "MasterCard" ? mastercard : null;
    };

    // Function to add a new card
    const addCard = () => {
      const { name, cardNumber, expiry, cvv } = cardDetails.value;

      // Validate card details
      if (!name || !cardNumber || !expiry || !cvv) {
        alert("Please fill in all the card details.");
        return;
      }

      // Add card to payment store
      const newCard = {
        type: selectedPaymentMethod.value,
        name,
        cardNumber,
        expiry,
        cvv,
      };

      paymentStore.addPayment(newCard);

      alert(`Card for ${name} added successfully!`);

      // Clear form and reset the selected payment method
      cardDetails.value = {
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      };
      selectedPaymentMethod.value = null;
    };

    return {
      paymentMethods,
      selectedPaymentMethod,
      getQrCode,
      cardDetails,
      savedCards,
      selectedCard,
      togglePaymentMethod,
      toggleSavedCard,
      getCardIcon,
      addCard,
      maskCardNumber,
    };
  },
};
</script>

<style scoped>
.location {
  width: 100%;
  max-width: 666px;
  padding: 3%;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #8f7979;
  border-radius: 5px;
}
hr {
  margin-top: 2%;
  margin-bottom: 2%;
}
.title p {
  color: #000000;
  font-size: 20px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
}
.titleCard p {
  color: #000000;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
}
.titleCard p span {
  color: #000000;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
}

.method {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  margin-top: 20px;
}

.payment-option {
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 2%;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s;
}
.payment-option img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
}
.payment-option p {
  color: #000000;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
}

.payment-option:hover {
  background-color: #f0f0f0;
  border-color: #564949;
}
.payment-option.selected {
  border-color: #564949;
  background-color: #f0f0f0;
}

.details {
  transition: all 0.3s ease;
  margin-top: 20px;
}

.card-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2%;
  transition: all 0.3s ease;
}

.inputName,
.inputCardNumber,
.inputExpired,
.inputCVV {
  width: 80%;
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 2%;
}
.inputName p,
.inputCardNumber p,
.inputExpired p,
.inputCVV p {
  color: #7b7373;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
}
.inputName input,
.inputCardNumber input,
.inputExpired input,
.inputCVV input {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 3%;
  box-sizing: border-box;
  background-color: #e9e7e7;
  font-family: Quicksand, sans-serif;
}

.buttonAdd {
  margin-top: 2%;
}

.qr-code {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
}
.qr-code img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  object-fit: cover;
  object-position: center;
}

.qr-code p {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  font-family: Quicksand, sans-serif;
}
.showCard {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-top: 2%;
}
.showCard p {
  color: #000000;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: 700;
}
.showCard span {
  color: #2c3e50;
  font-size: 24px;
  cursor: pointer;
}
.saved-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2%;
}
.detailCard {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 2%;
}
.detailCard img {
  width: 10%;
  height: 10%;
  border-radius: 5px;
}
.detailCard p {
  color: #000000;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .method {
    justify-content: center;
    gap: 10px;
  }

  .payment-option {
    width: 100px;
  }

  .title p {
    font-size: 18px;
  }

  .card-details {
    gap: 5px;
  }

  .inputName input,
  .inputCardNumber input,
  .inputExpired input,
  .inputCVV input {
    height: 35px;
    font-size: 14px;
  }

  .qr-code p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .payment-option {
    width: 100%;
    max-width: 100px;
  }

  .method {
    gap: 8px;
  }

  .title p {
    font-size: 16px;
  }

  .qr-code img {
    width: 120px;
  }
}
</style>
