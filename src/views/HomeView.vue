<template>
  <Navbar /> <!-- Include the Navbar component here -->
  <div class="container mt-5">
    <div class="jumbotron">
      <h1 class="display-4">Welcome to Sentrysk</h1>
      <p class="lead">
        <GeneralStatistics></GeneralStatistics>
      </p>
      <hr class="my-4">
      <p>Enjoy exploring Sentrysk features and functionality.</p>
      <a class="btn btn-primary btn-lg" href="#" role="button">
        <router-link class="nav-link" to="/agents"><i class="bi bi-cpu"></i> Agents</router-link>
      </a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';
import GeneralStatistics from '@/components/HomePage/GeneralStatistics.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar,
    GeneralStatistics,
  }
}
</script>
