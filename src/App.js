import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';
import firebase from './components/firebase';
import Gallery from './containers/Gallery/Gallery';
import Dashboard from './containers/Dashboard/Dashboard';
import Home from './components/Home/Home';
import ItemDetail from './components/ItemDetails/ItemDetail';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import CreateAccount from './containers/CreateAccount/CreateAccount';
import FavoriteItem from './containers/FavoriteItem/FavoriteItem';
import SearchResault from './components/Search/SearchResault/SearchResault';
import NotFoundPage from './shared/NotFoundPage/NotFoundPage';


class App extends Component {

	state = {
    
		user: ''
		 
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
	}
	
  render() {
	 
	const { user } = this.state;
	
	 return (
    <div>
			<Layout user={user}>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/gallery" component={Gallery} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/login" component={Login} />
					<Route path="/logout" component={Logout} />
					<Route path='/createaccount' component={CreateAccount} />
					<Route path='/favoriteitem' component={FavoriteItem} />
					<Route path='/searchresault' component={SearchResault} />					
					<Route component={NotFoundPage} />
				</Switch>
			</Layout>
		</div>
    );
  }
}

export default App;