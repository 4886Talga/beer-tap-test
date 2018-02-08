import React from 'react';
import PropTypes from 'prop-types';
import './SingleInput.css';
//import {FaSearch} from 'react-icons/lib/fa';

const SingleInput = (props) => (  
    <div className="SearchInput"
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder} />
  );

SingleInput.propTypes = {  
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  placeholder: PropTypes.string
};

export default SingleInput; 