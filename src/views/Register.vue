<template>
  <b-container>
    <div class="top">
    <b-form @submit.prevent="creationCompte" id="form">
        <h1 class="register">Register</h1>
      <b-form-group >
        <b-form-input type="email"
                      v-model="email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>

            <b-form-group >
        <b-form-input type="text"
                      v-model="fullname"
                      required
                      placeholder="Enter name">
        </b-form-input>
      </b-form-group>

      <b-form-group >
        <b-form-input type="password"
                      v-model="password1"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>

            <b-form-group >
        <b-form-input type="password"
                      v-model="password2"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
     
      <b-button type="submit" variant="primary">Register</b-button>
      <b-link to="/login" class="signin">Login</b-link>

    </b-form>
  </div>
  </b-container>
</template>

<script>

export default {
  name: 'register',
  data () {
    return {
        email: '',
        password1: '',
        password2: '',
        fullname: ''
    }
  },
  created() {
    
  },
  methods : {
    // creer un compte
    creationCompte(){
        if(this.password1 == this.password2){

              this.register({
                    fullname: this.fullname,
                    email: this.email,
                    password: this.password1
                  });
        } else {
            alert("les deux mots de passe ne correspondent pas");
        }
    }
  }
}
</script>

<style>

#form {
  margin: 80px auto;
  width: 50%; 
}

.register {
  font-size: 4em;
  text-align: center;
  padding: 20px;
}

.signin {
  margin-left: 20px;
}
</style>
