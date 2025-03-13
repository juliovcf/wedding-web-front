import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestGroupForm from '../components/GuestGroupForm';
import { useGuests } from '../contexts/GuestContext';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { selectedGuest, updateSuccess, resetFormState } = useGuests();

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
    <div className="min-h-screen bg-champagne-50 bg-paper-texture bg-fixed">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <header className="text-center mb-10 animate-fade-in">
          <h1 className="font-handwriting text-5xl md:text-6xl text-sage-700 mb-2 leading-tight">
            ¡Nos casamos!
          </h1>
          <h2 className="font-serif text-3xl text-sage-600 mb-4">
            Julio & Cristina
          </h2>
          <p className="font-sans text-sage-600 max-w-md mx-auto">
            21 de Noviembre de 2026 · Masia de les Casotes
          </p>

          <div className="w-40 h-1 mx-auto mt-6 bg-sage-300 rounded-full opacity-60"></div>
        </header>

        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-card p-6 md:p-8 mb-10 border border-champagne-100">
          <div className="mb-4">
            <button 
              onClick={() => navigate('/')} 
              className="text-sage-600 hover:text-sage-800 flex items-center font-sans transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Volver a la búsqueda
            </button>
          </div>

          <GuestGroupForm onSuccess={handleSuccess} />
        </div>

        <footer className="text-center text-sage-500 text-sm mt-12 font-sans">
          <p>Para cualquier duda, contacta con nosotros en</p>
          <p className="font-medium text-sage-600">crisgavijupeca@gmail.com</p>
          <div className="w-8 h-1 mx-auto mt-4 bg-sage-300 rounded-full opacity-60"></div>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmationPage;