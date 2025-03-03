import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  }, []);

  const handleReturnHome = () => {
    resetAll();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-olive-700 mb-2">
            ¡Nos casamos!
          </h1>
          <h2 className="text-2xl font-light text-olive-600 mb-6">
            Julio & Cristina
          </h2>
          <p className="text-neutral-600 max-w-md mx-auto">
            21 de Noviembre de 2026 · Masia de les Casotes
          </p>
        </header>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mb-10 text-center">
          <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-olive-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-neutral-800 mb-4">
            ¡Gracias por confirmar!
          </h2>
          
          {selectedGuest && selectedGuest.group && (
            <p className="text-lg text-neutral-600 mb-6">
              Hemos registrado la confirmación para {selectedGuest.group.name}.
            </p>
          )}

          <p className="text-neutral-600 mb-8">
            Nos vemos en nuestra boda. ¡Estamos deseando compartir este día especial contigo!
          </p>

          <div className="py-4 px-6 bg-olive-50 rounded-lg mb-8">
            <h3 className="font-medium text-olive-800 mb-2">Información importante</h3>
            <p className="text-neutral-700">
              Recuerda que la ceremonia comenzará puntualmente a las 17:00h.
              Por favor, llega con 30 minutos de antelación.
            </p>
          </div>

          <button
            onClick={handleReturnHome}
            className="px-6 py-3 bg-olive-600 text-white rounded-md hover:bg-olive-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>

        <footer className="text-center text-neutral-500 text-sm mt-12">
          <p>Para cualquier duda, contacta con nosotros en</p>
          <p className="font-medium">juliocristina2025@ejemplo.com</p>
        </footer>
      </div>
    </div>
  );
};

export default SuccessPage;