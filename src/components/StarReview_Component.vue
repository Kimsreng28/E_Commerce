<template>
  <div class="star-rating">
    <span
      v-for="star in maxStars"
      :key="star"
      class="star"
      :class="{ active: star <= currentRating }"
      @click="setRating(star)"
    >
      ★
    </span>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    modelValue: {
      type: Number,
      default: 0, // Default rating
    },
    maxStars: {
      type: Number,
      default: 5, // Default maximum number of stars
    },
  },
  emits: ["update:modelValue"],
  computed: {
    currentRating() {
      return this.modelValue;
    },
  },
  methods: {
    setRating(star) {
      this.$emit("update:modelValue", star);
    },
  },
};
</script>

<style>
.star-rating {
  display: flex;
  gap: 5px;
  cursor: pointer;
  font-size: 24px;
}
.star {
  color: #ccc;
  transition: color 0.2s;
}
.star.active {
  color: #ffc107;
}
</style>