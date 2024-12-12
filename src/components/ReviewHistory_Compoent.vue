<template>
    <div>
      <p class="reviewTitle">What customers say about</p>
      <p class="reviewTitle">Fast Collection?</p>
  
      <div class="reviewContainer">
        <div class="reviewCard">
          <img
            class="reviewImage"
            src="@/assets/images/ReviewHistory/shoes.jpg"
            alt="image-review"
          />
          <div class="cardFooter">
            <p class="productName">Kimsreng</p>
            <p class="rating">⭐ 4.5</p>
          </div>
        </div>
        <div class="reviewCard">
          <img
            class="reviewImage"
            src="@/assets/images/ReviewHistory/shoes.jpg"
            alt="image-review"
          />
          <div class="cardFooter">
            <p class="productName">Kimsreng</p>
            <p class="rating">⭐ 4.5</p>
          </div>
        </div>
        <div class="reviewCard">
          <img
            class="reviewImage"
            src="@/assets/images/ReviewHistory/shoes.jpg"
            alt="image-review"
          />
          <div class="cardFooter">
            <p class="productName">Kimsreng</p>
            <p class="rating">⭐ 4.5</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .reviewTitle {
    margin-left: 40px;
    font-size: 24px;
    font-weight: bold;
    color: #372f2f;
    font-family: Quicksand, sans-serif;
  }
  
  .reviewContainer {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding: 20px;
    scroll-behavior: smooth;
  }
  
  .reviewContainer::-webkit-scrollbar {
    height: 0;
  }
  
  .reviewContainer::-webkit-scrollbar-thumb {
    display: none;
  }
  
  .reviewContainer::-webkit-scrollbar-track {
    display: none;
  }
  
  .reviewCard {
    flex: 0 0 495px;
    height: 327px;
    background-color: #FAF5EC;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: grab;
  }
  
  .reviewImage {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .cardFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: auto;
  }
  
  .productName {
    font-size: 16px;
    font-weight: bold;
    color: #4a4a4a;
  }
  
  .rating {
    font-size: 16px;
    color: #ff9800;
  }
  </style>
  