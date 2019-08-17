import { cloneDeep } from 'lodash'
import router from '../router';

export const shuffle = (state) => {
  let array = cloneDeep(state.members)
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  state.result = array
}

export const sort = (state, target) => {
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
    // console.log("finish merge")
    if (state.left === state.rightStart) {
      state.temp.push(...state.result.slice(state.right, state.end))
    } else if (state.right === state.end) {

      state.temp.push(...state.result.slice(state.left, state.rightStart))
      // console.log("debug", state.temp)
    }

    temp.map(function (item, i) { result[state.leftStart + i] = item; });


    //set pointer to next merge
    state.leftStart = state.leftStart + state.width * 2
    state.left = state.leftStart
    state.rightStart = Math.min(state.leftStart + state.width, state.members.length)
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

    state.end = Math.min(state.leftStart + state.width * 2, state.members.length)
    state.temp = []
  }


  if (state.width >= state.end) {
    state.completed = true
    router.push({ name: 'result', params: { sorted: true } })
  }

}