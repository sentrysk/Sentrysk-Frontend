<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title"><strong><i class="bi bi-code-square"></i> Apps</strong></h4>
          <table class="table table-striped table-bordered table-hover" id="allInstalledAppsTable">
            <thead class="table-primary">
              <tr>
                <th>App Name</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(versions, appName) in installedAppsData" :key="appName">
                  <td>
                    <a href="#" class="link-primary" data-bs-toggle="modal" data-bs-target="#installedAppDetailsModal" @click="setModalAttributes(appName, versions)">
                      {{ appName }}
                    </a>
                  </td>
                  <td>
                    <span class="badge bg-primary" v-for="(agents,version) in versions" :key="version">
                      {{ version }}
                    </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <InstalledAppDetailsModal :appName="selectedAppName" :versions="selectedVersions"></InstalledAppDetailsModal>
</template>
  
<script>
  // @ is an alias to /src
  import $ from "jquery";
  import Navbar from '@/components/Navbar.vue';
  import { getAllInstalledAppsFormatted } from '@/utils/requestUtils';
  import InstalledAppDetailsModal from '@/components/InstalledAppDetailsModal.vue'
  
  export default {
    name: 'InstalledAppsView',
    components: {
      Navbar,
      InstalledAppDetailsModal
    },
    data(){
        return{
            installedAppsData: {},
            selectedAppName: '',
            selectedVersions: []
        }
    },
    mounted(){
        this.fillInstalledApps();
    },
    methods:{
        async fillInstalledApps(){
            this.installedAppsData = await getAllInstalledAppsFormatted();

            // Make Installed Apps Table as DataTable
            $(document).ready(() => {
                $('#allInstalledAppsTable').DataTable({
                searching: true,
                lengthChange: true,
                pageLength: 25,
                lengthMenu: [
                    [25, 50, 100, 250],
                    [25, 50, 100, 250]
                ],
                order: [ 0, 'asc' ]
                });
                // Style length Menu
                const pageEntrySize = document.getElementById('allInstalledAppsTable_length');
                pageEntrySize.style = "float:left";
                const pageInfoText = document.getElementById('allInstalledAppsTable_info');
                pageInfoText.style = "float:left";
            });
        },
        setModalAttributes(appName, versions) {
          this.selectedAppName = appName;
          this.selectedVersions = versions;
        }
    }
  }
</script>

<style>
  .container {
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
  
