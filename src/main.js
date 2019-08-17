import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import storeConfig from './store/index'
import './registerServiceWorker'

Vue.config.productionTip = false

const store = new Vuex.Store(storeConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
