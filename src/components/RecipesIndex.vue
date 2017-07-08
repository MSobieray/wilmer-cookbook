<template>
    <div>
      <div v-for="recipe in recipes">
        <div>
          <router-link :to="recipe.title.toLowerCase().replace(/\s/g, '-')">{{ recipe.title }}</router-link>
          <p v-if="recipe.created_by">by: {{ recipe.created_by}}</p>
        </div>
      </div>
    </div>
</template>

<script>
// import firebase from 'firebase'
import { db } from '../services/firebase.js'
// var firebaseApp = firebase.initializeApp(config)
// var fireRecipe = firebase.initializeApp(config)
export default {
  name: 'recipe-index',
  created () {
    this.$root.authRedirect()
  },
  firebase: {
    recipes: db.ref('recipes')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
