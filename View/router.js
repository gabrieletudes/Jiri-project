import VueRouter from 'vue-router'
import Vue from 'vue'
import {apolloClient} from './apollo'
//import Store
import {store} from './store'

//import the different views
import Jury from './components/Jury.vue'
import Login from './components/Login.vue'
import Students from './components/Students.vue'
import Student from './components/singleStudent.vue'
import Members from './components/Members.vue'

//Import querys
import {LOGGEDIN_USER_QUERY} from './querys/Users.gql'

//Define the routes that can be viewed
const routes = [
        {path: '/', component: Jury, name: 'jury'},
        {path: '/login', component: Login, name:'login'},
        {path: '/students', component: Students, name: 'students'},
        {path: '/students/student', redirect:'students'},
        {path: '/students/student/:studentId', component: Student, name:'singleStudent'},
        {path: '/members', component: Members, name: 'members'},
        {path: '*', redirect:'/'}
];

Vue.use(VueRouter)

// Init routes
const router = new VueRouter({
    mode: 'history',
    routes,
})

// Function that checks if the user is logged
function loggedIn(data){
    return data.data.loggedInUser && data.data.loggedInUser.id !== null
}

router.beforeEach((to, from, next) => {
    apolloClient.query({
        query: LOGGEDIN_USER_QUERY,
        fetchPolicy: 'network-only',
    }).then(data => {
       if (loggedIn(data) === false && to.name !== 'login') {
            console.log('Vous n’êtes pas connecté')
            return next({ name: 'login' });
        } else if (loggedIn(data) !== false) {
            console.log('Vous êtes connecté')
            store.commit('setUserId', data.data.loggedInUser.id);
            next();
        } else {
            next();
        }
        if (loggedIn(data) !== false && to.name === 'login') {
            store.commit('setUserId', data.data.loggedInUser.id);
            next({ name: 'jury' });
        }
    }).catch(error => {
        console.error(error)
    });
})

export default router
