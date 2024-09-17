<template>
  <!-- Container Block -->
  <div class="chart-container col-sm-2">
    <h3 class="text-center">CPU</h3>
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
      <canvas :id="'latestCpuUsageChart'"></canvas>
      <span :title="lastUpdate">Last Update: {{ timeDiffLastUpdate }} </span>
    </div>
  </div>
</template>
  
<script>
  import Chart from 'chart.js/auto';
  import { getLatestCpuUsageData } from '@/utils/requestUtils';
  import 'chartjs-adapter-date-fns';  // Import the date adapter
  import { formatToLocalTime, calculateDatetimeDifference } from '@/utils/timeUtils';
  
  export default {
    name: 'LatestCpuUsageChart',
    data() {
      return {
        loading: true,
        error: false,
        cpuUsageData: {},
        lastUpdate: null,
        timeDiffLastUpdate: null,
        intervalId: null, // Store the interval ID
        latestCpuChartInstance: null, // Store the chart instance
      };
    },
    mounted() {
      this.fetchLatestCpuUsageData();
      
      // Set up the interval to fetch data every 60 seconds
      this.intervalId = setInterval(() => {
        this.fetchLatestCpuUsageData();
      }, 60000); // 60 seconds
    },
    beforeUnmount() {
      // Clear the interval when the component is destroyed to avoid memory leaks
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      // Destroy the chart when the component is destroyed
      if (this.latestCpuChartInstance) {
        this.latestCpuChartInstance.destroy();
      }
    },
    methods: {
      async fetchLatestCpuUsageData() {
        try {
          // Get the ID from the URL
          const agentId = this.$route.params.id;
          this.cpuUsageData = await getLatestCpuUsageData(agentId);

          this.lastUpdate = this.cpuUsageData.timestamp;
          // Convert to Local Time
          this.lastUpdate = formatToLocalTime(this.lastUpdate);
          // Find the time difference
          this.timeDiffLastUpdate = calculateDatetimeDifference(this.lastUpdate);
          // Render
          this.renderCharts();
          
        } catch (error) {
          // Print error to console
          console.error('Error fetching Latest CPU usage data:', error);
          // Set error property true
          this.error = true;
        } finally {
          this.loading = false;
        }
      },
      renderCharts() {
          const cpuUsageData = this.cpuUsageData;
          const usedData = cpuUsageData.cpu_usage;
  
          const ctx = document.getElementById('latestCpuUsageChart').getContext('2d');

          // If a chart already exists, destroy it before creating a new one
          if (this.latestCpuChartInstance) {
            this.latestCpuChartInstance.destroy();
          }

          this.latestCpuChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: [
                'Used',
                'Free',
              ],
              datasets: [{
                label: 'CPU Usage',
                data: [usedData, 100-usedData],
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
  