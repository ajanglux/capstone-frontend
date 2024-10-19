// stores/useRepairFormStore.js
import { defineStore } from 'pinia';

export const useRepairFormStore = defineStore('repairForm', {
  state: () => ({
    isFormValid: false,
  }),
  actions: {
    setFormValidity(isValid) {
      this.isFormValid = isValid;
    },
  },
});
