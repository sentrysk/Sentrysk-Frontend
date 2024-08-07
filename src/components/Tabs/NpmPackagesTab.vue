<template>
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="npmPackagesTab" data-bs-toggle="tab" data-bs-target="#npmPackagesDiv" type="button" role="tab" aria-controls="npmPackagesDiv" aria-selected="true">
              <i class="fa-brands fa-python"></i> Npm Packages
              <span class="badge rounded-pill bg-primary">
              {{ npmPackagesCount }}
              </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="npmPackagesChangelogTab" data-bs-toggle="tab" data-bs-target="#npmPackagesChangelogTabContent" type="button" role="tab" aria-controls="npmPackagesChangelogTabContent" aria-selected="false">
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

    <!-- Changelog -->
    <div class="tab-pane fade" id="npmPackagesChangelogTabContent" role="tabpanel" aria-labelledby="npmPackagesChangelogTab">
        <table class="table table-striped table-bordered table-sm" id="npmPackagesChangelogTable">
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
    import $ from "jquery";
    import { formatToLocalTime, calculateDatetimeDifference } from '@/utils/timeUtils';
    import { getNpmPackagesByAgentId, getNpmPackagesChangeLog } from '@/utils/requestUtils';
    import moment from 'moment';

    
    export default {
      name: 'npmPackagesTab',
      data() {
        return {
          npmPackages: {},
          npmPackagesCount: 0,
          isInstalled: false,
          changeLogData: [],
          changeLogCount: 0,
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
            // Retrieve Npm Packages Changelogs
            this.changeLogData = await getNpmPackagesChangeLog(this.npmPackages.id)
            
            // Set isInstalled value
            this.isInstalled = this.npmPackages.isInstalled;

            // Set system Npm Packages Count if it's installed
            this.npmPackagesCount = this.npmPackages.npm_packages.length;

            // Set Local Update Time and Time Diff
            this.localUpdateTime = formatToLocalTime(this.npmPackages.updated);
            this.timeDiff =  calculateDatetimeDifference(this.npmPackages.updated);

            this.changeLogData = this.changeLogData.map((item) => {
            const date = formatToLocalTime(item.timestamp);
            const changes = item.changes;

            // Define the Action List
            const actionList = [];
            
            // Find Deleted Npm Packages
            if (changes.deleted_npm_pkgs) {
              for (const npmPkg of changes.deleted_npm_pkgs) {
                actionList.push({
                  date,
                  action: "Delete",
                  pkgname:  npmPkg.name,
                  field: "-",
                  previous_value: npmPkg,
                  new_value: "-",
                });
              }
            }

            // Find Newly Added Npm Packages
            if (changes.new_npm_pkgs) {
              for (const npmPkg of changes.new_npm_pkgs) {
                actionList.push({
                  date,
                  action: "New",
                  pkgname:  npmPkg.name,
                  field: "-",
                  previous_value: "-",
                  new_value: npmPkg,
                });
              }
            }

            // Find Updated Npm Packages
            if (changes.updated_npm_pkgs) {
              for (const npmPkg in changes.updated_npm_pkgs) {
                const pkgChanges = changes.updated_npm_pkgs[npmPkg];
                for (const changeKey in pkgChanges) {
                  actionList.push({
                    date,
                    action: "Update",
                    pkgname: npmPkg,
                    field: changeKey,
                    previous_value: pkgChanges[changeKey]["previous_value"],
                    new_value: pkgChanges[changeKey]["new_value"],
                  });
                }
              }
            }

              return actionList;
            }).flat();

            $(document).ready(() => {
              // Custom sorting plugin for DataTables
              $.extend($.fn.dataTable.ext.type.order, {
                  "date-gmt-pre": function (d) {
                      return moment(d, 'MMM D, YYYY, HH:mm:ss [GMT]Z').toDate();
                  },
                  "date-gmt-asc": function (a, b) {
                      return a - b;
                  },
                  "date-gmt-desc": function (a, b) {
                      return b - a;
                  }
              });

              // Set Npm Packages Table as Data Table
              $('#npmPackagesTable').DataTable({
                searching: true,
                lengthChange: true,
                pageLength: 25,
                lengthMenu: [
                    [25, 50, 100, 250, -1],
                    [25, 50, 100, 250, 'All']
                ],
              });
              // Style length Menu
              const pageEntrySize = document.getElementById('npmPackagesTable_length');
              pageEntrySize.style = "margin-right:100%";
              const pageInfoText = document.getElementById('npmPackagesTable_info');
              pageInfoText.style = "float:left";

              // Set Changelogs as Data Table
              $('#npmPackagesChangelogTable').DataTable({
                searching: true,
                lengthChange: true,
                pageLength: 25,
                lengthMenu: [
                    [25, 50, 100, 250, -1],
                    [25, 50, 100, 250,'All']
                ],
                order: [ 0, 'desc' ],
                columnDefs: [
                  {
                      targets: 0, // Adjust the column index to date column
                      type: 'date-gmt'
                  },
                  {
                targets: [1,2,3,4,5],
                orderable: false
              }
                ],
                select: true,
                // Column Filtering
                initComplete: function () {
                  let columnsToFilter = [1]; // Array of column indices to add the select filter
                  this.api()
                      .columns()
                      .every(function (index) {
                        if (columnsToFilter.includes(index)) {
                          let column = this;
          
                          // Create select element
                          let select = document.createElement('select');
                          select.add(new Option(''));
                          column.header().replaceChildren(select);
          
                          // Apply listener for user change in value
                          select.addEventListener('change', function () {
                              column
                                  .search(select.value, {exact: true})
                                  .draw();
                          });
          
                          // Add list of options
                          column
                              .data()
                              .unique()
                              .sort()
                              .each(function (d, j) {
                                  select.add(new Option(d));
                              });
                        }
                      });
                },
              });
              // Style length Menu
              const chlgPageEntrySize = document.getElementById('npmPackagesChangelogTable_length');
              chlgPageEntrySize.style = "margin-right:100%";
              const chlgPageInfoText = document.getElementById('npmPackagesChangelogTable_info');
              chlgPageInfoText.style = "float:left";
            });

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