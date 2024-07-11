<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
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

        <!-- Data -->
        <div v-else>
            <div class="row">
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <img src="@/assets/ppl.png" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">
                            <h5 class="my-3">{{ userInfo.name + ' ' + userInfo.lastname }}</h5>
                            <p class="text-muted mb-1">Dasboard User</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                        <div class="mb-3 input-group">
                            <span class="input-group-text"><i class="bi bi-person-badge"></i></span>
                            <input type="text" class="form-control" placeholder="Name" :value="userInfo.name + ' ' + userInfo.lastname" disabled/>
                        </div>
                        <div class="mb-3 input-group">
                            <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                            <input type="email" class="form-control" placeholder="Email" :value="userInfo.email" disabled/>
                        </div>
                        <div class="mb-3 input-group">
                            <span class="input-group-text"><i class="bi bi-calendar-week"></i></span>
                            <input type="text" class="form-control" placeholder="Created" :value="userInfo.created" disabled/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
  import Navbar from '@/components/Navbar.vue';
  import NothingToShowComponent from '@/components/NothingToShowComponent';
  import { formatToLocalTime, calculateDatetimeDifference } from '@/utils/timeUtils';
  import { getUserById } from '@/utils/requestUtils';
  
  export default {
    name: 'UserDetailsView',
    components: {
      Navbar,
      NothingToShowComponent
    },
    data(){
        return{
            userInfo: null,
            loading: true,
            error: false,
        }
    },
    async created(){
        try {
            // Get the UserID from the URL
            const userId = this.$route.params.id;

            this.userInfo = await getUserById(userId);

            // Convert Created Time to Local Time and set the Difference
            this.userInfo.created = formatToLocalTime(this.userInfo.created);
            this.userInfo.created = this.userInfo.created + ' (' + calculateDatetimeDifference(this.userInfo.created) + ')';

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
          return this.userInfo && Object.keys(this.userInfo).length > 0;
        }
      },
    methods:{

    }
  }
</script>

<style>
  #dashboardLastLoginsTable{
    margin-top: 5rem;
  }
</style>
  