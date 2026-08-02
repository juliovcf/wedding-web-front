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
    return () => { resetAll(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReturnHome = () => {
    resetAll();
    navigate('/');
  };

  return (
    <>
      <section className="max-w-2xl mx-auto section-card animate-fade-in text-center">
        {/* Sello de cera simulado */}
        <div className="w-24 h-24 mx-auto -mt-16 mb-4 relative z-10">
          <div className="w-full h-full rounded-full bg-wine-600 flex items-center justify-center shadow-lg"
               style={{ background: 'radial-gradient(circle at 30% 30%, #CB7F96, #7A3750)' }}>
            <span className="text-white text-3xl font-handwriting">C&J</span>
          </div>
        </div>

        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6"
             style={{ background: 'radial-gradient(circle at 40% 40%, #CDD7CD, #829B82)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="section-title">¡Gracias por confirmar!</h2>

        {selectedGuest && selectedGuest.group && (
          <p className="text-xl font-serif text-sage-600 mb-2 text-center tracking-wide">
            {selectedGuest.group.name}, vuestra asistencia está registrada.
          </p>
        )}

        <p className="text-sage-600 font-sans mb-3 text-center max-w-md mx-auto leading-relaxed">
          Nos vemos el <strong>21 de noviembre</strong> en la Masia les Casotes.
          ¡Preparaos para una noche inolvidable!
        </p>

        <div className="section-divider"><span>❦</span></div>

        <p className="text-center text-sage-500 text-sm font-handwriting italic mb-6 tracking-wide">
          Sí a todo si es contigo
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
