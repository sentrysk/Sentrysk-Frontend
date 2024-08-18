import axios from 'axios';

// Global Variables
const API_URL  =  "http://localhost:8000"
const USER_EP = "/user/"
const USER_DETAILS_EP = "details"
const SESSIONS_EP = "/session"
const MY_LOGINS_EP = SESSIONS_EP + "/prev_sessions"
const SYS_INFO_EP = "/sysinfo/"
const SYS_USR_EP = "/sysusers/"
const SYS_USR_LAST_LOGN_EP = SYS_USR_EP + "lastlogons/"
const SYS_APPS_EP = "/sysapps/"
const SYS_SRVCS_EP = "/sysservices/"
const CHLG_EP = "/changelog"
const INF_DT_EP = "/inf_data"
const HOME_PG_STS_EP = INF_DT_EP + "/homepage"
const PIP_PKGS_EP = "/pippkgs/"
const NPM_PKGS_EP = "/npmpkgs/"
const AGNT_PG_STS_EP = INF_DT_EP + "/agent/"
const DCKR_INF_EP = "/dockerinfo/"
const FRMTD_DP = "formatted"
const AGNT_EP = "/agent/"
const AGNT_CFG_EP = AGNT_EP + "config/"
const DISK_USG_EP = "/diskusage/"
const MEM_USG_EP = "/memusage/"
const CPU_USG_EP = "/cpu_usage/"
const LATEST = "/latest"

// Get System Information by Agent Id
export async function getSystemInformation(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_INFO_EP + agentId;
        const response =  await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch(error) {
        console.error('Error fetching System Information:', error);
    }
}

// Get System Information Changelog by System Info Id
export async function getSysInfoChangeLog(sysInfoId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_INFO_EP + sysInfoId + CHLG_EP;
        const changelog = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return changelog.data
    } catch (error) {
        console.error('Error fetching System Information Changelog:', error);
    }
}

// Get System Users by Agent Id
export async function getSystemUsers(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_USR_EP + agentId;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching System Users:', error);
    }
}

// Get System Users Last Logons by Agent Id
export async function getSystemUsersLastLogons(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_USR_LAST_LOGN_EP + agentId;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching System Users Last Logons:', error);
    }
}

// Get System Users Changelog by System Users Id
export async function getSysUsersChangeLog(sysUsersId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_USR_EP + sysUsersId + CHLG_EP;
        const changelog = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return changelog.data
    } catch (error) {
        console.error('Error fetching System Users Changelog:', error);
    }
}

// Get All System Apps
export async function getAllInstalledApps(){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_APPS_EP
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching System Apps:', error);
    }
}

// Get All System Apps Formatted
export async function getAllInstalledAppsFormatted(){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_APPS_EP + FRMTD_DP
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching System Apps:', error);
    }
}

// Get System Apps by Agent Id
export async function getInstalledApps(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_APPS_EP + agentId;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching System Apps:', error);
    }
}

// Get Installed Apps Changelog by System Installed Apps Id
export async function getInstalledAppsChangeLog(sysInstalledAppsId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_APPS_EP + sysInstalledAppsId + CHLG_EP;
        const changelog = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return changelog.data
    } catch (error) {
        console.error('Error fetching System Apps Changelog:', error);
    }
}

// Get System Services by Agent Id
export async function getServices(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_SRVCS_EP + agentId;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching System Services:', error);
    }
}

// Get System Services Changelog by System Services Id
export async function getServicesChangeLog(sysServicesId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + SYS_SRVCS_EP + sysServicesId + CHLG_EP;
        const changelog = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return changelog.data
    } catch (error) {
        console.error('Error fetching System Services Changelog:', error);
    }
}

// Get System Pip Packages
export async function getAllPipPackages(){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + PIP_PKGS_EP;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Pip Packages:', error);
    }
}

// Get All Pip Packages Formatted
export async function getAllPipPackagesFormatted(){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + PIP_PKGS_EP + FRMTD_DP
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Pip Packages:', error);
    }
}

// Get System Pip Packages by Agent Id
export async function getPipPackagesByAgentId(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + PIP_PKGS_EP + agentId;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching System Apps:', error);
    }
}

// Get Pip Packages Changelog by Pip Packages Id
export async function getPipPackagesChangeLog(pipPkgsId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + PIP_PKGS_EP + pipPkgsId + CHLG_EP;
        const changelog = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return changelog.data
    } catch (error) {
        console.error('Error fetching System Apps Changelog:', error);
    }
}

// Get All Npm Packages
export async function getAllNpmPackages(){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + NPM_PKGS_EP;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Npm Packages:', error);
    }
}

// Get All Npm Packages Formatted
export async function getAllNpmPackagesFormatted(){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + NPM_PKGS_EP + FRMTD_DP
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Npm Packages:', error);
    }
}

// Get System Npm Packages by Agent Id
export async function getNpmPackagesByAgentId(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + NPM_PKGS_EP + agentId;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching System Apps:', error);
    }
}

// Get Npm Packages Changelog by Npm Package Id
export async function getNpmPackagesChangeLog(npmPkgsId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + NPM_PKGS_EP + npmPkgsId + CHLG_EP;
        const changelog = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return changelog.data
    } catch (error) {
        console.error('Error fetching System Apps Changelog:', error);
    }
}

// Get Docker Info by Agent Id
export async function getDockerInfoByAgentId(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + DCKR_INF_EP + agentId;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Docker Info:', error);
    }
}

// Get Docker Info Changelog by Docker Info Id
export async function getDockerInfoChangeLog(dockerInfoId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + DCKR_INF_EP + dockerInfoId + CHLG_EP;
        const changelog = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return changelog.data
    } catch (error) {
        console.error('Error fetching Docker Info Changelog:', error);
    }
}

// Get Agent Configs by Agent ID
export async function getAgentConfigByAgentId(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + AGNT_CFG_EP + "agent/" + agentId.toString();
        const agentConfig = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return agentConfig.data
    } catch (error) {
        console.error('Error fetching Agent Config:', error);
    }
}

// Get Agent Config Changelog by Agent Config ID
export async function getAgentConfigChangelog(agentConfigId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + AGNT_CFG_EP + agentConfigId.toString() + CHLG_EP;
        const agentConfig = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return agentConfig.data
    } catch (error) {
        console.error('Error fetching Agent Config Changelog:', error);
    }
}

// Get my User Last Dashboard Logins
export async function getMyLastDashboardLogins(){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + MY_LOGINS_EP;
        const myLoginsData = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return myLoginsData.data
    } catch (error) {
        console.error('Error fetching Last Logins:', error);
    }
}

// Get Home Page Statistics
export async function getHomePageStatistics(){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + HOME_PG_STS_EP;
        const homepageData = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return homepageData.data
    } catch (error) {
        console.error('Error fetching Home Page Statistics:', error);
    }
}

// Get Agent Statistics
export async function getAgentStatistics(agentId){
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + AGNT_PG_STS_EP + agentId.toString();
        const agentStats = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return agentStats.data
    } catch (error) {
        console.error('Error fetching Agent Statistics:', error);
    }
}

// Get Logged User Info
export async function getLoggedUserInfo(jwtToken){
    try {
        // Retrieve JWT token from session storage
        const URL = API_URL + USER_EP + USER_DETAILS_EP;
        const userInfo = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return userInfo
    } catch (error) {
        console.error('Error fetching Logged User Info:', error);
    }
}

// Get Disk Usage Data by Agent ID
export async function getDiskUsageData(agentId) {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + DISK_USG_EP + agentId.toString();
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching disk usage data:', error);
    }
}

// Get All Users
export async function getAllUsers() {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + USER_EP;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching all users data:', error);
    }
}

// Get All Agents
export async function getAllAgents() {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + AGNT_EP;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching all agents data:', error);
    }
}

// Get All Agents with Info
export async function getAllAgentsWithInfo() {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + AGNT_EP + "info";
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching all agents data with info:', error);
    }
}

// Delete Agent by Agent Id
export async function deleteAgentByID(agentId) {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + AGNT_EP + agentId.toString();
        const response = await axios.delete(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching all agents data:', error);
    }
}

// Get Agent Data by Agent Id
export async function getAgentDataById(agentId) {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + AGNT_EP + agentId.toString();;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching agent data:', error);
    }
}

// Get User by User Id
export async function getUserById(userId) {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + USER_EP + userId.toString();
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching user data:', error);
    }
}

// Get Memory Usage Data by Agent ID
export async function getMemoryUsageData(agentId) {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + MEM_USG_EP + agentId.toString();
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching memory usage data:', error);
    }
}

// Get CPU Usage Data by Agent ID
export async function getCpuUsageData(agentId) {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + CPU_USG_EP + agentId.toString();
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching CPU usage data:', error);
    }
}

// Get Latest CPU Usage Data by Agent ID
export async function getLatestCpuUsageData(agentId) {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + CPU_USG_EP + agentId.toString() + LATEST;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching Latest CPU usage data:', error);
    }
}

// Get Latest Memory Usage Data by Agent ID
export async function getLatestMemoryUsageData(agentId) {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + MEM_USG_EP + agentId.toString() + LATEST;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching Latest Memory usage data:', error);
    }
}

// Get Latest Disk Usage Data by Agent ID
export async function getLatestDiskUsageData(agentId) {
    try {
        // Retrieve JWT token from session storage
        const jwtToken = sessionStorage.getItem('jwtToken');
        const URL = API_URL + DISK_USG_EP + agentId.toString() + LATEST;
        const response = await axios.get(URL, {
            headers: {
                Authorization: jwtToken,
            },
        });
        return response.data;
    } catch (error) {
    console.error('Error fetching Latest Disk usage data:', error);
    }
}