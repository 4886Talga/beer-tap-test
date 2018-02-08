import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FaUserSecret, FaFacebookOfficial, FaGoogle, FaGithubSquare, FaLinkedinSquare, FaTwitterSquare} from 'react-icons/lib/fa';
import { Link } from 'react-router-dom';
import { loginGoogle, logInFacebook, logInAnonymous} from '../../shared/Authentication';
import Logo from '../../components/Logo/Logo';
import './Box.css';

class Box extends Component {
  render() {
    const { children, title} = this.props;
	  	  
    return (
      <div className="Container"> 		    
        <div className="Card">			  
        	<div className="CardHeader">
							<div className="Logo"><Logo /></div>
							<div className="CardTitle">BeerTap</div>
					</div>
{title==='Login' && <div className="SocialIconsWrapper">
							<Link to='/' onClick={loginGoogle}><FaGoogle size={40} color="#4385f3" /></Link>
							<Link to='/' onClick={logInFacebook}><FaFacebookOfficial size={40} color="#3b5998" /></Link>
							<Link to='/'><FaTwitterSquare size={40} color="#5ea9dd" /></Link>
							<Link to='/'><FaLinkedinSquare size={40} color="#0077b5" /></Link>
							<Link to='/'><FaGithubSquare size={40} color="#323131" /></Link>
							<Link to='/dashboard' onClick={logInAnonymous}><FaUserSecret size={40} color="#323131" /></Link>
				</div>}
				{title==='Login' && <p className="Or">or</p>}              
              {children}
      </div>       
    </div>
    );
  }
}

Box.propTypes = {
		title: PropTypes.string.isRequired,
		children: PropTypes.array.isRequired
	}

export default Box;