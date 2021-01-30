import { createStore } from 'vuex'

export default createStore({
  state: {
    authed: false,
    view: "login"
  },
  mutations: {
  },
  actions: {
    changeView({ state }, { view }) {
      state.view = view;
    }
  },
  modules: {
  }
})
