import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import axios from 'axios';
import '../App.css';

const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    const registrationData = {
      first_name: firstName,
      other_name: lastName,
      email,
      organization,
      phone: phoneNumber,
      address,
    };

    if (!firstName || !email) {
      alert('Please fill in all the required fields');
      return;
    }

    try {
      const response = await axios.post('http://demo.nimet.gov.ng:3000/api/scpregistration', registrationData);
      if (response.status === 201) {
        navigate('/qr', { state: { id: response.data.id, firstName, lastName } });
      } else {
        alert('Registration Failed: An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Registration Failed: No response from the server.');
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src="https://nimet.gov.ng/assets/img/logo.png" alt="NIMET Logo" className="logo" />
      </div>
      <h1 className="title">Register For SCP 2025</h1>
      <InputField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <InputField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <InputField label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      <InputField label="Company/Organization" value={organization} onChange={(e) => setOrganization(e.target.value)} />
      <InputField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" />
      <InputField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button className="register-button" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default HomeScreen;
