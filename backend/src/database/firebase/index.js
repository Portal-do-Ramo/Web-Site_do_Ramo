const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyAC0htnHvvwIJl2lVPN9nHo48qsx5CLTXI",
  authDomain: "site-do-ramo-2a248.firebaseapp.com",
  projectId: "site-do-ramo-2a248",
  storageBucket: "site-do-ramo-2a248.appspot.com",
  messagingSenderId: "514957689795",
  appId: "1:514957689795:web:ab30a17e818461e66a3376"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = db;