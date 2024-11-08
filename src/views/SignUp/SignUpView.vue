<template>
  <div class="container">
    <SignUp_Component />
  </div>
</template>

<script>
import SignUp_Component from "@/components/SignUp_Component.vue";

export default {
  name: "SignInView",
  components: {
    SignUp_Component,
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
