import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestGroupForm from '../components/GuestGroupForm';
import { useGuests } from '../contexts/GuestContext';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { selectedGuest, updateSuccess, resetFormState } = useGuests();

  useEffect(() => {
    if (!selectedGuest) {
      navigate('/');
    }
    return () => {
      resetFormState();
    };
  }, [selectedGuest, navigate, resetFormState]);

  useEffect(() => {
    if (updateSuccess) {
      navigate('/success', { state: { fromConfirmation: true } });
    }
  }, [updateSuccess, navigate]);

  const handleSuccess = () => {
    navigate('/success', { state: { fromConfirmation: true } });
  };

  return (
    <section className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-card p-6 md:p-8 mb-10 border border-champagne-100">
      <div className="mb-4">
        <button
          onClick={() => navigate('/')}
          className="text-sage-600 hover:text-sage-800 flex items-center font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-sage-400 rounded-md px-2 py-1"
          aria-label="Volver a la busqueda"
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
          Volver a la busqueda
        </button>
      </div>

      <GuestGroupForm onSuccess={handleSuccess} />
    </section>
  );
};

export default ConfirmationPage;
