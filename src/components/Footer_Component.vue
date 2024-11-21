<template>
  <div class="footer">
    <div class="container">
      <!-- Left Side -->
      <div class="leftSide">
        <div class="logo">
          <img src="../assets/images/Logo/LogoEcommerce.png" alt="" />
        </div>
        <div class="description">
          <p>We help you find the most stylist ever!</p>
        </div>
        <div class="contacts">
          <button class="facebook">
            <img src="../assets/images/Categories/communication.png" alt="" />
          </button>
          <button class="telegram">
            <img src="../assets/images/Categories/telegram.png" alt="" />
          </button>
          <button class="instagram">
            <img src="../assets/images/Categories/instagram.png" alt="" />
          </button>
        </div>
      </div>

      <!-- Right Side -->
      <div class="rightSide">
        <div class="column">
          <p class="title">Information</p>
          <ul>
            <li>About</li>
            <li>Product</li>
            <li>Blog</li>
          </ul>
        </div>
        <div class="column">
          <p class="title">Company</p>
          <ul>
            <li>Community</li>
            <li>Career</li>
            <li>Our Story</li>
          </ul>
        </div>
        <div class="column">
          <p class="title">Contact</p>
          <ul>
            <li>Getting Started</li>
            <li>Pricing</li>
            <li>Resources</li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
    </div>
    <div class="copyright">
      <p>© 2024 all Right Reserved Term of use Fast Collection.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer_Component",
};
</script>

<style scoped>
.footer {
  width: 1440px;
  height: 400px;
  background-color: #faf5ec;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.container {
  width: 1440px;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
}

.leftSide {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.rightSide {
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.title {
  font-size: 18px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;
}

.column ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.column ul li {
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  color: #7c7676;
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.3s;
}

.column ul li:hover {
  color: #554e4f;
}

.logo {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}

.logo img {
  width: 274px;
  height: 50px;
}
.description {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 5%;
}

.description p {
  font-family: Quicksand, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #7c7676;
}
.contacts {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
}
.contacts button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid #bdc2c5;
  background-color: #faf5ec;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  margin: 5px;
}

.contacts button:hover {
  background-color: #bdc2c5;
  transform: scale(1.1);
  transition: all 0.3s;
}

.contacts button img {
  width: 20px;
  height: 20px;
}

.copyright {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 5%;
}
.copyright p {
  font-family: Quicksand, sans-serif;
}
</style>
