import React, { Component } from 'react';
import {FaSearch} from 'react-icons/lib/fa';
import './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import SearchBar from '../../Search/SearchBar/SearchBar';
import Aux from '../../../extra/extra';


class NavigationItems extends Component {
    state = {
        show: 'none'
    }
    showSearchBar = () => {        
		this.state.show === 'none' ? this.setState({show:'inline'}) : this.setState({show:'none'});
	}
    render() {
        
        return(
            <Aux>
                <ul className="NavigationItems">
                    <li><div className="SearchBar" onClick={this.showSearchBar}><FaSearch /></div></li>
                    <NavigationItem link="/" exact drawerToggleClicked={this.props.drawerToggleClicked}>HOME</NavigationItem>
                    <NavigationItem link="/gallery" drawerToggleClicked={this.props.drawerToggleClicked}>BEERS</NavigationItem>
                    { !this.props.user && (<NavigationItem link="/login" drawerToggleClicked={this.props.drawerToggleClicked}>LOGIN</NavigationItem>)}
                    { !this.props.user && (<NavigationItem link="/createaccount" drawerToggleClicked={this.props.drawerToggleClicked}>REGISTER</NavigationItem>)}
                    { this.props.user && (<NavigationItem link="/logout" drawerToggleClicked={this.props.drawerToggleClicked}>LOGOUT</NavigationItem>)}
                    { this.props.user && (<NavigationItem link="/dashboard" drawerToggleClicked={this.props.drawerToggleClicked}>MINA SIDOR</NavigationItem>)}
                    { this.props.user && (<li><div className="UserName">{this.props.user.displayName}</div></li>)}
                </ul>
                <SearchBar show={this.state.show} />
            </Aux>
        );
    }
}
export default NavigationItems;