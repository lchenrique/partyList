import firebase from 'firebase/app';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCrJSS9EeRted1cGLegiN1Jr05DxKFwv8Y",
    authDomain: "remind-560ac.firebaseapp.com",
    databaseURL: "https://remind-560ac.firebaseio.com",
    projectId: "remind-560ac",
    storageBucket: "remind-560ac.appspot.com",
    messagingSenderId: "702754798149",
    appId: "1:702754798149:web:8f34efa369a9d63099812c",
    measurementId: "G-2V42PKY3D3"
  })
}

const db = firebase.firestore()
export {db}