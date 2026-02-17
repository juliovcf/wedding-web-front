import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-sage-500 text-sm mt-12 pb-8 font-sans">
      <p className="tracking-wide">Para cualquier duda, contacta con nosotros en</p>
      <a
        href="mailto:crisgavijupeca@gmail.com"
        className="font-medium text-sage-600 hover:text-sage-800 transition-colors tracking-wide"
      >
        crisgavijupeca@gmail.com
      </a>
      <div
        className="w-8 h-px mx-auto mt-4 bg-gradient-to-r from-wine-300 to-sage-300 opacity-60"
        aria-hidden="true"
      />
    </footer>
  );
};

export default Footer;
