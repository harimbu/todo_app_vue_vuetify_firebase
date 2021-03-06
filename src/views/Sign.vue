<template>
  <div>
    <v-btn icon @click="signInGoogle" v-if="!$store.state.user"><v-icon>mdi-account-circle</v-icon></v-btn>
    <!-- <v-btn icon @click="signOut" v-else><v-icon>mdi-logout</v-icon></v-btn> -->
  </div>
</template>

<script>
export default {
  methods: {
    signInGoogle () {
      console.log('login')
      var provider = new this.$fire.auth.GoogleAuthProvider()
      this.$fire.auth().languageCode = 'ko'
      this.$fire.auth().signInWithPopup(provider)
    }

  }
}
</script>
