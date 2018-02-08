import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../../components/firebase';

class Logout extends Component {

    signOut = () => {
	  
        firebase.auth().signOut();
        
    };

    render() {
       
        return (
            <div>
                {this.signOut()}
                <Redirect to="/"/>
            </div>);
       
    }
}

export default Logout;