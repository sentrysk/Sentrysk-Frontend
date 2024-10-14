<template>
    <ul class="nav nav-tabs" role="tablist">
        <!-- Services Section -->
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="systemServicesTab" data-bs-toggle="tab" data-bs-target="#systemServices" type="button" role="tab" aria-controls="systemServices" aria-selected="true">
              <i class="bi bi-code-square"></i>Services
              <span class="badge rounded-pill bg-primary">
              {{ systemServicesCount }}
              </span>
            </button>
        </li>
        <!-- Changelog Section -->
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="systemServicesChangelogTab" data-bs-toggle="tab" data-bs-target="#systemServicesChangelog" type="button" role="tab" aria-controls="systemServicesChangelog" aria-selected="false">
              <i class="bi bi-file-diff"></i>Changelogs 
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

    <div class="tab-content" id="sysServicesTabContent">
      <div v-if="loading">
          <div class="loading-content">
              <i class="fas fa-spinner fa-spin fa-3x"></i>
              <h2>Loading...</h2>
          </div>
      </div>

      <div v-else-if="error">
          <div class="error-content">
              <i class="fas fa-exclamation-triangle fa-3x"></i>
              <h2>Error loading data.</h2>
          </div>
      </div>

      <div v-else-if="!hasData">
          <NothingToShowComponent />
      </div>

      <!-- If Has Servives Data -->
      <div v-else>
        <!-- Services Section -->
        <div class="tab-pane fade show active" id="systemServices" role="tabpanel" aria-labelledby="systemServices">
            <table class="table table-striped table-bordered table-sm table-hover table-responsive"  id="systemServicesTable">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Display Name</th>
                        <th>Service Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(service, index) in systemServices.services" :key="index">

                        <td v-if="service.status.toLowerCase() == 'running'" style="color: green;">
                          {{ service.status }}
                        </td>
                        <td v-else-if="service.status.toLowerCase() == 'stopped'" style="color: crimson;">
                          {{ service.status }}
                        </td>
                        <td v-else>
                          {{ service.status }}
                        </td>

                        <td>{{ service.display_name }}</td>
                        <td>{{ service.service_name }}</td>
                        <td>{{ service.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Changelog Section -->
        <div class="tab-pane fade" id="systemServicesChangelog" role="tabpanel" aria-labelledby="systemServicesChangelog">
          <table class="table table-striped table-bordered table-sm" id="systemServicesChangelogTable">
            <thead>
              <tr>
                <th>Time</th>
                <th>Action</th>
                <th>Service</th>
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
                  {{ data.service_name }}
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
      </div>
    </div>
</template>

<script>
    import $ from "jquery";
    import NothingToShowComponent from "@/components/NothingToShowComponent.vue";
    import { formatToLocalTime,calculateDatetimeDifference } from '@/utils/timeUtils';
    import { getServices, getServicesChangeLog } from '@/utils/requestUtils';
    import moment from 'moment';

    export default {
      name: 'SystemServicesTab',
      components: {
        NothingToShowComponenet,
      },
      data() {
        return {
          systemServices: null,
          systemServicesCount: 0,
          changeLogData: null,
          changeLogCount: 0,
          localUpdateTime: "",
          timeDiff: "",
          loading: true,
          error: false,
        };
      },
      mounted() {
        this.fillServices();
      },
      computed: {
        hasData() {
          return this.systemServices && Object.keys(this.systemServices).length > 0;
        }
      },
      methods: {
        async fillServices() {
          try {
            // Get the ID from the URL
            const agentId = this.$route.params.id;

            // Retrieve Services
            this.systemServices =  await getServices(agentId);
            // Retrive Services Changelog
            this.changeLogData = await getServicesChangeLog(this.systemServices.id);

            // Set Local Update Time and Time Diff
            this.localUpdateTime = formatToLocalTime(this.systemServices.updated);
            this.timeDiff =  calculateDatetimeDifference(this.systemServices.updated);

            // Set Services Count
            this.systemServicesCount = this.systemServices.services.length;

            this.changeLogData = this.changeLogData.map((item) => {
            const date = formatToLocalTime(item.timestamp);
            const changes = item.changes;

            // Define the Action List
            const actionList = [];
            
            // Find Deleted Services
            if (changes.deleted_services) {
              for (const service of changes.deleted_services) {
                actionList.push({
                  date,
                  action: "Delete",
                  service_name:  service.service_name,
                  field: "-",
                  previous_value: service,
                  new_value: "-",
                });
              }
            }

            // Find Newly Added services
            if (changes.new_services) {
              for (const service of changes.new_services) {
                actionList.push({
                  date,
                  action: "New",
                  service_name:  service.service_name,
                  field: "-",
                  previous_value: "-",
                  new_value: service,
                });
              }
            }

            // Find Updated services
            if (changes.updated_services) {
              for (const service_name in changes.updated_services) {
                const serviceChanges = changes.updated_services[service_name];
                for (const changeKey in serviceChanges) {
                  actionList.push({
                    date,
                    action: "Update",
                    service_name: service_name,
                    field: changeKey,
                    previous_value: serviceChanges[changeKey]["previous_value"],
                    new_value: serviceChanges[changeKey]["new_value"],
                  });
                }
              }
            }

            return actionList;
            }).flat();

            // Set Changelog Count
            this.changeLogCount = this.changeLogData.length;

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
              
              // Set Installed Apps as Data Table
              $('#systemServicesTable').DataTable({
              searching: true,
              lengthChange: true,
              pageLength: 25,
              lengthMenu: [
                  [25, 50, 100, 250, -1],
                  [25, 50, 100, 250, 'All']
              ],
              columnDefs: [
                {
                  targets: 0,
                  orderable: false
                },
              ],
              ordering: false,
              //Column Filtering
              initComplete: function () {
                let columnsToFilter = [0]; // Array of column indices to add the select filter
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
              const pageEntrySize = document.getElementById('systemServicesTable_length')
              pageEntrySize.style = "margin-right:100%"
              const pageInfoText = document.getElementById('systemServicesTable_info')
              pageInfoText.style = "float:left"

              // Set Changelogs as Data Table
              $('#systemServicesChangelogTable').DataTable({
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
                  targets: 1,
                  orderable: false
                }
              ],
              select: true,
              //Column Filtering
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
              const chlgPageEntrySize = document.getElementById('systemServicesChangelogTable_length')
              chlgPageEntrySize.style = "margin-right:100%"
              const chlgPageInfoText = document.getElementById('systemServicesChangelogTable_info')
              chlgPageInfoText.style = "float:left"
              
            });

          } catch (error) {
            // Print error to console
            console.error(error);
            // Set error property true
            this.error = true;
          } finally {
            this.loading = false;
          }
        },
      },
    };
</script>

<style>

</style>