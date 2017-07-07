// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuefire from 'vuefire'

Vue.use(Vuefire)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      recipes: 'recipes',
      auth: 'false'
    }
  },
  router,
  mounted () {
    this.authRedirect()
  },
  methods: {
    authRedirect () {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$router.push('/sign-in')
        } else {
          this.auth = true
        }
      })
    }
  },
  template: '<App/>',
  components: { App }
})
