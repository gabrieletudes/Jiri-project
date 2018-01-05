import Vue from 'vue'
import App from './App.vue'
import {apolloProvider} from './apollo'
import {store} from './store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import router from './router'

Vue.use(Buefy);

new Vue({
    el: '#app',
    router,
    store,
    apolloProvider,
    render: h => h(App)
})
