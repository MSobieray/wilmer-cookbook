import firebase from 'firebase'
import { config } from './firebaseConfig.js'

// Initialize Firebase
firebase.initializeApp(config)

export default {
  database: firebase.database()
}
