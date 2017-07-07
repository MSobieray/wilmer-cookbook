// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
// import firebaseui from 'firebaseui'
import { config } from './services/firebaseConfig.js'
import Vuefire from 'vuefire'

Vue.use(Vuefire)

Vue.config.productionTip = false
var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  recipes: '',
  router,
  firebase: {
    recipes: db.ref('recipes')
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      } else {
        this.$router.push('/sign-in')
      }
    })
  },
  template: '<App/>',
  components: { App }
})
