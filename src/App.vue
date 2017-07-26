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
          <p>please Log In</p>
        </v-toolbar>
      </v-navigation-drawer>

      <v-toolbar fixed class="green darken-1" dark>
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Family Eats</v-toolbar-title>
        <img src="./assets/white-cookbook-logo.svg" alt="">
      </v-toolbar>
      <main>
        <img src="./assets/green-cookbook-logo.svg" alt="Vue.js PWA" class="home-logo">
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
  margin-top: 40px;
}
.home-logo {
  width: 200px;
}
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}



header {
  margin: 0;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
  min-height: 70px;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}*/
</style>
