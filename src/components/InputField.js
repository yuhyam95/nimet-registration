import React from 'react';
import '../App.css';

const InputField = ({ label, value, onChange, type = 'text' }) => (
  <div className="input-container">
    <label className="input-label">{label}</label>
    <input className="input-field" value={value} onChange={onChange} type={type} />
  </div>
);

export default InputField;
