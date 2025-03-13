import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import { useGuests } from '../contexts/GuestContext';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedGuest, resetAll } = useGuests();

  // Check if we arrived here from a valid path - only runs once on mount
  useEffect(() => {
    // Validate that we came from the confirmation page
    const fromConfirmation = location.state && location.state.fromConfirmation;
    
    if (!fromConfirmation && !selectedGuest) {
      console.log("Invalid access to success page, redirecting to home");
      navigate('/');
    }
    
    // Reset all state when leaving the success page
    return () => {
      resetAll();
    };
  // Empty dependency array means this only runs once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReturnHome = () => {
    resetAll();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-champagne-50 bg-elegant-gradient bg-fixed font-sans">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <header className="text-center mb-10 animate-fade-in">
          <h1 className="font-handwriting text-5xl md:text-6xl text-sage-700 mb-2 leading-tight tracking-wide">
            ¡Nos casamos!
          </h1>
          <h2 className="font-serif text-3xl text-sage-600 mb-4 tracking-wide">
            Julio & Cristina
          </h2>
          <p className="font-sans text-sage-600 max-w-md mx-auto tracking-wider">
            21 de Noviembre de 2026 · Masia de les Casotes
          </p>

          <div className="w-40 h-1 mx-auto mt-6 bg-sage-300 rounded-full opacity-60"></div>
        </header>

        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-card p-8 md:p-10 mb-10 border border-champagne-100 animate-fade-in">
          <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl font-handwriting text-sage-700 mb-4 text-center tracking-wide">
            ¡Gracias por confirmar!
          </h2>
          
          {selectedGuest && selectedGuest.group && (
            <p className="text-xl font-serif text-sage-600 mb-6 text-center tracking-wide">
              Hemos registrado la confirmación para {selectedGuest.group.name}.
            </p>
          )}

          <p className="text-sage-600 font-sans mb-8 text-center max-w-md mx-auto leading-relaxed tracking-wide">
            Nos vemos en nuestra boda. ¡Estamos deseando compartir este día especial contigo!
          </p>

          <div className="text-center">
            <button
              onClick={handleReturnHome}
              className="px-8 py-3 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-all font-sans font-medium shadow-sm hover:shadow"
            >
              Volver al inicio
            </button>
          </div>
        </div>

        <CountdownTimer weddingDate="2026-11-21T17:00:00" />

        <footer className="text-center text-sage-500 text-sm mt-12 font-sans">
          <p className="tracking-wide">Para cualquier duda, contacta con nosotros en</p>
          <p className="font-medium text-sage-600 tracking-wide">crisgavijupeca@gmail.com</p>
          <div className="w-8 h-1 mx-auto mt-4 bg-sage-300 rounded-full opacity-60"></div>
        </footer>
      </div>
    </div>
  );
};

export default SuccessPage;