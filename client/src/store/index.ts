import { createStore } from 'vuex'
import api from '../utils/api';

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
    },
    async login({ state }, { event }) {
      event.preventDefault();
      const data = {
        name: event.target.elements.email.value,
        password: event.target.elements.password.value
      }
      try {
        const login = await api.login(data);
        console.log(login);
      }
      catch (err) {
        switch (err.response.status) {
          case 404:
            event.target.elements.email.value = "";
            event.target.elements.password.value = "";
            event.target.elements.email.focus();
            break;
          case 401:
            event.target.elements.email.value = "";
            event.target.elements.password.value = "";
            event.target.elements.email.focus();
            break;
          default:
            event.target.elements.email.value = "";
            event.target.elements.password.value = "";
            event.target.elements.email.focus();
        }
      }
    }
  },
  modules: {
  }
})
