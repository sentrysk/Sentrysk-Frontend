<template>
    <div class="row">
        <div class="col-sm-auto">
            <div class="card">
                <div class="card-header"><i class="bi bi-cpu"></i> Total Agents</div>
                <div class="card-body">
                    <router-link class="nav-link" to="/agents"><p class="card-text">{{ agentCount }}</p></router-link>
                </div>
            </div>
        </div>
        <div class="col-sm-auto">
            <div class="card">
                <div class="card-header"><i class="bi bi-people"></i> Total Users</div>
                <div class="card-body">
                    <p class="card-text">{{ userCount }}</p>
                </div>
            </div>
        </div>
        <div class="col-sm-auto">
            <div class="card">
                <div class="card-header"><i class="bi bi-window"></i> Total Installed Apps</div>
                <div class="card-body">
                    <p class="card-text">{{ installedAppsCount }}</p>
                </div>
            </div>
        </div>
        <div class="col-sm-auto">
            <div class="card">
                <div class="card-header"><i class="bi bi-code-square"></i> Total Services </div>
                <div class="card-body">
                    <p class="card-text">{{ servicesCount }}</p>
                </div>
            </div>
        </div>
        <div class="col-sm-auto">
            <div class="card">
                <div class="card-header"><i class="fa-brands fa-python"></i> Pip Packages</div>
                <div class="card-body">
                    <router-link class="nav-link" to="/pippackages"><p class="card-text">{{ pipPackagesCount }}</p></router-link>
                </div>
            </div>
        </div>
        <div class="col-sm-auto">
            <div class="card">
                <div class="card-header"><i class="fa-brands fa-js"></i> Npm Packages</div>
                <div class="card-body">
                    <router-link class="nav-link" to="/npmpackages"><p class="card-text">{{ npmPackagesCount }}</p></router-link>
                </div>
            </div>
        </div>
        <div class="col-sm-auto">
            <div class="card">
                <div class="card-header"><i class="fa-brands fa-docker"></i> Installed Docker</div>
                <div class="card-body">
                    <p class="card-text">{{ installedDockerCount }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    // @ is an alias to /src
    import { getHomePageStatistics } from '@/utils/requestUtils.js';
    
    export default {
        name: 'GeneralStatistics',
        data(){
            return{
                agentCount: 0,
                userCount: 0,
                installedAppsCount: 0,
                servicesCount: 0,
                pipPackagesCount: 0,
                npmPackagesCount: 0,
                installedDockerCount: 0,
                homePageData: {}
            }
        },
        mounted(){
            this.fillHomePageStatistics();
        },
        methods:{
            async fillHomePageStatistics(){
                this.homePageData = await getHomePageStatistics();

                this.agentCount = this.homePageData.agent_count;
                this.userCount  = this.homePageData.sys_user_count;
                this.installedAppsCount = this.homePageData.installed_apps_count;
                this.servicesCount = this.homePageData.services_count;
                this.pipPackagesCount = this.homePageData.pip_packages_count;
                this.npmPackagesCount = this.homePageData.npm_packages_count;
                this.installedDockerCount = this.homePageData.installed_docker_count;

            }
        }
    }
</script>
  