import React, { useState } from 'react';
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
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  
  // Handle guest selection
  const handleGuestSelect = async (guest) => {
    try {
      await fetchGroupGuests(guest);
      navigate('/confirmation');
    } catch (error) {
      console.error('Error fetching guest group:', error);
    }
  };

  // Toggle envelope open/close
  const toggleEnvelope = () => {
    setIsEnvelopeOpen(!isEnvelopeOpen);
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

          <div className="w-40 h-1 mx-auto mt-6 bg-gradient-to-r from-sage-300 via-wine-300 to-sage-300 rounded-full opacity-60"></div>
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
          <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-6 tracking-wide">Regalos</h3>
          
          <div className="text-center mb-6">
            <p className="font-sans text-sage-600 leading-relaxed mb-4">
              Tu presencia es nuestro mejor regalo, pero si deseas contribuir...
            </p>
          </div>
          
          {/* Envelope Container */}
          <div className="max-w-md mx-auto">
            {/* Closed Envelope */}
            {!isEnvelopeOpen && (
              <div 
                onClick={toggleEnvelope}
                className="relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {/* Envelope Body */}
                <div className="bg-gradient-to-br from-champagne-200 to-sage-200 p-8 rounded-lg border border-sage-300/50 shadow-md">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-200/80 rounded-full mb-4">
                      <svg className="w-8 h-8 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-lg text-sage-800 mb-2 tracking-wide">Información bancaria</h4>
                    <p className="text-sm text-sage-600 font-sans italic">Haz clic para abrir</p>
                  </div>
                </div>
                
                {/* Envelope Flap */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-sage-300 to-sage-200 rounded-t-lg border border-sage-300/50 transform origin-top transition-transform duration-300">
                  <div className="flex justify-center pt-4">
                    <div className="w-8 h-8 bg-wine-200 rounded-full opacity-70 flex items-center justify-center">
                      <div className="w-4 h-4 bg-wine-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Opened Envelope with Bank Info */}
            {isEnvelopeOpen && (
              <div className="animate-fade-in">
                {/* Opened Envelope Header */}
                <div 
                  onClick={toggleEnvelope}
                  className="relative cursor-pointer mb-4 transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-gradient-to-br from-champagne-200 to-sage-200 p-4 rounded-t-lg border border-sage-300/50">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-200/80 rounded-full mb-2">
                        <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <p className="text-sm text-sage-600 font-sans italic">Haz clic para cerrar</p>
                    </div>
                  </div>
                </div>

                {/* Bank Account Card */}
                <div className="bg-gradient-to-br from-sage-100 to-champagne-100 p-6 rounded-xl border border-sage-200/50 shadow-sm animate-slide-down">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-200 rounded-full mb-3">
                      <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-lg text-sage-800 mb-2 tracking-wide">Cuenta bancaria</h4>
                  </div>
                  
                  <div className="bg-white/70 p-4 rounded-lg text-center">
                    <p className="text-xs text-sage-600 font-sans uppercase tracking-wider mb-3">IBAN</p>
                    <p className="font-mono text-sage-800 text-lg tracking-wider">ES XX XXXX XXXX XXXX XXXX XXXX</p>
                  </div>
                  
                  <div className="w-8 h-0.5 bg-wine-400 mt-4 mx-auto rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="text-center text-sage-500 text-sm mt-12 font-sans">
          <p className="tracking-wide">Para cualquier duda, contacta con nosotros en</p>
          <p className="font-medium text-sage-600 tracking-wide">crisgavijupeca@gmail.com</p>
          <div className="w-8 h-1 mx-auto mt-4 bg-gradient-to-r from-wine-300 to-sage-300 rounded-full opacity-60"></div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;