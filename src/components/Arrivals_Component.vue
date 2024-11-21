<template>
  <div class="arrivals">
    <img :src="imageArrivals" alt="" />
  </div>
</template>

<script>
export default {
  name: "Arrivals_Component",
  props: {
    imageArrivals: String,
    titleArrivals: String,
  },
};
</script>

<style scoped>
.arrivals {
  width: 1050px;
  height: 568px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}

.arrivals img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
}
</style>
