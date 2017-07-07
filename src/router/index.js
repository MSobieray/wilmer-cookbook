import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import PageError from '@/components/PageError'
import RecipesIndex from '@/components/RecipesIndex'
Vue.use(Router)

export default new Router({
  routes: [
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
      path: '*',
      name: '404',
      component: PageError
    }
  ]
})
