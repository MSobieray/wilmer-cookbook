<template>
  <div class="post-recipe">
    <form @submit.prevent="postRecipe">
      <input type="text" name="title" placeholder="Recipe Title" v-model="title">
      <textarea v-model="instructions" placeholder="instructions"></textarea>
      <div class="ingredients">
        <input type="text" name="ingredients" placeholder="Add ingredients">
        <input type="text" name="ingredients" placeholder="Add ingredients">
        <button class="ingredients-add" @click.prevent="addIngredient()">Add Ingredient</button>
      </div>
      <input type="submit" value="post recipe">
    </form>
  </div>
</template>

<script>
import { db } from '../services/firebase'
export default {
  name: 'post-recipe',
  data () {
    return {
      title: '',
      instructions: '',
      ingredients: { }
    }
  },
  methods: {
    postRecipe () {
      db.ref('recipes').push({
        'title': this.title,
        'instructions': this.instructions,
        'ingredients': this.ingredients,
        'created_at': -1 * new Date().getTime(),
        'created_by': this.$root.auth.displayName
      })
      .then(this.title = '', this.instructions = '', this.ingredients = '', this.$router.push('/recipes'))
    },
    addIngredient () {
      let ingredients = document.querySelector('.ingredients')
      let inputs = ingredients.querySelectorAll('input')
      console.log(inputs[0].value)
      let count = inputs.length
      console.log(count)

      this.ingredients = inputs
      // ingredients.appendChild('input')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input, textarea {
  display: block;
  width: 100%;
  max-width: 600px;
  margin: 10px auto;
}
</style>
