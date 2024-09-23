<template>
    <div v-if="show" class="dialog-overlay">
      <div class="dialog-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete?</p>
        
        <button @click="$emit('confirm')">Yes</button>
        <button @click="$emit('close')">No</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    show: Boolean
  });
  </script>
  
  <style lang="scss" scoped>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .dialog-content {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }
  
  button {
    margin: 0.5rem;
  }
  </style>
  