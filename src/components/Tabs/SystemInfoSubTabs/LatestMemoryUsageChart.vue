<template>
    <div>
      <div id="charts" class="container-fluid">
        <div class="row">
          <div class="chart-container col-md-4">
            <h3 class="text-center">Latest Memory Usage</h3>
            <canvas :id="'latestMemoryUsageChart'"></canvas>
            <span :title="lastUpdate">Last Update: {{ timeDiffLastUpdate }} </span>
          </div>
        </div>
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
        memoryUsageData: {},
        lastUpdate: null,
        timeDiffLastUpdate: null,
      };
    },
    async created() {
      await this.fetchLatestMemoryUsageData();
      this.renderCharts();
    },
    methods: {
      async fetchLatestMemoryUsageData() {
        try {
          // Get the ID from the URL
          const agentId = this.$route.params.id;
          this.memoryUsageData = await getLatestMemoryUsageData(agentId);
          this.lastUpdate = this.memoryUsageData.timestamp;

          // Convert to Local Time
          this.lastUpdate = formatToLocalTime(this.lastUpdate);
          // Find the time difference
          this.timeDiffLastUpdate = calculateDatetimeDifference(this.lastUpdate);
        } catch (error) {
          console.error('Error fetching Latest Memory usage data:', error);
        }
      },
      renderCharts() {
          const memoryUsageData = this.memoryUsageData;
          const usedSize = memoryUsageData.percent;
  
          const ctx = document.getElementById('latestMemoryUsageChart').getContext('2d');
          new Chart(ctx, {
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
  