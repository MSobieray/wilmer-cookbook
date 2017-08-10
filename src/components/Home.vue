<template>
  <div class="home">
    <h2 class="text-xs-center display-2 mt-5 orange--text text--darken-3">{{name}}</h2>
    <h3 class="text-xs-center display-1 mt-0">Welcome To Cooking With Fire</h3> 
    <p class="headline text-xs-center">This is a test concept to see about creating an app that allows friends and family to share their favorite recipes amongst themselves.</p>
    <v-btn primary to="/recipes" class="orange darken-3">Recipes</v-btn>
    <v-btn primary to="/post-recipe" class="orange darken-3">Add A Recipe</v-btn>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'home',
  data () {
    return {
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
    /* postRecipe () {
      this.$root.$firebaseRefs.recipes.push({
        'title': this.title,
        'instructions': this.instructions,
        'ingredients': this.ingredients,
        'created_at': * new Date().getTime()
      })
      .then(this.title = '', this.instructions = '', this.ingredients = '')
    } */
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
