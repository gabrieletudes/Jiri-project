import Vue from 'vue'
import App from './App.vue'
import {apolloProvider} from './apollo'
import {store} from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/fr'

import router from './router'

Vue.use(ElementUI, { locale })

new Vue({
    el: '#app',
    router,
    store,
    apolloProvider,
    render: h => h(App)
})
