export const select = ({ commit }, target) => {
  commit('sort', target)
}

export const init = ({ commit }) => {
  commit('shuffle')
}