<template>
    <div class="nothing-to-show-container">
      <div class="nothing-to-show-content">
        <h2>Nothing to Show</h2>
        <p>There is currently no data available to display.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NothingToShowComponent",
  };
  </script>
  
  <style scoped>
  .nothing-to-show-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #181a2a;
    color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #51568a;
  }
  
  .nothing-to-show-content {
    text-align: center;
  }
  
  .nothing-to-show-content h2 {
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }
  
  .nothing-to-show-content p {
    font-size: 1rem;
    color: #e6e6e6;
  }
  </style>
  