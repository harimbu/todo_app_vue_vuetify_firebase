<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-card class="mx-auto" max-width="400" flat tile>
        <v-img
          class="white--text align-end"
          height="200px"
          src="./assets/profile_bg.jpg"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.4)"
        >
          <v-card-title class="flex-column align-start" v-if="!user">
            <v-icon color="white" size="80">mdi-check</v-icon>
            <v-row class="pa-3 flex-column">
              <div class="caption">오늘 내가 할일은?</div>
            </v-row>
          </v-card-title>

          <v-card-title v-else>
            <v-row>
              <v-col>
                <v-avatar size="80" color="mb-3"><img :src="user.photoURL" alt="John"></v-avatar>
                <div class="title">{{user.displayName}}</div>
                <div class="caption">{{user.email}}</div>
              </v-col>
              <v-btn icon @click="signOut" class="mt-auto mb-2" color="white"><v-icon>mdi-logout</v-icon></v-btn>
            </v-row>
          </v-card-title>

        </v-img>
      </v-card>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark src="./assets/mountain.jpg" prominent flat>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.4)" ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer=!drawer" />
      <v-app-bar-title class="pl-0">
        오늘 할 일
        <v-chip class="mx-3" small color="red">{{remainCount}}</v-chip>
      </v-app-bar-title>
      <v-spacer />
      <Sign />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer fixed padless color="white">

    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Sign from './views/Sign'
export default {
  name: 'App',
  components: { Sign },
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Todo', icon: 'mdi-playlist-check', to: '/' },
        { title: 'About', icon: 'mdi-information-outline', to: '/about' }
      ]
    }
  },
  computed: {
    ...mapGetters(['remainCount']),
    ...mapState(['user'])
  },
  methods: {
    signOut () {
      this.$fire.auth().signOut()
      this.$store.commit('setUser', null)
    }
  }
}
</script>
