<template>
    <ul class="nav nav-tabs" id="systemSubTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pipPackagesTab" data-bs-toggle="tab" data-bs-target="#pipPackagesDiv" type="button" role="tab" aria-controls="pipPackagesDiv" aria-selected="true">
              <i class="fa-brands fa-python"></i> Pip Packages
              <span class="badge rounded-pill bg-primary">
              {{ pipPackagesCount }}
              </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="systemInstalledAppsChangelogTab" data-bs-toggle="tab" data-bs-target="#systemInstalledAppsChangelog" type="button" role="tab" aria-controls="systemInstalledAppsChangelog" aria-selected="false">
              <i class="bi bi-file-diff"></i>Changelogs 
              <span class="badge rounded-pill bg-primary">
                {{ changeLogCount }}
              </span>
            </button>
        </li>
    </ul>

    <div class="tab-content" id="pipPackagesTabContent" v-bind:isInstalled="true">
        <div class="tab-pane fade show active" id="pipPackagesDiv" role="tabpanel" aria-labelledby="pipPackagesTab">
            <table class="table table-striped table-bordered table-sm table-hover nowrap"  id="pipPackagesTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Version</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pipPkg, index) in pipPackages.pip_packages" :key="index">
                        <td>{{ pipPkg.name }}</td>
                        <td>{{ pipPkg.version }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="d-flex align-items-center justify-content-center vh-100 bg-primary" v-bind:isInstalled="false">
        <h1 class="display-1 fw-bold text-white">
          <i class="fa-brands fa-python"></i>It seems Pip not installed...
        </h1>
    </div>
</template>


<script>
    import { getPipPackagesByAgentId } from '../../utils/requestUtils'

    
    export default {
      name: 'PipPackagesTab',
      data() {
        return {
          pipPackages: {},
          pipPackagesCount: 0,
          isInstalled: false,
          localUpdateTime: "",
          timeDiff: "",
        };
      },
      mounted() {
        this.fillInstalledApps();
      },
      methods: {
        async fillInstalledApps() {
          try {
            // Get the ID from the URL
            const agentId = this.$route.params.id;

            // Retrieve Pip Packages
            this.pipPackages =  await getPipPackagesByAgentId(agentId);
            
            // Set isInstalled value
            this.isInstalled = this.pipPackages.isInstalled;

            // Set system Pip Packages Count if it's installed
            this.pipPackagesCount = this.pipPackages.pip_packages.length;

          } catch (error) {
            // If any error occurs, set properties
            this.isInstalled = false;
            this.pipPackagesCount = 0;
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