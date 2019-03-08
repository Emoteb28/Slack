<template>
  <div class="back">
  <b-container>
    <div class="top">
    <b-form @submit.prevent="login" id="form">
      <h1 class="login">Login</h1>
      <b-form-group >
        <b-form-input type="email"
                      v-model="email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>

            <b-form-group >
        <b-form-input type="password"
                      v-model="password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
     
      <b-button type="submit" variant="primary">Connection</b-button>
      <b-link to="/register" class="signup">Register</b-link>
    </b-form>
  </div>
  </b-container>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
        email: '',
        password: ''
    }
  },
  mounted(){
  	if(this.$store.state.token){
  		this.$router.push('/channels');
  	}
  },
  created() {
    
  },
  methods : {
  		login() {

        this.setToken({
        email: this.email,
        password: this.password
      }).then(response => {
          this.$router.push({ name: 'channels' })
        });

    }
  }
}
</script>

<style>

#form {
  margin: 100px auto;
  width: 50%; 
}

.login {
  font-size: 4em;
  text-align: center;
  padding: 20px;
}

.signup {
  margin-left: 20px;
}
</style>
