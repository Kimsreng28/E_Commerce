<template>
  <div class="resetPasswordContainer">
    <h1>Reset Password</h1>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Step 1: Enter Email -->
    <div v-if="step === 1">
      <div class="inputField">
        <input v-model="email" type="email" placeholder="Enter your email" />
      </div>
      <button @click="handleSendOTP">Send OTP</button>
    </div>

    <!-- Step 2: Verify OTP -->
    <div v-if="step === 2">
      <div class="inputField">
        <input
          v-model="otp"
          type="text"
          placeholder="Enter OTP sent to email"
        />
      </div>
      <button @click="handleVerifyOTP">Verify OTP</button>
    </div>

    <!-- Step 3: Reset Password -->
    <div v-if="step === 3">
      <div class="inputField">
        <input
          v-model="newPassword"
          type="password"
          placeholder="Enter a new password"
        />
      </div>
      <button @click="handleResetPassword">Reset Password</button>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { useUserSignupStore } from "@/stores/useUserSignupStore";
import { ref } from "vue";

export default {
  name: "ResetPasswordComponent",
  setup() {
    const userSignupStore = useUserSignupStore();
    const step = ref(1);
    const email = ref("");
    const otp = ref("");
    const newPassword = ref("");
    const successMessage = ref(null);
    const errorMessage = ref(null);

    const handleSendOTP = () => {
      const result = userSignupStore.sendOTP(email.value);
      if (result.success) {
        successMessage.value = result.message;
        errorMessage.value = null;
        step.value = 2;
      } else {
        errorMessage.value = result.message;
        successMessage.value = null;
      }
    };

    const handleVerifyOTP = () => {
      const result = userSignupStore.verifyOTP(email.value, otp.value);
      if (result.success) {
        successMessage.value = result.message;
        errorMessage.value = null;
        step.value = 3;
      } else {
        errorMessage.value = result.message;
        successMessage.value = null;
      }
    };

    const handleResetPassword = () => {
      const result = userSignupStore.resetPassword(
        email.value,
        newPassword.value
      );
      if (result.success) {
        successMessage.value = result.message;
        errorMessage.value = null;
        step.value = 1; // Reset to first step after success
        router.push("/signIn");
      } else {
        errorMessage.value = result.message;
        successMessage.value = null;
      }
    };

    return {
      email,
      otp,
      newPassword,
      step,
      successMessage,
      errorMessage,
      handleSendOTP,
      handleVerifyOTP,
      handleResetPassword,
    };
  },
};
</script>

<style scoped>
.resetPasswordContainer {
  width: 1440px;
  height: 100vh;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.resetPasswordContainer h1 {
  padding: 10px;
  font-size: 2rem;
  font-family: "Quicksand", sans-serif;
  font-weight: bold;
  color: #4c4040;
  text-align: center;
}

.resetPasswordContainer p {
  font-size: 1rem;
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  text-align: center;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

.inputField {
  width: 100%;
  max-width: 400px;
  margin: 10px 0;
}

.inputField input {
  width: 100%;
  font-size: 1rem;
  font-family: "Quicksand", sans-serif;
  font-weight: bold;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
  transition: border-color 0.3s;
}

.inputField input:focus {
  outline: none;
  border-color: #4c4040;
}

button {
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  font-family: "Quicksand", sans-serif;
  font-weight: bold;
  padding: 12px;
  border: none;
  background-color: #4c4040;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #6c4e4e;
}

button:active {
  background-color: #402b2b;
}
</style>
