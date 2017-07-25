<template>
  <div class="post-recipe">
    <form @submit.prevent="postRecipe">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            name="title"
            label="Recipe Name"
            id="recipeName"
            v-model="title">    
          </v-text-field>
          <v-text-field
            name="instructions"
            label="Cooking Instructions"
            multi-line
            v-model="instructions">    
          </v-text-field>
          <div v-for="(ingredient, index) in ingredients">
            <div class="form-group" v-bind:class="{ 'form-group--error': $v.ingredients.$each[index].$error }">
              <v-text-field
                name="title"
                :label="`Ingredient ${index + 1}`"
                id="recipeName"
                v-model.trim="ingredient.name" 
                @input="$v.ingredients.$each[index].name.$touch()">    
              </v-text-field>
              <v-text-field
                name="title"
                :label="`Amount`"
                id="recipeName"
                v-model.trim="ingredient.amount" 
                @input="$v.ingredients.$each[index].amount.$touch()">    
              </v-text-field>
            </div>
            <span class="form-group__message" v-if="!$v.ingredients.$each[index].name.required">Ingredients are required.</span><span class="form-group__message" v-if="!$v.ingredients.$each[index].name.minLength">Ingredient must have at least {{ $v.ingredients.$each[index].name.$params.minLength.min }} letters.</span>
            <span class="form-group__message" v-if="!$v.ingredients.$each[index].amount.required">Ingredient Amount is required.</span><span class="form-group__message" v-if="!$v.ingredients.$each[index].amount.minLength">Ingredient Amount must have at least {{ $v.ingredients.$each[index].name.$params.minLength.min }} letters.</span>
          </div>
        </v-flex>
      </v-layout>
      <div>
        <v-btn primary dark  @click.prevent="ingredients.push({name: '', amount: ''})">Add Indredient</v-btn>
        <v-btn primary dark @click.prevent="ingredients.pop()" v-if="ingredients.length > 1">Remove Ingredient</v-btn>
      </div>
      <v-btn type="submit" value="post recipe">Post Recipe</v-btn>
    </form>
  </div>
</template>

<script>
import { db } from '../services/firebase'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'post-recipe',
  data () {
    return {
      title: '',
      instructions: '',
      ingredients: [
        {name: '', amount: ''}
      ]
    }
  },
  validations: {
    ingredients: {
      required,
      minLength: minLength(3),
      $each: {
        name: {
          required,
          minLength: minLength(2)
        },
        amount: {
          required,
          minLength: minLength(2)
        }
      }
    }
  },
  methods: {
    postRecipe () {
      db.ref('recipes').push({
        'title': this.title,
        'instructions': this.instructions,
        'ingredients': this.ingredients,
        'created_at': new Date().getTime(),
        'created_by': this.$root.auth.displayName
      })
      .then(this.title = '', this.instructions = '', this.ingredients = '', this.$router.push('/recipes'))
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
