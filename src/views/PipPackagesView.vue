<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
        <table class="table table-striped table-bordered table-hover" id="allPipPackagesTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pipPkg in pipPackages">
                <td>{{ pipPkg.name }}</td>
                <td>{{ pipPkg.version }}</td>
            </tr>
          </tbody>
        </table>
    </div>
    
</template>
  
<script>
  // @ is an alias to /src
  import $ from "jquery";
  import Navbar from '@/components/Navbar.vue';
  import { getAllPipPackages } from '@/utils/requestUtils';
  
  export default {
    name: 'PipPackagesView',
    components: {
      Navbar,
    },
    data(){
        return{
            pipPackagesData: {},
            pipPackages: []
        }
    },
    mounted(){
        this.fillInstalledApps();
    },
    methods:{
        async fillInstalledApps(){
            this.pipPackagesData = await getAllPipPackages();

            for(const agentPipPackages of this.pipPackagesData){
              this.pipPackages = this.pipPackages.concat(agentPipPackages.pip_packages)
            }
        }
    }
  }
</script>

<style>

</style>
  
