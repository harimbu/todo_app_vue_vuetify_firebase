import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from '../firebase'

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
    },
    getTodos (state) {
      db.collection('todos').orderBy('createAt', 'desc').onSnapshot(sn => {
        state.todos = sn.docs.map(doc => {
          return {
            id: doc.id,
            title: doc.data().title,
            createAt: doc.data().createAt,
            editing: doc.data().editing,
            done: doc.data().done,
            userId: doc.data().userId
          }
        })
      })
    }
  },
  actions: {
    getTodos ({ commit }) {
      commit('getTodos')
    }
  },
  modules: {
  }
})
