<template>
  <div class="home">
    <h1>CookBook</h1>
    <h2 v-html="msg"></h2>
    <!-- <div v-for="recipe in this.$root.recipes" class="image-card">
      <div class="image-card__comment mdl-card__actions">
        <span>{{ recipe.title }}</span>
      </div>
    </div> -->
    
    <p> Welcome Back {{name}}</p>  
    
    <form @submit.prevent="postRecipe">
      <input type="text" name="title" placeholder="Recipe Title" v-model="title">
      <textarea v-model="instructions"></textarea>
      <input type="text" name="ingredients" placeholder="ingredients" v-model="ingredients">
      <input type="submit" value="post recipe">
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'home',
  data () {
    return {
      msg: '&#128293; Welcome Fam! &#128293;',
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
    // let vm = this
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.name = this.user.displayName
        this.email = this.user.email
        this.photo = this.user.photoURL
        this.userId = this.user.uid
      } else {
        this.$router.go('/sign-in')
      }
    })
  },
  methods: {
    postRecipe () {
      this.$root.$firebaseRefs.recipes.push({
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
