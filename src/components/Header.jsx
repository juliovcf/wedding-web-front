import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-10 md:mb-16 animate-fade-in">
      <h1 className="font-handwriting text-5xl md:text-6xl text-sage-700 mb-2 leading-tight tracking-wide text-balance">
        Nos casamos!
      </h1>
      <h2 className="font-serif text-3xl text-sage-600 mb-4 tracking-wide">
        Julio & Cristina
      </h2>
      <p className="font-sans text-sage-600 max-w-md mx-auto tracking-wider">
        21 de Noviembre de 2026 &middot; Masia de les Casotes
      </p>
      <div
        className="w-40 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-sage-400 to-transparent opacity-60"
        aria-hidden="true"
      />
    </header>
  );
};

export default Header;
