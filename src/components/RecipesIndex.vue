<template>
    <div>
      <div v-for="recipe in recipes">
        <div>
          <p>{{ recipe.title }}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'recipe-index',
  data () {
    return {
      recipes: 'recipes'
    }
  },
  mounted () {
   // console.log(this.$bindAsObject('user', myFirebaseRef.child('user')))
  }
  // firebase: {
  //   recipes: firebase.database.ref('recipes')
  // }
  // created () {
  //   if (!this.$root.children.home.user) {
  //     this.$router.go('/sign-in')
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
