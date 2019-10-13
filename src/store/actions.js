export const select = ({ commit }, target) => {
  commit('sort', target)
  commit('addCounter')
}

export const init = ({ commit }) => {
  commit('shuffle')
}