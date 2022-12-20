import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import router from "@/router"
import api from "@/api"
import * as filters from "@/Filters";

Vue.config.productionTip = false
Vue.prototype.$api = api
Object.keys(filters).forEach(key => {
  Vue.filter(key,filters[key])
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
