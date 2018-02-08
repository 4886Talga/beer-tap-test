import React, { Component } from 'react';
import firebase from '../../components/firebase';
import Box from '../../components/Box/Box';
import {Redirect} from 'react-router-dom';
import TextField from '../../shared/TextField/TextField';
import * as errorMessages from '../../constants/Messages';
import ErrorMessage from '../../shared/ErrorMessage/ErrorMessage';
import './CreateAccount.css';


class CreateAccount extends Component {

  state = {
    username: '',
    password: '',
		displayName: '',
		user: '',
    showErrors: false,
		loggedIn: false,
		authError: '',
		showAuthErrors: false
  }
  
  componentDidMount(){
	  
	  firebase.auth()
	  .onAuthStateChanged((user) =>{
		  
		  if(user){
			  this.setState({user: user});
		  } else {
			  this.setState({user: ''});
		  }
		  
	  });
  }
  
  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
	this.setState({showErrors: true});
	
	  if (this.validateForm()) {
		 firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
		.then(user => {firebase.database().ref().child('users').child(user.uid).set({
			email: user.email,
			displayName: this.state.displayName
		});
			user.updateProfile({
          	displayName: this.state.displayName
        });
			this.setState({loggedIn: true});
				
		}).catch(error => {
			this.setState({showAuthErrors: true});
		 	var errorCode = error.code;
  			var errorMessage = error.message;
			  if (errorCode === 'auth/email-already-in-use') {
				this.setState({authError: errorMessages.USERNAME_TAKEN});
			  } else if (errorCode === 'auth/invalid-email') {
				this.setState({authError: errorMessages.EMAIL_NOT_VALID});
			  } else if (errorCode === 'auth/operation-not-allowed') {
				this.setState({authError: errorMessages.OPERATION_NOT_ALLOWED});
			  } else if (errorCode === 'auth/weak-password') {
				this.setState({authError: errorMessages.PASSWORD_TO_WEEK});
			  } else {
				alert(errorMessage);
			  }
			  console.log(error);
			 
		 });
	  }	
   	}
  
  validateForm = () => {
    return (
      this.state.username.length > 0 &&
	  	this.state.displayName.length > 0 &&
      this.state.password.length >= 6
    );
  }
  
  signIn = () => {
	  
	  firebase.auth()
	  .signInWithEmailAndPassword(this.state.username, this.state.password)
	  .catch(error => console.log(error));
	  
  }
  
  signOut = () => {
	  
	  firebase.auth().signOut();
	  
  }
  
  
  render(){
    const {showErrors, loggedIn } = this.state;
    return(
	  
      <Box title="Register">       
		{loggedIn && (<Redirect to='/dashboard' />)}
          <form onSubmit={this.onSubmit}>
			 			<ErrorMessage errorMessage={this.state.authError} />
		          	<TextField
		                value={this.state.username}
										label="Email"
										name="username"
										placeholder="your e-mail"
										errorText = "Email is required"
										showError={showErrors && this.state.username.length<=0}
										onFieldChanged={e => this.onChange(e)} />
				  			<TextField
		                value={this.state.displayName}
										label="Display Name"
										name="displayName"
										placeholder="display name"
										errorText = "Display Name is required"
										showError={showErrors && this.state.username.length<=0}
										onFieldChanged={e => this.onChange(e)} />
				  			<TextField
										type="password"
										value={this.state.password}
										label="Password"
										name="password"
										placeholder=".........."
										errorText = "Password is required and must be at least 6 characters"
										showError={showErrors && this.state.password.length<=0}
										onFieldChanged={e => this.onChange(e)} />					
						<div className="FormBtnWrapper">	
								<button className="FormSubmitBtn" type="submit">Register</button>
						</div>			      
        	</form>          
      </Box>
    );
  }
}  

export default CreateAccount;