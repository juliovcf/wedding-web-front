import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestGroupForm from '../components/GuestGroupForm';
import { useGuests } from '../contexts/GuestContext';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { selectedGuest, groupGuests, updateSuccess, resetFormState } = useGuests();

  // Redirect to home if no guest is selected
  useEffect(() => {
    if (!selectedGuest) {
      navigate('/');
    }
    
    // Reset success state when component unmounts
    return () => {
      resetFormState();
    };
  }, [selectedGuest, navigate, resetFormState]);

  // Check if updateSuccess has changed and redirect if true
  useEffect(() => {
    if (updateSuccess) {
      console.log("Update success detected, navigating to success page");
      navigate('/success', { state: { fromConfirmation: true } });
    }
  }, [updateSuccess, navigate]);

  // Handle successful update
  const handleSuccess = () => {
    console.log("Success handler called");
    // Pass state with the navigation to indicate success
    navigate('/success', { state: { fromConfirmation: true } });
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

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="mb-2">
            <button 
              onClick={() => navigate('/')} 
              className="text-olive-600 hover:text-olive-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Volver a la búsqueda
            </button>
          </div>

          <GuestGroupForm onSuccess={handleSuccess} />
        </div>

        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>Para cualquier duda, contacta con nosotros en</p>
          <p className="font-medium">mariajuan2025@ejemplo.com</p>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmationPage;