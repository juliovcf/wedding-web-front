import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import { useGuests } from '../contexts/GuestContext';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedGuest, resetAll } = useGuests();

  useEffect(() => {
    const fromConfirmation = location.state && location.state.fromConfirmation;
    if (!fromConfirmation && !selectedGuest) {
      navigate('/');
    }
    return () => {
      resetAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReturnHome = () => {
    resetAll();
    navigate('/');
  };

  return (
    <>
      <section className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-card p-8 md:p-10 mb-10 border border-champagne-100 animate-fade-in">
        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-sage-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl font-handwriting text-sage-700 mb-4 text-center tracking-wide text-balance">
          ¡Gracias por confirmar!
        </h2>

        {selectedGuest && selectedGuest.group && (
          <p className="text-xl font-serif text-sage-600 mb-6 text-center tracking-wide">
            Hemos registrado la confirmacion para {selectedGuest.group.name}.
          </p>
        )}

        <p className="text-sage-600 font-sans mb-8 text-center max-w-md mx-auto leading-relaxed">
          ¡Nos vemos en nuestra boda. Estamos deseando compartir este dia especial contigo!
        </p>

        <div className="text-center">
          <button
            onClick={handleReturnHome}
            className="px-8 py-3 bg-wine-600 text-white rounded-md hover:bg-wine-700 transition-all font-sans font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-wine-400 focus:ring-offset-2"
          >
            Volver al inicio
          </button>
        </div>
      </section>

      <CountdownTimer weddingDate="2026-11-21T17:00:00" />
    </>
  );
};

export default SuccessPage;
