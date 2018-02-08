import React, { Component } from 'react';
import firebase from '../../components/firebase';
import Box from '../../components/Box/Box';
import {Redirect} from 'react-router-dom';
import TextField from '../../shared/TextField/TextField';
import * as errorMessages from '../../constants/Messages';
import ErrorMessage from '../../shared/ErrorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends Component {
	
	static propTypes = {
    location: PropTypes.object
  };

  state = {
    username: '',
    password: '',
		user: '',
		uid: '',
    showErrors: false,
		loggedIn: false,
		authError: '',
		showAuthErrors: false,
		redirectToReferrer: false,
		loggWithProvider: ''
	}
	// componentWillReceiveProps(nextProps) {
		
  //   this.setState({
  //     user: this.props.user
  //   })}
  // componentDidMount() { 
  //  this.setState({
	// 	 user: this.props.location.state.user
	//  })
  // }
  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
		this.setState({showErrors: true});
	
	  if (this.validateForm()) {
			firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
			.then((response) => {
				this.setState({
					redirectToReferrer: true,
					uid: response.uid
				});
		 }).catch(error => {
				this.setState({showAuthError: true});
		 		var errorCode = error.code;
  			var errorMessage = error.message;
			  if (errorCode === 'auth/invalid-email') {
				this.setState({authError: errorMessages.EMAIL_NOT_VALID});
			  } else if (errorCode === 'auth/user-disabled') {
				this.setState({authError: errorMessages.USER_DISABLED});
			  } else if (errorCode === 'auth/user-not-found') {
				this.setState({authError: errorMessages.USER_NOT_FOUND});
			  } else if (errorCode === 'auth/wrong-password') {
				this.setState({authError: errorMessages.WRONG_PASSWORD});
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
	 	  this.state.password.length > 0
    );
	}
	  
  render(){

	  const {redirectToReferrer, showErrors, uid} = this.state;
	
    return(
	  
      <Box title="Login">

		{redirectToReferrer && (<Redirect to={{pathname: '/dashboard', state:{uid:uid}}}/>)}
		{/* {from && (
          <p>You must log in to view the page at <code>{from.pathname}</code></p>
        )} */}
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
						type="password"
						value={this.state.password}
						label="Password"
						name="password"
						placeholder=".........."
						errorText = "Password is required and must be at least 6 characters"
						showError={showErrors && this.state.password.length<=0}
						onFieldChanged={e => this.onChange(e)} />
					
		       <div className="FormBtnWrapper">	
		          <button className="FormSubmitBtn" type="submit">Login</button>				  
			  	</div>			      
          </form>          
      </Box>
				  
    );
  } 
} 

export default Login;