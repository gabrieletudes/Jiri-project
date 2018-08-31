import VueRouter from 'vue-router'
import Vue from 'vue'
import {apolloClient} from './apollo'
//import Store
import {store} from './store'

//import the different views
import Header from './components/Header.vue'
import SideMenu from './components/SideMenu.vue'
import Jury from './components/Jury.vue'
import Jurys from './components/Jurys.vue'
import singleJury from './components/singleJury.vue'
import Login from './components/Login.vue'
import Students from './components/Students.vue'
import Student from './components/singleStudent.vue'
import Members from './components/Members.vue'
import Member from './components/singleMember'
import Projects from './components/Projects.vue'

//Import querys
import {LOGGEDIN_USER_QUERY} from './querys/Users.gql'

//Define the routes that can be viewed
const routes = [
        {
          path: '/jiri',
          name: 'jury',
          components: {
            default: Jury,
            'header': Header,
            'side-menu': SideMenu
          }
        },
        {
          path: '/jiri/jurys',
          name: 'jurys',
          components: {
            default: Jurys,
            'header': Header,
            'side-menu': SideMenu
          }
        },
        {
          path: '/jiri/jurys/:juryId',
          name: 'singleJury',
          components: {
            default: singleJury,
            'header': Header,
            'side-menu': SideMenu
          }
        },
        {
          path: '/jiri/etudiants',
          name: 'students',
          components: {
            default: Students,
            'header': Header,
            'side-menu': SideMenu
          }
        },
        {
          path: '/jiri/etudiants/:studentId',
          name:'singleStudent',
          components: {
            default: Student,
            'header': Header,
            'side-menu': SideMenu
          }
        },
        {
          path: '/jiri/membres',
          name: 'members',
          components: {
            default: Members,
            'header': Header,
            'side-menu': SideMenu
          }
        },
        {
          path: '/jiri/membres/:memberId',
          name:'singleMember',
          components: {
            default: Member,
            'header': Header,
            'side-menu': SideMenu
          }
        },
        {
          path: '/jiri/projets',
          name: 'projects',
          components: {
            default: Projects,
            'header': Header,
            'side-menu': SideMenu
          }
        },
        {
          path: '/login',
          name:'login',
          components: {
            default: Login,
            'header': Header
          }
        },
        {
          path: '',
          redirect:'/jiri/'
        },
        {
          path: '*',
          redirect:'/jiri/'
        }
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
