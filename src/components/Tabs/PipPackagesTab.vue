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
            <button class="nav-link" id="pipPackagesChangelogTab" data-bs-toggle="tab" data-bs-target="#pipPackagesChangelogTabContent" type="button" role="tab" aria-controls="pipPackagesChangelogTabContent" aria-selected="false">
              <i class="bi bi-file-diff"></i> Changelogs 
              <span class="badge rounded-pill bg-primary">
                {{ changeLogCount }}
              </span>
            </button>
        </li>
    </ul>

    <!-- Last Update -->
    <div class="row">
      <span :title=localUpdateTime>Last Update : {{ timeDiff }}</span>
    </div>

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

    <!-- Changelog -->
    <div class="tab-pane fade" id="pipPackagesChangelogTabContent" role="tabpanel" aria-labelledby="systemInstalledAppsChangelog">
          <table class="table table-striped table-bordered table-sm" id="systemInstalledAppsChangelogTable">
            <thead>
              <tr>
                <th>Time</th>
                <th>Action</th>
                <th>Package Name</th>
                <th>Field</th>
                <th>Previous Value</th>
                <th>New Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in changeLogData" :key="data">
                <td>
                  {{ data.date }}
                </td>

                <td v-if="data.action == 'New'" style="color: green;">
                  Install
                </td>
                <td v-if="data.action == 'Delete'" style="color:crimson">
                  Delete
                </td>
                <td v-if="data.action == 'Update'" style="color: coral;">
                  Update
                </td>

                <td>
                  {{ data.pkgname }}
                </td>
                <td>
                  {{ data.field }}
                </td>
                <td style="color:crimson">
                  {{ data.previous_value }}
                </td>
                <td style="color: green;">
                  {{ data.new_value }}
                </td>
              </tr>
          </tbody>
        </table>
      </div>
</template>


<script>
    import { formatToLocalTime,calculateDatetimeDifference } from '../../utils/timeUtils';
    import { getPipPackagesByAgentId, getPipPackagesChangeLog } from '../../utils/requestUtils'

    
    export default {
      name: 'PipPackagesTab',
      data() {
        return {
          pipPackages: {},
          pipPackagesCount: 0,
          isInstalled: false,
          changeLogData: [],
          changeLogCount: 0,
          localUpdateTime: "",
          timeDiff: "",
        };
      },
      mounted() {
        this.fillPipPackages();
      },
      methods: {
        async fillPipPackages() {
          try {
            // Get the ID from the URL
            const agentId = this.$route.params.id;

            // Retrieve Pip Packages
            this.pipPackages =  await getPipPackagesByAgentId(agentId);
            // Retrieve System Apps Changelogs
            this.changeLogData = await getPipPackagesChangeLog(this.pipPackages.id)
            
            // Set isInstalled value
            this.isInstalled = this.pipPackages.isInstalled;

            // Set system Pip Packages Count if it's installed
            this.pipPackagesCount = this.pipPackages.pip_packages.length;

            // Set Local Update Time and Time Diff
            this.localUpdateTime = formatToLocalTime(this.systemInstalledApps.updated);
            this.timeDiff =  calculateDatetimeDifference(this.systemInstalledApps.updated);

            this.changeLogData = this.changeLogData.map((item) => {
            const date = formatToLocalTime(item.timestamp);
            const changes = item.changes;

            // Define the Action List
            const actionList = [];
            
            // Find Deleted Pip Packages
            if (changes.deleted_pip_pkgs) {
              for (const pipPkg of changes.deleted_pip_pkgs) {
                actionList.push({
                  date,
                  action: "Delete",
                  pkgname:  pipPkg.name,
                  field: "-",
                  previous_value: pipPkg,
                  new_value: "-",
                });
              }
            }

            // Find Newly Added Pip Packages
            if (changes.new_pip_pkgs) {
              for (const pipPkg of changes.new_pip_pkgs) {
                actionList.push({
                  date,
                  action: "New",
                  pkgname:  pipPkg.name,
                  field: "-",
                  previous_value: "-",
                  new_value: pipPkg,
                });
              }
            }

            // Find Updated Pip Packages
            if (changes.updated_pip_pkgs) {
              for (const pipPkg in changes.updated_pip_pkgs) {
                const pkgChanges = changes.updated_pip_pkgs[pipPkg];
                for (const changeKey in pkgChanges) {
                  actionList.push({
                    date,
                    action: "Update",
                    pkgname: pipPkg,
                    field: changeKey,
                    previous_value: pkgChanges[changeKey]["previous_value"],
                    new_value: pkgChanges[changeKey]["new_value"],
                  });
                }
              }
            }

            return actionList;
          }).flat();

          // Set Changelog Count
          this.changeLogCount = this.changeLogData.length;

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