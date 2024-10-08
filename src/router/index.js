import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardLastLoginsView from '@/views/DashboardLastLoginsView';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import AgentsView from '../views/AgentsView';
import AgentSystemData from '../views/AgentSystemData';
import InstalledAppsView from '../views/InstalledAppsView';
import PipPackagesView from '../views/PipPackagesView';
import NpmPackagesView from '../views/NpmPackagesView';
import MyProfileView from '../views/MyProfileView.vue';
import UsersView from '@/views/UsersView.vue';
import UserDetailsView from '@/views/UserDetailsView.vue';
import axios from "axios";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path:'/user/myprofile',
    name:'MyProfile',
    component: MyProfileView,
    meta: { requiresAuth: true }
  },
  {
    path:'/user/lastlogins',
    name:'lastLogins',
    component: DashboardLastLoginsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView,
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetailsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/agents',
    name: 'agents',
    component: AgentsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/agents/:id',
    name: 'agentData',
    component: AgentSystemData,
    meta: { requiresAuth: true }
  },
  {
    path:'/apps',
    name:'InstalledApps',
    component: InstalledAppsView,
    meta: { requiresAuth: true }
  },
  {
    path:'/pippackages',
    name:'PipPackages',
    component: PipPackagesView,
    meta: { requiresAuth: true }
  },
  {
    path:'/npmpackages',
    name:'NpmPackages',
    component: NpmPackagesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Add a navigation guard to check session validity
router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is logged in
    const jwtToken = sessionStorage.getItem("jwtToken");

    if (jwtToken) {
      // User is authenticated, proceed to check the session
      try {
        const backend_url = process.env.VUE_APP_SENTRYSK_BACKEND_URL;
        // Send a GET request to the session check endpoint
        const response = await axios.get(`${backend_url}/session/check`, {
          headers: {
            Authorization: jwtToken,
          },
        });

        // Check if the session check is successful (e.g., HTTP status 200)
        if (response.status === 200) {
          // Session is valid, allow access to the route
          next();
        } else {
          // Session check failed, redirect to the login page
          next("/login");
        }
      } catch (error) {
        console.error("Session check failed:", error);
        // Handle session check error, redirect to login or display an error message
        next("/login");
      }
    } else {
      // User is not authenticated, redirect to the login page
      next("/login");
    }
  } else {
    // Route doesn't require authentication, allow access
    next();
  }
});

export default router;
