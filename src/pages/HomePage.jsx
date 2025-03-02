import React from 'react';
import { useNavigate } from 'react-router-dom';
import GuestList from '../components/GuestList';
import SearchForm from '../components/SearchForm';
import { useGuests } from '../contexts/GuestContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { fetchGroupGuests } = useGuests();
  
  // Handle guest selection
  const handleGuestSelect = async (guest) => {
    try {
      await fetchGroupGuests(guest);
      navigate('/confirmation');
    } catch (error) {
      console.error('Error fetching guest group:', error);
    }
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
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-olive-700 mb-2">
              Confirma tu asistencia
            </h2>
            <p className="text-neutral-600">
              Busca tu nombre para acceder a tu invitación y confirmar tu asistencia
            </p>
          </div>

          <SearchForm />
          
          <div className="mt-6">
            <GuestList onSelectGuest={handleGuestSelect} />
          </div>
        </div>

        <footer className="text-center text-neutral-500 text-sm mt-12">
          <p>Para cualquier duda, contacta con nosotros en</p>
          <p className="font-medium">crisgavijupeca@gmail.com</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;