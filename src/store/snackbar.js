export default {
  namespaced: true,
  state: {
    content: '',
    color: '',
    show: '',
    closable: ''
  },
  mutations: {
    showMessage (state, payload) {
      state.content = payload.content
      state.color = payload.color
      state.show = true
      state.closable = payload.closable
    }
  },
  actions: {
    showToastMessage (context, payload) {
      context.commit('showMessage', payload)
    }
  }
}
