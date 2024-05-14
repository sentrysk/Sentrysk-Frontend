<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
        <table class="table table-striped table-bordered table-hover" id="allInstalledAppsTable">
          <thead>
            <tr>
              <th>App Name</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(installedApp, index) in installedAppsData" :key="index">
                <td>{{ index }}</td>
                <td>
                  <span class="badge rounded-pill bg-primary" v-for="(agents,version) in installedApp" :key="version">
                    {{ version }}
                  </span>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    
</template>
  
<script>
  // @ is an alias to /src
  import $ from "jquery";
  import Navbar from '@/components/Navbar.vue';
  import { getAllInstalledAppsFormatted } from '@/utils/requestUtils';
  
  export default {
    name: 'InstalledAppsView',
    components: {
      Navbar,
    },
    data(){
        return{
            installedAppsData: {}
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
        }
    }
  }
</script>

<style>

</style>
  
