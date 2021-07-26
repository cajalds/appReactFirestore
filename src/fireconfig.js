import firebase from "firebase";
import 'firebase/firestore'



const  firebaseConfig = {
    apiKey: "AIzaSyCcekpcCC1QEgmhRhkkdEXvjIWjqkLSMvE",
    authDomain: "cajalappreact.firebaseapp.com",
    projectId: "cajalappreact",
    storageBucket: "cajalappreact.appspot.com",
    messagingSenderId: "732092010196",
    appId: "1:732092010196:web:3ebfb83d819a2f0c45b541",
    measurementId: "G-R7X5CR9LEP"
  };
  // Initialize Firebase
  const fireb = firebase.initializeApp(firebaseConfig);
  const store = fireb.firestore()

  export {store}
  