<template>
  <div class="containerSignIn">
    <div class="leftSide">
      <div class="logo">
        <img src="../assets/images/Logo/LogoEcommerce.png" alt="" />
      </div>
      <div class="welcome">
        <p>Welcome Back</p>
      </div>
      <div class="loginGoogle">
        <button><google />Login with Google</button>
      </div>
      <div class="orLogin">
        <p>OR LOG IN WITH EMAIL</p>
      </div>
      <div class="err">
        <div v-if="userSignInStore.loginError" class="errorMessage">
          {{ userSignInStore.loginError }}
        </div>
      </div>
      <div class="inputEmail">
        <input
          v-model="email"
          type="text"
          id="email"
          placeholder="Your Email"
          :class="{ 'error-border': emailError }"
          @blur="validateEmail"
        />
        <p v-if="emailError" class="inputError">Email is required.</p>
      </div>
      <div class="inputPassword">
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Your Password"
          :class="{ 'error-border': passwordError }"
          @blur="validatePassword"
        />
        <p v-if="passwordError" class="inputError">Password must be wrong.</p>
      </div>
      <div class="remember">
        <div class="checkBoc">
          <input type="checkbox" id="remember" v-model="rememberMe" />
          <div class="box">
            <p>Remember me</p>
            <h1>Forgot Password?</h1>
          </div>
        </div>
      </div>
      <div class="login">
        <button @click="handleSignIn">Login &nbsp; →</button>
      </div>
      <div class="goSignUp">
        <p>Don't have an account?</p>
        <h1 @click="$router.push('/signUp')">Sign Up</h1>
      </div>
    </div>
    <div class="rightSide">
      <div class="text">
        <h1>Enjoy with New</h1>
        <p>E-commerce</p>
      </div>
      <div class="imageEcommerce">
        <img src="../assets/images/Background/ecommerce-bg.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import google from "@/assets/icons/google.vue";
import { useUserSignupStore } from "@/stores/useUserSignupStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "SignInComponent",
  components: {
    google,
  },
  setup() {
    const router = useRouter();
    const userSignInStore = useUserSignupStore();

    const email = ref("");
    const password = ref("");
    const emailError = ref(false);
    const passwordError = ref(false);
    const rememberMe = ref(false);

    onMounted(() => {
      const saveEmail = localStorage.getItem("saveEmail");
      if (saveEmail) {
        email.value = saveEmail;
        rememberMe.value = true;
      }
    });

    // Validate email format
    const validateEmail = () => {
      emailError.value =
        !email.value.trim() ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value);
    };

    // Validate password length
    const validatePassword = () => {
      passwordError.value = password.value.length < 6;
    };

    // Handle sign-in
    const handleSignIn = () => {
      validateEmail();
      validatePassword();

      if (!emailError.value && !passwordError.value) {
        userSignInStore.signIn(email.value, password.value);

        if (userSignInStore.loginError) {
          alert(userSignInStore.loginError);
        } else {
          if (rememberMe.value) {
            localStorage.setItem("saveEmail", email.value);
          } else {
            localStorage.removeItem("saveEmail");
          }
          alert("Login successful!");
          router.push("/");
        }
      }
    };

    return {
      userSignInStore,
      email,
      password,
      emailError,
      passwordError,
      validateEmail,
      validatePassword,
      handleSignIn,
      rememberMe,
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
input.error-border {
  border: 2px solid red;
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
  width: 50%;
  height: auto;
  background-color: #f9eded;
  border-radius: 1%;
  box-shadow: 0 7px 5px rgba(0, 0, 0, 0.1);
}
.rightSide {
  width: 50%;
  height: auto;
  background: linear-gradient(180deg, #57bdf3 0%, #41a0d3 100%);
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
  background: -webkit-linear-gradient(#1b1c1b, #3a5fce);
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
  border: none;
  padding: 1%;
  gap: 5%;
  align-items: center;
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

.inputEmail {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5%;
}
.inputPassword {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2%;
}

.inputEmail p,
.inputPassword p {
  font-size: 12px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #ff0000;
}
.inputEmail input,
.inputPassword input {
  border-radius: 10px;
  border: none;
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
  border: none;
  padding: 2%;
  gap: 5%;
  align-items: center;
  cursor: pointer;
  width: 50%;
  color: #ffffff;
  background: #958383;
  border: 1px solid #d9d9d9;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  box-shadow: inset 0 0px 0px 0 #0272fa;
  transition: background-color 0.3s, ease-out 0.5s;
  -webkit-transition: ease-out 0.5s;
  -moz-transition: ease-out 0.5s;
}
.login button:hover {
  box-shadow: inset 0 100px 0px 0 #0272fa;
}

.goSignUp {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
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
  color: #3980fa;
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
  width: 80%;
  height: 80%;
  object-fit: cover;
  object-position: center;
}
</style>
