<template>
  <nav>
    <div class="links">
      <router-link to="/recipes" v-if="auth">Recipes</router-link>
      <a v-if="auth" @click.prevent="logOut" href="#">Log out</a>
      <router-link v-else to="/sign-in">Sign In</router-link>
    </div>

    <div class="user-info">
      <p v-if="name">{{name}}</p>  
    </div>
    

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
        this.photo = this.user.photoURL
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}
a {
  color: white;
}
p {
  margin: 0;
}

</style>
