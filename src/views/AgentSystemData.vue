

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
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="installedProgramsTab" data-bs-toggle="tab" data-bs-target="#installedPrograms" type="button" role="tab" aria-controls="contact" aria-selected="false">
                <i class="bi bi-window-stack"></i> Installed Programs
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="servicesTab" data-bs-toggle="tab" data-bs-target="#services" type="button" role="tab" aria-controls="contact" aria-selected="false">
                <i class="bi bi-reception-4"></i> Services
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pipPackagesTab" data-bs-toggle="tab" data-bs-target="#pipPackages" type="button" role="tab" aria-controls="contact" aria-selected="false">
                <i class="fa-brands fa-python"></i> Pip Packages
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
        </div>

    </div>
</template>
    
<script>
    import Navbar from '../components/Navbar.vue'
    import SystemInformationTab from '../components/Tabs/SystemInformationTab.vue'
    import SystemUsersTab from '../components/Tabs/SystemUsersTab.vue'
    import SystemInstalledAppsTab from '../components/Tabs/SystemInstalledApps.vue';
    import SystemServicesTab from '../components/Tabs/SystemServicesTab.vue'
    import PipPackagesTab from '../components/Tabs/PipPackagesTab.vue'
    
    export default {
      components: {
        Navbar,
        SystemInformationTab,
        SystemUsersTab,
        SystemInstalledAppsTab,
        SystemServicesTab,
        PipPackagesTab
      },
    };
</script>
    
<style scoped>
    /* Add your custom styles here */
</style>
    