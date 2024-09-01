<template>
  <div v-if="loading" class="chart-container col-sm-2">
    <!-- Loading -->
    <h3 class="text-center">Disk</h3>
    <div class="loading-content">
      <i class="fas fa-spinner fa-spin fa-3x"></i>
      <h2>Loading...</h2>
    </div>
  </div>
  <div v-else-if="error" class="chart-container col-sm-2">
    <!-- Error -->
    <h3 class="text-center">Disk</h3>
    <div class="error-content">
      <i class="fas fa-exclamation-triangle fa-3x"></i>
      <h2>Error loading data.</h2>
    </div>
  </div>
  <div v-else v-for="(diskData, device) in disks" :key="device" class="chart-container col-sm-2">
     <!-- Working Charts -->
    <h3 class="text-center">{{ diskData.device }}</h3>
    <canvas :id="'chart-' + device"></canvas>
    <span :id="'lastUpdate-' + device"></span>
  </div>
  </template>
    
    <script>
    import Chart from 'chart.js/auto';
    import { getLatestDiskUsageData } from '@/utils/requestUtils';
    import 'chartjs-adapter-date-fns';  // Import the date adapter
    import { formatToLocalTime, calculateDatetimeDifference } from '@/utils/timeUtils';
    
    export default {
      name: 'LatestDiskUsageChart',
      data() {
        return {
          loading: true,
          error: false,
          disks: {}
        };
      },
      async created() {
        await this.fetchLatestDiskUsageData();
      },
      methods: {
        async fetchLatestDiskUsageData() {
          try {
            // Get the ID from the URL
            const agentId = this.$route.params.id;
            this.disks = await getLatestDiskUsageData(agentId);
            // Render
            this.renderCharts();
  
          } catch (error) {
            // Print error to console
            console.error('Error fetching Latest Disk usage data:', error);
            // Set error property true
            this.error = true;
          } finally {
            this.loading = false;
          }
        },
        renderCharts() {
            Object.keys(this.disks).forEach(device => {
                const diskData = this.disks[device];
                const usagePercent = diskData.percent;
                const lastUpdateField = document.getElementById('lastUpdate-' + device);
                lastUpdateField.textContent = calculateDatetimeDifference(diskData.timestamp)
                lastUpdateField.title = formatToLocalTime(diskData.timestamp);
                
                const ctx = document.getElementById('chart-' + device).getContext('2d');
                new Chart(ctx, {
                type: 'doughnut',
                    data: {
                        labels: [
                            'Used',
                            'Free',
                        ],
                        datasets: [{
                            label: 'Disk Usage',
                            data: [usagePercent, 100-usagePercent],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)'
                            ],
                            hoverOffset: 4
                        }]
                    },
                });
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
    