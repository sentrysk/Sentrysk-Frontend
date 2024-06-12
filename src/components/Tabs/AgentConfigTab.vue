<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="agentConfigTab" data-bs-toggle="tab" data-bs-target="#agentConfigDiv" type="button" role="tab" aria-controls="agentConfigDiv" aria-selected="true">
        <i class="fa-solid fa-gear"></i> Agent Config
      </button>
    </li>
  </ul>

  <!-- Last Update -->
  <div class="row">
    <span :title="localUpdateTime">Last Update : {{ timeDiff }}</span>
  </div>

  <div class="tab-content" id="agentConfigTabContent">
    <div class="tab-pane fade show active" id="agentConfigDiv" role="tabpanel" aria-labelledby="agentConfigTab">
      <div class="container mt-5">
        <div v-if="loading">
          <h2>Loading...</h2>
        </div>

        <div v-else-if="error">
          <h2>Error loading data. Please try again later.</h2>
        </div>

        <div v-else-if="!hasData">
          <NothingToShowComponent />
        </div>

        <div v-else>
          <div class="row">
            <div class="col-md-6 mb-3">
              <div class="card">
                <div class="card-header section-title">Agent Details</div>
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label"><strong>Agent ID:</strong></label>
                    <input type="text" class="form-control" v-model="agentConfig.agent" disabled>
                  </div>
                  <div class="mb-3">
                    <label class="form-label"><strong>Updated:</strong></label>
                    <input type="text" class="form-control" v-model="agentConfig.updated" disabled>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <div class="card">
                <div class="card-header section-title">API Information</div>
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label"><strong>Agent Token:</strong></label>
                    <input type="text" class="form-control" v-model="agentConfig.api.agent_token" disabled>
                  </div>
                  <div class="mb-3">
                    <label class="form-label"><strong>Base URL:</strong></label>
                    <input type="text" class="form-control" v-model="agentConfig.api.base_url" disabled>
                  </div>
                  <h5 class="mt-3">Endpoints</h5>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(value, key) in agentConfig.api.endpoints" :key="key">
                      <label class="form-label"><strong>{{ key }}:</strong></label>
                      <input type="text" class="form-control" v-model="agentConfig.api.endpoints[key]" disabled>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <div class="card">
                <div class="card-header section-title">Directories</div>
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label"><strong>Home Directory:</strong></label>
                    <input type="text" class="form-control" v-model="agentConfig.dirs.home_dir" disabled>
                  </div>
                  <div class="mb-3">
                    <label class="form-label"><strong>Log File:</strong></label>
                    <input type="text" class="form-control" v-model="agentConfig.dirs.logfile" disabled>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <div class="card">
                <div class="card-header section-title">Scheduled Jobs</div>
                <div class="card-body">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(job, key) in agentConfig.scheduled_jobs" :key="key">
                      <label class="form-label"><strong>{{ key }}:</strong></label>
                      <input type="text" class="form-control" :value="formatScheduledJob(job)" disabled>
                    </li>
                  </ul>
                </div>
              </div>
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
      formatScheduledJob(job) {
        return job?.interval ? `${job.interval} ${job.unit}` : job?.time || '';
      }
    }
  };
</script>

<style>
  .list-group-item {
    border: none;
    padding-left: 0;
  }
  .form-control[disabled] {
    background-color: #f8f9fa;
    opacity: 1;
  }
  .section-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .card-body {
    padding: 1rem;
  }
</style>
