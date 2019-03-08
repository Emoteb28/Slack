<template>
<div id="scroll">
  <b-navbar toggleable="md" fixed="top" id="bar" type="dark" variant="success" >

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/channels">
    <b-button variant="secondary">BACK</b-button>
  </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <div id="label-text" v-show="label_disp" >{{ channel.label }} <i class="fas fa-pencil-alt trash" @click="label_form"></i></div>
       <b-form-input size="sm" v-show="!label_disp" @keyup.enter.native="edit_Label" class="msg mr-lg-12" id="label-input" v-model="label" type="text" placeholder="label" />
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

       <b-navbar-nav>
          <b-nav-item >
            <b-button variant="danger" @click="refresh">Refresh</b-button>
            </b-nav-item>
        </b-navbar-nav>


      <b-navbar-nav>
      <b-nav-item class="align-middle topic-sec"  >
         <div id="topic-span" v-show="topic_disp">{{ channel.topic }}<i class="fas fa-pencil-alt trash" @click="topic_form"></i></div>
         <b-form-input id="topic-form" size="sm" v-show="!topic_disp" @keyup.enter.native="edit_Topic" class="align-middle topic-sec msg mr-lg-12" v-model="topic" type="text" placeholder="topic" />
      </b-nav-item>
    </b-navbar-nav>

    </b-navbar-nav>

  </b-collapse>
</b-navbar>

<!--  -->

<div class="res">

<div  v-for="post in posts" :key="post._id">

   <hr/>

  <div class="post" v-bind:class="[ (qPost == post._id) ? 'activePost' : '']" :id="post._id" > 
    <router-link tag="span" :to="'/member/'+post.member_id" class="user">
    <img  :src="'https://api.adorable.io/avatars/20/' + post.email + '.png'" alt="">
     
     
      <span  class="fullname"> <b>{{ post.fullname }}</b></span>
      
      <span  class="email" >{{ post.email }}</span>
      
      <span  class="email" >{{ post.date }}m</span>
      </router-link>
      <div>
      <!-- <span class="message"  v-show="message_disp[post._id]"> -->
      <span class="message"  v-show="msg_disp[post._id]">
        {{ post.message }}

        <i v-if="post.member_id == $store.state.member.id" class="fas fa-trash-alt trash float-right" @click="remove_Post(post._id)"></i>
        <i v-if="post.member_id == $store.state.member.id" class="fas fa-pencil-alt trash float-right"  @click="message_form(post._id)"></i>
      </span>
      <!-- <span v-show="!message_disp[post._id]"> -->
      <span v-show="!msg_disp[post._id]">
      <b-form-input id="message-form" size="sm"  @keyup.enter.native="edit_Message(post._id)" class="align-middle topic-sec msg mr-lg-12" v-model="message[post._id]" type="text" placeholder="topic" />
      </span>
      </div>
      
     
     </div>

 

</div>

</div>

<!--  -->

    <b-navbar toggleable="md" fixed="bottom" class="up" type="dark" variant="light" >
          <b-form-input @keyup.enter.native="add_Post" v-model="text" size="lg" class="msg mr-lg-12" type="text" placeholder="msg" />
    </b-navbar>

</div>

</template>

<script>

export default {
  name: 'channel',
  data () {
    return {
        text: '',
        label: '',
        topic: '',
        label_disp: true,
        topic_disp: true,
        message: [],
        message_disp: [],
        msgId: 0,
        qPost: null
    }
  },
  created() {
      this.retrieveChannel({
              _id: this.$route.params.id
            });

      this.retrievePosts({
              _id: this.$route.params.id
            });

      this.retrieveMembers();
          
        this.message = [];
        this.message_disp = [];

       
    },
  computed: {
      channel() {
        this.label = this.$store.state.channel.label;
        this.topic = this.$store.state.channel.topic;
        return this.$store.state.channel;
    },
    posts() {
        this.message_disp = [];
        this.message = [];
        let members = this.$store.state.members;
        let posts = this.$store.state.posts;

        let newPosts = [];
        let newPost = {};

        if(posts.length > 0)
        posts.forEach(post => {
          members.forEach(member => {
            if( post.member_id == member._id ){
                newPost.email = member.email;
                newPost.fullname = member.fullname;
                newPost.message = post.message;
                newPost._id = post._id;
                newPost.member_id = post.member_id;

                let currentdate = new Date(); 
                let mydate = new Date(post.updated_at);
                let minutes = 1000 * 60;

                newPost.date = Math.round(
                                    currentdate.getTime() / minutes) -
                                     Math.round(mydate.getTime() / minutes);

                newPosts.push(newPost);

                newPost = {};

            }
          });
          //--------

                this.message[post._id] = post.message;
                this.message_disp[post._id] = true;

                
        });

        console.log(newPosts)

        return newPosts;
    },
    msg_disp(){
      this.message_disp[this.msgId] = false;
      return this.message_disp;
    }
  },
  mounted() {
    //---------------
        if(this.$route.query.post_id){
          console.log(this.$route.query.post_id)
          this.qPost = this.$route.query.post_id;
          
            let elem = document.getElementById(this.qPost);

              try{
                      elem.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                          inline: 'center'
                      });

                }catch(e){

               } 
        }
  },
  methods: {
    add_Post(){
            this.addPost({
              message: this.text,
              _id: this.$route.params.id
            })
              .then(response => {
                this.text = '';
                this.retrievePosts({
                  _id: this.$route.params.id
                })
              });
              this.$nextTick(() => {
                window.scrollTo(0,document.querySelector("#scroll").scrollHeight + 100);
              })
    },
      remove_Post(id){
          var result = confirm("Want to delete the post ?");
          if (result) {

                this.removePost({
                  _idChannel: this.$route.params.id,
                  _idPost: id
                })
                .then(response => {
                  this.retrievePosts({
                  _id: this.$route.params.id
                })
                });
          }
      },
      label_form(){
          this.label_disp = false;
          this.topic_disp = true;
      },
      edit_Label(){

                this.editLabel({
                  _id: this.$route.params.id,
                  label: this.label
                })
                .then(response => {
                  this.label_disp = true;
                  this.retrieveChannel({
                    _id: this.$route.params.id
                  });
                });
      },
      topic_form(){
          this.topic_disp = false;
          this.label_disp = true;
      },
      edit_Topic(){

                this.editTopic({
                  _id: this.$route.params.id,
                  label: this.label,
                  topic: this.topic
                })
                .then(response => {
                  this.topic_disp = true;
                  this.retrieveChannel({
                    _id: this.$route.params.id
                  });
                });
      },
      message_form(id){
        
        let posts = this.$store.state.posts;
        
          if(posts.length > 0)
          posts.forEach(post => {

            this.message[post._id] = post.message;
            this.message_disp[post._id] = true;

          });
        

        this.msgId = id;
      },
      edit_Message(_idPost){

                this.editMessage({
                  _idChannel: this.$route.params.id,
                  _idPost: _idPost,
                  message: this.message[_idPost]
                })
                .then(response => {
                  this.msgId = null;
                  this.retrievePosts({
                    _id: this.$route.params.id
                  });
                });
      },
      refresh(){

        this.retrieveChannel({
              _id: this.$route.params.id
            });

        this.retrievePosts({
                _id: this.$route.params.id
              });
        
      }
  }
}
</script>

<style>
#bar {
  margin-top: 55px;
  height: 45px;
  z-index: 1;
}

.res {
  margin-top: 130px;
  margin-bottom: 100px;
  padding-left: 40px;
  padding-right: 40px;
}


.msg {
  width: 100%;
}

.channel:hover, .user:hover {
 cursor: pointer;
 color: rgb(171, 171, 173);
}

.message {
  font-size: 1.2em;
  margin-left: 60px;
}

.fullname {
  font-size: 1em;
  margin-left: 10px;
}

.email {
  font-size: 0.7em;
  margin-left: 10px;
}

.topic-sec{
  line-height: 34px;
}

#topic-form {
  margin-top: 3px;
}

#topic-span,#topic-span:hover,.fa-pencil-alt {
  color: black;
}

.activePost {
  background: rgba(192, 153, 153, 0.562);
  padding: 10px;
}


</style>