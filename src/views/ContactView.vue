<template>
  <div class="contactScreen">
    <Navbar_Component />

    <div class="load" v-if="isLoading">
      <LoadingView />
    </div>

    <div v-else>
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

      <Footer_Component />
    </div>
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import LoadingView from "@/views/LoadingView.vue";
export default {
  name: "ContactView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
    Footer_Component,
    LoadingView,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    // Simulating data loading (you can replace this with actual data fetching logic)
    this.loadData();
  },
  methods: {
    loadData() {
      // Simulate loading process with a delay (e.g., API call or fetching data)
      setTimeout(() => {
        this.isLoading = false; // After loading, set isLoading to false
      }, 1000); // 2 seconds delay for simulation
    },
  },
};
</script>

<style scoped>
.load {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
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
  width: 100%;
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

/* Responsive Styles */

/* For tablets and below (max-width: 768px) */
@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem; /* Reduce font size for smaller screens */
  }

  .contacts {
    flex-direction: column; /* Stack contact icons vertically */
    align-items: center;
    margin-left: 0; /* Remove unnecessary left margin */
  }

  .contacts a {
    width: 80%; /* Make the contact links wider */
    margin: 10px 0;
  }

  .contacts img {
    width: 50%; /* Make the icons smaller */
  }

  .hotline {
    flex-direction: column; /* Stack hotline icon and text */
    align-items: center;
    margin-left: 0;
  }

  .location {
    flex-direction: column; /* Stack location icon and text */
    align-items: center;
    margin-left: 0;
  }

  .mapping {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .mapping img {
    width: 50%; /* Adjust size of the QR code */
  }
}

/* For mobile devices (max-width: 480px) */
@media (max-width: 480px) {
  .contactScreen {
    margin-top: 5%; /* Adjust margin for mobile */
  }

  h1 {
    font-size: 1.5rem; /* Make title font even smaller for mobile */
  }

  .contacts a {
    width: 90%; /* Increase width for mobile */
  }

  .contacts img {
    width: 60%; /* Adjust icon size */
  }

  .hotline {
    font-size: 20px; /* Smaller font size for mobile */
    margin-top: 5%;
  }

  .location a {
    font-size: 20px; /* Smaller font size for mobile */
  }

  .mapping p {
    font-size: 18px; /* Smaller text size for mobile */
  }

  .mapping img {
    width: 30%; /* Adjust QR code size for mobile */
  }
}
</style>
