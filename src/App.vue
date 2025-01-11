<template>
  <div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* Page content styles */
</style>
