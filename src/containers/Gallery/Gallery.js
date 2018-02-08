import React, { Component } from 'react';
import axios from 'axios';
import Item from '../../components/Item/Item';
import './Gallery.css';
import {getDataFromApi} from '../../shared/APIConnDBInit';
import Axios from '../../axios-beers';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import ItemDetail from '../../components/ItemDetails/ItemDetail';
import firebase from '../../components/firebase';

class Gallery extends Component {

    state = {
        user: '',
        beers: [],
        chosenItem: {
            item:{
                food:[]
            },
            malt:[],
            hops:[],
            yeast:null
        },
        loading: true,
        loadedItem: false
    }

    componentDidMount() {
        firebase.auth()
		  .onAuthStateChanged((user) => {
			if(user){			
				this.setState({					
					user: user
				});				
			}else{
				this.setState({user: ''});
			}
		});
        //checking if DB is initialazed with beers from API
        this.isAppDBInit();
        //fetching beers from DB
        this.setBeersFromDB();
    }
    isAppDBInit = () => {
    const initRef = firebase.database().ref('init');
	  initRef.once('value', (snapshot) =>  {
            
            !snapshot.val() && getDataFromApi(); 
        });
    }
   
    setBeersFromDB = () => {
        Axios.get('/beers.json')
            .then(response => { 
                const fetchedBeers = [];
                for (let key in response.data) {
                    fetchedBeers.push({
                        ...response.data[key],
                        id: key
                    }); 
                }                            
                this.setState({ 
                    loading: false,
                    beers: fetchedBeers });
            })
            .catch(error => {
                this.setState({ 
                loading: false});
            });
    }

    itemSelectedHandler = (chosenItem) => {
       
        const beerMalt = chosenItem.malt.map(malt => malt);        
        const beerHops = chosenItem.hops.map(hop => hop);
        const beerYeast = chosenItem.yeast;
        console.log(beerMalt);
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
  
    render () {
        
        let beers = this.state.beers.map(beer => {
        return (
            
            <Item 
                    key={beer.id}
                    beer={beer}
                    cklicked={() => this.itemSelectedHandler(beer)} />
        );
        });
        if (this.state.loading) {
            beers = <Spinner />;
        }
        
        return (
            
            <div>
                <Modal show={this.state.loadedItem} modalClosed={this.cancelHandler}>
                   <ItemDetail chosenItem={this.state.chosenItem} user={this.state.user.uid}/>
                </Modal>
                <div className="Items">
                    {beers}
                </div>
            </div>
        );
    }
}

export default Gallery;