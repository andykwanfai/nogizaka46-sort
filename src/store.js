import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';


import { members } from './members'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: members,
    left: 0,
    right: 1,
    leftStart: 0,
    rightStart: 1,
    width: 1,
    end: 2,
    result: members,
    temp: []
  },
  mutations: {
    sort(state, target) {
      //bottom up merge sort
      let { temp, result } = state
      switch (target) {
        case "left":
          temp.push(result[state.left])
          state.left++
          break
        case "right":
          temp.push(result[state.right])
          state.right++
          break
      }

      if (state.left >= state.rightStart || state.right >= state.end) {//finish one merge
        console.log("finish merge")
        if (state.left === state.rightStart) {
          state.temp.push(...state.result.slice(state.right, state.end))
        } else if (state.right === state.end) {

          state.temp.push(...state.result.slice(state.left, state.rightStart))
          console.log("debug", state.temp)
        }

        temp.map(function (item, i) { result[state.leftStart + i] = item; });


        //set pointer to next merge
        state.leftStart = state.leftStart + state.width * 2
        state.left = state.leftStart
        state.rightStart = Math.min(state.leftStart + state.width, members.length)
        state.right = state.rightStart



        if (!result[state.leftStart] || !result[state.rightStart]) {//only left part need to merge, no need to choose
          if (result[state.leftStart]) {
            state.temp.push(...state.result.slice(state.left, state.end))//push all left elements to temp
          }
          state.width *= 2
          //reset pointer at beginning
          state.leftStart = 0
          state.left = state.leftStart
          state.rightStart = Math.min(state.width, state.end)
          state.right = state.rightStart
        }

        state.end = Math.min(state.leftStart + state.width * 2, members.length)
        state.temp = []
      }


      if (state.width >= state.end) {
        router.push({ name: 'result', params: { sorted: true } })
      }


      const tempName = temp.map(function (item) {
        return item['name'];
      });
      console.log("temp:", tempName)

      const names = result.map(function (item) {
        return item['name'];
      });
      console.log("result:", names)
    }

  },
  actions: {
    select({ commit }, target) {
      commit('sort', target)
    }
  }
})
