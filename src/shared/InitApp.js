import axios from 'axios';
import Axios from '../axios-beers';

function GetDataFromAPI() {
    axios.get('https://api.punkapi.com/v2/beers?per_page=60')
        .then((response) => {
            response.data.map((beer) => {
            Axios.post('/beers.json', beer);
        })})
        .catch();
   
    Axios.put('/Init.json', {initValue:true})
        .then(response => {
            console.log(response);        
         })
         .catch();
  }

export {GetDataFromAPI};