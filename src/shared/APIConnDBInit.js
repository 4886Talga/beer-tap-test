import firebase from '../components/firebase';

function getDataFromApi() {
	fetch('https://api.punkapi.com/v2/beers?per_page=60')
      .then(response => response.json())
      .then(data => {
		//When we are sure we have the data
        //i will create beers node with all received beers
		let beersRef = firebase.database().ref('beers');
		
		const beers = data.map((beer) => {
			
				const beerMalt = beer.ingredients.malt.map(malt => malt.name);
				const beerHops = beer.ingredients.hops.map(hop => hop.name);
				
			
			
			beersRef.push({
				name: beer.name,
				description: beer.description,
				img_url: beer.image_url,
				malt: beerMalt,
				hops: beerHops,
				yeast: beer.ingredients.yeast,
				food: beer.food_pairing,
				tips: beer.brewers_tips
				
			
			})
		}) 
		
      })
      .catch(error => {
        //Else we can save an error to display later
        //this.setState({ error: error })
      })
	//changing beer-tap db init to true after first initialization
	firebase.database().ref('init').set(true);
	}
	
	
export {getDataFromApi};