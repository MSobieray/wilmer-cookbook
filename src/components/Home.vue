<template>
  <div class="home">
    <h2 class="text-xs-left display-2 mt-5 orange--text text--darken-3"> Welcome {{name}}</h2> 
    <p class="headline">This is a test concept to see about creating a app the allows friends and family to share their favoiite recipes amongst themselves.</p>
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
