<template>
    <div>
      <div id="charts" class="container-fluid">
        <div class="row">
          <div class="chart-container col-md-4">
            <h3 class="text-center">CPU Usage Chart</h3>
            <canvas :id="'cpuUsageChart'"></canvas>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  import { getCpuUsageData } from '@/utils/requestUtils';
  import 'chartjs-adapter-date-fns';  // Import the date adapter
  
  export default {
    name: 'CpuUsageChart',
    data() {
      return {
        cpuUsageData: {},
      };
    },
    async created() {
      await this.fetchCpuUsageData();
      this.renderCharts();
    },
    methods: {
      async fetchCpuUsageData() {
        try {
          // Get the ID from the URL
          const agentId = this.$route.params.id;
          this.cpuUsageData = await getCpuUsageData(agentId);
        } catch (error) {
          console.error('Error fetching CPU usage data:', error);
        }
      },
      renderCharts() {
          const cpuUsageData = this.cpuUsageData;
          const labels = cpuUsageData.map(record => new Date(record.timestamp));
          const usedData = cpuUsageData.map(record => record.cpu_usage);
  
          const ctx = document.getElementById('cpuUsageChart').getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Used Percentage(%)',
                  data: usedData,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  fill: 'start',
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'CPU Usage Over Time',
                }
              },
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'hour',
                  },
                  title: {
                    display: true,
                    text: 'Hour'
                  },
                },
                y: {
                    title: {
                      display: true,
                      text: 'Percent(%)'
                    },
                    max: 100,
                    beginAtZero: true
                },
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    const label = data.datasets[tooltipItem.datasetIndex].label || '';
                    return `${label}: ${tooltipItem.yLabel.toFixed(2)} GB`;
                  },
                },
              },
            },
          });
      },
      parseSize(sizeStr) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        const unit = sizeStr.match(/[a-zA-Z]+/)[0];
        const value = parseFloat(sizeStr.match(/[0-9.]+/)[0]);
        const index = units.indexOf(unit);
        return value * Math.pow(1024, index) / (1024 * 1024 * 1024); // Convert to GB
      },
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
  