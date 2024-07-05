<template>
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="agentHomeTab" data-bs-toggle="tab" data-bs-target="#agentHomeDiv" type="button" role="tab" aria-controls="agentHomeDiv" aria-selected="true">
                <i class="fa-solid fa-house"></i> Home
            </button>
        </li>
    </ul>

    <div class="tab-content" id="agentHomeTabContent">
        <div class="tab-pane fade show active" id="agentHomeDiv" role="tabpanel" aria-labelledby="agentHomeTab">
            <!-- Agent Information Table -->
            <table class="table table-striped table-bordered dt-responsive nowrap" id="agentDataTable">
          <thead>
            <tr>
              <th>Type</th>
              <th>Token</th>
              <th>Created</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span v-if="agentData.type === 'windows'" title="Windows">
                  <i class="bi bi-windows"></i>
                </span>
                <span v-else-if="agentData.type === 'linux'" title="Linux">
                  <i class="fab fa-linux"></i>
                </span>
                <span v-else-if="agentData.type === 'macos'" title="macOS">
                  <i class="bi bi-apple"></i>
                </span>
              </td>
              <td>
                {{ agentData.token }}
              </td>
              <td>
                {{ agentData.created }}
              </td>
              <td>
                {{ agentData.created_by }}
              </td>
            </tr>
          </tbody>
        </table>
        </div>
    </div>


</template>


<script>
    import { getAgentDataById } from '@/utils/requestUtils'
    
    export default {
      name: 'agentHomeTab',
      data() {
        return {
          agentData: null,
        };
      },
      mounted() {
        this.fillAgentHome();
      },
      methods: {
        async fillAgentHome() {
          try {
            // Get the ID from the URL
            const agentId = this.$route.params.id;

            // Retrieve Npm Packages
            this.agentData = await getAgentDataById(agentId);

          } catch (error) {
            // Print error to console
            console.error(error);
          }
        },
      },
    };
</script>

<style>
  /* Add your custom styles here */
  .table {
    margin-top: 20px;
  }
  
  .table thead th {
    background-color: #007bff; /* Blue header background color */
    color: white;
  }
  
  .table tbody tr:nth-child(odd) {
    background-color: #f2f2f2; /* Alternate row background color */
  }
  
  .table tbody tr:hover {
    background-color: #dcdcdc; /* Hover row background color */
  }
  
  .table td,
  .table th {
    vertical-align: middle;
  }
</style>
