import React from 'react';
import PropTypes from 'prop-types';
import './TextField.css';

const TextField = ({value, label, name,  placeholder, errorText, onFieldChanged, type, showError}) => (
	
  <div className="FormFieldWrapper">
	<input className="FormInput"
	  id={label}
	  name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onFieldChanged}
    />
	<label className="FormLabel" htmlFor={label}>{label}</label>
    {showError && 
      <div className="ValidationError">
        {errorText}
      </div>
    }
  </div>
);

TextField.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  type: PropTypes.string,
  showError: PropTypes.bool,
  onFieldChanged: PropTypes.func
};

TextField.defaultProps = {
  type: 'text'
};

export default TextField;