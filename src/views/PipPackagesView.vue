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
            <tr v-for="(pipPkg, index) in pipPackagesData" :key="index">
                <td>{{ index }}</td>
                <td>
                  <span class="badge rounded-pill bg-primary" v-for="(agnets,version) in pipPkg" :key="version">
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
  import { getAllPipPackagesFormatted } from '@/utils/requestUtils';
  
  export default {
    name: 'PipPackagesView',
    components: {
      Navbar,
    },
    data(){
        return{
            pipPackagesData: {}
        }
    },
    mounted(){
        this.fillPipPackages();
    },
    methods:{
        async fillPipPackages(){
            this.pipPackagesData = await getAllPipPackagesFormatted();
        }
    }
  }
</script>

<style>

</style>
  
