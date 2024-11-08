import { defineStore } from "pinia";

export const useUserSignupStore = defineStore("userSignup", {
  state: () => ({
    // Define your state here
    // save user signUp in local storage
    users: JSON.parse(localStorage.getItem("users")) || [],

    // save current user in local storage for sign in
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    signupSuccess: false,
    signupError: null,
    loginError: null,
  }),

  getters: {
    // Define your getters here
    isLoggedIn() {
      return !!this.currentUser;
    },
  },

  actions: {
    // Define your actions here

    // save users to local storage
    saveUsersToLocalStorage() {
      localStorage.setItem("users", JSON.stringify(this.users));
    },

    // save current user to local storage
    saveCurrentUserToLocalStorage() {
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    },

    // user sign up with email username and password
    signUp(firstName, lastName, email, password) {
      const userExists = this.users.some((user) => user.email === email);
      const usernameExists = this.users.some(
        (user) => user.firstName === firstName && user.lastName === lastName
      );

      if (userExists) {
        this.signupError = "User with this email already exists.";
        this.signupSuccess = false;
      } else if (usernameExists) {
        this.signupError = "Name is already taken.";
        this.signupSuccess = false;
      } else {
        const newUser = { firstName, lastName, email, password };
        this.users.push(newUser);
        this.saveUsersToLocalStorage();
        this.signupSuccess = true;
        this.signupError = null;
      }
    },

    // user sign in with email and password
    signIn(email, password) {
      const user = this.users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        this.currentUser = user;
        this.loginError = null;
        this.saveCurrentUserToLocalStorage();
      } else {
        this.loginError = "Invalid email or password.";
      }
    },

    // user sign out or log out
    logout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});
