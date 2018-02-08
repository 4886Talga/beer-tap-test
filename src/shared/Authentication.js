import firebase from '../components/firebase';


var providerGoogle = new firebase.auth.GoogleAuthProvider();
var providerFB = new firebase.auth.FacebookAuthProvider();

function loginGoogle() {
  firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
	
  // The signed-in user info.
  var user = result.user;
	 console.log(user);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
 
function logInFacebook() {
	 
	 firebase.auth().signInWithPopup(providerFB).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
	 
 }
 
function logInAnonymous() {
	 
	 firebase.auth().signInAnonymously().catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
  // ...
});
	 
 }

function signOut() {
	  
	  firebase.auth().signOut();
	  window.location = "/";
	
  }

 export { loginGoogle, logInFacebook, logInAnonymous, signOut };