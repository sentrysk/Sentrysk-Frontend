<template>
  <div class="nothing-to-show-container">
    <div class="nothing-to-show-content">
      <div class="nothing-to-show-icon">
        <i class="bi bi-rocket-takeoff-fill"></i>
      </div>
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
  background-color: #ffffff;
  color: #2b2e4a;
  padding: 20px;
  border-radius: 8px;
}

.nothing-to-show-content {
  text-align: center;
}

.nothing-to-show-icon {
  margin-bottom: 1rem;
  color: #51568a;
  font-size: 36px;
}

.nothing-to-show-content h2 {
  font-size: 2rem;
  color: #2b2e4a;
  margin-bottom: 0.5rem;
}

.nothing-to-show-content p {
  font-size: 1rem;
  color: #51568a;
  margin-bottom: 1rem;
}
</style>
