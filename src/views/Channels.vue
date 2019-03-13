<template>

<b-container>
    <div class="up">
  <b-list-group v-if="channels">
    <b-list-group-item variant="dark"><i class="far fa-comments"></i> Channels ( <b-badge variant="light">{{channels.length}}</b-badge> channel(s)) 
    
    <!--  -->
    
    <b-button v-b-modal.modalPrevent>New Channel</b-button>

    <!-- Modal Component -->
    <b-modal 
      :modal-class="'my-modal'"
      id="modalPrevent"
      ref="modal"
      title="New Channel"
      no-close-on-backdrop
      @ok="handleOk"
      @shown="clearName"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text" placeholder="Enter label" v-model="label" />
        <b-form-input class="top" type="text" placeholder="Enter topic" v-model="topic" />
      </form>
    </b-modal>


    <!--  -->
    </b-list-group-item>
    <b-list-group-item>
      <b-list-group  v-for="channel in channels" :key="channel._id" >
        <b-list-group-item class="channel-section">
          <router-link tag="span" class="top channel" :to="'/channel/'+channel._id" >
           <i class="fas fa-comments"></i> {{ channel.label }} 
            <b-badge pill variant="secondary">{{ channel.topic }}</b-badge>
          </router-link>
            <i class="fas fa-trash-alt trash float-right align-middle" @click="remove_Channel(channel._id)"></i>
        </b-list-group-item>
      </b-list-group>
    </b-list-group-item>
  </b-list-group>
  </div>
  </b-container>

</template>

<script>

export default {
  name: 'channels',
  data () {
    return {
        label: '',
        topic: ''
    }
  },
  created() {

    // get all channels
      this.retrieveChannels();

    },
  computed: {
    // returns the list of channels
      channels() {
        return this.$store.state.channels
    }
  },
  methods: {
   clearName() {
        this.label = '';
        this.topic = '';
      },
      handleOk(evt) {
        // Prevent modal from closing
        evt.preventDefault()
        if (!this.label) {
          alert('Please enter label and topic')
        } else {
          this.handleSubmit()
        }
      },
      // add a channel 
      handleSubmit() {
        console.log( this.label + ' ' + this.topic );

              this.addChannel({
                                label: this.label,
                                topic: this.topic
                              })
                    .then(response => {
                      this.retrieveChannels();
                    });

        this.clearName()
        this.$nextTick(() => {
          // Wrapped in $nextTick to ensure DOM is rendered before closing
          this.$refs.modal.hide()
        })
      },
      // delete channel
      remove_Channel(id){

          var result = confirm("Want to delete the channel ?");
          if (result) {

                this.removeChannel({
                                    _id: id
                                  })
                    .then(response => {
                        this.retrieveChannels();
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

.my-modal {
  margin-top: 60px;
  z-index: 1000;
}

.channel:hover {
 cursor: pointer;
 color: rgb(171, 171, 173);
}

.trash {
  margin-left: 10px;
  cursor: pointer;
  line-height: 28px;
}

.trash:hover {
  opacity: 0.5;
}

.channel-section {
  margin-top: 10px;
}

</style>