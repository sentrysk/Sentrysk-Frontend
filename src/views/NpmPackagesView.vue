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
              <tr v-for="(versions, packageName) in npmPackagesData" :key="packageName">
                  <td>
                    <a href="#" class="link-primary" data-bs-toggle="modal" data-bs-target="#npmPackageDetailsModal" @click="setModalAttributes(packageName, versions)">
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
    <NpmPackagesDetailsModal :npmPackageName="selectedNpmPackageName" :versions="selectedVersions"></NpmPackagesDetailsModal>
</template>
  
<script>
  // @ is an alias to /src
  import $ from "jquery";
  import Navbar from '@/components/Navbar.vue';
  import { getAllNpmPackagesFormatted } from '@/utils/requestUtils';
  import NpmPackagesDetailsModal from '@/components/NpmPackagesDetailsModal.vue';
  
  export default {
    name: 'PipPackagesView',
    components: {
      Navbar,
      NpmPackagesDetailsModal
    },
    data(){
        return{
            npmPackagesData: {},
            selectedNpmPackageName: '',
            selectedVersions: []
        }
    },
    mounted(){
        this.fillNpmPackages();
    },
    methods:{
        async fillNpmPackages(){
            this.npmPackagesData = await getAllNpmPackagesFormatted();

            // Make Npm Packages Table as DataTable
            $(document).ready(() => {
                $('#allNpmPackagesTable').DataTable({
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
                const pageEntrySize = document.getElementById('allNpmPackagesTable_length');
                pageEntrySize.style = "float:left";
                const pageInfoText = document.getElementById('allNpmPackagesTable_info');
                pageInfoText.style = "float:left";
            });
        },
        setModalAttributes(npmPackageName, versions) {
          this.selectedNpmPackageName = npmPackageName;
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
  
