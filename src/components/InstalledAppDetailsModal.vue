<template>
    <!-- Modal -->
    <div class="modal fade" id="installedAppDetailsModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="installedAppDetailsModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="installedAppDetailsModalLabel">{{ appName }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-sm table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Version</th>
                                <th>Agents</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(agents, version) in versions" :key="version">
                                <td>{{ version }}</td>
                                <td>
                                    <tr v-for="agent in agents">
                                        <a href="#" @click.prevent="goToDetails(agent)" data-bs-dismiss="modal">{{ agent }}</a>
                                    </tr>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

  <script>
  export default {
    name: 'InstalledAppDetailsModal',
    props: ['appName', 'versions'],
    methods: {
      goToDetails(id) {
        // Navigate to the dynamic route /agents/:id
        this.$router.push({ name: 'agentData', params: { id: id } });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles for modal */
  </style>
  