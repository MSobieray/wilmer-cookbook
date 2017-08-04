<template>
  <div class="post-recipe">
    <form @submit.prevent="postRecipe">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-alert error :value="$v.$error" class="mb-5">
            All Fields Are Required
          </v-alert>
          <v-text-field
            name="title"
            label="Recipe Name"
            id="recipeName"
            class="form-group"
            v-bind:class="{ 'input-group--error': $v.title.$error }"
            v-model.trim="title"
            @blur="[$v.title.$touch()]">  
          </v-text-field>
          <p class="input--error text-xs-left" v-if="$v.title.$error">Recipe title is required</p>

          <h5 class="headline text-xs-left mt-3 mb-3">Ingredients</h5>
          <div v-for="(ingredient, index) in ingredients">
            <div class="form-group" v-bind:class="{ 'form-group--error': $v.ingredients.$each[index].$error }">
              <v-text-field
                name="ingredient"
                :label="`Ingredient ${index + 1}`"
                id="ingredient"
                v-bind:class="{ 'input-group--error': $v.ingredients.$each[index].name.$error }"
                v-model.trim="ingredient.name" 
                @blur="[$v.ingredients.$each[index].name.$touch(), checkIngredients()]">    
              </v-text-field>
               <p class="form-group__message text-xs-left" v-if="$v.ingredients.$each[index].name.$error">Ingredient name is required.</p>
              <v-text-field
                name="amount"
                label="Amount"
                id="amount"
                v-bind:class="{ 'input-group--error': $v.ingredients.$each[index].amount.$error }"
                v-model.trim="ingredient.amount" 
                @blur="[$v.ingredients.$each[index].amount.$touch(), checkIngredients()]">    
              </v-text-field>
            </div>           
            <p class="form-group__message text-xs-left" v-if="$v.ingredients.$each[index].amount.$error">Ingredient Amount is required.</p>
          </div>
          <v-btn class="mt-5 mb-5" primary dark  @click.prevent="ingredients.push({name: '', amount: ''})">Add Ingredient</v-btn>
          <v-btn primary dark @click.prevent="ingredients.pop()" v-if="ingredients.length > 1">Remove Ingredient</v-btn>

          <h5 class="headline text-xs-left mt-3 mb-3">Instructions</h5>
          <div v-for="(instruction, index) in instructions">
            <div class="form-group" v-bind:class="{ 'form-group--error': $v.instructions.$each[index].$error }">
              <v-text-field
                name="instructions"
                :label="`Step ${index + 1}`"
                id="steps"
                v-bind:class="{ 'input-group--error': $v.instructions.$each[index].step.$error }"
                v-model.trim="instruction.step"
                @blur="[$v.instructions.$each[index].step.$touch(), checkInstructions()]">    
              </v-text-field>
            </div>
            <p class="form-group__message text-xs-left" v-if="$v.instructions.$each[index].step.$error">Instructions are required.</p>
          </div>
          
          <v-btn primary dark  @click.prevent="instructions.push({step: ''})">Add Step</v-btn>
          <v-btn primary dark @click.prevent="instructions.pop()" v-if="instructions.length > 1">Remove Step</v-btn>
        </v-flex>
      </v-layout>
      <v-btn type="submit" success value="post recipe" :disabled="$v.$invalid" class="mt-5">Post Recipe <v-icon class="ml-2 white--text">chevron_right</v-icon></v-btn>
    </form>
  </div>
</template>

<script>
import { db } from '../services/firebase'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  name: 'post-recipe',
  data () {
    return {
      title: '',
      instructions: [
        {step: ''}
      ],
      ingredients: [
        {name: '', amount: ''}
      ]
    }
  },
  mixins: [validationMixin],
  validations: {
    title: {
      required
    },
    ingredients: {
      required,
      $each: {
        name: {
          required
        },
        amount: {
          required
        }
      }
    },
    instructions: {
      required,
      $each: {
        step: {
          required
        }
      }
    }
  },
  methods: {
    postRecipe () {
      if (this.checkErrors()) {
        db.ref('recipes').push({
          'title': this.title,
          'instructions': this.instructions,
          'ingredients': this.ingredients,
          'created_at': new Date().getTime(),
          'created_by': this.$root.auth.displayName
        })
        .then(this.title = '', this.instructions = '', this.ingredients = '', this.$router.push('/recipes'))
      } else {
        alert('fix errors')
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .input--error input {
    border-bottom: red;
  }
</style>
