<template>
  <div class="containerSignIn">
    <div class="leftSide">
      <div class="logo">
        <img src="@/assets//images/Logo/LogoEcommerce.png" alt="" />
      </div>
      <div class="welcome">
        <p>Register Now</p>
      </div>
      <div class="loginGoogle">
        <button><google />Sign Up with Google</button>
      </div>
      <div class="orLogin">
        <p>REGISTER YOUR ACCOUNT</p>
      </div>

      <div class="err">
        <div v-if="userSignupStore.signupError" class="errorMessage">
          {{ userSignupStore.signupError }}
        </div>
      </div>

      <div class="inputName">
        <input
          v-model="firstName"
          type="text"
          placeholder="Your firstName"
          :class="{ 'error-border': firstNameError }"
          @blur="validateFirstName"
        />
        <p v-if="firstNameError" class="inputError">FirstName is required.</p>
      </div>

      <div class="inputLastName">
        <input
          v-model="lastName"
          type="text"
          placeholder="Your lastName"
          :class="{ 'error-border': lastNameError }"
          @blur="validateLastName"
        />
        <p v-if="lastNameError" class="inputError">LastName is required.</p>
      </div>

      <div class="inputEmail">
        <input
          v-model="email"
          type="email"
          placeholder="Your Email"
          :class="{ 'error-border': emailError }"
          @blur="validateEmail"
        />
        <p v-if="emailError" class="inputError">Please enter a valid email.</p>
      </div>

      <div class="inputPassword">
        <input
          v-model="password"
          type="password"
          placeholder="Your Password"
          :class="{ 'error-border': passwordError }"
          @blur="validatePassword"
        />
        <p v-if="passwordError" class="inputError">
          Password must be at least 6 characters long.
        </p>
      </div>

      <div class="login">
        <button @click="handleSignUp">Sign Up &nbsp; →</button>
      </div>
      <div class="goSignUp">
        <p>Already have an account!</p>
        <h1 @click="$router.push('/signIn')">Sign In</h1>
      </div>
    </div>

    <div class="rightSide">
      <div class="text">
        <h1>Enjoy with New</h1>
        <p>E-commerce</p>
      </div>
      <div class="imageEcommerce">
        <img src="@/assets/images/Background/ecommerce-bg.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import google from "@/assets/icons/google.vue";
import { useUserSignupStore } from "@/stores/useUserSignupStore";
import { ref } from "vue";
import { useRouter } from "vue-router"; // Import useRouter to navigate after signup

export default {
  name: "SignUpComponent",
  components: {
    google,
  },
  setup() {
    const userSignupStore = useUserSignupStore();
    const router = useRouter();

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");

    const firstNameError = ref(false);
    const lastNameError = ref(false);
    const emailError = ref(false);
    const passwordError = ref(false);

    const validateFirstName = () => {
      firstNameError.value = !firstName.value.trim();
    };

    const validateLastName = () => {
      lastNameError.value = !lastName.value.trim();
    };

    const validateEmail = () => {
      emailError.value =
        !email.value.trim() ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value);
    };

    const validatePassword = () => {
      passwordError.value = password.value.length < 6;
    };

    const handleSignUp = () => {
      validateFirstName();
      validateLastName();
      validateEmail();
      validatePassword();

      if (
        !firstNameError.value &&
        !lastNameError.value &&
        !emailError.value &&
        !passwordError.value
      ) {
        userSignupStore.signUp(
          firstName.value,
          lastName.value,
          email.value,
          password.value
        );

        if (userSignupStore.signupSuccess) {
          alert("Signup successful!");
          firstName.value = "";
          lastName.value = "";
          email.value = "";
          password.value = "";
          firstNameError.value = false;
          lastNameError.value = false;
          emailError.value = false;
          passwordError.value = false;
          router.push("/signIn");
        } else {
          alert(userSignupStore.signupError);
        }
      } else {
        alert("Please correct the errors before submitting.");
      }
    };

    return {
      userSignupStore,
      firstName,
      lastName,
      email,
      password,
      handleSignUp,
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      validateFirstName,
      validateLastName,
      validateEmail,
      validatePassword,
    };
  },
};
</script>

<style scoped>
.err {
  display: flex;
  justify-content: center;
  align-items: center;
}
.error-border {
  border: 1px solid red;
}
.inputError {
  color: red;
  font-size: 12px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
}
.errorMessage {
  color: red;
  font-size: 12px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  margin-top: 1%;
  margin-left: 4%;
}
.containerSignIn {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  gap: 0.5%;
  margin-top: 1%;
  margin-bottom: 1%;
}
.leftSide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: auto;
  background-color: #f9eded;
  border-radius: 1%;
  box-shadow: 0 7px 5px rgba(0, 0, 0, 0.1);
}
.rightSide {
  width: 50%;
  height: auto;
  justify-content: center;
  background-image: url("@/assets/images/Background/ecommerce-bg.png");
  border-radius: 1%;
  box-shadow: 0 7px 5px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}
.logo img {
  width: 20%;
  height: 25px;
}

.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}
.welcome p {
  font-size: 32px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  background: -webkit-linear-gradient(#1b1c1b, #554343);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.loginGoogle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}
.loginGoogle button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 1%;
  gap: 5%;
  width: 50%;
  background: #f2e9e9;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  cursor: pointer;
  box-shadow: inset 0 0px 0px 0 #08cbd6;
  transition: background-color 0.3s, ease-out 0.5s;
  -webkit-transition: ease-out 0.5s;
  -moz-transition: ease-out 0.5s;
}
.loginGoogle button:hover {
  box-shadow: inset 0 100px 0px 0 #0dc767;
}

.orLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
}
.orLogin p {
  font-size: 12px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #9e9e9e;
}
.inputName {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5%;
}

.inputLastName {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2%;
}

.inputEmail {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2%;
}
.inputPassword {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
}
.inputName p,
.inputLastName p,
.inputEmail p,
.inputPassword p {
  font-size: 12px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #ed0909;
}
.inputEmail input,
.inputLastName input,
.inputPassword input,
.inputName input {
  border-radius: 10px;
  padding: 1.5%;
  width: 50%;
  font-size: 14px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  background: #f2e9e9;
  border: 1px solid #d9d9d9;
  transition: background-color 0.3s;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}

.remember {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
}
.checkBoc {
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.box p {
  font-size: 12px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #000000;
}
.box h1 {
  text-decoration: underline;
  font-size: 12px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
}
.box h1:hover {
  color: #97a697;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}
.login button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 2%;
  gap: 5%;
  cursor: pointer;
  width: 50%;
  color: #ffffff;
  background: #958383;
  border: 1px solid #d9d9d9;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  box-shadow: inset 0 0px 0px 0 #0dc767;
  transition: background-color 0.3s, ease-out 0.5s;
  -webkit-transition: ease-out 0.5s;
  -moz-transition: ease-out 0.5s;
}
.login button:hover {
  box-shadow: inset 0 100px 0px 0 #0dc767;
}

.goSignUp {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  gap: 2%;
}
.goSignUp p {
  font-size: 12px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #000000;
}
.goSignUp h1 {
  text-decoration: underline;
  font-size: 12px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #958383;
  cursor: pointer;
}
.goSignUp h1:hover {
  color: #1500ff;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  margin-top: 3%;
  margin-right: 3%;
  gap: 2%;
}
.text p {
  font-size: 18px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #0d0c0c;
}
.text h1 {
  font-size: 14px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #fefefe;
  cursor: pointer;
}

.imageEcommerce {
  display: flex;
  justify-content: center;
  align-items: center;
}
.imageEcommerce img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
