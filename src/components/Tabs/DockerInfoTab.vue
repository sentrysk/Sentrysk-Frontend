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
                          <span :title="JSON.stringify(containerPort)" class="badge bg-primary">{{ index }}</span>
                        </tr>
                      </td>
                      <td>{{ dockerContainer.networks }}</td>
                      <td>
                          <tr v-for="(containerLabels, index) in dockerContainer.labels" :key="index">
                              <td>
                                <span class="badge bg-secondary">
                                      {{ index+" : " }}
                                  </span>
                                  <span class="badge bg-primary">
                                      {{ containerLabels }}
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

            // Set Docker Containers Created Time to Local Time
            for(let dockerContainer of this.dockerInfo.containers){
              dockerContainer.created = formatToLocalTime(dockerContainer.created)
            }

          } catch (error) {
            // If any error occurs, set properties
            this.isInstalled = false;
            this.dockerImageCount = 0;
            this.dockerContainerCount = 0;
            // Print error to console
            console.error(error);
          }
        },
      },
    };
</script>

<style>
.tooltip {
  --r: 30px; /* control the radius */
  --h: 50px; /* control the height of the tail */
  --p: 30%;  /* control the position of the tail */

  padding: var(--r);
  border-bottom: var(--h) solid #0000;
  --m:
    /* adjust the angles of the 1st conic-gradient to control the shape */
    conic-gradient(from 30deg at var(--p) 100%,#0000,#000 1deg 30deg,#0000 31deg)
     0 100%/100% calc(100% - var(--r)) no-repeat,
    conic-gradient(at calc(var(--r)/2) calc(var(--r)/2),#000 270deg,#0000 0)
     0 0/calc(100% - var(--r)/2) calc(100% - var(--r)/2) padding-box,
    radial-gradient(50% 50%,#000 98%,#0000) 
     0 0/var(--r) var(--r) space padding-box;
  -webkit-mask: var(--m);
          mask: var(--m);
  
    
  margin: 50px auto;
  max-width: 350px;
  font-size: 20px;
  background: linear-gradient(135deg,#FE6D00,#1384C5) border-box;
  color: #fff;
}
</style>