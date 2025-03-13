import React from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import GuestList from '../components/GuestList';
import SearchForm from '../components/SearchForm';
import VenueInfo from '../components/VenueInfo';
import WeddingGallery from '../components/WeddingGallery';
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
    <div className="min-h-screen bg-champagne-50 bg-elegant-gradient bg-fixed font-sans">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <header className="text-center mb-10 md:mb-16 animate-fade-in">
          <h1 className="font-handwriting text-5xl md:text-6xl text-sage-700 mb-2 leading-tight tracking-wide">
            ¡Nos casamos!
          </h1>
          <h2 className="font-serif text-3xl text-sage-600 mb-4 tracking-wide">
            Julio & Cristina
          </h2>
          <p className="font-sans text-sage-600 max-w-md mx-auto tracking-wider">
            21 de Noviembre de 2026 · Masia de les Casotes
          </p>

          <div className="w-40 h-1 mx-auto mt-6 bg-sage-300 rounded-full opacity-60"></div>
        </header>

        {/* Countdown Timer */}
        <CountdownTimer weddingDate="2026-11-21T17:00:00" />

        {/* Search and RSVP Section */}
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-card p-6 md:p-8 mb-10 border border-champagne-100">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="font-handwriting text-3xl text-sage-700 mb-3 tracking-wide">
              Confirma tu asistencia
            </h2>
            <p className="font-sans text-sage-600 max-w-md mx-auto leading-relaxed">
              Busca tu nombre para acceder a tu invitación y confirmar tu asistencia
            </p>
          </div>

          <SearchForm />
          
          <div className="mt-6">
            <GuestList onSelectGuest={handleGuestSelect} />
          </div>
        </div>

        {/* Venue Information */}
        <VenueInfo />

        {/* Photo Gallery */}
        <WeddingGallery />

        {/* Additional Information */}
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-6 md:p-8 my-8 border border-champagne-100">
          <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-4 tracking-wide">Información Adicional</h3>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 p-4 bg-champagne-50 rounded-lg border border-champagne-100">
                <h4 className="font-serif text-lg text-sage-800 mb-2 tracking-wide">Código de Vestimenta</h4>
                <p className="font-sans text-sm text-sage-600 leading-relaxed">Formal / Cocktail</p>
              </div>
              
              <div className="flex-1 p-4 bg-champagne-50 rounded-lg border border-champagne-100">
                <h4 className="font-serif text-lg text-sage-800 mb-2 tracking-wide">Regalos</h4>
                <p className="font-sans text-sm text-sage-600 leading-relaxed">Tu presencia es nuestro mejor regalo, pero si deseas contribuir, dispondremos de un buzón en la celebración.</p>
              </div>
            </div>
            
            <div className="p-4 bg-sage-50 rounded-lg border border-sage-100">
              <h4 className="font-serif text-lg text-sage-800 mb-2 tracking-wide">Alojamiento</h4>
              <p className="font-sans text-sm text-sage-600 mb-2 leading-relaxed">Hemos reservado habitaciones con tarifas especiales en los siguientes hoteles:</p>
              <ul className="list-disc pl-5 text-sm text-sage-600 font-sans space-y-1">
                <li>Hotel Onda: <span className="font-medium">10% descuento</span> mencionando "Boda Julio y Cristina"</li>
                <li>Hotel Castellón: <span className="font-medium">15% descuento</span> con código "JC2026"</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="text-center text-sage-500 text-sm mt-12 font-sans">
          <p className="tracking-wide">Para cualquier duda, contacta con nosotros en</p>
          <p className="font-medium text-sage-600 tracking-wide">crisgavijupeca@gmail.com</p>
          <div className="w-8 h-1 mx-auto mt-4 bg-sage-300 rounded-full opacity-60"></div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;