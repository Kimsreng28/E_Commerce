<template>
  <div class="container">
    <div class="load" v-if="isLoading"><LoadingView /></div>
    <div v-else><SignUp_Component /></div>
  </div>
</template>

<script>
import SignUp_Component from "@/components/Auth/SignUp_Component.vue";
import LoadingView from "../LoadingView.vue";
export default {
  name: "SignInView",
  components: {
    SignUp_Component,
    LoadingView,
  },
  data() {
    return {
      isLoading: true, // Flag to show loading view
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false; // Set loading to false after 3 seconds
    }, 1000);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1440px;
  height: auto;
}
</style>
