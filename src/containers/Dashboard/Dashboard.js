import React, { Component } from 'react';

import Item from '../../components/Item/Item';
import './Dashboard.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import ItemDetail from '../../components/ItemDetails/ItemDetail';
import firebase from '../../components/firebase';

class Dashboard extends Component {

	state = {
		
		user: '',
		favorites: [],
		beerId: '',
		chosenItem: {
            item:{
                food:[]
            },
            malt:[],
            hops:[],
            yeast:null
        },
        loading: false,
        loadedItem: false
	}

	componentDidMount() {
		firebase.auth()
		  .onAuthStateChanged((user) =>{
			if(user){			
				this.setState({ 
					user: user,
				});
				this.getFavoriteItems(this.state.user.uid);
			}else{
			  	this.setState({ user: ''});
			}
			});
	}
	getFavoriteItems = (userId) => {
		firebase.database()
		  .ref('beers')
		  .orderByChild(`favoriteusers/${userId}`)
		  .startAt(true)
		  .on('value', (snapshot) => {
			let beers = []
			for (var prop in snapshot.val()) {
			  let beer = snapshot.val()[prop]
			  beer['key'] = prop;			  
			  beers.push(beer);
			} 
			this.setState({ favorites: beers });		
		  });    
	  }
	itemSelectedHandler = (chosenItem) => {
        const beerMalt = chosenItem.malt.map(malt => malt);        
        const beerHops = chosenItem.hops.map(hop => hop);
        const beerYeast = chosenItem.yeast;
        this.setState({
            loadedItem: true,
            chosenItem: {
                item:chosenItem,
                malt:beerMalt,
                hops:beerHops,
                yeast:beerYeast
            }
        });
	}
	cancelHandler = () => {
        this.setState({loadedItem: false});
    }
render() {
		const { favorites } = this.state;
		
        let favBeers = favorites.map(beer => {
			return (				
				<Item 
						key={beer.id}
						beer={beer}
						cklicked={() => this.itemSelectedHandler(beer)} />
			);
		});
		if (this.state.loading) {
			favBeers = <Spinner />;
		}
        return (             
            <div>
                <Modal show={this.state.loadedItem} modalClosed={this.cancelHandler}>
                   <ItemDetail chosenItem={this.state.chosenItem} favorite />
                </Modal>
                <div className="Items">
                    {favBeers}
                </div>
            </div>
        );
}
}
export default Dashboard;