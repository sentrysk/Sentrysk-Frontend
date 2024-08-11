<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="agentConfigTab" data-bs-toggle="tab" data-bs-target="#agentConfigDiv" type="button" role="tab" aria-controls="agentConfigDiv" aria-selected="true">
        <i class="fa-solid fa-gear"></i> Agent Config
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="agentConfigChangelogTab" data-bs-toggle="tab" data-bs-target="#agentConfigChangelogDiv" type="button" role="tab" aria-controls="agentConfigChangelogDiv" aria-selected="false">
        <i class="bi bi-file-diff"></i> Changelogs
      </button>
    </li>
  </ul>

  <div class="tab-content" id="agentConfigTabContent">
    <div class="tab-pane fade show active" id="agentConfigDiv" role="tabpanel" aria-labelledby="agentConfigTab">
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

      <div v-else class="config-page" >
        <div class="sidebar">
          <ul class="nav flex-column">
            <li class="nav-item" v-for="section in sections" :key="section.id">
              <a
                class="nav-link sidebar-link"
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
          <div v-if="activeSection === 'agentDetails'" class="config-details-content">
            <div class="form-group">
              <label>Agent ID</label>
              <input type="text" class="form-control" v-model="agentConfig.agent" disabled>
            </div>
            <div class="form-group">
              <label>Updated</label>
              <input type="text" class="form-control" :title="localUpdateTime" v-model="timeDiff" disabled>
            </div>
          </div>

          <div v-if="activeSection === 'apiInformation'" class="config-details-content">
            <div class="form-group">
              <label>Agent Token</label>
              <input type="text" class="form-control" v-model="agentConfig.api.agent_token" disabled>
            </div>
            <div class="form-group">
              <label>Base URL</label>
              <input type="text" class="form-control" v-model="agentConfig.api.base_url" disabled>
            </div>
          </div>

          <div v-if="activeSection === 'endpoints'" class="config-details-content">
            <ul class="list-unstyled">
              <li v-for="(value, key) in agentConfig.api.endpoints" :key="key">
                <label>{{ key }}</label>
                <input type="text" class="form-control" v-model="agentConfig.api.endpoints[key]" disabled>
              </li>
            </ul>
          </div>

          <div v-if="activeSection === 'directories'" class="config-details-content">
            <div class="form-group">
              <label>Home Directory</label>
              <input type="text" class="form-control" v-model="agentConfig.dirs.home_dir" disabled>
            </div>
            <div class="form-group">
              <label>Log File</label>
              <input type="text" class="form-control" v-model="agentConfig.dirs.logfile" disabled>
            </div>
          </div>

          <div v-if="activeSection === 'scheduledJobs'" class="config-details-content">
            <ul class="list-unstyled">
              <li v-for="(job, key) in agentConfig.scheduled_jobs" :key="key">
                <label>{{ key }}</label>
                <input type="text" class="form-control" :value="formatScheduledJob(job)" disabled>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
     <!-- Changelog Tab -->
     <div class="tab-pane fade" id="agentConfigChangelogDiv" role="tabpanel" aria-labelledby="agentConfigChangelogDiv">
        <!-- Use Bootstrap Cards to display the data -->
        <div class="row">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Field</th>
                <th scope="col">Previous Value</th>
                <th scope="col">New Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="change in changesArray" :key="change.id">
                <td>{{ change.id }}</td>
                <td>{{ change.timestamp }}</td>
                <td>{{ change.path }}</td>
                <td>{{ change.previous_value }}</td>
                <td>{{ change.new_value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
     </div>
  </div>
</template>

<script>
  import { getAgentConfigByAgentId, getAgentConfigChangelog } from '@/utils/requestUtils';
  import { formatToLocalTime, calculateDatetimeDifference } from '@/utils/timeUtils';
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
        changeLogData: null,
        changeLogCount: 0,
        changesArray: [],
        localUpdateTime: "",
        timeDiff: "",
        activeSection: 'agentDetails',
        sections: [
          { id: 'agentDetails', title: 'Agent Details', icon: 'fas fa-user' },
          { id: 'apiInformation', title: 'API Information', icon: 'fas fa-info-circle' },
          { id: 'endpoints', title: 'API Endpoints', icon: 'fa-solid fa-code' },
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
          // Get Agent Config Changelog
          this.changeLogData = await getAgentConfigChangelog(this.agentConfig._id);
          // Format Changelog Data
          this.changeLogData.forEach((changeObj) => {
            const id = changeObj.id;
            const timestamp = changeObj.timestamp;
            this.flattenChanges(changeObj.changes, "").forEach((change) => {
              this.changesArray.push({
                id: id,
                timestamp: formatToLocalTime(timestamp),
                path: change.path.split('.').map(part => `[${part}]`).join(''),
                previous_value: change.previous_value,
                new_value: change.new_value,
              });
            });
          });

          console.log(this.changeLogData);
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
      },
      formattedChanges() {
        const changesArray = [];

        this.changeLogData.forEach((changeObj) => {
          const id = changeObj.id;
          const timestamp = changeObj.timestamp;
          this.flattenChanges(changeObj.changes, "").forEach((change) => {
            changesArray.push({
              id: id,
              timestamp: timestamp,
              path: change.path,
              previous_value: change.previous_value,
              new_value: change.new_value,
            });
          });
        });

        return changesArray;
    },
    },
    methods: {
      setActiveSection(section) {
        this.activeSection = section;
      },
      formatScheduledJob(job) {
        return job?.interval ? `${job.interval} ${job.unit}` : job?.time || '';
      },
      flattenChanges(changes, currentPath) {
        let flattened = [];

        Object.keys(changes).forEach((key) => {
          const newPath = currentPath ? `${currentPath}.${key}` : key;

          if (
            changes[key] !== null &&
            typeof changes[key] === "object" &&
            "new_value" in changes[key] &&
            "previous_value" in changes[key]
          ) {
            flattened.push({
              path: newPath,
              previous_value: changes[key].previous_value,
              new_value: changes[key].new_value,
            });
          } else if (
            changes[key] !== null &&
            typeof changes[key] === "object"
          ) {
            flattened = flattened.concat(this.flattenChanges(changes[key], newPath));
          }
      });

      return flattened;
    },
    }
  };
</script>

<style>
.config-page {
  display: flex;
  height: 100vh;
  background-color: #ffffff;
}

.config-page .sidebar {
  width: 200px;
  margin-top: 2rem;
  height: 100%;
  overflow-y: auto;
  text-align: left;
}

.config-page .nav-link.sidebar-link{
  color: #b9c4cc;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.config-page .nav-link.sidebar-link i {
  margin-right: 10px;
}

.config-page .nav-link.sidebar-link.active {
  color: #0d6efd;
}

.config-page .content {
  margin-left: 140px;
  padding: 20px;
  width: 40%;
}

.config-page .config-details-content{
  text-align: left;
}

.config-page .config-details-content label{
  text-align: left;
  font-weight: 300;
}

.config-page .loading-content,
.config-page .error-content {
  text-align: center;
  margin-top: 2rem;
}

.config-page h2 {
  color: #2b2e4a;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.config-page p, .config-page input.form-control {
  font-size: 0.9rem;
  color: #51568a;
  margin-bottom: 1rem;
  max-width: 20rem;
}

.config-page .form-group {
  margin-bottom: 1rem;
}

.config-page label {
  font-weight: 600;
  color: #b9c4cc;
}

.config-page input.form-control {
  font-size: 0.9rem;
  padding: 0.4rem;
  text-align: left;
}

.config-page .list-unstyled {
  padding-left: 0;
  list-style: none;
}
</style>
