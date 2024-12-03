<template>
  <div class="location" :class="{ expanded: showDropdown }">
    <div class="title">
      <p>Location for shipping</p>
    </div>
    <hr />
    <div class="add" @click="toggleDropdown">
      <!-- When Click add show icon dropdown -->
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

    <!-- Click add new location dropdown -->
    <transition name="dropdown">
      <div class="dropdown" v-show="showDropdown">
        <div class="inputName">
          <p>Full Name</p>
          <input type="text" placeholder="" v-model="newLocation.fullName" />
        </div>
        <div class="inputAddress">
          <p>Street Address</p>
          <input
            type="text"
            placeholder=""
            v-model="newLocation.streetAddress"
          />
        </div>
        <div class="inputFloor">
          <p>Apartment, floor, etc. (optional)</p>
          <input type="text" placeholder="" v-model="newLocation.apartment" />
        </div>
        <div class="inputCity">
          <p>Town/City</p>
          <input type="text" placeholder="" v-model="newLocation.city" />
        </div>
        <div class="inputNumberPhone">
          <p>Phone Number</p>
          <input type="text" placeholder="" v-model="newLocation.phoneNumber" />
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

    <!-- Show all saved locations -->
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
        {{
          location.selected ? "check_circle" : "radio_button_unchecked"
        }}</span>
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
  setup() {
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
        selected: false, // Initialize the new location as not selected
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
      // Toggle the `selected` state of the location
      locations.value[index].selected = !locations.value[index].selected;
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
  width: 666px;
  padding: 3%;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #8f7979;
  border-radius: 5px;
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
  color: #7b7373;
}
.dropdown {
  overflow: hidden;
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
  max-height: 500px; /* Adjust to fit the content */
  opacity: 1;
}
.inputName,
.inputAddress,
.inputFloor,
.inputCity,
.inputNumberPhone {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
input {
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
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
.selected {
  background-color: none;
}
</style>
