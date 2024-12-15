import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import QRCodeScreen from './pages/QRCodeScreen';
import ScanScreen from './pages/ScanScreen';
import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/qr" element={<QRCodeScreen />} />
      <Route path="/scan" element={<ScanScreen />} />
    </Routes>
  </Router>
);

export default App;
