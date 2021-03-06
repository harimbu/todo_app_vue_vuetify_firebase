import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    todos: []
  },
  getters: {
    remainCount (state) {
      return state.todos.filter(todo => !todo.done).length
    },
    showDelBtn (state) {
      return state.todos.filter(todo => todo.done).length > 0
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
