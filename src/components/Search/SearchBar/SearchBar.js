import React, { Component } from 'react';
import {FaSearch} from 'react-icons/lib/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SearchBar.css';

class SearchBar extends Component {
	
	state = { 
		term: ''
	};
	
		
	handleFormSubmit = (e) => {
		//e.preventDefault();
		console.log(this.state.term);
		this.handleClearForm(e);
	  }
	
	handleClearForm = (e) => {
		//e.preventDefault();
		this.setState({term: ''});
		e.target.value = '';
	}

	
	render() {
		
		return (
			<form>
			<div className="SerchHolder" style={{display: this.props.show}}>
					<input className="SearchInput" 
						value={this.state.term}
						onChange={(event) => this.onInputChange(event.target.value)} 
						placeholder={'Search for BrewDogs beer, malt, hops, yeast, food...'} />
					<button className="Button">
						<Link to={{pathname:`/searchresault`, state: {searchterm:this.state.term} }}
							 onClick={this.handleFormSubmit}>SEARCH<span className="Space"><FaSearch /></span>
						</Link>
					</button>
			</div>
			
			</form>
		)
			
	}
	
		
	onInputChange(term) {
		this.setState({term});
	
	}
	
}

SearchBar.propTypes = {
		show: PropTypes.string.isRequired
	};

export default SearchBar;