<template>
    <div class="orderScreen">
      <Navbar_Component />
      <Breadcrumb_Component />
      <div>
        <div class="content">
          <div class="line">
            <div class="tab1">
              <div class="l1">♡</div>
              <div class="l2">♡</div>
              <div class="l3">♡</div>
            </div>
            <div class="tab2">
              <div class="Title">Your Order Details</div>
            </div>
          </div>
          <div class="info">
            Here you can view the details of your orders, including the items you've purchased, their status, and payment information. Manage your orders efficiently with our user-friendly interface.
          </div>
          <div class="info" style="font-weight:bold;">
            Tips: Always review your order summary before confirming payments.
          </div>
        </div>
      </div>
      <Footer_Component class="footer" style="margin-top: 200px;" />
    </div>
  </template>
  
  <script>
  import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
  import Navbar_Component from "@/components/Navbar_Component.vue";
  import Footer_Component from "@/components/Footer_Component.vue";
  
  export default {
    name: "OrderView",
    components: {
      Navbar_Component,
      Breadcrumb_Component,
      Footer_Component,
    },
  };
  </script>
  
  <style scoped>
  .orderScreen {
    width: 100%;
    height: 100vh;
    margin-top: 2%;
    box-sizing: border-box;
  }
  .line {
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .l1 {
    font-size: 18px;
    font-weight: bolder;
    color: rgb(65, 52, 43);
    position: absolute;
    top: -8%;
    left: 12%;
    transform: rotate(30deg);
    margin-bottom: 2px;
  }
  
  .l2 {
    font-size: 20px;
    font-weight: bolder;
    color: rgb(65, 52, 43);
    position: absolute;
    top: -7%;
    left: 6%;
    transform: rotate(-25deg);
    margin-bottom: 2px;
  }
  
  .l3 {
    font-size: 18px;
    font-weight: bolder;
    color: rgb(65, 52, 43);
    position: absolute;
    top: 2%;
    left: 3%;
    transform: rotate(-70deg);
  }
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
  }
  .Title {
    width: 300px;
    font-family: "Quicksand", sans-serif;
    font-size: 25px;
    color: rgb(65, 52, 43);
    font-weight: bold;
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
  }
  .info {
    font-family: "Quicksand", sans-serif;
    font-size: 18px;
    color: #4a4a4a;
    line-height: 1.6;
    max-width: 900px;
    text-align: center;
  }
  </style>
  