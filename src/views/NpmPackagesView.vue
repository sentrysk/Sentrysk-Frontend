<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title"><strong><i class="fa-brands fa-npm"></i> Npm Packages</strong></h4>
          <table class="table table-striped table-bordered table-hover" id="allNpmPackagesTable">
            <thead class="table-primary">
              <tr>
                <th>Name</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(versions, packageName) in pipPackagesData" :key="packageName">
                  <td>
                    <a href="#" class="link-primary" data-bs-toggle="modal" data-bs-target="#npmPackageDetailsModal">
                      {{ packageName }}
                    </a>
                  </td>
                  <td>
                    <span class="badge bg-primary" v-for="(agent, version) in versions" :key="version">
                      {{ version }}
                    </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>
  
<script>
  // @ is an alias to /src
  import $ from "jquery";
  import Navbar from '@/components/Navbar.vue';
  import { getAllNpmPackagesFormatted } from '@/utils/requestUtils';
  
  export default {
    name: 'PipPackagesView',
    components: {
      Navbar
    },
    data(){
        return{
            npmPackagesData: {}
        }
    },
    mounted(){
        this.fillNpmPackages();
    },
    methods:{
        async fillNpmPackages(){
            this.npmPackagesData = await getAllNpmPackagesFormatted();

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
  
