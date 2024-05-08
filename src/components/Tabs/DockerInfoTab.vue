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
                {{ dockerImageCount }}
              </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="dockerContainersTab" data-bs-toggle="tab" data-bs-target="#dockerContainersDiv" type="button" role="tab" aria-controls="dockerContainersDiv" aria-selected="false">
              <i class="bi bi-boxes"></i> Containers
              <span class="badge rounded-pill bg-primary">
                {{ dockerContainerCount }}
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
                                  <span class="badge rounded-pill bg-primary">
                                      {{ imageTags }}
                                  </span>
                              </td>
                          </tr>
                      </td>
                      <td>
                          <tr v-for="(imageLabels, index) in dockerImage.labels" :key="index">
                              <td>
                                  <span class="badge rounded-pill bg-primary">
                                      {{ imageLabels }}
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
                      <td>{{ dockerContainer.status }}</td>
                      <td>{{ dockerContainer.container_id }}</td>
                      <td>{{ dockerContainer.image }}</td>
                      <td>{{ dockerContainer.ports }}</td>
                      <td>{{ dockerContainer.networks }}</td>
                      <td>{{ dockerContainer.labels }}</td>
                      <td>{{ dockerContainer.created }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>

</template>


<script>
    import { formatToLocalTime,calculateDatetimeDifference } from '../../utils/timeUtils';
    import { getDockerInfoByAgentId } from '../../utils/requestUtils'

    
    export default {
      name: 'dockerInfoTab',
      data() {
        return {
          dockerInfo: {},
          isInstalled: false,
          dockerImageCount: 0,
          dockerContainerCount: 0,
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
            console.log(this.dockerInfo)
            // Set isInstalled value
            this.isInstalled =  this.dockerInfo.is_installed;
            // Set Docker Image Count if it's installed
            this.dockerImageCount = this.dockerInfo.images.length;
            // Set Docker Container Count if it's installed
            this.dockerContainerCount = this.dockerInfo.containers.length;

            // Set Local Update Time and Time Diff
            this.localUpdateTime = formatToLocalTime(this.dockerInfo.updated);
            this.timeDiff = calculateDatetimeDifference(this.dockerInfo.updated);

            // Set Docker Images Created Time to Local Time
            for(let dockerImage of this.dockerInfo.images){
                dockerImage.created = formatToLocalTime(dockerImage.created)
            }

          } catch (error) {
            // If any error occurs, set properties
            this.isInstalled = false;
            this.dockerImageCount = 0;
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