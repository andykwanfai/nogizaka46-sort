import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from '../../src/store/index'
import { cloneDeep, isEqual } from 'lodash'
import { members } from '../../src/members'

test('shuffle member list', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(storeConfig))
  expect(members).toMatchObject(members)
  store.dispatch('init', members)
  expect(store.state.result).not.toMatchObject(members)
})

test('test select action', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(storeConfig))
  store.dispatch('init', members)
  const initLeft = store.state.left
  const initRight = store.state.right
  expect(store.state.left).toBe(initLeft)
  expect(store.state.right).toBe(initRight)
  store.dispatch('select', 'left')
  expect(store.state.left).not.toBe(initLeft)
  store.dispatch('select', 'right')
  expect(store.state.left).not.toBe(initRight)
})

test('test sorting result', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(storeConfig))
  store.dispatch('init', members)
  const target = cloneDeep(store.state.result) //get a shuffled list for reference
  store.dispatch('init', members)
  expect(target).not.toMatchObject(store.state.result)
  expect(target).not.toMatchObject(members)

  while (!store.state.completed) {
    for (let member of target) {
      if (isEqual(member, store.state.result[store.state.left])) {
        store.dispatch('select', 'left')
        break
      }
      if (isEqual(member, store.state.result[store.state.right])) {
        store.dispatch('select', 'right')
        break
      }
    }
  }
  expect(target).toMatchObject(store.state.result)
})