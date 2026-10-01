import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import GiftEnvelope from '../components/GiftEnvelope';
import GuestList from '../components/GuestList';
import Reveal from '../components/Reveal';
import SearchForm from '../components/SearchForm';
import VenueInfo from '../components/VenueInfo';
import WeddingGallery from '../components/WeddingGallery';
import { useGuests } from '../contexts/GuestContext';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchGroupGuests } = useGuests();

  // Al volver desde la confirmación, ir directamente a la búsqueda
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) document.getElementById(target)?.scrollIntoView({ block: 'start' });
  }, [location.state]);

  const handleGuestSelect = async (guest) => {
    try {
      await fetchGroupGuests(guest);
      navigate('/confirmation');
    } catch (error) {
      console.error('Error fetching guest group:', error);
    }
  };

  return (
    <>
      {/* Countdown Timer */}
      <Reveal>
        <CountdownTimer />
      </Reveal>

      {/* Search and RSVP Section */}
      <Reveal>
        <section id="confirmar" className="max-w-2xl mx-auto section-card scroll-mt-20">
          <h2 className="section-title">Confirma tu asistencia</h2>

          <SearchForm />

          <div className="mt-6">
            <GuestList onSelectGuest={handleGuestSelect} />
          </div>
        </section>
      </Reveal>

      {/* Venue Information */}
      <div className="section-divider"><span>❦</span></div>
      <Reveal id="informacion" className="scroll-mt-20">
        <VenueInfo />
      </Reveal>

      {/* Photo Gallery */}
      <Reveal id="galeria" className="scroll-mt-20">
        <WeddingGallery />
      </Reveal>

      {/* Gifts Section */}
      <Reveal>
        <section id="regalo" className="max-w-2xl mx-auto section-card scroll-mt-20">
          <h3 className="section-title">Regalos</h3>

          <p className="font-sans text-sage-600 leading-relaxed text-center mb-6">
            Lo único indispensable es tu presencia
          </p>

          <GiftEnvelope />
        </section>
      </Reveal>
    </>
  );
};

export default HomePage;
