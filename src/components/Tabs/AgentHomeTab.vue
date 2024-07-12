<template>
  <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item" role="presentation">
          <button class="nav-link active" id="agentHomeTab" data-bs-toggle="tab" data-bs-target="#agentHomeDiv" type="button" role="tab" aria-controls="agentHomeDiv" aria-selected="true">
              <i class="fa-solid fa-house"></i> Home
          </button>
      </li>
  </ul>

  <div class="tab-content" id="agentHomeTabContent">
      <div class="tab-pane fade show active" id="agentHomeDiv" role="tabpanel" aria-labelledby="agentHomeTab">
        <div v-if="loading">
          <div class="loading-content">
            <i class="fas fa-spinner fa-spin fa-3x"></i>
            <h2>Loading...</h2>
          </div>
        </div>

        <div v-else-if="error">
          <div class="error-content">
            <i class="fas fa-exclamation-triangle fa-3x"></i>
            <h2>Error loading data. Please try again later.</h2>
          </div>
        </div>

        <div v-else-if="!hasData">
          <NothingToShowComponent />
        </div>

        <!-- Agent Home Page -->
        <div v-else>
          <div class="row">
            <div class="col-md-2">

              <div class="card mb-4">
                <div class="card-body text-center">
                  <!-- Icon Div-->
                  <div class="icon-div rounded-circle img-fluid">
                    <span v-if="agentData.type === 'windows'" title="Windows" class="icon-content">
                      <i class="bi bi-windows"></i>
                    </span>
                    <span v-else-if="agentData.type === 'linux'" title="Linux" class="icon-content">
                      <i class="fab fa-linux"></i>
                    </span>
                    <span v-else-if="agentData.type === 'macos'" title="macOS" class="icon-content">
                      <i class="bi bi-apple"></i>
                    </span>
                  </div>

                  <div class="mb-3 input-group">
                      <span class="input-group-text" title="Created By"><i class="bi bi-person-badge"></i></span>
                      <input type="text" class="form-control" placeholder="Created By"  :value="agentData.created_by.name + ' ' + agentData.created_by.lastname " disabled/>
                      <router-link class="navbar-brand" :to="'/users/'+agentData.created_by.id">
                      <span class="input-group-text"><i class="bi bi-arrow-right-circle"></i></span>
                      </router-link>
                  </div>
                  <div class="mb-3 input-group">
                      <span class="input-group-text" title="Created Time"><i class="bi bi-calendar-week"></i></span>
                      <input type="text" class="form-control" placeholder="Created" :value="agentData.created" disabled/>
                  </div>
                  <div class="mb-3 input-group">
                    <span class="input-group-text" title="Token"><i class="bi bi-lock"></i></span>
                    <input 
                      :type="showToken ? 'text' : 'password'"
                      class="form-control" 
                      placeholder="Token" 
                      :value="agentData.token" 
                      disabled/>
                    <button type="button" class="btn btn-outline-secondary" @click="toggleTokenVisibility">
                      <i :class="['bi', showToken ? 'bi-eye-slash' : 'bi-eye']"></i>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-md-6">

            </div>
          </div>
        </div>
      </div>
  </div>


</template>


<script>
  import { getAgentDataById } from '@/utils/requestUtils';
  import { formatToLocalTime } from '@/utils/timeUtils';
  
  export default {
    name: 'agentHomeTab',
    data() {
      return {
        loading: true,
        error: false,
        agentData: null,
        showToken: false,
      };
    },
    async created() {
      try {
          // Get the ID from the URL
          const agentId = this.$route.params.id;

          // Retrieve Npm Packages
          this.agentData = await getAgentDataById(agentId);

          this.agentData.created = formatToLocalTime(this.agentData.created);

        } catch (error) {
          // Print error to console
          console.error(error);
          // Set error property true
          this.error = true;
        } finally {
          this.loading = false;
        }
    },
    computed: {
      hasData() {
        return this.agentData && Object.keys(this.agentData).length > 0;
      }
    },
    methods: {
      toggleTokenVisibility() {
        this.showToken = !this.showToken;
      },
    },
  };
</script>

<style>
.icon-div {
  border-radius: 100%; 
  text-align: center;
  position: relative;
  overflow: hidden;
  display: inline-block;
  padding: 2px;
  height: 4rem;
  width: 10rem;
  background: linear-gradient(to right, #2b2e4a, #51568a);;
}
.icon-content{
  color: white;
  font-size: 6rem;
}
</style>
