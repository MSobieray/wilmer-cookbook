<template>
  <div>
    <h1>{{ filterRecipes[0].title }}</h1>
    <h2><strong>Instructions:</strong> {{ filterRecipes[0].instructions }}</h2>
    <router-link to="/recipes">All Recipes</router-link>
  </div>
</template>

<script>
import { db } from '../services/firebase.js'
export default {
  name: 'single-recipe',
  data () {
    return {
    }
  },
  firebase: {
    recipes: db.ref('recipes')
  },
  computed: {
    filterRecipes () {
      const pageRecipe = this.recipes.filter((el) => {
        let recipeTitle = el.title.toLowerCase().replace(/\s/g, '-')
        return recipeTitle === this.$route.params.recipe
      })
      return pageRecipe
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
