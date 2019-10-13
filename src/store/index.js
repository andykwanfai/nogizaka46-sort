import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import { members } from '../members'
Vue.use(Vuex)

const state = {
  members: members,
  left: 0, //pointer of the left part of the merge
  right: 1, //pointer of the right part of the merge
  leftStart: 0, //start position of the left merge
  rightStart: 1, //start position of the right merge
  width: 1, //width of the merge
  end: 2, //ending position of one merge
  result: [],
  temp: [],
  sorted: false,
  drawId: 1, //indicate the group of draw member
  counter: 1, //count the number of selection
}

const store = ({
  state,
  // getters,
  actions,
  mutations
})

export default store