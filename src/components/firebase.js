import firebase from "firebase";

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDrX1rDd15LOlWbFhe8dJcr-pD5nnQo5nk",
    authDomain: "beer-tap-fd7d5.firebaseapp.com",
    databaseURL: "https://beer-tap-fd7d5.firebaseio.com",
    projectId: "beer-tap-fd7d5",
    storageBucket: "",
    messagingSenderId: "891476853371"
  };
  firebase.initializeApp(config);

export default firebase;