import { clone } from 'lodash'
import router from '../router'

export const shuffle = (state) => {
  let array = state.members.filter(member => !member.graduation)

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]] // swap elements
  }
  state.result = array
}

export const sort = (state, target) => {
  // bottom up merge sort
  let { temp, result } = state
  const leftMember = result[state.left]
  const rightMember = result[state.right]
  switch (target) {
    case 'left':
      temp.push(leftMember)
      state.left++
      break
    case 'right':
      temp.push(rightMember)
      state.right++
      break
    case 'draw':
      if (!leftMember.drawId && !rightMember.drawId) {
        // both elements did not draw before
        leftMember.drawId = state.drawId
        rightMember.drawId = state.drawId
        state.drawId++
      } else if (leftMember.drawId !== rightMember.drawId) {
        // left element has drawid
        rightMember.drawId = leftMember.drawId
      } else if (!leftMember.drawId && rightMember.drawId) {
        // left element do not has drawid but right element has
        leftMember.drawId = rightMember.drawId
      }
      temp.push(leftMember, rightMember)
      state.left++
      state.right++
      break
  }

  // finish one merge
  if (state.left >= state.rightStart || state.right >= state.end) {
    if (state.left === state.rightStart) {
      // if no element in left side, push all element in right side
      state.temp.push(...state.result.slice(state.right, state.end))
    } else if (state.right === state.end) {
      // if no element in right side, push all element in left side
      state.temp.push(...state.result.slice(state.left, state.rightStart))
    }

    // update the reuslt
    temp.map(function (item, i) {
      result[state.leftStart + i] = item
    })

    // set pointer to next merge
    state.leftStart = state.leftStart + state.width * 2
    state.left = state.leftStart
    state.rightStart = Math.min(state.leftStart + state.width, state.members.length)
    state.right = state.rightStart

    // if only left part remaining(i.e. no right part), no need to choose
    if (!result[state.leftStart] || !result[state.rightStart]) {
      if (result[state.leftStart]) {
        // push all left elements to temp
        state.temp.push(...state.result.slice(state.left, state.end))
      }
      state.width *= 2
      // reset pointer at beginning
      state.leftStart = 0
      state.left = state.leftStart
      state.rightStart = Math.min(state.width, state.end)
      state.right = state.rightStart
    }

    state.end = Math.min(state.leftStart + state.width * 2, state.result.length)
    state.temp = []
  }

  if (state.width >= state.end) { // end of sorting
    state.sorted = true
    router.push({ name: 'result', params: { sorted: state.sorted } })
  }
}

export const addCounter = (state) => {
  state.counter++
}
