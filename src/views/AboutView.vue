<template>
  <div class="aboutScreen">
    <Navbar_Component />

    <div v-if="isLoading" class="load">
      <LoadingView />
    </div>

    <div v-else>
      <Breadcrumb_Component />
      <div></div>
      <div>
        <div class="content">
          <div class="line">
            <div class="tab1">
              <div class="l1">♡</div>
              <div class="l2">♡</div>
              <div class="l3">♡</div>
            </div>
            <div class="tab2">
              <div class="Title">
                We're changing the way people think about fashion
              </div>
            </div>
          </div>
          <div class="info">
            Fast Collection is the online shopping website where the products
            are suggested based on the users' interest and the trending among
            people in each seasons. The users can also contribute and interact
            with the community content with fun. It is hugely the entertaining
            platform where the buyers have the most control. The buyers can make
            the payments with our major partner bank.
          </div>
          <div class="info" style="font-weight: bold">
            Tips: Products and shop reviews can help and improve your shopping
            experience.
          </div>
        </div>
      </div>
      <Footer_Component class="footer" style="margin-top: 200px" />
    </div>
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import LoadingView from "@/views/LoadingView.vue";
export default {
  name: "AboutView",
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
    setTimeout(() => {
      this.isLoading = false; // Set loading to false after 3 seconds
    }, 1000);
  },
};
</script>

<style scoped>
.load {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.aboutScreen {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
}
.line {
  display: flex;
  position: relative;
  align-items: center; /* Aligns the lines with the title vertically */
  margin-bottom: 20px;
}

.l1 {
  font-size: 18px;
  font-weight: bolder;
  color: rgb(65, 52, 43);
  position: absolute;
  top: -8%;
  left: 12%;
  transform: rotate(30deg); /* Angled slightly upward */
  margin-bottom: 2px; /* Spacing between lines */
}

.l2 {
  font-size: 20px;
  font-weight: bolder;
  color: rgb(65, 52, 43);
  position: absolute;
  top: -7%;
  left: 6%;
  transform: rotate(-25deg); /* Horizontal */
  margin-bottom: 2px;
}

.l3 {
  font-size: 18px;
  font-weight: bolder;
  color: rgb(65, 52, 43);
  position: absolute;
  top: 2%;
  left: 3%;
  transform: rotate(-70deg); /* Angled slightly downward */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers content horizontally */
  margin-top: 40px;
}
.Title {
  width: 300px;
  font-family: "Quicksand", sans-serif;
  font-size: 25px;
  color: rgb(65, 52, 43);
  font-weight: bold;
  padding: 10px;
  text-align: center; /* Centers text inside the box */
  margin-bottom: 20px;
}
.info {
  font-family: "Quicksand", sans-serif;
  font-size: 18px;
  color: #4a4a4a;
  line-height: 1.6;
  max-width: 900px;
  text-align: center; /* Centers text in the paragraph */
}
</style>
