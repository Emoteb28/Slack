<template>
<b-container>
    <div class="up">

      <div>
 <b-card no-body class="overflow-hidden center"  style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="3">
        <b-card-img style="max-width: 160px;" :src="'https://api.adorable.io/avatars/200/' + member.email + '.png'" class="rounded-0" />
      </b-col>
      <b-col md="9">
        <b-card-body :title="member.fullname ">
          
        <span class="info"> {{ member.email }} </span>
          
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>

      </div>


  <b-list-group v-if="posts">
    <b-list-group-item variant="dark"> posts ( <b-badge variant="light">{{posts.length}}</b-badge> post(s)) </b-list-group-item>
    <b-list-group-item>
      <b-list-group  v-for="post in posts" :key="post._id" >
        <b-list-group-item class="top" :to="'/channel/'+ post.channel_id + '?post_id='+ post._id">
            {{ post.message }} 
            <b-badge pill variant="secondary" class="float-right">{{ post.updated_at }}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-list-group-item>
  </b-list-group>
  </div>
  </b-container>
</template>

<script>

export default {
  name: 'member',
  data () {
    return {
      
    }
  },
  created() {
      // get members list
      this.retrieveMembers();

      // get channels list
      this.retrieveChannels();

      // get posts of a member
      this.retrieve10Posts({
              _id: this.$route.params.id
            });

      
    },
  computed: {
    // returns member infos
      member() {
        let members = this.$store.state.members;
        let member;
        

         members.forEach(m => {
          if(m._id == this.$route.params.id){
            member = m;
          }
        });

        

        return member;
    },
    // returns the 10 last posts of a member
    posts(){

        let allPosts = this.$store.state.posts_10;
        let sortedPosts = [];

        if(allPosts.length > 0)
        sortedPosts = allPosts.sort(function(a, b) {
                      
                  let dateA = new Date(a.created_at);
                  let dateB = new Date(b.created_at);
                  
                  return dateA > dateB ? -1 : ( dateA < dateB ? 1 : 0 );
                });
        return sortedPosts.slice(0,10);
    }
  },
    methods: {
      
    
      
    }
}
</script>

<style>
.top {
  margin-top: 15px;
}

.up {
  margin-top: 80px;
}

.center{
  margin: auto;
  text-align: center;
}

h4.card-title {
  font-size: 2.5em;
}


.info {
  font-size: 1.5em;  
}

</style>
