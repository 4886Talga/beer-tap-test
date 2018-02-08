import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

let ErrorMessage = (props) => {
	return (
		props.errorMessage ?
			<div className="ErrorWrapper">
				<p className="Error">{props.errorMessage}</p>
			</div>
			:<div></div>
	);
};

ErrorMessage.propTypes = {
	errorMessage: PropTypes.string
};


export default ErrorMessage;