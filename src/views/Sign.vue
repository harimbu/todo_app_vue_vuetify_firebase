<template>
  <div>
    <v-btn icon @click="signInGoogle" v-if="!$store.state.user"><v-icon >mdi-account-circle</v-icon></v-btn>
    <!-- <v-btn icon @click="signOut" v-else><v-icon >mdi-logout</v-icon></v-btn> -->
    <v-avatar size="26" class="mt-3 mr-3" v-else>
      <img :src="$store.state.user.photoURL">
    </v-avatar>
  </div>
</template>

<script>
export default {
  methods: {
    signInGoogle () {
      var provider = new this.$fire.auth.GoogleAuthProvider()
      this.$fire.auth().languageCode = 'ko'
      this.$fire.auth().signInWithPopup(provider)
    },
    signOut () {
      this.$fire.auth().signOut()
    }
  }
}
</script>
