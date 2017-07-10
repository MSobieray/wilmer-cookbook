import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import PageError from '@/components/PageError'
import RecipesIndex from '@/components/RecipesIndex'
import PostRecipe from '@/components/PostRecipe'
import SingleRecipe from '@/components/SingleRecipe'
// import firebase from 'firebase'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/recipes',
    name: 'RecipesIndex',
    component: RecipesIndex
  },
  {
    path: '/recipes/:recipe',
    name: 'Recipe',
    component: SingleRecipe
  },
  {
    path: '/post-recipe',
    name: 'PostRecipe',
    component: PostRecipe
  },
  {
    path: '*',
    name: '404',
    component: PageError
  }
]
const router = new Router({
  routes
})

// router.beforeEach((to, from, next) => {
//   // console.log(to)
//   firebase.auth().onAuthStateChanged((user) => {
//     if (!user) {
//       next('/sign-in')
//     } else {
//       next('/recipes')
//     }
//   })
// })

export default router
