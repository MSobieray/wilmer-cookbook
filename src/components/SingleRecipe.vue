<template>
  <div v-cloak>
    <h1 class="display-3">{{ filterRecipes[0].title }}</h1>
    <v-layout>
      <v-flex>
        <v-data-table
            v-bind:headers="headers"
            :items="filterRecipes[0].ingredients"
            hide-actions
            class="elevation-1"
          >
          <template slot="items" scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.amount }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    

    <h2 class="display-2">Instructions:</h2>
    <p class="body">{{ filterRecipes[0].instructions }}</p>
    <v-btn primary to="/recipes">Back To All Recipes</v-btn>
  </div>
</template>

<script>
import { db } from '../services/firebase.js'
export default {
  name: 'single-recipe',
  data () {
    return {
      headers: [
        {
          text: 'Ingredients',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Quanity', value: 'quanity', sortable: false }
      ],
      items: []
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
<style scoped>
  table.table thead th {
    font-weight: bolder;
    font-size: 1rem;
  }
  h2 {
    text-align: left;
    margin-top: 2rem;
  }
  p {
    text-align: left;
    font-size: 1rem;
  }

</style>
