import React from 'react';

import './Item.css';

const item = (props) => {
    const beer = props.beer;
    const imageUrl = beer.img_url;
   
    return(
    <div onClick={props.cklicked} className="Item">
        <div className="ItemCard">
            <div className="ItemCardHeader">
                <h1 className="ItemName">{props.beer.name}</h1>
            </div>
            <div className="ImgWrapper">
                <img className="ItemImg" src={imageUrl} />
            </div>
        </div>
    </div>
    );
};

export default item;