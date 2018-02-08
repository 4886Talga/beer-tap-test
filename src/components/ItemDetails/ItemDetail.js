import React from 'react';
import './ItemDetails.css';
import {FaArrowDown} from 'react-icons/lib/fa';
import { Link } from 'react-router-dom';


const itemDetail = (props) => {
  console.log(props.chosenItem.malt);


    return (
        <div className="wrapper">
            <div className="box1" >
                <h3>{props.chosenItem.item.name}</h3>
            </div>
            <div className="box2">
                <div className="nested">
                    <div className="imgWrapper">
                        <img 
                            className="ItemImg" 
                            src={props.chosenItem.item.img_url} />                    
                    </div>
                    <div className="tips">
                        <h5>Brewers Tips</h5>
                        <p>{props.chosenItem.item.tips}</p>
                    </div>
                    {props.user && <div className="favoriteWrapper">
                        <h3>Add as favorite!</h3>
                        <div className="favorite">
                        <Link to={{pathname:`/favoriteitem`, state: {beer:props.chosenItem.item.id, from:'beerdetail'} }}>
							<FaArrowDown size={40} color="#4385f3" />
						</Link>
						</div>
                    </div>}
                </div>
                <div className="nested">
                    <div>
                        <h5>Descripton</h5>
                        <p>{props.chosenItem.item.description}</p>
                    </div>
                    <div>
                        <h5>Ingredients</h5>
                        <strong>Malt:</strong><p>{props.chosenItem.malt.toString()}</p>
						<strong>Hops:</strong><p>{props.chosenItem.hops.toString()}</p>
						<strong>Yeast:</strong><p>{props.chosenItem.yeast}</p>
                    </div>
                    <div>
                        <h5>Food pairing</h5>
                        <p>{props.chosenItem.item.food.map(food => <p key={food} >{food}</p>)}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );	
};

export default itemDetail; 