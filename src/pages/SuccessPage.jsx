import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import Icon from '../components/Icon';
import { useGuests } from '../contexts/GuestContext';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedGuest, resetAll } = useGuests();
  const sectionRef = useRef(null);

  const { fromConfirmation, attendingCount, totalCount } = location.state || {};
  const isSolo = totalCount === 1;
  const nobodyAttends = attendingCount === 0;
  const groupName = selectedGuest?.group?.name?.trim();

  useEffect(() => {
    if (!fromConfirmation && !selectedGuest) {
      navigate('/');
      return undefined;
    }
    sectionRef.current?.scrollIntoView({ block: 'start' });
    return () => { resetAll(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReturnHome = () => {
    resetAll();
    navigate('/');
  };

  return (
    <>
      <section ref={sectionRef} className="max-w-2xl mx-auto section-card animate-fade-in text-center mt-12 scroll-mt-20">
        {/* Sello de cera simulado */}
        <div className="w-24 h-24 mx-auto -mt-16 mb-4 relative z-10">
          <div className="w-full h-full rounded-full bg-wine-600 flex items-center justify-center shadow-lg"
               style={{ background: 'radial-gradient(circle at 30% 30%, #CB7F96, #7A3750)' }}>
            <span className="text-white text-3xl font-handwriting">C&amp;J</span>
          </div>
        </div>

        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
             style={{ background: 'radial-gradient(circle at 40% 40%, #CDD7CD, #829B82)' }}>
          <Icon name={nobodyAttends ? 'heart' : 'check'} className="h-10 w-10" strokeWidth={2} />
        </div>

        {nobodyAttends ? (
          <>
            <h2 className="section-title">¡Gracias por avisarnos!</h2>
            <p className="text-sage-600 font-sans mb-3 text-center max-w-md mx-auto leading-relaxed">
              {isSolo
                ? 'Sentimos que no puedas acompañarnos. Te echaremos mucho de menos ese día.'
                : 'Sentimos que no podáis acompañarnos. Os echaremos mucho de menos ese día.'}
            </p>
          </>
        ) : (
          <>
            <h2 className="section-title">¡Gracias por confirmar!</h2>

            {groupName && (
              <p className="text-xl font-serif text-sage-600 mb-2 text-center tracking-wide">
                {groupName}, {isSolo ? 'tu asistencia está registrada.' : 'vuestra asistencia está registrada.'}
              </p>
            )}

            <p className="text-sage-600 font-sans mb-3 text-center max-w-md mx-auto leading-relaxed">
              Nos vemos el <strong>21 de noviembre</strong> en la Masia les Casotes.{' '}
              {isSolo ? '¡Prepárate para un día inolvidable!' : '¡Preparaos para un día inolvidable!'}
            </p>
          </>
        )}

        <div className="section-divider"><span>❦</span></div>

        <p className="text-center text-sage-500 text-sm font-handwriting italic mb-6 tracking-wide">
          Sí a todo si es contigo
        </p>

        <div className="text-center">
          <button type="button" onClick={handleReturnHome} className="btn-primary">
            Volver al inicio
          </button>
        </div>
      </section>

      {!nobodyAttends && <CountdownTimer />}
    </>
  );
};

export default SuccessPage;
