<template>
  <div>
    <!--{:key="$route.fullPath"} to ensure the component is re-rendered whenever the route changes. -->
    <router-view :key="$route.fullPath"/>
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
