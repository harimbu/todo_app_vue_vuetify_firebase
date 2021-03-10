import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    remainTodoCount: null,
    todos: []
  },
  getters: {
    filterTodo (state) {
      return state.todos.filter(todo => todo.userId === auth.currentUser.uid)
    },
    remainCount (state, getters) {
      return getters.filterTodo.filter(todo => !todo.done).length
    },
    showDelBtn (state) {
      return state.todos.filter(todo => todo.done).length > 0
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setCount (state, count) {
      state.remainTodoCount = count
    }
  },
  actions: {
  },
  modules: {
  }
})
