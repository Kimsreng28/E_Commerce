<template>
    <div class="payment-method-container">
      <p>Select Payment Method</p>
      <hr />
  

      <div class="add-card" @click="toggleDropdown">
        <span class="material-icons" v-if="showDropdown">keyboard_arrow_down</span>
        <span class="material-icons" v-if="!showDropdown">add</span>
        <p>Add new Card</p>
      </div>
  
      <transition name="dropdown">
        <div v-if="!showDropdown">
          <ul class="payment-method-list">
            <li
              v-for="(method, index) in paymentMethods"
              :key="index"
              :class="{ 'selected-method': selectedPaymentMethod === method.name }"
              class="payment-method-item"
            >
              <img :src="method.logo" :alt="method.name" class="method-logo" />
              <span class="method-label">{{ method.label }}</span>
              <input
                type="radio"
                :value="method.name"
                v-model="selectedPaymentMethod"
              />
            </li>
          </ul>
        </div>
        <div v-else>

          <form @submit.prevent="handleSubmit" class="card-form">
            <div class="form-group">
              <p>Name *</p>
              <input type="text" v-model="form.name" required />
            </div>
            <div class="form-group">
              <p>Card Number *</p>
              <input type="text" v-model="form.cardNumber" required />
            </div>
            <div class="form-group-row">
              <div class="form-group">
                <p>Expired Date *</p>
                <input type="text" v-model="form.expiredDate" required />
              </div>
              <div class="form-group">
                <p>CVV *</p>
                <input type="text" v-model="form.cvv" required />
              </div>
            </div>
            <div class="form-group">
              <p>Email Address *</p>
              <input type="email" v-model="form.email" required />
            </div>
            <div class="method-logo">
                <img src="@/assets/images/Checkout/visa.png" alt="visa-icon">
            </div>
            <button type="submit" class="submit-btn">Add Card</button>
          </form>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    name: "PaymentMethodComponent",
    data() {
      return {
        showDropdown: false,
        paymentMethods: [
          {
            name: "Visa",
            label: "**** **** **** ****",
            logo: new URL('@/assets/images/Checkout/visa.png', import.meta.url).href,
          },
          {
            name: "MasterCard",
            label: "Master card pay",
            logo: new URL('@/assets/images/Checkout/mastercard.png', import.meta.url).href,
          },
          {
            name: "ABA Pay",
            label: "ABA Pay",
            logo: new URL('@/assets/images/Checkout/aba.png', import.meta.url).href,
          },
          {
            name: "ACLEDA Pay",
            label: "ACLEDA Pay",
            logo: new URL('@/assets/images/Checkout/acleda.png', import.meta.url).href,
          },
        ],
        selectedPaymentMethod: null,
        form: {
          name: '',
          cardNumber: '',
          expiredDate: '',
          cvv: '',
          email: '',
        },
      };
    },
    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      handleSubmit() {
        const { name, cardNumber, expiredDate, cvv, email } = this.form;
        if (name && cardNumber && expiredDate && cvv && email) {
          alert("Card added successfully!");
          this.resetForm();
          this.showDropdown = false;
        }
      },
      resetForm() {
        this.form = {
          name: '',
          cardNumber: '',
          expiredDate: '',
          cvv: '',
          email: '',
        };
      }
    },
  };
  </script>
  
  <style scoped>

  .payment-method-container {
    width: 666px;
  padding: 3%;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #8f7979;
  border-radius: 5px;
  }
  
  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  hr {
    margin: 8px 0;
  }
  
  .add-card {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .add-card p {
    margin-left: 8px;
    font-size: 14px;
  color: #7b7373;
  }
  
  .add-card button {
    background: none;
    border: none;
    color: #9E9E9E;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 16px;
  }
  
  .add-card button:hover {
    text-decoration: underline;
  }
  
  .payment-method-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .payment-method-item {
    height: 2em;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 8px;
    border-radius: 6px;
    transition: background 0.3s, border 0.3s;
  }
  
  .payment-method-item.selected-method {
    background: #E9E7E7;
    border: 1px solid #564949;
  }
  
  .method-logo {
    width: 40px;
    height: auto;
    margin-right: 12px;
  }
  
.method-logo img {
    width: 40px;
    height: auto;
    margin-right: 12px;
}
  
  .method-label {
    flex: 1;
    font-size: 14px;
    color: #333;
  }

  .material-icons {
  color: #7b7373;
  }
  
  input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #6b5c55;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    position: relative;
    margin-right: 10px;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  input[type="radio"]:checked {
    background-color: #6b5c55;
    border-color: #6b5c55;
  }
  
  input[type="radio"]:checked::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    color: white;
  }
  
  .card-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group-row {
    display: flex;
    gap: 1rem;
  }
  
  input {
    height: 40px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  }
  
  .submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #45a049;
  }
  </style>
  