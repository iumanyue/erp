import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import './assets/css/global.css'

Vue.use(ElementUi)


Vue.prototype.$http = axios
// 把包挂载Vue的原型对象上   每个Vue 的组件都可以通过this.$http



axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'
// 挂载到原型对象之前,做响应拦截 把token
axios.interceptors.request.use(config=>{
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //必须return
  return config
})





Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
