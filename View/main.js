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
import Student from './components/singleStudent.vue'
import Members from './components/Members.vue'
//Define the routes that can be viewed
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Login, name:'login'},
        {path: '/login', component: Login},
        {path: '/jury', component: Jury, name: 'jury'},
        {path: '/students', component: Students, name: 'students'},
        {path:'/students/student/:studentId', component: Student, name:'singleStudent'},
        {path: '/members', component: Members, name: 'members'},
    ]
})

new Vue({
    el: '#app',
    router,
    store,
    apolloProvider,
    render: h => h(App)
})
