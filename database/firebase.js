import firebase from 'firebase'
import 'firebase/firestore'
import App from 'firebase/app'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA26mHR_84L5amYMLuqpHgA3p7dER8X0Co",
  authDomain: "lugarturistico-eb9e2.firebaseapp.com",
  databaseURL: "https://lugarturistico-eb9e2-default-rtdb.firebaseio.com",
  projectId: "lugarturistico-eb9e2",
  storageBucket: "lugarturistico-eb9e2.appspot.com",
  messagingSenderId: "933473072216",
  appId: "1:933473072216:web:41f15bb4126f22e8d7c62d",
  measurementId: "G-VN2GEX3S1K"
};
  // Initialize Firebase
  App.initializeApp(firebaseConfig);
  App.analytics();

  const db = firebase.firestore();

  export default {
    firebase,
    db
  };