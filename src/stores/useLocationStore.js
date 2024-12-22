import { defineStore } from "pinia";

export const useLocationStore = defineStore("locationStore", {
  state: () => ({
    locations: JSON.parse(localStorage.getItem("locations")) || [],
    selectedLocation: null,
  }),
  actions: {
    addLocation(location) {
      this.locations.push(location);
      this.saveToLocalStorage();
    },
    setSelectedLocation(location) {
      this.selectedLocation = location;
    },
    saveToLocalStorage() {
      localStorage.setItem("locations", JSON.stringify(this.locations));
    },
  },
});
