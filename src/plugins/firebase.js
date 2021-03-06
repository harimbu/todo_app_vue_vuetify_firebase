import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import store from '../store'

const firebaseConfig = {
  apiKey: 'AIzaSyB_RW4re1hZ-1jcza_f2i8m6sOKp5ic7ho',
  authDomain: 'todo-app-4c02e.firebaseapp.com',
  projectId: 'todo-app-4c02e',
  storageBucket: 'todo-app-4c02e.appspot.com',
  messagingSenderId: '599705621053',
  appId: '1:599705621053:web:5238b31e64d02b21739054'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

Vue.prototype.$fire = firebase

firebase.auth().onAuthStateChanged(user => {
  store.commit('setUser', user)
})
