<template>
    <div v-for="(diskData, device) in disks" :key="device" class="chart-container col-sm-2">
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
          disks: {}
        };
      },
      async created() {
        await this.fetchLatestDiskUsageData();
        this.renderCharts();
      },
      methods: {
        async fetchLatestDiskUsageData() {
          try {
            // Get the ID from the URL
            const agentId = this.$route.params.id;
            this.disks = await getLatestDiskUsageData(agentId);
  
          } catch (error) {
            console.error('Error fetching Latest Disk usage data:', error);
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
    