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