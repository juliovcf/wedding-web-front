
const Header = () => {
  return (
    <header className="text-center mb-10 md:mb-16 animate-fade-in">
      {/* Logo */}
      <div className="mb-3">
        <img 
          src="/images/logo.png" 
          alt="Julio & Cristina Wedding Logo" 
          className="h-64 md:h-80 mx-auto object-contain drop-shadow-lg"
        />
      </div>

      <h1 className="font-handwriting text-6xl md:text-7xl text-sage-700 mb-2 leading-tight tracking-wide text-balance">
        ¡Nos casamos!
      </h1>
      
      <h2 className="font-serif text-4xl md:text-5xl text-sage-800 mb-6 tracking-wide">
        Cristina & Julio
      </h2>
      
      <p className="font-sans text-lg md:text-2xl text-sage-700 max-w-md mx-auto tracking-wider mb-2">
        21 de Noviembre de 2026
      </p>
      
      <p className="font-sans text-lg md:text-2xl text-sage-700 max-w-md mx-auto tracking-wider mb-6">
        Masia de les Casotes
      </p>
      
      <div
        className="w-64 h-px mx-auto bg-gradient-to-r from-transparent via-sage-400 to-transparent opacity-60"
        aria-hidden="true"
      />
    </header>
  );
};

export default Header;
