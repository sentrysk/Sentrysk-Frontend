<template>
    <p>IsInstalled: {{ isInstalled }}</p>
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="dockerImagesTab" data-bs-toggle="tab" data-bs-target="#dockerImagesDiv" type="button" role="tab" aria-controls="dockerImagesDiv" aria-selected="true">
              <i class="fa-solid fa-database"></i> Images
              <span class="badge rounded-pill bg-primary">
                {{ dockerImageCount }}
              </span>
            </button>
        </li>
    </ul>

    <!-- Last Update -->
    <div class="row">
      <span :title=localUpdateTime>Last Update : {{ timeDiff }}</span>
    </div>

    <div class="tab-content" id="dockerImagesTabContent">
        <div class="tab-pane fade show active" id="dockerImagesDiv" role="tabpanel" aria-labelledby="dockerImagesTab">
            <table class="table table-striped table-bordered table-sm table-hover nowrap"  id="dockerImagesTable">
                <thead>
                    <tr>
                        <th>Image ID</th>
                        <th>Size</th>
                        <th>Tags</th>
                        <th>Created</th>
                        <th>Labels</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(dockerImage, index) in dockerInfo.images" :key="index">
                        <td>{{ dockerImage.image_id }}</td>
                        <td>{{ dockerImage.size }}</td>
                        <td>{{ dockerImage.tags }}</td>
                        <td>{{ dockerImage.created }}</td>
                        <td>
                            <tr v-for="(imageLabels, index) in dockerImage.labels" :key="index">
                                <td>
                                    <span class="badge rounded-pill bg-primary">
                                        {{ imageLabels }}
                                    </span>
                                </td>
                            </tr>
                        </td>
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