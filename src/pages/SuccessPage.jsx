import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import { useGuests } from '../contexts/GuestContext';

const FRASES_VALENCIANAS = [
  'Que l\'amor us acompanye sempre',
  'Salut, amor i alegria',
  'Per molts anys, Julio i Cristina',
  'Avui i sempre, junts',
];

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedGuest, resetAll } = useGuests();
  const [riceParticles] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 4}s`,
      size: `${4 + Math.random() * 4}px`,
    }))
  );
  const [frase] = useState(() =>
    FRASES_VALENCIANAS[Math.floor(Math.random() * FRASES_VALENCIANAS.length)]
  );

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
      {/* Lluvia de arroz */}
      {riceParticles.map(p => (
        <div
          key={p.id}
          className="rice-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: `${parseInt(p.size) * 1.6}px`,
          }}
        />
      ))}

      <section className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-card p-8 md:p-10 mb-10 border border-champagne-100 animate-fade-in card-handmade corner-flourish">
        {/* Sello de cera simulado */}
        <div className="w-24 h-24 mx-auto -mt-16 mb-4 relative z-10">
          <div className="w-full h-full rounded-full bg-wine-600 flex items-center justify-center shadow-lg"
               style={{ background: 'radial-gradient(circle at 30% 30%, #CB7F96, #7A3750)' }}>
            <span className="text-white text-3xl font-handwriting">J&C</span>
          </div>
        </div>

        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6"
             style={{ background: 'radial-gradient(circle at 40% 40%, #CDD7CD, #829B82)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl font-handwriting text-sage-700 mb-4 text-center tracking-wide text-balance handcrafted-title">
          ¡Gracias por confirmar!
        </h2>

        {selectedGuest && selectedGuest.group && (
          <p className="text-xl font-serif text-sage-600 mb-2 text-center tracking-wide">
            {selectedGuest.group.name}, vuestra asistencia está registrada.
          </p>
        )}

        <p className="text-sage-600 font-sans mb-3 text-center max-w-md mx-auto leading-relaxed">
          Nos vemos el <strong>21 de noviembre</strong> en la Masia les Casotes.
          ¡Preparaos para una noche inolvidable!
        </p>

        <div className="divider-tile"></div>

        <p className="text-center text-sage-500 text-sm font-handwriting italic mb-6 tracking-wide">
          {frase}
        </p>

        <div className="text-center">
          <button
            onClick={handleReturnHome}
            className="px-8 py-3 bg-wine-600 text-white rounded-md hover:bg-wine-700 transition-all font-sans font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-wine-400 focus:ring-offset-2 organic-rotate"
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
