<template>
  <div>
    <div id="charts" class="container-fluid">
      <div class="row">
        <div v-for="(diskData, device) in disks" :key="device" class="chart-container col-md-4">
          <h3 class="text-center">{{ device }}</h3>
          <canvas :id="'chart-' + device"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { getDiskUsageData } from '@/utils/requestUtils';
import 'chartjs-adapter-date-fns';  // Import the date adapter

export default {
  name: 'DiskUsageChart',
  data() {
    return {
      disks: {},
    };
  },
  async created() {
    await this.fetchDiskUsageData();
    this.renderCharts();
  },
  methods: {
    async fetchDiskUsageData() {
      try {
        // Get the ID from the URL
        const agentId = this.$route.params.id;
        const response = await getDiskUsageData(agentId);
        this.processDiskUsageData(response);
      } catch (error) {
        console.error('Error fetching disk usage data:', error);
      }
    },
    processDiskUsageData(data) {
      data.forEach(record => {
        if (!this.disks[record.device]) {
          this.disks[record.device] = [];
        }
        this.disks[record.device].push(record);
      });
    },
    renderCharts() {
      Object.keys(this.disks).forEach(device => {
        const diskData = this.disks[device];
        const labels = diskData.map(record => new Date(record.timestamp));
        const usedData = diskData.map(record => this.parseSize(record.used_size));
        const totalData = diskData.map(record => this.parseSize(record.total_size));
        const maxSize = Math.max(...totalData);

        const ctx = document.getElementById('chart-' + device).getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Used Size (GB)',
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
                text: `Disk Usage Over Time for ${device}`,
              }
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
                title: {
                  display: true,
                  text: 'Date'
                },
              },
              y: {
                  title: {
                    display: true,
                    text: 'Size (GB)'
                  },
                  max: maxSize,  // Set the max value to the total disk space
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
