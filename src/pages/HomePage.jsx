import { useState } from 'react';
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
  const [isCopied, setIsCopied] = useState(false);

  const handleGuestSelect = async (guest) => {
    try {
      await fetchGroupGuests(guest);
      navigate('/confirmation');
    } catch (error) {
      console.error('Error fetching guest group:', error);
    }
  };

  const toggleEnvelope = () => {
    setIsEnvelopeOpen(!isEnvelopeOpen);
  };

  const copyIBAN = async (e) => {
    e.stopPropagation();
    const iban = 'ES5601825319750202327727';

    try {
      await navigator.clipboard.writeText(iban);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = iban;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Countdown Timer */}
      <CountdownTimer weddingDate="2026-11-21T17:00:00" />

      {/* Search and RSVP Section */}
      <section id="confirmar" className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-card p-6 md:p-8 mb-10 border border-wine-300 border-t-4 border-t-wine-600 scroll-mt-20">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="font-handwriting text-3xl text-sage-700 mb-3 tracking-wide text-balance">
            Confirma tu asistencia
          </h2>
        </div>

        <SearchForm />

        <div className="mt-6">
          <GuestList onSelectGuest={handleGuestSelect} />
        </div>
      </section>

      {/* Venue Information */}
      <div id="informacion" className="scroll-mt-20">
        <VenueInfo />
      </div>

      {/* Photo Gallery */}
      <div id="galeria" className="scroll-mt-20">
        <WeddingGallery />
      </div>

      {/* Gifts Section */}
      <section id="regalo" className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-6 md:p-8 my-8 border border-wine-300 border-t-4 border-t-wine-600 scroll-mt-20">
        <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-6 tracking-wide">
          Regalos
        </h3>

        <div className="text-center mb-6">
          <p className="font-sans text-sage-600 leading-relaxed mb-4">
            Lo único indispensable es tu presencia
          </p>
        </div>

        {/* Envelope Container */}
        <div className="max-w-md mx-auto">
          {!isEnvelopeOpen ? (
            <button
              onClick={toggleEnvelope}
              className="w-full relative transform transition-all duration-300 hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2 rounded-lg"
              aria-label="Abrir informacion bancaria"
            >
              <div className="bg-gradient-to-br from-champagne-200 to-sage-200 p-8 rounded-lg border border-sage-300/50 shadow-md">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-200/80 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-sage-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-serif text-lg text-sage-800 mb-2 tracking-wide">
                    Informacion bancaria
                  </h4>
                  <p className="text-sm text-sage-600 font-sans italic">
                    Haz clic para abrir
                  </p>
                </div>
              </div>

              {/* Envelope Flap */}
              <div
                className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-sage-300 to-sage-200 rounded-t-lg border border-sage-300/50 pointer-events-none"
                aria-hidden="true"
              >
                <div className="flex justify-center pt-4">
                  <div className="w-8 h-8 bg-wine-200 rounded-full opacity-70 flex items-center justify-center">
                    <div className="w-4 h-4 bg-wine-400 rounded-full" />
                  </div>
                </div>
              </div>
            </button>
          ) : (
            <div className="animate-fade-in">
              <button
                onClick={toggleEnvelope}
                className="w-full mb-4 transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2 rounded-t-lg"
                aria-label="Cerrar informacion bancaria"
              >
                <div className="bg-gradient-to-br from-champagne-200 to-sage-200 p-4 rounded-t-lg border border-sage-300/50">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-200/80 rounded-full mb-2">
                      <svg
                        className="w-6 h-6 text-sage-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-sage-600 font-sans italic">
                      Haz clic para cerrar
                    </p>
                  </div>
                </div>
              </button>

              {/* Bank Account Card */}
              <div className="bg-gradient-to-br from-sage-100 to-champagne-100 p-6 rounded-xl border border-sage-200/50 shadow-sm animate-slide-down">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-200 rounded-full mb-3">
                    <svg
                      className="w-6 h-6 text-sage-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-serif text-lg text-sage-800 mb-2 tracking-wide">
                    Cuenta bancaria
                  </h4>
                </div>

                <div className="bg-white/70 p-4 rounded-lg">
                  <p className="text-xs text-sage-600 font-sans uppercase tracking-wider mb-3 text-center">
                    IBAN
                  </p>
                  <div className="flex items-center justify-between bg-white/50 p-3 rounded-lg border border-sage-200/30">
                    <p className="font-mono text-sage-800 text-sm md:text-lg tracking-wider flex-1 break-all">
                      ES5601825319750202327727
                    </p>
                    <button
                      onClick={copyIBAN}
                      className={`ml-3 p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                        isCopied
                          ? 'bg-sage-100 text-sage-700 border border-sage-300'
                          : 'bg-sage-100 text-sage-700 border border-sage-200 hover:bg-sage-200 hover:shadow-sm'
                      }`}
                      aria-label={isCopied ? 'IBAN copiado' : 'Copiar IBAN'}
                    >
                      {isCopied ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div aria-live="polite">
                    {isCopied && (
                      <p className="text-xs text-sage-600 font-sans mt-2 text-center animate-fade-in">
                        IBAN copiado al portapapeles
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-8 h-px bg-wine-400 mt-4 mx-auto rounded-full" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
