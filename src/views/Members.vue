<template>
<b-container>
    <div class="up">
  <b-list-group v-if="members">
    <b-list-group-item variant="dark"> Membres ( <b-badge variant="light">{{members.length}}</b-badge> membre(s)) </b-list-group-item>
    <b-list-group-item>
      <b-list-group  v-for="member in members" :key="member._id" >
        <b-list-group-item class="top">
          <router-link tag="span" :to="'/member/'+member._id" class="user">
            <img :src="'https://api.adorable.io/avatars/20/' + member.email + '.png'" alt="">
            {{ member.fullname }} 
            <b-badge pill variant="secondary">{{ member.email }}</b-badge>
            </router-link>
            <i v-if="member._id != $store.state.member.id" class="fas fa-trash-alt trash2 float-right align-middle" @click="remove_Member(member._id)"></i>
        </b-list-group-item>
      </b-list-group>
    </b-list-group-item>
  </b-list-group>
  </div>
  </b-container>
</template>

<script>

export default {
  name: 'members',
  data () {
    return {
        
    }
  },
  created() {
    // get all members
      this.retrieveMembers();

    },
  computed: {
    // returns members
      members() {
        return this.$store.state.members;
    }
  },
    methods: {
      // delete member
      remove_Member(id){
          var result = confirm("Want to delete the member ?");
          if (result) {

              this.removeMember({
                                  _id: id
                                })
                      .then(response => {
                            this.retrieveMembers();
                });

          }
      } 
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

.trash2 {
  margin-left: 10px;
  cursor: pointer;
  line-height: 38px;
}

</style>
