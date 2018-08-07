import Vue from 'vue'
import App from './App.vue'
import {apolloProvider} from './apollo'
import {store} from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store,
    apolloProvider,
    render: h => h(App)
})
