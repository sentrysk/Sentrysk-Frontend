<template>
    <div>
      <div id="charts" class="container-fluid">
        <div class="row">
          <div class="chart-container col-md-4">
            <h3 class="text-center">Latest CPU Usage</h3>
            <canvas :id="'latestCpuUsageChart'"></canvas>
            <span :title="lastUpdate">Last Update: {{ timeDiff }} </span>
          </div>
        </div>
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
        cpuUsageData: {},
        lastUpdate: null,
        timeDiffLastUpdate: null,
      };
    },
    async created() {
      await this.fetchLatestCpuUsageData();
      this.renderCharts();
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
          this.timeDiff =  calculateDatetimeDifference(this.lastUpdate);
        } catch (error) {
          console.error('Error fetching Latest CPU usage data:', error);
        }
      },
      renderCharts() {
          const cpuUsageData = this.cpuUsageData;
          const usedData = cpuUsageData.cpu_usage;
  
          const ctx = document.getElementById('latestCpuUsageChart').getContext('2d');
          new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: [
                'Usage',
                'Free',
              ],
              datasets: [{
                label: 'Latest CPU Usage',
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
  