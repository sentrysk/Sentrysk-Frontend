<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title"><strong><i class="fa-brands fa-python"></i> Pip Packages</strong></h4>
          <table class="table table-striped table-bordered table-hover" id="allPipPackagesTable">
            <thead class="table-primary">
              <tr>
                <th>Name</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pipPkg, index) in pipPackagesData" :key="index">
                  <td>{{ index }}</td>
                  <td>
                    <span class="badge rounded-pill bg-primary" v-for="(agents,version) in pipPkg" :key="version">
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

            // Make Pip Packages Table as DataTable
            $(document).ready(() => {
                $('#allPipPackagesTable').DataTable({
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
                const pageEntrySize = document.getElementById('allPipPackagesTable_length');
                pageEntrySize.style = "float:left";
                const pageInfoText = document.getElementById('allPipPackagesTable_info');
                pageInfoText.style = "float:left";
            });
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
  
