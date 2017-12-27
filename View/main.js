import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {apolloProvider} from './apollo'
import {store} from './store'


Vue.use(VueRouter);

//import the different views
import Jury from './components/Jury.vue'
import Login from './components/Login.vue'
import Students from './components/Students.vue'
//Define the routes that can be viewed
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Login},
        {path: '/jury', component: Jury},
        {path: '/students', component: Students},
    ]
})

new Vue({
    el: '#app',
    router,
    store,
    apolloProvider,
    render: h => h(App)
})
