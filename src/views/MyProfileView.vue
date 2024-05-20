<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
        <div class="card">
            <div class="card-body">

            </div>
        </div>
    </div>
    
</template>
  
<script>
  import Navbar from '@/components/Navbar.vue';
  import { getLoggedUserInfo } from '@/utils/requestUtils';
  
  export default {
    name: 'DashboardLastLoginsView',
    components: {
      Navbar,
    },
    data(){
        return{
            name:"",
            lastname:"",
            email:"",
            created:""
        }
    },
    mounted(){
        this.fillLoggedUserInfo();
    },
    methods:{
        async fillLoggedUserInfo(){
            const loggedUserData = await getLoggedUserInfo();
        }
    }
  }
</script>

<style>
  #dashboardLastLoginsTable{
    margin-top: 5rem;
  }
</style>
  