<template>
  <div
    class="cardFuture"
    :style="{
      backgroundColor: colorCard,
      width: widthCard,
      height: heightCard,
    }"
  >
    <div class="titleCard">
      <p>{{ titleCard }}</p>
    </div>
    <div class="descriptionCard">
      <p>{{ descriptionCard }}</p>
    </div>

    <div class="imageCard">
      <img :src="imageCard" alt="" />
      <Button_Component
        v-for="button in buttons"
        :key="button.id"
        :name-button="button.name"
        :backgroundColor-button="button.backgroundColor"
        :height-button="button.height"
        :width-button="button.width"
        :color-button="button.color"
      />
    </div>
  </div>
</template>

<script>
import Button_Component from "@/components/Button_Component.vue";
export default {
  name: "CardFuture_Component",
  components: {
    Button_Component,
  },
  data() {
    return {
      buttons: [
        {
          name: "Learn More",
          backgroundColor: "#958383",
          height: "50px",
          width: "150px",
          color: "white",
        },
      ],
    };
  },
  props: {
    titleCard: String,
    descriptionCard: String,
    imageCard: String,
    colorCard: String,
    widthCard: String,
    heightCard: String,
  },
};
</script>

<style scoped>
.cardFuture {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border-radius: 10px;
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
}

.titleCard {
  display: flex;
  justify-content: start;
  align-items: start;
  width: 90%;
  margin-top: 5%;
  margin-left: 3%;
}
.titleCard p {
  font-size: 30px;
  font-weight: bold;
  font-family: Quicksand, sans-serif;
  color: #564949;
}
.descriptionCard {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin-top: 7%;
  margin-left: 3%;
}
.descriptionCard p {
  font-size: 20px;
  font-weight: bold;
  font-family: Quicksand, sans-serif;
  color: black;
}
.imageCard {
  width: 95%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10%;
  margin-left: 3%;
}
.imageCard img {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
