

<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container-fluid">
      <h1></h1>
      
      <!-- Tabs -->
      <ul class="nav nav-tabs" id="mainTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="systemTab" data-bs-toggle="tab" data-bs-target="#system" type="button" role="tab" aria-controls="system" aria-selected="true">
                <i class="bi bi-cpu"></i> System
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="usersTab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab" aria-controls="users" aria-selected="false">
                <i class="bi bi-people"></i> Users
                <span class="badge rounded-pill bg-primary">
                    {{ agentStats.sys_user_count }}
                </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="installedProgramsTab" data-bs-toggle="tab" data-bs-target="#installedPrograms" type="button" role="tab" aria-controls="contact" aria-selected="false">
                <i class="bi bi-window-stack"></i> Installed Programs
                <span class="badge rounded-pill bg-primary">
                    {{ agentStats.sys_installed_apps_count }}
                </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="servicesTab" data-bs-toggle="tab" data-bs-target="#services" type="button" role="tab" aria-controls="contact" aria-selected="false">
                <i class="bi bi-reception-4"></i> Services
                <span class="badge rounded-pill bg-primary">
                    {{ agentStats.sys_services_count }}
                </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pipPackagesTab" data-bs-toggle="tab" data-bs-target="#pipPackages" type="button" role="tab" aria-controls="contact" aria-selected="false">
                <i class="fa-brands fa-python"></i> Pip Packages
                <span class="badge rounded-pill bg-primary">
                    {{ agentStats.sys_pip_packages_count }}
                </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="npmPackagesTab" data-bs-toggle="tab" data-bs-target="#npmPackages" type="button" role="tab" aria-controls="contact" aria-selected="false">
                <i class="fa-brands fa-npm"></i> Npm Packages
                <span class="badge rounded-pill bg-primary">
                    {{ agentStats.sys_npm_packages_count }}
                </span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="dockerInfoTab" data-bs-toggle="tab" data-bs-target="#dockerInfo" type="button" role="tab" aria-controls="contact" aria-selected="false">
                <i class="fa-brands fa-docker"></i> Docker
            </button>
        </li>
      </ul>

        <!-- Tab Contents-->
        <div class="tab-content" id="mainTabContent">
            <!-- System Information Tab -->
            <div class="tab-pane fade show active" id="system" role="tabpanel" aria-labelledby="systemTab">
                <!-- System Information Sub Tabs -->
                <SystemInformationTab></SystemInformationTab>
            </div>
            <!-- System Users Tab -->
            <div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="usersTab">
                <SystemUsersTab></SystemUsersTab>
            </div>
            <!-- Installed Programs Tab -->
            <div class="tab-pane fade" id="installedPrograms" role="tabpanel" aria-labelledby="installedProgramsTab">
                <SystemInstalledAppsTab></SystemInstalledAppsTab>
            </div>
            <!-- Services Tab -->
            <div class="tab-pane fade" id="services" role="tabpanel" aria-labelledby="servicesTab">
                <SystemServicesTab></SystemServicesTab>
            </div>
            <!-- Pip Packages Tab -->
            <div class="tab-pane fade" id="pipPackages" role="tabpanel" aria-labelledby="pipPackagesTab">
                <PipPackagesTab></PipPackagesTab>
            </div>
            <!-- Npm Packages Tab -->
            <div class="tab-pane fade" id="npmPackages" role="tabpanel" aria-labelledby="npmPackagesTab">
                <NpmPackagesTab></NpmPackagesTab>
            </div>
            <!-- Docker Info Tab -->
            <div class="tab-pane fade" id="dockerInfo" role="tabpanel" aria-labelledby="dockerInfoTab">
                <DockerInfoTab></DockerInfoTab>
            </div>
            <!-- Agent Config Tab -->
            <div class="tab-pane fade" id="agentConfig" role="tabpanel" aria-labelledby="agentConfigTab">
                <AgentConfigTab></AgentConfigTab>
            </div>
        </div>

    </div>
</template>
    
<script>
    import Navbar from '../components/Navbar.vue';
    import SystemInformationTab from '../components/Tabs/SystemInformationTab.vue';
    import SystemUsersTab from '../components/Tabs/SystemUsersTab.vue';
    import SystemInstalledAppsTab from '../components/Tabs/SystemInstalledApps.vue';
    import SystemServicesTab from '../components/Tabs/SystemServicesTab.vue';
    import PipPackagesTab from '../components/Tabs/PipPackagesTab.vue';
    import NpmPackagesTab from '../components/Tabs/NpmPackagesTab.vue';
    import DockerInfoTab from '@/components/Tabs/DockerInfoTab.vue';
    import AgentConfigTab from '@/components/Tabs/AgentConfigTab.vue';

    import { getAgentStatistics } from '../utils/requestUtils';
    
    export default {
      components: {
        Navbar,
        SystemInformationTab,
        SystemUsersTab,
        SystemInstalledAppsTab,
        SystemServicesTab,
        PipPackagesTab,
        NpmPackagesTab,
        DockerInfoTab,
        AgentConfigTab
      },
      data(){
            return{
                agentStats: {}
            }
        },
        mounted(){
            this.fillAgentStatistics();
        },
        methods:{
            async fillAgentStatistics(){
                this.agentStats = await getAgentStatistics(this.$route.params.id);
            }
        }
    };
</script>
    
<style scoped>
    /* Add your custom styles here */
</style>
    