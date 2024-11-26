<template>
  <div class="arrivals">
    <carousel
      :items-to-show="1.5"
      :wrap-around="true"
      :breakpoints="breakpoints"
      :autoplay="4000"
    >
      <slide v-for="(arrival) in arrivals" :key="arrival.id">
        <div class="arrival-slide">
          <img
            :src="arrival.image"
            :alt="arrival.title"
            class="arrival-image"
          />
          <p class="arrival-title">{{ arrival.title }}</p>
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  name: "Arrivals_Component",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    arrivals: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.arrivals {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}

.carousel-container {
  display: flex;
  justify-content: space-between; /* Ensure spacing between items */
}

.arrival-slide {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px; /* Add horizontal padding to create space between slides */
}

.arrival-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
}

.arrival-title {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
}
</style>
