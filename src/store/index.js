import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import { members } from '../members'
Vue.use(Vuex)

const state = {
  members: members,
  left: 0,
  right: 1,
  leftStart: 0,
  rightStart: 1,
  width: 1,
  end: 2,
  result: [],
  temp: [],
  completed: false
}

const store = ({
  state,
  // getters,
  actions,
  mutations
})

export default store