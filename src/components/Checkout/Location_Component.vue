<template>
  <div class="location" :class="{ expanded: showDropdown }">
    <div class="title">
      <p>Location for shipping</p>
    </div>
    <hr />
    <div class="add" @click="toggleDropdown">
      <span class="material-icons" v-if="!showDropdown"> add </span>
      <span
        class="material-icons"
        v-if="showDropdown"
        :class="{ rotated: showDropdown }"
      >
        keyboard_arrow_down
      </span>
      <p>Add new locations</p>
    </div>

    <transition name="dropdown">
      <div class="dropdown" v-show="showDropdown">
        <div class="inputName">
          <p>Full Name</p>
          <input type="text" v-model="newLocation.fullName" />
        </div>
        <div class="inputAddress">
          <p>Street Address</p>
          <input type="text" v-model="newLocation.streetAddress" />
        </div>
        <div class="inputFloor">
          <p>Apartment, floor, etc. (optional)</p>
          <input type="text" v-model="newLocation.apartment" />
        </div>
        <div class="inputCity">
          <p>Town/City</p>
          <input type="text" v-model="newLocation.city" />
        </div>
        <div class="inputNumberPhone">
          <p>Phone Number</p>
          <input type="text" v-model="newLocation.phoneNumber" />
        </div>
        <div class="buttonAdd">
          <Button_Component
            name-button="Add"
            color-button="#FFFFFF"
            background-color-button="#564949"
            height-button="40px"
            width-button="115px"
            @click="addLocation"
          />
        </div>
      </div>
    </transition>

    <div
      class="showLocation"
      v-for="(location, index) in locations"
      :key="index"
      @click="selectLocation(index)"
      :class="{ selected: location.selected }"
    >
      <div class="show">
        <span class="material-icons">home</span>
        <p>{{ formatAddress(location) }}</p>
      </div>
      <span class="material-icons">
        {{ location.selected ? "check_circle" : "radio_button_unchecked" }}
      </span>
    </div>
  </div>
</template>

<script>
import { useLocationStore } from "@/stores/useLocationStore";
import { computed, ref } from "vue";
import Button_Component from "../Button_Component.vue";

export default {
  name: "Location_Component",
  components: {
    Button_Component,
  },
  emits: ["update:location"],
  setup(_, { emit }) {
    const locationStore = useLocationStore();

    const showDropdown = ref(false);
    const newLocation = ref({
      fullName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      phoneNumber: "",
    });

    const locations = computed(() => locationStore.locations);

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const addLocation = () => {
      const { fullName, streetAddress, apartment, city, phoneNumber } =
        newLocation.value;

      if (!fullName || !streetAddress || !city || !phoneNumber) {
        alert("Please fill in all required fields.");
        return;
      }

      locationStore.addLocation({
        fullName,
        streetAddress,
        apartment: apartment || "",
        city,
        phoneNumber,
        selected: false,
      });

      newLocation.value = {
        fullName: "",
        streetAddress: "",
        apartment: "",
        city: "",
        phoneNumber: "",
      };

      showDropdown.value = false;
    };

    const formatAddress = (location) => {
      const { streetAddress, apartment, city } = location;
      return `${streetAddress}${apartment ? `, ${apartment}` : ""}, ${city}`;
    };

    const selectLocation = (index) => {
      locations.value.forEach((location, i) => {
        location.selected = i === index;
      });

      const selectedLocation = locations.value[index];
      locationStore.selectedLocation = selectedLocation;

      emit("update:location", selectedLocation); // Emit to parent
    };

    return {
      showDropdown,
      newLocation,
      locations,
      toggleDropdown,
      addLocation,
      formatAddress,
      selectLocation,
    };
  },
};
</script>

<style scoped>
.location {
  width: 100%;
  max-width: 666px;
  height: auto;
  padding: 3%;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #8f7979;
  border-radius: 5px;
}
.title p {
  color: #000000;
  font-size: 20px;
  font-family: Quicksand, sans-serif;
  font-weight: bold;
}
hr {
  margin: 2% 0;
}
.location.expanded {
  border-color: #564949;
  transition: all 0.3s ease;
}
.material-icons.rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
.add {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.add span {
  color: #7b7373;
  font-size: 20px;
  transition: color 0.3s ease;
}
.add p {
  font-size: 14px;
  font-family: Quicksand, sans-serif;
  color: #7b7373;
}
.dropdown {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}
.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 500px;
  opacity: 1;
}
.inputName,
.inputAddress,
.inputFloor,
.inputCity,
.inputNumberPhone {
  width: 80%;
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 2%;
}
.inputName p,
.inputAddress p,
.inputFloor p,
.inputCity p,
.inputNumberPhone p {
  color: #7b7373;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
}
.inputName input,
.inputAddress input,
.inputFloor input,
.inputCity input,
.inputNumberPhone input {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 3%;
  box-sizing: border-box;
  background-color: #e9e7e7;
  font-family: Quicksand, sans-serif;
}
.buttonAdd {
  margin-top: 15px;
  text-align: center;
}
.showLocation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 5px;
  cursor: pointer;
}
.show {
  display: flex;
  align-items: center;
  gap: 10px;
}
.show p {
  font-size: 16px;
  color: #000000;
  font-weight: 500;
  font-family: Quicksand, sans-serif;
}
.selected {
  background-color: none;
}

@media (max-width: 768px) {
  .location {
    padding: 2%;
    border-width: 1px;
  }

  .add span,
  .add p {
    font-size: 12px;
  }

  input {
    height: 35px;
    padding: 5px;
    font-size: 14px;
  }

  .buttonAdd button {
    height: 35px;
    font-size: 12px;
    width: 100px;
  }

  .showLocation {
    flex-direction: column;
    align-items: flex-start;
  }

  .show {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .location {
    padding: 1%;
  }

  .add span,
  .add p {
    font-size: 10px;
  }

  input {
    height: 30px;
    font-size: 12px;
  }

  .buttonAdd button {
    height: 30px;
    font-size: 10px;
    width: 80px;
  }
}
</style>
