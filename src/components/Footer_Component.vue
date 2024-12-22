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
  width: 1515px;
  background-color: #faf5ec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2% 0;
  box-sizing: border-box;
}

.container {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.leftSide {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.rightSide {
  width: 60%;
  display: flex;
  justify-content: space-between;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 2rem; /* Space between columns */
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

.logo img {
  width: 180px; /* Adjusted logo size */
  height: auto;
}

.description p {
  font-family: Quicksand, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #7c7676;
  margin: 1rem 0;
}

.contacts {
  display: flex;
  gap: 0.5rem; /* Consistent gap between buttons */
}

.contacts button {
  width: 40px;
  height: 40px;
  background-color: #faf5ec;
  border: 1px solid #bdc2c5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
}

.contacts button:hover {
  background-color: #bdc2c5;
  transform: scale(1.1);
}

.contacts button img {
  width: 20px;
  height: 20px;
}

.copyright {
  width: 80%;
  display: flex;
  justify-content: start;
  align-items: start;
  text-align: center; /* Centered copyright */
  margin-top: 3rem;
}

.copyright p {
  font-family: Quicksand, sans-serif;
  font-size: 14px;
  color: #7c7676;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .leftSide,
  .rightSide {
    width: 100%; /* Full width on smaller screens */
    align-items: center;
    margin-bottom: 1rem;
  }

  .contacts {
    justify-content: center;
  }

  .column {
    margin-bottom: 1rem; /* Spacing between columns */
  }
}

@media (max-width: 768px) {
  .leftSide,
  .rightSide {
    width: 100%; /* Full width on smaller screens */
  }

  .column {
    margin-right: 0; /* Remove margin-right on small screens */
    margin-bottom: 1.5rem;
  }

  .logo img {
    width: 150px; /* Adjust logo size for small screens */
  }

  .description p {
    font-size: 14px; /* Smaller font size for description */
  }

  .contacts button {
    width: 35px;
    height: 35px;
  }

  .copyright p {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 4% 0; /* Increase top and bottom padding for mobile */
  }

  .container {
    width: 90%;
  }

  .logo img {
    width: 120px; /* Smaller logo for mobile */
  }

  .description p {
    font-size: 12px; /* Even smaller description font */
  }

  .contacts button {
    width: 30px;
    height: 30px; /* Even smaller social media buttons */
  }

  .column {
    width: 100%;
    margin-bottom: 1rem;
    text-align: center; /* Center-align columns for mobile */
  }

  .title {
    font-size: 16px;
  }

  .column ul li {
    font-size: 14px; /* Smaller font size for list items */
  }

  .copyright p {
    font-size: 10px;
  }
}
</style>
