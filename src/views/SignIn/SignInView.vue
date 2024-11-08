<template>
  <div class="container">
    <SignIn_Component />
  </div>
</template>

<script>
import SignIn_Component from "@/components/SignIn_Component.vue";

export default {
  name: "SignInView",
  components: {
    SignIn_Component,
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
