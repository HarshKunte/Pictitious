// import * as firebase from 'firebase/app'
import firebase from 'firebase'
import 'firebase/storage';
import 'firebase/auth'
// import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyDLZNGpY7D4dHgmgjB9WuFJExTTAoDkESs",
    authDomain: "pictitious-751c6.firebaseapp.com",
    projectId: "pictitious-751c6",
    storageBucket: "pictitious-751c6.appspot.com",
    messagingSenderId: "1094919959542",
    appId: "1:1094919959542:web:ff9650c062694ab0f3cdd7",
    measurementId: "G-J0G3KJWMBF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const db = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp


export {storage, db, timestamp}