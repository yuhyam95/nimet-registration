import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const QRCodeScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { id, firstName, lastName } = state || {};

  if (!id) {
    return <p>No QR Code data available</p>;
  }

  const attendeeData = JSON.stringify({ id, firstName, lastName });

  return (
    <div className="qr-container">
      <div className='qr-header'>
      <img src="https://nimet.gov.ng/assets/img/logo.png" alt="NIMET Logo" className="logo" />
      <button className="home-button" onClick={() => navigate('/')}>Home</button>
      </div>
      <h2 className="qr-title">{firstName} {lastName}</h2>
      <div className="qr-code">
        <QRCodeSVG value={attendeeData} size={250} />
      </div>
      <p className="thank-you-message">Thank you for registering for the 2025 Seasonal Climate Prediction Event</p>
    </div>
  );
};

export default QRCodeScreen;
