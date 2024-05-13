<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
        <table class="table table-striped table-bordered table-hover" id="allInstalledAppsTable">
          <thead>
            <tr>
              <th>App Name</th>
              <th>Version</th>
              <th>Installed By</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="installedApp in apps">
                <td>{{ installedApp.name }}</td>
                <td>{{ installedApp.version }}</td>
                <td>{{ installedApp.installed_by }}</td>
            </tr>
          </tbody>
        </table>
    </div>
    
</template>
  
<script>
  // @ is an alias to /src
  import $ from "jquery";
  import Navbar from '@/components/Navbar.vue';
  import { getAllInstalledApps } from '@/utils/requestUtils';
  
  export default {
    name: 'InstalledAppsView',
    components: {
      Navbar,
    },
    data(){
        return{
            installedAppsData: {},
            apps: []
        }
    },
    mounted(){
        this.fillInstalledApps();
    },
    methods:{
        async fillInstalledApps(){
            this.installedAppsData = await getAllInstalledApps();

            for(const agentApps of this.installedAppsData){
              this.apps = this.apps.concat(agentApps.apps)
            }
        }
    }
  }
</script>

<style>

</style>
  
