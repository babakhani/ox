export default {
  namespaced: true,
  state: {
    content: '',
    color: '',
    show: '',
    timeout: 5000,
    closable: ''
  },
  mutations: {
    showMessage (state, payload) {
      state.content = payload.content
      state.timeout = payload.timeout
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
