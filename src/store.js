import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: false,
  	member: false,
    members: false,
    channels: false,
    channel: false,
    posts: false,
    posts_10: false
  },
  mutations: {
    setToken(state,token){
  		state.token = token;
    },
    destroyToken(state) {
      state.token = false
    },
    destroyMember(state) {
      state.member = false
    },
  	setMember(state,member){
  		state.member = member;
  	},
  	initialiseStore(state){
  		if(localStorage.getItem('store')) {
  			this.replaceState(
  				Object.assign(state,JSON.parse(localStorage.getItem('store')))
  				);
  		}
    },
    setTokenAxios(state) {
      window.axios.defaults.params.token = state.token;
    },
    retrieveMembers(state, members) {
      state.members = members
    },
    retrieveChannels(state, channels) {
      state.channels = channels
    },
    retrieveChannel(state, channel) {
      state.channel = channel
    },
    retrievePosts(state, posts) {
      state.posts = posts
    },
    retrievePosts_10(state, posts_10) {
      state.posts_10 = posts_10
    }
  },
  actions: {
    
  }
})
