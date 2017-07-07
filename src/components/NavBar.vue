<template>
  <nav>
    <router-link to="/recipes">Recipes</router-link>
    <p v-if="name">{{name}}</p>  
    <a v-if="name" @click.prevent="logOut" href="#">Log out</a>
    <router-link v-else to="/sign-in">Sign In</router-link>

  </nav>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'nav-bar',
  data () {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.name = this.user.displayName
        this.email = this.user.email
        this.photo = this.user.photoURL
        this.userId = this.user.uid
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: white;
}
p {
  margin: 0;
}

</style>
