import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-champagne-50 bg-elegant-gradient bg-fixed font-sans">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
