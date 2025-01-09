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
        @click="navigateToDetailPage"
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
    cardId: Number,
  },
  methods: {
    navigateToDetailPage() {
      // Navigate to the corresponding route based on the card ID
      if (this.cardId === 1) {
        this.$router.push({ path: "/contact" }); // Navigate to Service page
      } else if (this.cardId === 2) {
        this.$router.push({ path: "/coupon" }); // Navigate to Coupon page
      }
    },
  },
};
</script>

<style scoped>
.cardFuture {
  width: 400px;
  height: 343px;
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
.titleCard p:hover {
  color: #fbbc00;
  transition: 0.5s;
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
  font-size: 18px;
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
  margin-bottom: 5%;
  margin-left: 3%;
}
.imageCard img {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Responsive Styles */
@media (max-width: 1024px) {
  .cardFuture {
    width: 90%;
    height: auto;
    padding: 15px;
  }

  .titleCard p {
    font-size: 26px;
  }

  .descriptionCard p {
    font-size: 16px;
  }

  .imageCard img {
    width: 70px;
    height: 70px;
  }

  .imageCard button {
    width: 140px;
    height: 45px;
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .cardFuture {
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .titleCard p {
    font-size: 22px;
  }

  .descriptionCard p {
    font-size: 14px;
  }

  .imageCard img {
    width: 60px;
    height: 60px;
  }

  .imageCard button {
    width: 130px;
    height: 40px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .cardFuture {
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .titleCard p {
    font-size: 20px;
  }

  .descriptionCard p {
    font-size: 12px;
  }

  .imageCard img {
    width: 50px;
    height: 50px;
  }

  .imageCard button {
    width: 120px;
    height: 35px;
    font-size: 14px;
  }
}
</style>
