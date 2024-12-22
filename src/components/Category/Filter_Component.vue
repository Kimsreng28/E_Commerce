<template>
  <div class="filter">
    <!-- Tab Buttons -->
    <div class="tabs">
      <button
        class="btnClothe"
        :class="{ active: selectedTab === 'Clothes' }"
        @click="changeTab('Clothes')"
      >
        Clothes
      </button>
      <button
        class="btnShoes"
        :class="{ active: selectedTab === 'Shoes' }"
        @click="changeTab('Shoes')"
      >
        Shoes
      </button>
      <button
        class="btnAccessories"
        :class="{ active: selectedTab === 'Accessories' }"
        @click="changeTab('Accessories')"
      >
        Accessories
      </button>
    </div>

    <!-- Show Tab-->
    <div class="filters">
      <!-- Title-->
      <div class="title">
        <p>Filters</p>
        <span class="material-icons">tune</span>
      </div>

      <div class="hr">
        <hr />
      </div>

      <!-- SubCategory -->
      <div class="subCategory">
        <div
          class="sub"
          v-for="(item, index) in displayedSubCategories"
          :key="index"
          @click="selectSubCategory(item)"
        >
          <p>{{ item }}</p>
          <span v-if="selectedSubCategory !== item" class="material-icons"
            >check_box_outline_blank</span
          >
          <span v-else class="material-icons">check_box</span>
        </div>
      </div>

      <div class="hr">
        <hr />
      </div>

      <!-- Price Range -->
      <div class="filter-section">
        <p>Price</p>
        <div class="price-range">
          <input
            type="range"
            min="50"
            max="200"
            v-model="priceValue"
            class="range"
          />
          <div class="price-input">
            <input
              type="number"
              v-model.number="priceValue"
              min="50"
              max="200"
              step="1"
              class="price-text-input"
            />
          </div>
          <div class="price-values">
            <span>${{ priceValue }}</span>
          </div>
        </div>
      </div>

      <div class="hr">
        <hr />
      </div>

      <!--Size-->
      <div class="filter-section">
        <p>Size</p>
        <div class="sizes">
          <button
            v-for="size in displayedSizes"
            :key="size"
            :class="{ active: selectedSize === size }"
            @click="selectSize(size)"
          >
            {{ size }}
          </button>
        </div>
      </div>

      <!-- Apply Filter and Clear All -->
      <div class="actions">
        <button class="apply" @click="applyFilter">Apply Filter</button>
        <button class="clear" @click="clearFilter">Clear All</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  props: {
    subCategory: String,
  },
  data() {
    return {
      selectedColor: "#6d4c41",
      selectedSize: "Small",
      selectedSubCategory: null,
      selectedTab: "Clothes",
      priceValue: 100,
      subCategories: {
        Clothes: ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"],
        Shoes: ["Sneakers", "Formal", "Boots", "Sandals", "Loafers"],
        Accessories: ["Watches", "Bags", "Belts", "Hats", "Glasses"],
      },
      colors: ["#A0BCE0", "#E07575", "#0FB763", "#9E9E9E", "#efebe9"],
      sizes: {
        Clothes: ["S", "M", "L", "XL"],
        Shoes: [28, 32, 36, 40, 44],
        Accessories: ["S", "M", "L", "XL"],
      },
    };
  },
  computed: {
    displayedSubCategories() {
      return this.subCategories[this.selectedTab];
    },
    displayedSizes() {
      return this.sizes[this.selectedTab];
    },
  },
  methods: {
    changeTab(tab) {
      this.selectedTab = tab;
      this.selectedSubCategory = null;
      this.selectedColor = null;
      this.selectedSize = null;
      this.priceValue = 100;
      console.log("Selected Tab:", this.selectedTab);
    },
    selectSubCategory(subCategory) {
      this.selectedSubCategory = subCategory;
      console.log("Selected SubCategory:", this.selectedSubCategory);
    },
    selectColor(color) {
      this.selectedColor = color;
      console.log("Selected Color:", this.selectedColor);
    },
    selectSize(size) {
      this.selectedSize = size;
      console.log("Selected Size:", this.selectedSize);
    },
    applyFilter() {
      this.$emit("apply-filter", {
        tab: this.selectedTab,
        subCategory: this.selectedSubCategory,
        color: this.selectedColor,
        size: this.selectedSize,
        price: this.priceValue,
      });
    },
    clearFilter() {
      this.selectedColor = null;
      this.selectedSize = null;
      this.selectedSubCategory = null;
      this.priceValue = 100;
      this.selectedTab = "Clothes";
      this.applyFilter();
    },
  },
};
</script>

<style scoped>
.filter {
  width: 100%;
  max-width: 326px;
  height: 1021px;
  display: flex;
  flex-direction: column;
  padding: 1%;
}
.tabs {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  gap: 1%;
}
.tabs button.active {
  background-color: #564949;
  color: #ffffff;
  transition: all 0.5s ease;
}

.tabs button {
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  font-weight: bold;
  color: #372f2f;
  transition: all 0.5s ease;
  font-size: 14px;
  font-family: Quicksand, sans-serif;
}

.filters {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  border: 1px solid #8f7979;
  padding: 5%;
  margin-top: -5%;
}
.hr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.hr hr {
  width: 100%;
  background-color: #8f7979;
}

.subCategory {
  width: 100%;
}
.title,
.sub {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
}
.sub p:hover {
  transition: all 0.5s ease;
  color: #000;
}
.sub p {
  margin-top: 3%;
  font-size: 16px;
  font-weight: 500;
  color: #372f2f;
  font-family: Quicksand, sans-serif;
}
.title p,
.filter-section p {
  font-size: 20px;
  font-weight: bold;
  color: #372f2f;
  font-family: Quicksand, sans-serif;
}
.price-range {
  width: 100%;
}
.price-range input {
  width: 100%;
}
.price-input {
  width: 50%;
}
.price-input input {
  border-radius: 5px;
  border: 0.5px solid #8f7979;
  padding: 1.5%;
  font-size: 16px;
  font-weight: bold;
  color: #383535;
  font-family: Quicksand, sans-serif;
}
.price-values span {
  font-size: 20px;
  font-weight: bold;
  color: #383535;
  font-family: Quicksand, sans-serif;
}
.filter-section {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.colors {
  width: 100%;
  display: flex;
}
.color {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
  border: 2px solid #ccc;
}
.color.selected {
  border-color: #000;
  transition: all 0.5s ease;
}

.sizes button.active {
  background-color: #4c4040;
  color: #ffffff;
  transition: all 0.5s ease;
}
.sizes {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
  margin-top: 2%;
  transition: all 0.5s ease;
}
.sizes button {
  margin-top: 2%;
  flex: 1 1 calc(33.33% - 10px);
  max-width: 100px;
  height: 40px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #221e1e;
  font-family: Quicksand, sans-serif;
  cursor: pointer;
  transition: background-color 0.5s ease, transform 0.2s ease;
}

.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.apply {
  width: 90%;
  height: 50px;
  background-color: #564949;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-top: 2%;
  font-family: Quicksand, sans-serif;
}
.apply:hover {
  background-color: #2f2b2b;
  transition: all 0.5s ease;
  color: #1feb11;
}
.clear {
  margin-top: 2%;
  width: 90%;
  height: 50px;
  background-color: #ccc;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #221e1e;
  font-family: Quicksand, sans-serif;
}
.clear:hover {
  background-color: #e12323;
  transition: all 0.5s ease;
  color: #ffffff;
}

/* Media Queries for Tablets and Mobile */
@media (max-width: 768px) {
  .tabs button {
    flex: 1 1 calc(50% - 10px); /* 2 per row for tablets */
  }

  .sizes button {
    flex: 1 1 calc(33.33% - 10px); /* 3 per row on tablets */
  }

  .price-range,
  .actions {
    gap: 8px; /* Reduce gaps for tablets */
  }
}

@media (max-width: 480px) {
  .tabs {
    gap: 2px; /* Reduce gaps for mobile */
  }

  .tabs button {
    flex: 1 1 calc(100% - 10px); /* Stack buttons on mobile */
    font-size: 10px; /* Reduce font size */
    padding: 6px;
  }

  .filters {
    padding: 10px; /* Reduce padding for mobile */
    gap: 15px; /* Smaller gaps between sections */
  }

  .sizes button {
    flex: 1 1 calc(50% - 5px); /* Stack 2 per row for mobile */
    max-width: 60px; /* Limit button width */
    font-size: 10px; /* Smaller font */
  }

  .apply,
  .clear {
    height: 35px; /* Shorter buttons */
    font-size: 12px; /* Smaller font */
  }
}
</style>
