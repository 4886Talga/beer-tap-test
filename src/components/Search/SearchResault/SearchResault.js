import React, { Component } from 'react';
import firebase from '../../../components/firebase';
import './SearchResault.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';
import Item from '../../../components/Item/Item';
import ItemDetail from '../../../components/ItemDetails/ItemDetail';


class SearchResault extends Component {
   
    state = {
        user: '',
        beers: [],
        searchterm: '',
        loading: true,
        chosenItem: {
            item:{
                food:[]
            },
            malt:[],
            hops:[],
            yeast:null
        },
        loadedItem: false,
        error: false
       };
        
    componentDidMount() {
        firebase.auth()
        .onAuthStateChanged((user) =>{
            if(user){			
              this.setState({ 
                  user: user,
              });
            }else{
                this.setState({ user: ''});
            }
          });		
        this.getDataFromFirebase(); 
      }

    getDataFromFirebase = () => {
        const beersRef = firebase.database().ref('beers');        
        beersRef.once("value", (snapshot) =>  {
            let beers = [];
            snapshot.forEach(childSnapshot => {
                let item = childSnapshot.val(); 
                item.key = childSnapshot.key;
                beers.push(item);
                console.log(item)
            });
            this.setState({ 
                beers: beers,
                searchterm: this.props.location.state.searchterm,
                loading: false
             });
        });
    }

    itemSelectedHandler = (chosenItem) => {
        const beerMalt = chosenItem.malt.map(malt => malt.name);        
        const beerHops = chosenItem.hops.map(hop => hop.name);
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
       const { searchterm, beers, user, chosenItem} = this.state;
        console.log(searchterm);
        let searchResault = beers.map((beer, index) => {

            for( var key in beer )
            {
                if(typeof beer[key] == 'array' )
                {
                    if(beer[key].indexOf(searchterm) > -1) {
                        return (
                            
                            <Item 
                            key={beer.id}
                            beer={beer}
                            cklicked={() => this.itemSelectedHandler(chosenItem)} />
                         );
                    }
                }
                else if( typeof beer[key] == 'string' )
                {
                   if(beer[key].includes(searchterm)) {
                    return (
                        <Item 
                                key={beer.id}
                                beer={beer}
                                cklicked={() => this.itemSelectedHandler(chosenItem)} />
                     );
                   }
                }
            }
                  
        });
        if (this.state.loading) {
            searchResault = <Spinner />;
        }
        return(
            <div className="BeersListWrapper">
            
                <Modal show={this.state.loadedItem} modalClosed={this.cancelHandler}>
                    <ItemDetail chosenItem={this.state.chosenItem} user={this.state.user.uid}/>
                </Modal>
                <div className="Items">
                    {searchResault}
                </div>
            </div>
        );
    }
}
export default SearchResault;