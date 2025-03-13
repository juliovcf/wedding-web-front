export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8585/api';
export const WEDDING_DATE = '2026-11-21T17:00:00';
export const WEDDING_LOCATION = 'Masia de les Casotes, Onda';
export const COUPLE_NAMES = 'Julio & Cristina';
export const CONTACT_EMAIL = 'crisgavijupeca@gmail.com';

// Updated App.jsx with favicon and meta tags
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { GuestProvider } from './contexts/GuestContext';
import ConfirmationPage from './pages/ConfirmationPage';
import HomePage from './pages/HomePage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <GuestProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </GuestProvider>
  );
}

export default App;