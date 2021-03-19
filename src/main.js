import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'

import './assets/css/global.css'

Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
