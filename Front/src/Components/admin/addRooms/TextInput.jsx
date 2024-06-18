import React from 'react';


const TextInput = ({ name, type, placeholder, className, value, onChange }) => (
  <div className={className}>
    <label htmlFor={name}>{placeholder}</label>
    <input 
      type={type || 'text'} 
      id={name} 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className="form-control in" 
    />
  </div>
);


export default TextInput;
