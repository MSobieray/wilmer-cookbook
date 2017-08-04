<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer persistent light :mini-variant.sync="mini" v-model="drawer" overflow v-if="auth">
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <img :src="photo" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ name }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click.native.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click.native="logOut()">
            <v-list-tile-action>
              <v-icon>power_settings_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer persistent light :mini-variant.sync="mini" v-model="drawer" overflow v-else>
        <v-toolbar flat class="transparent">
          <p>Please Signup or Login</p>
        </v-toolbar>
      </v-navigation-drawer>

      <v-toolbar fixed class="orange darken-3" dark>
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Cooking With Fire</v-toolbar-title>
      </v-toolbar>
      <main>
        <div class="hero">
          <h2 class="white--text display-3 mb-0 text-xs-center">Cooking With Fire</h2>
          <h3 class="headline white--text">A collection of your friends and families favorite recipes</h3>
          <!-- <img src="./assets/cookbook-logo.svg" alt="Cooking With Fire Logo" class="home-logo"> -->
        </div>
        <v-container>
          <router-view></router-view>
        </v-container>
      </main>
      <v-footer></v-footer>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'app',
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'home', link: '/' },
        { title: 'Recipes', icon: 'restaurant', link: '/recipes' },
        { title: 'Add A Recipes', icon: 'add', link: '/post-recipe' }
      ],
      mini: false,
      right: null,
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {},
      auth: false
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.name = this.user.displayName
        this.email = this.user.email
        this.photo = this.user.providerData[0].photoURL
        this.userId = this.user.uid
        this.auth = true
      }
    })
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
      this.$router.go('/sign-in')
    }
  }
}
</script>

<style scoped>
main {
  text-align: center;
}
.home-logo {
  max-width: 700px;
}
.hero {
  background-image: url(../static/img/hero.jpg);
  background-position: top center;
  background-size: cover;
  padding: 10vw;
}
</style>
