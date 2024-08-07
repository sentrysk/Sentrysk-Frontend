<template>
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="dockerInfoTab" data-bs-toggle="tab" data-bs-target="#dockerInfoDiv" type="button" role="tab" aria-controls="dockerInfoDiv" aria-selected="true">
              <i class="bi bi-info-circle"></i> Info
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="dockerImagesTab" data-bs-toggle="tab" data-bs-target="#dockerImagesDiv" type="button" role="tab" aria-controls="dockerImagesDiv" aria-selected="false">
              <i class="fa-solid fa-database"></i> Images
              <span class="badge rounded-pill bg-primary">
                {{ dockerImagesCount }}
              </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="dockerContainersTab" data-bs-toggle="tab" data-bs-target="#dockerContainersDiv" type="button" role="tab" aria-controls="dockerContainersDiv" aria-selected="false">
              <i class="bi bi-boxes"></i> Containers
              <span class="badge rounded-pill bg-primary">
                {{ dockerContainersCount }}
              </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="dockerVolumesTab" data-bs-toggle="tab" data-bs-target="#dockerVolumesDiv" type="button" role="tab" aria-controls="dockerVolumesDiv" aria-selected="false">
              <i class="bi bi-hdd-fill"></i> Volumes
              <span class="badge rounded-pill bg-primary">
                {{ dockerVolumesCount }}
              </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="dockerNetworksTab" data-bs-toggle="tab" data-bs-target="#dockerNetworksDiv" type="button" role="tab" aria-controls="dockerNetworksDiv" aria-selected="false">
              <i class="fa-solid fa-network-wired"></i> Networks
              <span class="badge rounded-pill bg-primary">
                {{ dockerNetworksCount }}
              </span>
            </button>
        </li>
    </ul>

    <!-- Last Update -->
    <div class="row">
      <span :title=localUpdateTime>Last Update : {{ timeDiff }}</span>
    </div>

    <!-- Docker Info Tab -->
    <div class="tab-content" id="dockerInfoTabContent">
        <div class="tab-pane fade show active" id="dockerInfoDiv" role="tabpanel" aria-labelledby="dockerInfoTab">
          <div class="row">
            <!-- Is Installed Card -->
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header"><i class="fa-brands fa-instalod"></i> Is Installed</div>
                    <div class="card-body">
                        <p class="card-text fw-bold">
                          <i v-if="isInstalled" class="fa-regular fa-thumbs-up"></i>
                          <i v-else class="fa-regular fa-thumbs-down"></i>
                        </p>
                    </div>
                </div>
            </div>
            <!-- ID Card -->
              <div class="col-md-4">
                  <div class="card">
                      <div class="card-header"><i class="fa-regular fa-id-card"></i> ID</div>
                      <div class="card-body">
                          <p class="card-text fw-bold">{{ dockerInfo.id }}</p>
                      </div>
                  </div>
              </div>
              <!-- Disk Usage Card -->
              <div class="col-md-4">
                  <div class="card">
                      <div class="card-header"><i class="bi bi-hdd-stack"></i> Disk Usage</div>
                      <div class="card-body">
                          <p class="card-text fw-bold">{{ dockerInfo.disk_usage }}</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>

    <!-- Docker Images Tab -->
    <div class="tab-content" id="dockerImagesTabContent">
      <div class="tab-pane fade show" id="dockerImagesDiv" role="tabpanel" aria-labelledby="dockerImagesTab">
          <table class="table table-striped table-bordered table-sm table-hover nowrap"  id="dockerImagesTable">
              <thead>
                  <tr>
                      <th>Image ID</th>
                      <th>Size</th>
                      <th>Tags</th>
                      <th>Labels</th>
                      <th>Created</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(dockerImage, index) in dockerInfo.images" :key="index">
                      <td>{{ dockerImage.image_id }}</td>
                      <td>{{ dockerImage.size }}</td>
                      <td>
                          <tr v-for="(imageTags, index) in dockerImage.tags" :key="index">
                              <td>
                                  <span class="badge bg-primary">
                                      {{ imageTags }}
                                  </span>
                              </td>
                          </tr>
                      </td>
                      <td>
                          <tr v-for="(imageLabels, index) in dockerImage.labels" :key="index">
                              <td>
                                <span class="badge bg-secondary">
                                    {{ index+" : " }}
                                  </span>
                                  <span class="badge bg-primary" :title="imageLabels">
                                    {{ imageLabels.length > 12 ? imageLabels.substring(0, 12) + '...' : imageLabels }}
                                  </span>
                              </td>
                          </tr>
                      </td>
                      <td>{{ dockerImage.created }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>

    <!-- Docker Containers Tab -->
    <div class="tab-content" id="dockerContainersTabContent">
      <div class="tab-pane fade show" id="dockerContainersDiv" role="tabpanel" aria-labelledby="dockerContainersTab">
          <table class="table table-striped table-bordered table-sm table-hover nowrap"  id="dockerContainersTable">
              <thead>
                  <tr>
                      <th>Status</th>
                      <th>Container ID</th>
                      <th>Image</th>
                      <th>Ports</th>
                      <th>Networks</th>
                      <th>Labels</th>
                      <th>Created</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(dockerContainer, index) in dockerInfo.containers" :key="index">
                      <td>
                        <span :title=dockerContainer.status>
                        <i v-if="dockerContainer.status=='running'" class="bi bi-patch-check-fill text-success"></i>
                        <i v-else class="bi bi-x-octagon-fill text-danger"></i>
                        </span>
                      </td>
                      <td><span :title="dockerContainer.container_id">{{ dockerContainer.container_id.substring(0,12)+"..."}}</span></td>
                      <td>{{ dockerContainer.image }}</td>
                      <td>
                        <tr v-for="(containerPort, index) in dockerContainer.ports" :key="index">
                          <div class="tooltipdiv"><span class="badge bg-primary">{{ index }}</span>
                              <span class="tooltiptext">
                                <table v-for="elem in containerPort" class="table table-dark table-striped table-bordered table-sm">
                                  <tbody>
                                    <tr v-for="(contPortVal, contPortKey) in elem" :key="contPortKey">
                                      <td><b>{{ contPortKey }}</b></td>
                                      <td>{{ contPortVal }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </span>
                            </div>
                        </tr>
                      </td>
                      <td>
                        <tr v-for="(containerNetworks, index) in dockerContainer.networks" :key="index">
                          <td>
                            <div class="tooltipdiv"><span class="badge bg-primary">{{ index }}</span>
                              <span class="tooltiptext">
                                <table class="table table-dark table-striped table-bordered table-sm">
                                  <tbody>
                                    <tr v-for="(contNetVal, contNetKey) in containerNetworks" :key="contNetKey">
                                      <td><b>{{ contNetKey }}</b></td>
                                      <td>{{ contNetVal }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </span>
                            </div>
                          </td>
                        </tr>
                      </td>
                      <td>
                          <tr v-for="(containerLabels, index) in dockerContainer.labels" :key="index">
                              <td>
                                <span class="badge bg-secondary">
                                    {{ index+" : " }}
                                  </span>
                                  <span class="badge bg-primary" :title="containerLabels">
                                    {{ containerLabels.length > 12 ? containerLabels.substring(0, 12) + '...' : containerLabels }}
                                  </span>
                              </td>
                          </tr>
                      </td>
                      <td>{{ dockerContainer.created }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>

    <!-- Docker Volumes Tab -->
    <div class="tab-content" id="dockerVolumesTabContent">
      <div class="tab-pane fade show" id="dockerVolumesDiv" role="tabpanel" aria-labelledby="dockerVolumesTab">
          <table class="table table-striped table-bordered table-sm table-hover nowrap"  id="dockerVolumesTable">
              <thead>
                  <tr>
                      <th>Volume Name</th>
                      <th>Mountpoint</th>
                      <th>Labels</th>
                      <th>Created</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(dockerVolume, index) in dockerInfo.volumes" :key="index">
                      <td>{{ dockerVolume.volume_name }}</td>
                      <td>{{ dockerVolume.mountpoint }}</td>
                      <td>
                          <tr v-for="(volumeLabels, index) in dockerVolume.labels" :key="index">
                              <td>
                                <span class="badge bg-secondary">
                                    {{ index+" : " }}
                                  </span>
                                  <span class="badge bg-primary" :title="volumeLabels">
                                    {{ volumeLabels.length > 12 ? volumeLabels.substring(0, 12) + '...' : volumeLabels }}
                                  </span>
                              </td>
                          </tr>
                      </td>
                      <td>{{ dockerVolume.created }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>

    <!-- Docker Networks Tab -->
    <div class="tab-content" id="dockerNetworksTabContent">
      <div class="tab-pane fade show" id="dockerNetworksDiv" role="tabpanel" aria-labelledby="dockerNetworksTab">
          <table class="table table-striped table-bordered table-sm table-hover nowrap"  id="dockerNetworksTable">
              <thead>
                  <tr>
                      <th>Network Id</th>
                      <th>Name</th>
                      <th>Driver</th>
                      <th>Labels</th>
                      <th>Created</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(dockerNetwork, index) in dockerInfo.networks" :key="index">
                      <td>{{ dockerNetwork.network_id }}</td>
                      <td>{{ dockerNetwork.name }}</td>
                      <td>{{ dockerNetwork.driver }}</td>
                      <td>
                          <tr v-for="(networkLabels, index) in dockerNetwork.labels" :key="index">
                              <td>
                                <span class="badge bg-secondary">
                                      {{ index+" : " }}
                                  </span>
                                  <span class="badge bg-primary" :title="networkLabels">
                                      {{ networkLabels.length > 12 ? networkLabels.substring(0, 12) + '...' : networkLabels }}
                                  </span>
                              </td>
                          </tr>
                      </td>
                      <td>{{ dockerNetwork.created }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>

</template>


<script>
    import $ from "jquery";
    import { formatToLocalTime, calculateDatetimeDifference } from '../../utils/timeUtils';
    import { getDockerInfoByAgentId, getDockerInfoChangeLog } from '../../utils/requestUtils';
    import moment from 'moment';

    
    export default {
      name: 'dockerInfoTab',
      data() {
        return {
          dockerInfo: {},
          isInstalled: false,
          dockerImagesCount: 0,
          dockerContainersCount: 0,
          dockerVolumesCount: 0,
          dockerNetworksCount: 0,
          changeLogData: [],
          changeLogCount: 0,
          localUpdateTime: "",
          timeDiff: "",
        };
      },
      mounted() {
        this.fillDockerInfo();
      },
      methods: {
        async fillDockerInfo() {
          try {
            // Get the ID from the URL
            const agentId = this.$route.params.id;

            // Retrieve Docker Info
            this.dockerInfo =  await getDockerInfoByAgentId(agentId);
            // Retrieve Docker Info Changelogs
            this.changeLogData = await getDockerInfoChangeLog(this.dockerInfo.id)
            // Set isInstalled value
            this.isInstalled =  this.dockerInfo.is_installed;
            // Set Docker Images Count if it's installed
            this.dockerImagesCount = this.dockerInfo.images.length;
            // Set Docker Containers Count if it's installed
            this.dockerContainersCount = this.dockerInfo.containers.length;
            // Set Docker Volumes Count if it's installed
            this.dockerVolumesCount = this.dockerInfo.volumes.length;
            // Set Docker Networks Count if it's installed
            this.dockerNetworksCount = this.dockerInfo.networks.length;

            // Set Local Update Time and Time Diff
            this.localUpdateTime = formatToLocalTime(this.dockerInfo.updated);
            this.timeDiff = calculateDatetimeDifference(this.dockerInfo.updated);

            // Set Docker Images Created Time to Local Time
            for(let dockerImage of this.dockerInfo.images){
                dockerImage.created = formatToLocalTime(dockerImage.created)
            }

            // Set Docker Containers Created Time to Local Time
            for(let dockerContainer of this.dockerInfo.containers){
              dockerContainer.created = formatToLocalTime(dockerContainer.created)
            }

            // Set Docker Volumes Created Time to Local Time
            for(let dockerVolume of this.dockerInfo.volumes){
              dockerVolume.created = formatToLocalTime(dockerVolume.created)
            }

            // Set Docker Networks Created Time to Local Time
            for(let dockerNetwork of this.dockerInfo.networks){
              dockerNetwork.created = formatToLocalTime(dockerNetwork.created)
            }

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
              // Set Docker Images Table as Data Table
              $('#dockerImagesTable').DataTable({
                searching: true,
                lengthChange: true,
                pageLength: 10,
                order: [[4, 'desc']],
                lengthMenu: [
                    [10, 25, 50, 100, 250, -1],
                    [10, 25, 50, 100, 250, 'All']
                ],
                columnDefs: [
                  {
                      targets: 4, // Adjust the column index to date column
                      type: 'date-gmt'
                  }
                ]
              });
              // Style length Menu
              const imgPageEntrySize = document.getElementById('dockerImagesTable_length');
              imgPageEntrySize.style = "margin-right:100%";
              const imgPageInfoText = document.getElementById('dockerImagesTable_info');
              imgPageInfoText.style = "float:left";
              
              // Set Docker Containers Table as Data Table
              $('#dockerContainersTable').DataTable({
                searching: true,
                lengthChange: true,
                pageLength: 10,
                order: [[1, 'desc']],
                lengthMenu: [
                    [10, 25, 50, 100, 250, -1],
                    [10, 25, 50, 100, 250, 'All']
                ],
                columnDefs: [
                  {
                      targets: 6, // Adjust the column index to date column
                      type: 'date-gmt'
                  }
                ]
              });
              // Style length Menu
              const containerPageEntrySize = document.getElementById('dockerContainersTable_length');
              containerPageEntrySize.style = "margin-right:100%";
              const containerPageInfoText = document.getElementById('dockerContainersTable_info');
              containerPageInfoText.style = "float:left";
              
              // Set Docker Volumes Table as Data Table
              $('#dockerVolumesTable').DataTable({
                searching: true,
                lengthChange: true,
                pageLength: 10,
                order: [[3, 'desc']],
                lengthMenu: [
                    [10, 25, 50, 100, 250, -1],
                    [10, 25, 50, 100, 250, 'All']
                ],
                columnDefs: [
                  {
                      targets: 3, // Adjust the column index to date column
                      type: 'date-gmt'
                  }
                ]
              });
              // Style length Menu
              const volumePageEntrySize = document.getElementById('dockerVolumesTable_length');
              volumePageEntrySize.style = "margin-right:100%";
              const volumePageInfoText = document.getElementById('dockerVolumesTable_info');
              volumePageInfoText.style = "float:left";

              // Set Docker Networks Table as Data Table
              $('#dockerNetworksTable').DataTable({
                searching: true,
                lengthChange: true,
                pageLength: 10,
                order: [[4, 'desc']],
                lengthMenu: [
                    [10, 25, 50, 100, 250, -1],
                    [10, 25, 50, 100, 250, 'All']
                ],
                columnDefs: [
                  {
                      targets: 4, // Adjust the column index to date column
                      type: 'date-gmt'
                  }
                ]
              });
              // Style length Menu
              const networkPageEntrySize = document.getElementById('dockerNetworksTable_length');
              networkPageEntrySize.style = "margin-right:100%";
              const networkPageInfoText = document.getElementById('dockerNetworksTable_info');
              networkPageInfoText.style = "float:left";
            });

          } catch (error) {
            // If any error occurs, set properties
            this.isInstalled = false;
            this.dockerImageCount = 0;
            this.dockerContainerCount = 0;
            this.dockerVolumesCount = 0;
            this.dockerNetworksCount = 0;
            // Print error to console
            console.error(error);
          }
        },
      },
    };
</script>

<style>
.tooltipdiv {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltipdiv .tooltiptext {
  visibility: hidden;
  width: fit-content;
  height: fit-content;
  background-color: #212529;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltipdiv .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltipdiv:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
