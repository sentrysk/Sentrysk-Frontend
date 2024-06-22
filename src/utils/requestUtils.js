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

// Retrive System Information
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

// Retrive System Information Changelog
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

// Retrive System Users
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

// Retrive System Users Last Logons
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

// Retrive System Users Changelog
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

// Retrive All System Apps
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

// Retrive All System Apps Formatted
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

// Retrive System Apps
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

// Retrive Installed Apps Changelog
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

// Retrive System Services
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

// Retrive System Services Changelog
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

// Retrive System Pip Packages
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

// Retrive All Pip Packages Formatted
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

// Retrive System Pip Packages
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

// Retrive Pip Packages Changelog
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

// Retrive All Npm Packages
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

// Retrive All Npm Packages Formatted
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

// Retrive System Npm Packages
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

// Retrive Npm Packages Changelog
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

// Retrive Docker Info by Agent ID
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

// Retrive Docker Info Changelog
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

// Retrive Agent Configs by Agent ID
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

// Retrive my User Last Dashboard Logins
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

// Retrive Home Page Statistics
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

// Retrive Agent Statistics
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

// Retrive Agent Statistics
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

export async function getDiskUsageData(agentId) {
    try {
        const URL = API_URL + DISK_USG_EP + agentId.toString();
        const response = await axios.get(URL);
        const data = response.data;
        return data
      } catch (error) {
        console.error('Error fetching disk usage data:', error);
      }
}