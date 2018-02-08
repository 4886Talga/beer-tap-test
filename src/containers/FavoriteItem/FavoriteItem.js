import React, { Component } from 'react';
import firebase from '../../components/firebase';

class FavoriteItem extends Component {

	state = {		
		user: '',
		beerId: ''
	}

	componentDidMount() {
		firebase.auth()
		  .onAuthStateChanged((user) =>{
			if(user){			
				this.setState({ 
					user: user,
					beerId: this.props.location.state.beer
				});
				this.addFavoriteBeer(this.state.beerId, this.state.user.uid);	
			}else{
			  this.setState({ user: ''});
			}
            });			
	}
	
	addFavoriteBeer = (beerId, userId) =>{
		console.log(userId, beerId, this.props);
		const refFavUser = firebase.database().ref(`beers/${beerId}/favoriteusers`);
		
		//const refFavBeer = firebase.database().ref(`users/${userId}/favoritebeer`);
		refFavUser.update(({[userId] : true}))
		.then(() => (this.props.history.push('/dashboard')));
		//refFavBeer.update(({[beerId]: true}));
    }
    
render() {
	return(
		<div></div>		
	);
}
}
export default FavoriteItem;