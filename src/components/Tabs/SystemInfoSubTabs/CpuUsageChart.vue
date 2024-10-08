<template>
    <div>
      <div id="charts" class="container-fluid">
        <div class="row">
          <div class="chart-container col-md-4">
            <h3 class="text-center">CPU Usage Chart</h3>
            
            <!-- Loading -->
            <div v-if="cpuUsageLoading">
              <div class="loading-content">
                <i class="fas fa-spinner fa-spin fa-3x"></i>
                <h2>Loading...</h2>
              </div>
            </div>

            <div v-else-if="cpuUsageError">
              <div class="error-content">
                <i class="fas fa-exclamation-triangle fa-3x"></i>
                <h2>Error loading data. Please try again later.</h2>
              </div>
            </div>
            
            <div v-else>
              <canvas :id="'cpuUsageChart'"></canvas>
            </div>
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
        cpuUsageLoading: true,
        cpuUsageError: false,
        cpuUsageData: null,
      };
    },
    async created() {
      await this.fetchCpuUsageData();
      if(this.cpuUsageData != null){
        this.renderCharts();
      }
    },
    methods: {
      async fetchCpuUsageData() {
        try {
          // Get the ID from the URL
          const agentId = this.$route.params.id;
          this.cpuUsageData = await getCpuUsageData(agentId);
        } 
        catch (error) {
          // Print error to console
          console.error('Error fetching CPU usage data:', error);
          // Set error property true
          this.cpuUsageError = true;
        }  
        finally {
          this.cpuUsageLoading = false;
        }
      },
      renderCharts() {
          if(this.cpuUsageData == null){ return }
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
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
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
  