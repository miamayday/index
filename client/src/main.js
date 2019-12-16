import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from './store/store'
import App from './App.vue'
import Index from './components/Index'
import Upload from './components/Upload'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/upload', component: Upload }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
