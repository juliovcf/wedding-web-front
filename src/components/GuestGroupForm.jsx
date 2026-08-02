import { useEffect, useState } from 'react';
import { useGuests } from '../contexts/GuestContext';

const BUS_OPTIONS = [
  { value: 'No', label: 'No, gracias', icon: '🚗', desc: 'Iré por mi cuenta' },
  { value: '21h', label: '21:00', icon: '🌅', desc: 'Vuelta temprana' },
  { value: '00h', label: '00:00', icon: '🌙', desc: 'Vuelta después de la fiesta' },
];

const GuestGroupForm = ({ onSuccess }) => {
  const {
    selectedGuest,
    groupGuests,
    isLoading,
    error,
    updateSuccess,
    updateGroupGuests
  } = useGuests();

  const [formData, setFormData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showNonAttendConfirm, setShowNonAttendConfirm] = useState(false);

  // Initialize form data when group guests are loaded
  useEffect(() => {
    if (groupGuests.length > 0) {
      const initialFormData = groupGuests.map(guest => {
        // FIX: if goingByBus is null/undefined but bus has a value, default to true
        const hasBus = guest.bus && guest.bus !== '' && guest.bus !== 'No';
        const goingByBus = guest.goingByBus !== null && guest.goingByBus !== undefined
          ? guest.goingByBus
          : hasBus;

        return {
          ...guest,
          confirmedAttendance: guest.confirmedAttendance === null ? false : guest.confirmedAttendance,
          goingByBus,
          // Preserve original bus value for restoring when toggling
          _originalBus: guest.bus || ''
        };
      });
      setFormData(initialFormData);
    }
  }, [groupGuests]);

  const handleChange = (id, field, value) => {
    setFormData(prevData =>
      prevData.map(guest =>
        guest.id === id ? { ...guest, [field]: value } : guest
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    const invalidGuests = formData.filter(
      guest => guest.confirmedAttendance && guest.goingByBus && (!guest.bus || guest.bus === '')
    );
    if (invalidGuests.length > 0) {
      const names = invalidGuests.map(g => `${g.name} ${g.surname}`).join(', ');
      setValidationError(`Por favor, selecciona la opción de vuelta en bus para: ${names}`);
      return;
    }

    const nonAttendingGuests = formData.filter(guest => !guest.confirmedAttendance);
    if (nonAttendingGuests.length > 0 && !showNonAttendConfirm) {
      setShowNonAttendConfirm(true);
      return;
    }
    setShowNonAttendConfirm(false);
    setSubmitting(true);

    const guestDTOs = formData.map(guest => ({
      id: guest.id,
      name: guest.name,
      surname: guest.surname,
      confirmedAttendance: guest.confirmedAttendance,
      kid: guest.kid,
      dietaryRestrictions: guest.dietaryRestrictions,
      suggests: guest.suggests,
      goingByBus: guest.goingByBus,
      bus: guest.goingByBus ? guest.bus : null,
      groupGuestId: selectedGuest.group.id
    }));

    try {
      await updateGroupGuests(selectedGuest.group.id, guestDTOs);
      setTimeout(() => { if (onSuccess) onSuccess(); }, 500);
    } catch (err) {
      console.error("Error updating guests:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 animate-pulse">
        <div className="inline-block h-16 w-16 rounded-full bg-sage-200 opacity-75"></div>
        <p className="mt-4 text-sage-600 font-sans">Cargando invitados...</p>
      </div>
    );
  }

  if (!selectedGuest || groupGuests.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-sage-600 font-sans">No se ha seleccionado ningún invitado</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-handwriting text-sage-700 mb-6 text-center tracking-wide">
        Confirmación de asistencia
      </h2>

      {selectedGuest?.group?.name && selectedGuest.group.name.trim() !== '' && (
        <div className="mb-8 bg-wine-50 p-5 rounded-lg border border-wine-300 border-l-4 border-l-wine-600 shadow-sm">
          <h3 className="text-xl font-serif text-sage-800 mb-3 text-center tracking-wide">
            {selectedGuest.group.name}
          </h3>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-blush-100 text-blush-700 rounded-md border-l-4 border-blush-500 animate-fade-in">
          <div className="flex">
            <svg className="h-5 w-5 text-blush-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-sans">{error}</p>
          </div>
        </div>
      )}

      {validationError && (
        <div className="mb-6 p-4 bg-blush-100 text-blush-700 rounded-md border-l-4 border-blush-500 animate-fade-in">
          <div className="flex">
            <svg className="h-5 w-5 text-blush-500 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-sans">{validationError}</p>
          </div>
        </div>
      )}

      {updateSuccess && (
        <div className="mb-6 p-4 bg-sage-100 text-sage-700 rounded-md border-l-4 border-sage-500 animate-fade-in">
          <div className="flex">
            <svg className="h-5 w-5 text-sage-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="font-sans">¡Información actualizada correctamente!</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {formData.map((guest, index) => (
            <div
              key={guest.id}
              className="bg-white rounded-sm shadow-sm p-5 animate-slide-up"
              style={{ border: '1px solid rgba(157,74,101,0.1)', animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-serif text-xl text-sage-800 tracking-wide">
                    {guest.name} {guest.surname}
                  </h3>
                  {guest.goingByBus && guest.bus && guest.bus !== '' && (
                    <span className="inline-flex items-center gap-1 text-xs text-sage-500 mt-1 font-sans">
                      🚌 Bus {guest.bus}h
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-sans text-sage-600 mr-3">
                    {guest.confirmedAttendance ? 'Asistirá' : 'No asistirá'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guest.confirmedAttendance}
                      onChange={e => handleChange(guest.id, 'confirmedAttendance', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-sage-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-champagne-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-champagne-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sage-600"></div>
                  </label>
                </div>
              </div>

              {guest.kid && (
                <div className="mb-3 inline-block px-3 py-1 bg-blush-100 text-blush-700 rounded-full text-xs font-sans">
                  👶 Adolescente/Niño
                </div>
              )}

              {guest.confirmedAttendance && (
                <div className="mt-5 space-y-5">
                  <div>
                    <label className="block text-sm font-medium font-sans text-sage-700 mb-2">
                      🍽️ Restricciones alimentarias
                    </label>
                    <input
                      type="text"
                      value={guest.dietaryRestrictions || ''}
                      onChange={e => handleChange(guest.id, 'dietaryRestrictions', e.target.value)}
                      placeholder="Alergias, intolerancias, etc."
                      className="w-full px-4 py-2 border-b-2 border-wine-400 focus:border-wine-600 bg-wine-50/30 rounded-t-md focus:outline-none transition-colors font-sans placeholder-sage-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium font-sans text-sage-700 mb-2">
                      🎵 Sugerencias de música
                    </label>
                    <input
                      type="text"
                      value={guest.suggests || ''}
                      onChange={e => handleChange(guest.id, 'suggests', e.target.value)}
                      placeholder="¿Qué te gustaría escuchar? ¿Alguna canción que no puede faltar?"
                      className="w-full px-4 py-2 border-b-2 border-wine-400 focus:border-wine-600 bg-wine-50/30 rounded-t-md focus:outline-none transition-colors font-sans placeholder-sage-400"
                    />
                  </div>

                  {/* === BUS SECTION — REDISEÑADA === */}
                  <div className="bg-sage-50/50 rounded-xl p-4 border border-sage-200">
                    <label className="block text-sm font-medium font-sans text-sage-700 mb-3">
                      🚌 ¿Vas a ir en bus a la boda?
                    </label>

                    {/* Toggle SI/NO */}
                    <div className="flex gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => {
                          handleChange(guest.id, 'goingByBus', true);
                          // Restore original bus value if exists
                          const originalBus = guest._originalBus;
                          if (originalBus && originalBus !== '' && originalBus !== 'No') {
                            handleChange(guest.id, 'bus', originalBus);
                          }
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-sans text-sm font-medium transition-all ${
                          guest.goingByBus
                            ? 'bg-wine-600 text-white shadow-md scale-105'
                            : 'bg-white text-sage-600 border border-sage-300 hover:bg-sage-100'
                        }`}
                      >
                        🚌 Sí, voy en bus
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleChange(guest.id, 'goingByBus', false);
                          handleChange(guest.id, 'bus', '');
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-sans text-sm font-medium transition-all ${
                          guest.goingByBus === false
                            ? 'bg-wine-600 text-white shadow-md scale-105'
                            : 'bg-white text-sage-600 border border-sage-300 hover:bg-sage-100'
                        }`}
                      >
                        🚗 No, voy por mi cuenta
                      </button>
                    </div>

                    {/* Bus time options — cards instead of dropdown */}
                    {guest.goingByBus && (
                      <div className="animate-fade-in">
                        <label className="block text-sm font-medium font-sans text-sage-600 mb-2">
                          ¿A qué hora vuelves?
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {BUS_OPTIONS.map(opt => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => handleChange(guest.id, 'bus', opt.value)}
                              className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border-2 transition-all text-center ${
                                guest.bus === opt.value
                                  ? 'border-wine-600 bg-wine-50 shadow-md scale-105'
                                  : 'border-sage-200 bg-white hover:border-wine-400 hover:bg-wine-50/50'
                              }`}
                            >
                              <span className="text-xl mb-1">{opt.icon}</span>
                              <span className="font-sans font-semibold text-sm text-sage-800">{opt.label}</span>
                              <span className="font-sans text-[10px] text-sage-500 mt-0.5">{opt.desc}</span>
                            </button>
                          ))}
                        </div>
                        {validationError && (!guest.bus || guest.bus === '') && (
                          <p className="mt-2 text-sm text-blush-600 font-sans flex items-center animate-fade-in">
                            <svg className="h-4 w-4 mr-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Selecciona una hora de vuelta
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal confirmación no asistencia */}
        {showNonAttendConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full text-center animate-fade-in">
              <span className="text-4xl mb-4 block">⚠️</span>
              <h3 className="text-xl font-serif text-sage-800 mb-3">¿Estás seguro?</h3>
              <p className="text-sage-600 text-sm mb-2">
                Los siguientes invitados están marcados como <strong>no asistentes</strong>:
              </p>
              <ul className="text-sage-700 font-medium text-sm mb-5 space-y-1">
                {formData.filter(g => !g.confirmedAttendance).map(g => (
                  <li key={g.id}>• {g.name} {g.surname}</li>
                ))}
              </ul>
              <p className="text-sage-500 text-xs mb-6">
                Si es un error, pulsa "Volver" y activa el interruptor de asistencia.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-sage-600 to-wine-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setShowNonAttendConfirm(false)}
                  className="border border-sage-300 text-sage-600 px-6 py-2.5 rounded-full font-medium hover:bg-sage-50 transition-all"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className={`px-8 py-3 rounded-md text-white font-sans font-medium text-lg transition-all ${
              submitting ? 'bg-sage-400 cursor-not-allowed' : 'bg-wine-600 hover:bg-wine-700 shadow-sm hover:shadow'
            }`}
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </span>
            ) : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestGroupForm;
