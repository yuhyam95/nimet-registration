import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Html5QrcodeScanner } from 'html5-qrcode'; 
import axios from 'axios';
import '../ScanScreen.css'; 
import { AiFillCheckCircle } from 'react-icons/ai';

const ScanScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store fetched user details
  const [modalVisible, setModalVisible] = useState(false); // State to control Modal visibility
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    // Initialize the QR Code scanner
    const html5QrcodeScanner = new Html5QrcodeScanner('scanner-container', {
      fps: 10,
      qrbox: { width: 300, height: 300 },
    });

    html5QrcodeScanner.render(handleBarCodeScanned, () => console.error('QR Code scan error'));
    setScanner(html5QrcodeScanner);

    return () => {
      html5QrcodeScanner.clear();
    };
  }, []);

  async function fetchUser(id) {
    try {
      const response = await axios.get(`http://demo.nimet.gov.ng:3000/api/scpregistration?id=${id}`);
      if (response.status === 200) {
        setSelectedUser(response.data);
        setModalVisible(true); // Open the Modal when data is fetched
        console.log('Attendance captured successfully', response.data);
      } else {
        console.error('Failed to fetch user');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  async function recordAttendance(userId) {
    try {
      const response = await axios.post('http://demo.nimet.gov.ng:3000/api/scpattendance', { id: userId });
      if (response.status === 201) {
        console.log('Attendance recorded successfully');
        fetchUser(userId);
      } else {
        console.error('Failed to record attendance');
      }
    } catch (error) {
      console.error('Error recording attendance:', error.message);
    }
  }

  const handleBarCodeScanned = async (data) => {
    setScanned(true);
    try {
      const attendee = JSON.parse(data);
      recordAttendance(attendee.id);
    } catch (error) {
      console.error('Invalid QR Code data:', error.message);
    }
  };

  const handleScanAgain = () => {
    setModalVisible(false);
    setScanned(false);
    scanner.start();
  };

  return (
    <div className="scan-container">
      <div id="scanner-container" className="scanner"></div>

      {/* Modal for displaying selected user details */}
      <Modal show={modalVisible} onHide={() => setModalVisible(false)} centered>
        <Modal.Body>
          {selectedUser ? (
            <div className="user-details">
              <AiFillCheckCircle size={50} color="green" className="icon" />
              <h2 className="text-heading">Registered</h2>
              <p className="user-detail">Name: {selectedUser.first_name} {selectedUser.other_name}</p>
              <p className="user-detail">Email: {selectedUser.email}</p>
              <p className="user-detail">Organization: {selectedUser.organization}</p>
            </div>
          ) : (
            <p>No user selected</p>
          )}
          <button className="scan-again-btn" onClick={handleScanAgain}>Scan Again</button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ScanScreen;
