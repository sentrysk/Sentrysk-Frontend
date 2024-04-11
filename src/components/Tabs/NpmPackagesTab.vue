<template>
    <ul class="nav nav-tabs" id="systemSubTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="npmPackagesTab" data-bs-toggle="tab" data-bs-target="#npmPackagesDiv" type="button" role="tab" aria-controls="npmPackagesDiv" aria-selected="true">
              <i class="fa-brands fa-python"></i> Npm Packages
              <span class="badge rounded-pill bg-primary">
              {{ npmPackagesCount }}
              </span>
            </button>
        </li>
    </ul>

    <!-- Last Update -->
    <div class="row">
      <span :title=localUpdateTime>Last Update : {{ timeDiff }}</span>
    </div>

    <div class="tab-content" id="npmPackagesTabContent">
        <div class="tab-pane fade show active" id="npmPackagesDiv" role="tabpanel" aria-labelledby="npmPackagesTab">
            <table class="table table-striped table-bordered table-sm table-hover nowrap"  id="npmPackagesTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Version</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(npmPkg, index) in npmPackages.npm_packages" :key="index">
                        <td>{{ npmPkg.name }}</td>
                        <td>{{ npmPkg.version }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>


<script>
    import { formatToLocalTime,calculateDatetimeDifference } from '../../utils/timeUtils';
    import { getNpmPackagesByAgentId } from '../../utils/requestUtils'

    
    export default {
      name: 'npmPackagesTab',
      data() {
        return {
          npmPackages: {},
          npmPackagesCount: 0,
          isInstalled: false,
          localUpdateTime: "",
          timeDiff: "",
        };
      },
      mounted() {
        this.fillNpmPackages();
      },
      methods: {
        async fillNpmPackages() {
          try {
            // Get the ID from the URL
            const agentId = this.$route.params.id;

            // Retrieve Npm Packages
            this.npmPackages =  await getNpmPackagesByAgentId(agentId);
            
            // Set isInstalled value
            this.isInstalled = this.npmPackages.isInstalled;

            // Set system Npm Packages Count if it's installed
            this.npmPackagesCount = this.npmPackages.npm_packages.length;

            // Set Local Update Time and Time Diff
            this.localUpdateTime = formatToLocalTime(this.npmPackages.updated);
            this.timeDiff =  calculateDatetimeDifference(this.npmPackages.updated);


          } catch (error) {
            // If any error occurs, set properties
            this.isInstalled = false;
            this.npmPackagesCount = 0;
            // Print error to console
            console.error(error);
          }
        },
      },
    };
</script>

<style>
.sysAppsActionIcons{
  font-size: 2em;
  max-width: 4rem;
}
</style>