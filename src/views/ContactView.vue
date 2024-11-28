<template>
  <div class="contactScreen">
    <Navbar_Component />
    <Breadcrumb_Component />
    <h1>Contact</h1>

    <div class="contacts">
      <a href="https://www.facebook.com/DominosPizzaCambodia">
        <img src="../assets/images/Contact/facebook.png" alt="" width="60%" />
        <p class="text">Facebook</p>
      </a>
      <a href="https://www.youtube.com/@tzuyang6145">
        <img src="../assets/images/Contact/youtube.png" alt="" width="60%" />
        <p class="text">Youtube</p>
      </a>
      <a href="https://www.instagram.com/tzuyang70/">
        <img src="../assets/images/Contact/insta.png" alt="" width="60%" />
        <p class="text">Instagram</p>
      </a>
      <a href="https://x.com/NewJeans_ADOR">
        <img src="../assets/images/Contact/X.png" alt="" width="60%" />
        <p class="text">X</p>
      </a>
      <a href="https://www.tiktok.com/@grey._.official?_t=8rgLBi6nvEd&_r=1">
        <img src="../assets/images/Contact/tiktok.png" alt="" width="60%" />
        <p class="text">TikTok</p>
      </a>
    </div>
    <div class="hotline">
      <img
        src="@/assets/images/Contact/headset.svg"
        alt="Headset Icon"
        width="50px"
        height="50px"
      />
      <a href="#">Hotline: 023 880 880</a>
    </div>
    <div class="location">
      <p>Location:</p>
      <a href="https://maps.app.goo.gl/BLC6wtJpyWznaFnq9"
        >https://maps.app.goo.gl/BLC6wtJpyWznaFnq9</a
      >
    </div>
    <div class="mapping">
      <p>Scan Here for map &#11162;</p>
      <img src="../assets/images/Contact/Qr Code.png" alt="" width="15%" />
    </div>

    <Footer_Component style="margin-left: 4px;"/>
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
export default {
  name: "ContactView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
    Footer_Component,
  },
};
</script>

<style scoped>
.contactScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
}

h1 {
  font-family: Saira, sans-serif;
  font-weight: bold;
  color: rgb(65, 52, 43);
  padding: 2%;
  margin-left: 1%;
}
p {
  font-size: 24px;
  font-family: cursive;
  color: black;
  margin-left: 15px;
}

.contacts a {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  margin: 10px;
}

.text {
  font-family: cursive;
  font-size: 16px;
  font-weight: bold;
  color: rgb(90, 72, 59);
  text-align: center;
  margin-top: 10px;
}

.contacts {
  width: 98%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
  margin-top: 5%;
}

.contacts a:hover {
  background: transparent;
  box-shadow: none;
  transform: none;
}

.contacts img {
  transition: transform 0.3s;
}

.contacts img:hover {
  transform: scale(1.05);
}

.hotline {
  margin-top: 10%;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin-left: 2%;
}

.hotline a {
  font-size: 24px;
  font-family: cursive;
  color: black;
  margin-left: 15px;
  text-decoration: underline;
  background: transparent;
}
.location {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin-left: 2%;
  margin-top: 2%;
}
.location a {
  font-size: 24px;
  font-family: cursive;
  color: black;
  margin-left: 15px;
  background: transparent;
  text-decoration: underline;
}
.mapping {
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 5%;
  margin-bottom: 5%;
}
.mapping p {
  display: flex;
  align-items: center;
}
</style>
