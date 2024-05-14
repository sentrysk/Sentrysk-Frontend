<template>
    <!-- Modal -->
    <div class="modal fade" id="pipPackageDetailsModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="pipPackageDetailsModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="pipPackageDetailsModalLabel">{{ packageName }}</h1>
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
                                        <router-link :to="{ name: 'agentData', params: { id:agent } }">
                                            {{ agent }} 
                                        </router-link>
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
    name: 'PipPackageDetailsModal',
    props: ['packageName', 'versions'],
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles for modal */
  </style>
  