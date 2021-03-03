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
          <v-card-title class="flex-column align-start">
            <v-avatar><img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-avatar>
            <v-row class="pa-3 flex-column">
              <div class="title">harimbu</div>
              <div class="caption">harimbu@gmail.com</div>
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

    <v-app-bar app color="#fcb69f" dark src="./assets/mountain.jpg" prominent flat>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.4)" ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer=!drawer" />
      <v-app-bar-title>오늘 할 일</v-app-bar-title>
      <v-spacer />
      <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
    </v-app-bar>

    <v-main >
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer fixed padless color="white">

    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      items: [
        { title: '할 일', icon: 'mdi-format-list-checks', to: '/' },
        { title: '소개', icon: 'mdi-information', to: '/about' }
      ]
    }
  }

}
</script>

<style lang="scss">
.container {
  margin-bottom: 50px;
}
.main {
  padding-bottom: 60px;
}
.d-flex {
  button {
    margin-right: 6px;
  }
  .endBtn {
    margin-left: auto;
    margin-right: 0;
  }
}

</style>
