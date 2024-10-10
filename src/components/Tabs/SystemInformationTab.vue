<template>
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="agentHomeContentTab" data-bs-toggle="tab" data-bs-target="#agentHomeContent" type="button" role="tab" aria-controls="agentHomeContent" aria-selected="true"><i class="fa-solid fa-house"></i> Home</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="systemOsTab" data-bs-toggle="tab" data-bs-target="#systemOs" type="button" role="tab" aria-controls="systemOs" aria-selected="false"><i class="bi bi-code-square"></i> OS</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="systemDomainTab" data-bs-toggle="tab" data-bs-target="#systemDomain" type="button" role="tab" aria-controls="systemDomain" aria-selected="false"><i class="fa-solid fa-network-wired"></i> Domain</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="systemCpuTab" data-bs-toggle="tab" data-bs-target="#systemCpu" type="button" role="tab" aria-controls="systemCpu" aria-selected="false"><i class="bi bi-cpu"></i> CPU</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="systemMemoryTab" data-bs-toggle="tab" data-bs-target="#systemMemory" type="button" role="tab" aria-controls="systemMemory" aria-selected="false"><i class="bi bi-memory"></i> Memory</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="systemDisksTab" data-bs-toggle="tab" data-bs-target="#systemDisks" type="button" role="tab" aria-controls="systemDisks" aria-selected="false"><i class="bi bi-hdd-stack"></i> Disks</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="systemNetworkInterfacesTab" data-bs-toggle="tab" data-bs-target="#systemNetworkInterfaces" type="button" role="tab" aria-controls="systemNetworkInterfaces" aria-selected="false"><i class="bi bi-wifi"></i> Network Interfaces</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="systemChangelogTab" data-bs-toggle="tab" data-bs-target="#systemChangelog" type="button" role="tab" aria-controls="systemChangelog" aria-selected="false"><i class="bi bi-file-diff"></i> Changelogs</button>
        </li>
    </ul>

    <!-- Last Update -->
    <div class="row">
        <span :title=systemInfoLocalUpdateTime>Last Update : {{ systemInfoUpdateTimeDiff }}</span>
    </div>

    <div class="tab-content" id="sysInfoTabContent">
        <!-- Home Tab -->
        <div class="tab-pane fade show active" id="agentHomeContent" role="tabpanel" aria-labelledby="agentHomeContent">
            <div class="tab-content" id="agentHomeTabContent">
            <div v-if="agentDataLoading">
            <div class="loading-content">
                <i class="fas fa-spinner fa-spin fa-3x"></i>
                <h2>Loading...</h2>
            </div>
            </div>

            <div v-else-if="agentDataError">
            <div class="error-content">
                <i class="fas fa-exclamation-triangle fa-3x"></i>
                <h2>Error loading data. Please try again later.</h2>
            </div>
            </div>

            <!-- Agent Home Page -->
            <div v-else>
                <div class="row">
                    <hr>
                        <div class="row">
                            <!-- OS Section -->
                            <div class="col-md-4">
                                <div class="header-info-box">
                                    OS: <strong v-if="systemInfo.os">{{ systemInfo.os.system }}</strong><br>
                                    Ver: <strong v-if="systemInfo.os">{{ systemInfo.os.version }}</strong><br>
                                    Rel: <strong v-if="systemInfo.os">{{ systemInfo.os.release }}</strong><br>
                                </div>
                            </div>
                            <!-- End OS Section -->
                            <!-- Domain Section -->
                            <div v-if="systemInfo.domain" class="col-md-4">
                                <div class="header-info-box">
                                    Hostname: {{ systemInfo.domain.dns_hostname }}<br>
                                    Domain: {{ systemInfo.domain.domain }}<br>
                                    <br>
                                </div>
                            </div>
                            <!-- End Domain Section -->
                            <!-- Memory Section -->
                            <div v-if="systemInfo.memory" class="col-md-4">
                                <div class="header-info-box">
                                    Memory: {{ systemInfo.memory.total_memory }}<br>
                                    <br>
                                    <br>
                                </div>
                            </div>
                            <!-- End Memory Section -->
                        </div>
                        
                    <hr>
                </div> 
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
                        <div class="row">
                            <div class="accordion" id="accordionCharts">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCharts" aria-expanded="true" aria-controls="collapseCharts">
                                        <i class="bi bi-hdd-stack"></i> Charts
                                    </button>
                                    </h2>
                                    <div id="collapseCharts" class="accordion-collapse collapse show" data-bs-parent="#accordionCharts">
                                        <div class="accordion-body row">
                                            <LatestCpuUsageChart></LatestCpuUsageChart>
                                            <LatestMemoryUsageChart></LatestMemoryUsageChart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
        </div>

        <!-- OS Tab -->
        <div class="tab-pane fade" id="systemOs" role="tabpanel" aria-labelledby="systemOs">
            <!-- Use Bootstrap Cards to display the data -->
            <div class="row">
                <div class="col-md-6" v-for="(item, index) in systemInfo.os" :key="index">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{{ index }}</h3>
                            <p class="card-text">{{ item }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Domain Tab -->
        <div class="tab-pane fade" id="systemDomain" role="tabpanel" aria-labelledby="systemDomain">
            <!-- Use Bootstrap Cards to display the data -->
            <div class="row">
                <div class="col-md-6" v-for="(item, index) in systemInfo.domain" :key="index">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{{ index }}</h3>
                            <p class="card-text">{{ item }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- CPU Tab -->
        <div class="tab-pane fade" id="systemCpu" role="tabpanel" aria-labelledby="systemCpu">
            <!-- Use Bootstrap Cards to display the data -->
            <div class="row">
                <div class="col-md-6" v-for="(item, index) in systemInfo.cpu" :key="index">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{{ index }}</h3>
                            <p class="card-text">{{ item }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <CpuUsageChart></CpuUsageChart>
        </div>

        <!-- Memory Tab -->
        <div class="tab-pane fade" id="systemMemory" role="tabpanel" aria-labelledby="systemMemory">
            <!-- Use Bootstrap Cards to display the data -->
            <div class="row">
                <div class="col-md-6" v-for="(item, index) in systemInfo.memory" :key="index">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{{ index }}</h3>
                            <p class="card-text">{{ item }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <MemoryUsageChart></MemoryUsageChart>
        </div>
        
        <!-- Disks Tab -->
        <div class="tab-pane fade" id="systemDisks" role="tabpanel" aria-labelledby="systemDisks">
            <!-- Use Bootstrap Cards to display the data -->
            <div class="row">
                <div class="col-md-6" v-for="(item, index) in systemInfo.disks" :key="index">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{{ index }}</h3>
                            <table class="table table-striped table-bordered table-sm">
                                <tbody>
                                    <tr v-for="(diskVal, diskKey) in item" :key="diskKey">
                                        <td>
                                            {{ diskKey }}
                                        </td>
                                        <td>
                                            {{ diskVal }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <DiskUsageChart></DiskUsageChart>
        </div>
       
        <!-- Network Interfaces Tab -->
        <div class="tab-pane fade" id="systemNetworkInterfaces" role="tabpanel" aria-labelledby="systemNetworkInterfaces">
            <!-- Use Bootstrap Cards to display the data -->
            <div class="row">
                <div class="col-md-6" v-for="(item, index) in systemInfo.network_interfaces" :key="index">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{{ index }}</h3>
                            <h4>MAC Addr : {{ item.mac_address }}</h4>
                            <table class="table table-striped table-bordered table-sm">
                                <thead>
                                    <th>
                                        family
                                    </th>
                                    <th>
                                        Address
                                    </th>
                                    <th>
                                        Netmask
                                    </th>
                                    <th>
                                        Broadcast
                                    </th>
                                </thead>
                                <tbody v-if="item.IPv4 && item.IPv6">
                                    <tr>
                                        <td>
                                            IPv4
                                        </td>
                                        <td>
                                            {{ item.IPv4.address }}
                                        </td>
                                        <td>
                                            {{ item.IPv4.netmask }}
                                        </td>
                                        <td>
                                            {{ item.IPv4.broadcast }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            IPv6
                                        </td>
                                        <td>
                                            {{ item.IPv6.address }}
                                        </td>
                                        <td>
                                            {{ item.IPv6.netmask }}
                                        </td>
                                        <td>
                                            {{ item.IPv6.broadcast }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Changelog Tab -->
        <div class="tab-pane fade" id="systemChangelog" role="tabpanel" aria-labelledby="systemChangelog">
            <!-- Use Bootstrap Cards to display the data -->
            <div class="row">
                <table class="table table-hover table-bordered table-sm" id="changelogsTable">
                    <thead class="table-dark">
                        <tr>
                            <th>Timestamp</th>
                            <th>Changes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in changeLog" :key="index">
                            <td><span>{{ item.timestamp }}</span></td>
                            <td>
                                <table class="table table-striped table-bordered table-sm">
                                    <tr v-for="(change, key) in item.changes" :key="key">
                                        <td><h3>{{ key }}</h3></td>
                                        <td>
                                            <table class="table table-bordered table-sm">
                                                <tr>
                                                    <th>Field</th>
                                                    <th>New Value</th>
                                                    <th>Previous Value</th>
                                                </tr>
                                                <tr v-for="(newValue, field) in change.new_value" :key="field">
                                                    <td>{{ field }}</td>
                                                    
                                                    <td v-if="newValue != change.previous_value[field]" style="color: green;">{{ newValue }}</td>
                                                    <td v-else>{{ newValue }}</td>

                                                    <td v-if="newValue != change.previous_value[field]" style="color: crimson;">{{ change.previous_value[field] }}</td>
                                                    <td v-else>{{ change.previous_value[field] }}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>


<script>
    import $ from "jquery";
    import { formatToLocalTime,calculateDatetimeDifference } from '@/utils/timeUtils';
    import { getSystemInformation, getSysInfoChangeLog, getAgentDataById } from '@/utils/requestUtils';
    import DiskUsageChart from '@/components/Tabs/SystemInfoSubTabs/DiskUsageChart.vue';
    import MemoryUsageChart from '@/components/Tabs/SystemInfoSubTabs/MemoryUsageChart.vue';
    import CpuUsageChart from "@/components/Tabs/SystemInfoSubTabs/CpuUsageChart.vue";
    import LatestCpuUsageChart from "@/components/Tabs/SystemInfoSubTabs/LatestCpuUsageChart.vue";
    import LatestMemoryUsageChart from '@/components/Tabs/SystemInfoSubTabs/LatestMemoryUsageChart.vue';
    
    export default {
      name: 'SystemInformationTab',
      data() {
        return {
          agentDataLoading: true,
          agentDataError: false,
          agentData: null,
          showToken: false,
          systemInfo: {},
          changeLog: {},
          systemInfoLocalUpdateTime: "",
          systemInfoUpdateTimeDiff: "",
        };
      },
      components:{
        DiskUsageChart,
        MemoryUsageChart,
        CpuUsageChart,
        LatestCpuUsageChart,
        LatestMemoryUsageChart
      },
      mounted() {
        this.fillSystemInformation();
      },
      methods: {
        async fillSystemInformation() {
            // Get the Agent ID from the URL
            const agentId = this.$route.params.id;

            try{
                // Retrieve Agent Data
                this.agentData = await getAgentDataById(agentId);
                // Convert Created Time to Local Time
                this.agentData.created = formatToLocalTime(this.agentData.created);
            } catch (error) {
                // Print error to console
                console.error(error);
                // Set error property true
                this.agentDataError = true;
            } finally {
                this.agentDataLoading = false;
            }
            
            // Get System Information
            this.systemInfo = await getSystemInformation(agentId);
            // Get System Information Changelog
            this.changeLog = await getSysInfoChangeLog(this.systemInfo.id)

            // Set Local Update Time and Time Diff
            this.systemInfoLocalUpdateTime = formatToLocalTime(this.systemInfo.updated);
            this.systemInfoUpdateTimeDiff = calculateDatetimeDifference(this.systemInfo.updated);

            // Set Changelog Timestamps to Local Time
            for (const element of this.changeLog) {
                element.timestamp = formatToLocalTime(element.timestamp)
            }

            // Set Datatable
            $(document).ready(() => {
                $('#changelogsTable').DataTable({
                searching: true,
                lengthChange: true,
                pageLength: 10,
                lengthMenu: [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, 'All']
                ],
                order: [ 0, 'desc' ],
                });
                // Style length Menu
                const pageEntrySize = document.getElementById('changelogsTable_length')
                pageEntrySize.style = "margin-right:100%"
                const pageInfoText = document.getElementById('changelogsTable_info')
                pageInfoText.style = "float:left"
            });
        },
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
.header-info-box {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 8rem;
}
</style>