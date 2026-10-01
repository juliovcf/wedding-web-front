import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestGroupForm from '../components/GuestGroupForm';
import { useGuests } from '../contexts/GuestContext';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { selectedGuest, resetFormState } = useGuests();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!selectedGuest) {
      navigate('/');
    }
  }, [selectedGuest, navigate]);

  // Solo al salir de la página. resetFormState cambia en cada render del contexto:
  // si fuese dependencia, borraría el mensaje de error nada más mostrarse.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => resetFormState(), []);

  // Al llegar desde la búsqueda la ventana conserva el scroll de la portada
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ block: 'start' });
  }, []);

  const handleSuccess = ({ attendingCount, totalCount }) => {
    navigate('/success', { state: { fromConfirmation: true, attendingCount, totalCount } });
  };

  return (
    <section ref={sectionRef} className="max-w-2xl mx-auto section-card mb-10 scroll-mt-6">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate('/', { state: { scrollTo: 'confirmar' } })}
          className="text-wine-600 hover:text-wine-800 flex items-center font-sans transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wine-400 rounded-md px-2 py-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Volver a la búsqueda
        </button>
      </div>

      <GuestGroupForm onSuccess={handleSuccess} />
    </section>
  );
};

export default ConfirmationPage;
