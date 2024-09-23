<template>
    <div class="success-modal-overlay">
      <div class="success-modal-content">
        <h2>Successful!</h2>
        <button class="btn" @click="$emit('close')">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['close']);
  </script>
  
  <style lang="scss" scoped>
  .success-modal-overlay {
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
  
  .success-modal-content {
    background:var(--light);
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 100%;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  