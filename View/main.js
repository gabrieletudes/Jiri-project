import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//import the different views
import Jury from './components/Jury.vue'
import Login from './components/Login.vue'
//Define the routes that can be viewed
const router = new VueRouter({
  mode: 'history',
  routes:[
    {path:'/', component: Login},
    {path:'/jury',component: Jury}
    ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
