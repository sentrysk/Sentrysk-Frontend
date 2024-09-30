<template>
  <!-- Container Block -->
  <div class="chart-container col-sm-2">
    <h3 class="text-center">Memory</h3>
    <!-- Loading State -->
    <div v-if="loading" class="loading-content">
      <i class="fas fa-spinner fa-spin fa-3x"></i>
      <h2>Loading...</h2>
    </div>
    <!-- Loaded State -->
    <!-- If any error occurs -->
    <div v-if="error" class="error-content">
      <i class="fas fa-exclamation-triangle fa-3x"></i>
      <h2>Error loading data.</h2>
    </div>
    <!-- If any error not occurs -->
    <div v-else>
      <canvas :id="'latestMemoryUsageChart'"></canvas>
      <span :title="lastUpdate">Last Update: {{ timeDiffLastUpdate }} </span>
    </div>
  </div>
</template>
  
  <script>
  import Chart from 'chart.js/auto';
  import { getLatestMemoryUsageData } from '@/utils/requestUtils';
  import 'chartjs-adapter-date-fns';  // Import the date adapter
  import { formatToLocalTime, calculateDatetimeDifference } from '@/utils/timeUtils';
  
  export default {
    name: 'LatestMemoryUsageChart',
    data() {
      return {
        loading: true,
        error: false,
        memoryUsageData: {},
        latestMemUsageLastUpdate: null,
        latestMemUsageLastUpdateTimeDiff: null,
        latestMemUsageIntervalId: null, // Store the interval ID
        latestMemoryChartInstance: null, // Store the chart instance
      };
    },
    mounted() {
      this.fetchLatestMemoryUsageData();

      // Set up the interval to fetch data every 60 seconds
      this.latestMemUsageIntervalId = setInterval(() => {
        this.fetchLatestMemoryUsageData();
      }, 60000); // 60 seconds
    },
    beforeUnmount() {
      // Clear the interval when the component is destroyed to avoid memory leaks
      if (this.latestMemUsageIntervalId) {
        clearInterval(this.latestMemUsageIntervalId);
      }
      // Destroy the chart when the component is destroyed
      if (this.latestMemoryChartInstance) {
        this.latestMemoryChartInstance.destroy();
      }
    },
    methods: {
      async fetchLatestMemoryUsageData() {
        try {
          // Get the ID from the URL
          const agentId = this.$route.params.id;
          this.memoryUsageData = await getLatestMemoryUsageData(agentId);

          this.latestMemUsageLastUpdate = this.memoryUsageData.timestamp;
          // Convert to Local Time
          this.latestMemUsageLastUpdate = formatToLocalTime(this.latestMemUsageLastUpdate);
          // Find the time difference
          this.timeDiffLastUpdate = calculateDatetimeDifference(this.latestMemUsageLastUpdate);
          // Render
          this.renderCharts();
        } catch (error) {
          // Print error to console
          console.error('Error fetching Latest Memory usage data:', error);
          // Set error property true
          this.error = true;
        } finally {
          this.loading = false;
        }
      },
      renderCharts() {
          const memoryUsageData = this.memoryUsageData;
          const usedSize = memoryUsageData.percent;
  
          const ctx = document.getElementById('latestMemoryUsageChart').getContext('2d');

          // If a chart already exists, destroy it before creating a new one
          if (this.latestMemoryChartInstance) {
            this.latestMemoryChartInstance.destroy();
          }
          
          this.latestMemoryChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: [
                'Usage',
                'Free',
              ],
              datasets: [{
                label: 'Latest Memory Usage',
                data: [usedSize, 100-usedSize],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)'
                ],
                hoverOffset: 4
              }]
            },
          });
      }
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .chart-title {
    text-align: center;
    margin-bottom: 10px;
  }
  canvas {
    max-width: 100%;
    height: auto;
  }
  </style>
  