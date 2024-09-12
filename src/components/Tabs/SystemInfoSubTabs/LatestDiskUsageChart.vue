<template>
  <!-- Container Block -->
  <div v-if="loading" class="chart-container col-sm-2">
    <h3 class="text-center">Disk</h3>
    <!-- Loading State -->
    <div class="loading-content">
      <i class="fas fa-spinner fa-spin fa-3x"></i>
      <h2>Loading...</h2>
    </div>
  </div>
  <!-- Loaded State -->
  <!-- If any error occurs -->
  <div v-if="error" class="chart-container col-sm-2">
    <div class="error-content">
      <i class="fas fa-exclamation-triangle fa-3x"></i>
      <h2>Error loading data.</h2>
    </div>
  </div>
  <!-- If any error not occurs -->
  <div v-else class="row">
    <div class="accordion" id="accordionDisksLatestUsage">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDisks" aria-expanded="true" aria-controls="collapseDisks">
            <i class="bi bi-hdd-stack"></i> Disks
          </button>
        </h2>
        <div id="collapseDisks" class="accordion-collapse collapse show" data-bs-parent="#accordionDisksLatestUsage">
          <div class="accordion-body">
            <div id="charts-container" class="row">
              <!-- Content Here -->
            </div>
          </div>
        </div>
      </div>
    </div>
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

            // Get Container Element
            const container = document.getElementById('charts-container');
            container.innerHTML = ''; // Remove previous elements in charts-container
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
                //const lastUpdateField = document.getElementById('lastUpdate-' + device);
                //lastUpdateField.textContent = calculateDatetimeDifference(diskData.timestamp)
                //lastUpdateField.title = formatToLocalTime(diskData.timestamp);

                // Create Header Element
                const header = document.createElement('h5');
                header.appendChild(document.createTextNode(diskData.device));

                // Create Canvas Element
                const canvas = document.createElement('canvas');
                // Create Chart
                const ctx = canvas.getContext('2d');
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

                // Create Last Update Span
                const lastUpdateSpan = document.createElement('span');
                lastUpdateSpan.title = formatToLocalTime(diskData.timestamp);
                lastUpdateSpan.textContent = "Last Update: " + calculateDatetimeDifference(diskData.timestamp);

                // Create Chart Div
                const chartDiv = document.createElement('div');
                chartDiv.classList.add('chart-container','col-sm-2');

                chartDiv.appendChild(header);
                chartDiv.appendChild(canvas);
                chartDiv.appendChild(lastUpdateSpan);

                // Get Container Element
                const container = document.getElementById('charts-container');
                
                // Apend Chart Div to Container Div
                container.appendChild(chartDiv);
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
    