<template>
  <div class="post-recipe">
    <form @submit.prevent="postRecipe">
      <input type="text" name="title" placeholder="Recipe Title" v-model="title">
      <textarea v-model="instructions"></textarea>
      <input type="text" name="ingredients" placeholder="ingredients" v-model="ingredients">
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
      ingredients: ''
    }
  },
  methods: {
    postRecipe () {
      db.ref('recipes').push({
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

</style>
