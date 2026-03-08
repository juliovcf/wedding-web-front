import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { GuestProvider } from './contexts/GuestContext';
import ConfirmationPage from './pages/ConfirmationPage';
import HomePage from './pages/HomePage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <GuestProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </Layout>
      </Router>
    </GuestProvider>
  );
}

export default App;
