<template>
  <div>
      <!-- <div v-for="recipe in recipes">
        <div>
          <router-link :to="'/recipes/' + recipe.title.toLowerCase().replace(/\s/g, '-')">{{ recipe.title }}</router-link>
          <p v-if="recipe.created_by">by: {{ recipe.created_by}}</p>
        </div>
      </div> -->
     
      
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="recipe in recipes" :key="recipe.key">
        <v-card>
          <v-card-media 
            class="white--text" 
            height="200px" 
            src="/static/img/cookbook-main.jpg">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <h3 class="headline white--text mb-0">{{ recipe.title }}</h3>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title class="layout justify-space-between">
            <p class="grey--text">by: {{ recipe.created_by }}</p>
            <p class="grey--text">{{ formatDate(recipe.created_at) }}</p>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :to="'/recipes/' + recipe.title.toLowerCase().replace(/\s/g, '-')" class="green--text">Read More</v-btn>
            
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>   
  </div>
</template>

<script>
// import firebase from 'firebase'
import { db } from '../services/firebase.js'
import moment from 'moment'
// var firebaseApp = firebase.initializeApp(config)
// var fireRecipe = firebase.initializeApp(config)
export default {
  name: 'recipe-index',
  created () {
    this.$root.authRedirect()
  },
  firebase: {
    recipes: db.ref('recipes')
  },
  methods: {
    formatDate (date) {
      return moment(date).format('MMMM Do YYYY')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .layout > div {
    margin-bottom: 1rem;
  }
</style>
