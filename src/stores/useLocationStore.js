import { defineStore } from "pinia";

export const useLocationStore = defineStore("locationStore", {
  state: () => ({
    locations: JSON.parse(localStorage.getItem("locations")) || [],
  }),
  actions: {
    addLocation(location) {
      this.locations.push(location);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("locations", JSON.stringify(this.locations));
    },
  },
});