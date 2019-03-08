<template>
  <div id="app">
    <div id="nav">

      <NavBar />

    </div>

    <router-view/>
    
  </div>
</template>

<script>

import NavBar from "@/components/NavBar";

export default {
  name: 'app',
  components: {
    NavBar
  },
		mounted() {

			if(!this.$store.getters.memberConnected){
				this.$router.push('/login');
			}

			window.axios.get('ping').then((response) => {

				this.applicationEstActive = true
				console.log(response.data)

				}).catch((error) => {

					this.applicationEstActive = false
					alert("L'application n'est pas disponible");
				});
			}
}
</script>

<style>



</style>
