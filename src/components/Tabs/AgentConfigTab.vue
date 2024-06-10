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
      <span :title=localUpdateTime>Last Update : {{ timeDiff }}</span>
    </div>

    <div class="tab-content" id="agentConfigTabContent">
        <div class="tab-pane fade show active" id="agentConfigDiv" role="tabpanel" aria-labelledby="agentConfigTab">
          <div class="container mt-5" v-if="Object.keys(agentConfig).length">
          <h1 class="mb-4">Agent Information</h1>
          <div class="card mb-3">
            <div class="card-header">Agent Details</div>
            <div class="card-body">
              <p><strong>Agent ID:</strong> {{ agentConfig.agent }}</p>
              <p><strong>Updated:</strong> {{ agentConfig.updated }}</p>
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-header">API Information</div>
            <div class="card-body">
              <p><strong>Agent Token:</strong> {{ agentConfig.api.agent_token }}</p>
              <p><strong>Base URL:</strong> {{ agentConfig.api.base_url }}</p>
              <h5 class="mt-3">Endpoints</h5>
              <ul>
                <li v-for="(value, key) in agentConfig.api.endpoints" :key="key">
                  <strong>{{ key }}:</strong> {{ value }}
                </li>
              </ul>
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-header">Directories</div>
            <div class="card-body">
              <p><strong>Home Directory:</strong> {{ agentConfig.dirs.home_dir }}</p>
              <p><strong>Log File:</strong> {{ agentConfig.dirs.logfile }}</p>
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-header">Scheduled Jobs</div>
            <div class="card-body">
              <ul>
                <li v-for="(job, key) in agentConfig.scheduled_jobs" :key="key">
                  <strong>{{ key }}:</strong> {{ job.interval ? job.interval + ' ' + job.unit : job.time }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="container mt-5">
          <h2>Loading...</h2>
        </div>
            <table class="table table-striped table-bordered table-sm table-hover nowrap"  id="agentConfigTable">

            </table>
        </div>
    </div>


</template>


<script>
    import $ from "jquery";
    import { formatToLocalTime, calculateDatetimeDifference } from '../../utils/timeUtils';
    import { getAgentConfigByAgentId } from '../../utils/requestUtils'

    
    export default {
      name: 'agentConfigTab',
      data() {
        return {
          agentConfig: {},
          isInstalled: false,
          changeLogData: [],
          changeLogCount: 0,
          localUpdateTime: "",
          timeDiff: "",
        };
      },
      mounted() {
        this.fillAgentConfig();
      },
      methods: {
        async fillAgentConfig() {
          try {
            // Get the ID from the URL
            const agentId = this.$route.params.id;

            // Retrieve Npm Packages
            this.agentConfig =  await getAgentConfigByAgentId(agentId);
            console.log(this.agentConfig);
            // Set Local Update Time and Time Diff
            this.localUpdateTime = formatToLocalTime(this.agentConfig.updated);
            this.timeDiff =  calculateDatetimeDifference(this.agentConfig.updated);


          } catch (error) {
            // Print error to console
            console.error(error);
          }
        },
      },
    };
</script>

<style>
.sysAppsActionIcons{
  font-size: 2em;
  max-width: 4rem;
}
</style>