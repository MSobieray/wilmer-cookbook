<template>
  <div class="home">
    <h1>CookBook</h1>
    <h2 v-html="msg"></h2>
    <h4> Welcome Back {{name}}</h4>  
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'home',
  data () {
    return {
      msg: '&#128293; Welcome Fam! &#128293;',
      title: '',
      instructions: '',
      ingredients: [],
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
        this.name = user.displayName
        this.email = user.email
        this.photo = user.providerData[0].photoURL
        this.userId = user.uid
        console.log(this.photo)
      } else {
        this.$router.go('/sign-in')
      }
    })
  },
  methods: {
    postRecipe () {
      this.$root.$firebaseRefs.recipes.push({
        'title': this.title,
        'instructions': this.instructions,
        'ingredients': this.ingredients,
        'created_at': -1 * new Date().getTime()
      })
      .then(this.title = '', this.instructions = '', this.ingredients = '')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
