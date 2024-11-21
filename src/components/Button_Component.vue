<template>
  <div class="button">
    <button
      :style="{
        backgroundColor: backgroundColorButton,
        height: heightButton,
        width: widthButton,
        color: colorButton,
      }"
      class="btn"
    >
      <span
        v-if="icon"
        class="material-icons"
        :style="{ marginRight: '8px' }"
        >{{ icon }}</span
      >
      {{ nameButton }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Button_Component",
  props: {
    nameButton: String,
    backgroundColorButton: String,
    heightButton: String,
    widthButton: String,
    colorButton: String,
    icon: String,
  },
};
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.material-icons {
  font-size: 20px;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button button {
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 16px;
  transition: background-color 0.3s ease;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: inset 0 0px 0px #04ed84;
  -webkit-transition: ease-out 0.5s;
  -moz-transition: ease-out 0.5s;
}
.button button:hover {
  transition: ease-out 0.6s;
  box-shadow: inset 0 100px 0px #04ed84;
}
</style>
