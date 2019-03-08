import Vue from 'vue'
import Router from 'vue-router'
import Channels from './views/Channels.vue'
import Channel from './views/Channel.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Register from './views/Register.vue'
import Members from './views/Members.vue'
import Member from './views/Member.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/channels',
      name: 'channels',
      component: Channels
    },
    {
      path: '/channel/:id',
      name: 'channel',
      component: Channel
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/members',
      name: 'members',
      component: Members
    },
    {
      path: '/member/:id',
      name: 'member',
      component: Member
    }
  ]
})
