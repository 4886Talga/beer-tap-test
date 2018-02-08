import React from 'react';

import beerTapLogo from '../../assets/images/BeerTapLoggo.png';
import './Logo.css';

const logo = () => (
    <div className="BeerTappLogo">
        <img src={beerTapLogo} alt="BeerTapLogo" />   
    </div>
);

export default logo;