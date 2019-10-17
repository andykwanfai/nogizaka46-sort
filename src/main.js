import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import storeConfig from './store/index'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import { cloneDeep } from 'lodash'

Vue.config.productionTip = false

const store = new Vuex.Store(storeConfig)

export const history = []

store.subscribeAction((action, state) => {
  history.push(cloneDeep(state))
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
