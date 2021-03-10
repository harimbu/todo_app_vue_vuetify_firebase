<template>
  <div>
    <v-btn icon @click="signInGoogle" v-if="!$store.state.user"><v-icon >mdi-account-circle</v-icon></v-btn>
    <!-- <v-btn icon @click="signOut" v-else><v-icon >mdi-logout</v-icon></v-btn> -->
    <v-avatar size="30" class="mt-3 mr-2" v-else >
      <img :src="$store.state.user.photoURL" class="border">
    </v-avatar>
  </div>
</template>

<script>
import { auth, db } from '../firebase'
export default {
  methods: {
    signInGoogle () {
      var provider = new this.$fire.auth.GoogleAuthProvider()
      auth.languageCode = 'ko'
      auth.signInWithPopup(provider).then(result => {
        db.collection('users').doc(result.user.uid).set({
          email: result.user.email
        })
      })
    },
    signOut () {
      auth.signOut().then(() => {
        this.$store.commit('setUser', null)
      })
    }
  }
}
</script>
