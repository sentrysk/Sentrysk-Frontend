<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="agentConfigTab" data-bs-toggle="tab" data-bs-target="#agentConfigDiv" type="button" role="tab" aria-controls="agentConfigDiv" aria-selected="true">
        <i class="fa-solid fa-gear"></i> Agent Config
      </button>
    </li>
  </ul>

  <div class="tab-content" id="agentConfigTabContent">
    <div class="tab-pane fade show active" id="agentConfigDiv" role="tabpanel" aria-labelledby="agentConfigTab">
      <div class="config-page">
        <div class="sidebar">
          <ul class="nav flex-column">
            <li class="nav-item" v-for="section in sections" :key="section.id">
              <a
                class="nav-link"
                :class="{ active: activeSection === section.id }"
                @click="setActiveSection(section.id)"
                href="#"
              >
                <i :class="section.icon"></i> {{ section.title }}
              </a>
            </li>
          </ul>
        </div>

        <div class="content">
          <div v-if="loading">
            <div class="loading-content">
              <i class="fas fa-spinner fa-spin fa-3x"></i>
              <h2>Loading...</h2>
            </div>
          </div>

          <div v-else-if="error">
            <div class="error-content">
              <i class="fas fa-exclamation-triangle fa-3x"></i>
              <h2>Error loading data. Please try again later.</h2>
            </div>
          </div>

          <div v-else-if="!hasData">
            <NothingToShowComponent />
          </div>

          <div v-else>
            <div v-if="activeSection === 'agentDetails'">
              <h2>Agent Details</h2>
              <div>
                <label><strong>Agent ID:</strong></label>
                <p>{{ agentConfig.agent }}</p>
              </div>
              <div>
                <label><strong>Updated:</strong></label>
                <p>{{ agentConfig.updated }}</p>
              </div>
            </div>

            <div v-if="activeSection === 'apiInformation'">
              <h2>API Information</h2>
              <div>
                <label><strong>Agent Token:</strong></label>
                <p>{{ agentConfig.api.agent_token }}</p>
              </div>
              <div>
                <label><strong>Base URL:</strong></label>
                <p>{{ agentConfig.api.base_url }}</p>
              </div>
              <h5>Endpoints</h5>
              <ul>
                <li v-for="(value, key) in agentConfig.api.endpoints" :key="key">
                  <label><strong>{{ key }}:</strong></label>
                  <p>{{ value }}</p>
                </li>
              </ul>
            </div>

            <div v-if="activeSection === 'directories'">
              <h2>Directories</h2>
              <div>
                <label><strong>Home Directory:</strong></label>
                <p>{{ agentConfig.dirs.home_dir }}</p>
              </div>
              <div>
                <label><strong>Log File:</strong></label>
                <p>{{ agentConfig.dirs.logfile }}</p>
              </div>
            </div>

            <div v-if="activeSection === 'scheduledJobs'">
              <h2>Scheduled Jobs</h2>
              <ul>
                <li v-for="(job, key) in agentConfig.scheduled_jobs" :key="key">
                  <label><strong>{{ key }}:</strong></label>
                  <p>{{ formatScheduledJob(job) }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getAgentConfigByAgentId } from '../../utils/requestUtils';
  import { formatToLocalTime, calculateDatetimeDifference } from '../../utils/timeUtils';
  import NothingToShowComponent from '@/components/NothingToShowComponent';

  export default {
    name: 'agentConfigTab',
    components: {
      NothingToShowComponent,  // Register the component
    },
    data() {
      return {
        agentConfig: null,
        loading: true,
        error: false,
        localUpdateTime: "",
        timeDiff: "",
        activeSection: 'agentDetails',
        sections: [
          { id: 'agentDetails', title: 'Agent Details', icon: 'fas fa-user' },
          { id: 'apiInformation', title: 'API Information', icon: 'fas fa-info-circle' },
          { id: 'directories', title: 'Directories', icon: 'fas fa-folder' },
          { id: 'scheduledJobs', title: 'Scheduled Jobs', icon: 'fas fa-clock' },
        ],
      };
    },
    async created() {
      try {
        // Get the ID from the URL
        const agentId = this.$route.params.id;
        // Retrieve Agent Config
        const response = await getAgentConfigByAgentId(agentId);
        if (response) {
          this.agentConfig = response;
          this.localUpdateTime = formatToLocalTime(this.agentConfig.updated);
          this.timeDiff = calculateDatetimeDifference(this.agentConfig.updated);
        }
      } catch (error) {
        // Set error property true
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    computed: {
      hasData() {
        return this.agentConfig && Object.keys(this.agentConfig).length > 0;
      }
    },
    methods: {
      setActiveSection(section) {
        this.activeSection = section;
      },
      formatScheduledJob(job) {
        return job?.interval ? `${job.interval} ${job.unit}` : job?.time || '';
      }
    }
  };
</script>

<style>
.config-page {
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  width: 250px;
  background-color: #2b2e4a;
  padding: 20px;
  border-right: 1px solid #e6e6e6;
  position: fixed;
  height: 100%;
  overflow-y: auto;
}

.nav-link {
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
}

.nav-link.active {
  background-color: #3e426a;
  color: #ffffff;
}

.nav-link i {
  margin-right: 10px;
}

.content {
  margin-left: 250px;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
  background-color: #ffffff;
}

.loading-content,
.error-content {
  text-align: center;
  margin-top: 2rem;
}

h2 {
  color: #2b2e4a;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  color: #51568a;
  margin-bottom: 1rem;
}
</style>
