<template>
    <b-navbar v-if="this.memberConnected()" fixed="top" toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/channels">Slack</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item to="/channels">Channels</b-nav-item>
      <b-nav-item to="/members">Members</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown id="myNav" right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{ $store.state.member.fullname }}</em>
        </template>
        <b-dropdown-item to="/logout">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<script>

export default {
  name: 'navBar',
  computed: {
   member(){
     return this.$store.state.member;
   } 
  }
}
</script>

<style>
#dropdown {
  z-index: 20;
}
</style>
