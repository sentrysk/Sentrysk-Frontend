import axios from 'axios';

// Global Variables
const API_URL  =  "http://localhost:5000"
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