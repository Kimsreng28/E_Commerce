<template>
  <div class="arrivals">
    <carousel
      :items-to-show="1.2"
      :wrap-around="true"
      :breakpoints="breakpoints"
      :transition="500"
      :autoplay="3000"
    >
      <slide v-for="arrival in arrivals" :key="arrival.id">
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.carousel-container {
  display: flex;
}

.arrival-slide {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}

.arrival-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  width: 100%;
  border-radius: 10px;
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

.carousel__viewport {
  perspective: 300px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide--prev {
  opacity: 0.2;
  transform: rotateY(-2deg) scale(0.9);
}

.carousel__slide.carousel__slide--next {
  opacity: 0.2;
  transform: rotateY(2deg) scale(0.9);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}
</style>
