<template>
    <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
// import {config} from '../services/firebaseConfig'
export default {
  name: 'sign-in',
  data () {
    return {
      // msg: '&#128293; Welcome Fam! &#128293;',
      displayName: ''
      // instructions: '',
      // ingredients: []
    }
  },
  mounted () {
    if (firebase.auth().currentUser) {
      this.$route.push('/#/recipes')
    } else {
      var uiConfig = {
        signInSuccessUrl: '/#/recipes',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.NONE
      }
      var ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
