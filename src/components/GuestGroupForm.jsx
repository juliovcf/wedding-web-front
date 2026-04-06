import { useEffect, useState } from 'react';
import { useGuests } from '../contexts/GuestContext';

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
      const initialFormData = groupGuests.map(guest => ({
        ...guest,
        confirmedAttendance: guest.confirmedAttendance === null ? false : guest.confirmedAttendance,
        goingByBus: guest.goingByBus === null ? false : guest.goingByBus
      }));
      setFormData(initialFormData);
    }
  }, [groupGuests]);

  // Handle form field changes for a specific guest
  const handleChange = (id, field, value) => {
    setFormData(prevData =>
      prevData.map(guest =>
        guest.id === id ? { ...guest, [field]: value } : guest
      )
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Validate: if going by bus, must select a return option
    const invalidGuests = formData.filter(
      guest => guest.confirmedAttendance && guest.goingByBus && !guest.bus
    );
    if (invalidGuests.length > 0) {
      const names = invalidGuests.map(g => `${g.name} ${g.surname}`).join(', ');
      setValidationError(
        `Por favor, selecciona la opción de vuelta en bus para: ${names}`
      );
      return;
    }

    // Check if any guest is marked as not attending and ask for confirmation
    const nonAttendingGuests = formData.filter(guest => !guest.confirmedAttendance);
    if (nonAttendingGuests.length > 0 && !showNonAttendConfirm) {
      setShowNonAttendConfirm(true);
      return;
    }
    setShowNonAttendConfirm(false);

    setSubmitting(true);

    // Convert form data to the format expected by the API
    const guestDTOs = formData.map(guest => ({
      id: guest.id,
      name: guest.name,
      surname: guest.surname,
      confirmedAttendance: guest.confirmedAttendance,
      kid: guest.kid,
      dietaryRestrictions: guest.dietaryRestrictions,
      suggests: guest.suggests,
      goingByBus: guest.goingByBus,
      bus: guest.bus,
      groupGuestId: selectedGuest.group.id
    }));

    try {
      await updateGroupGuests(selectedGuest.group.id, guestDTOs);
      // Wait briefly to show success message before navigating
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 500);
    } catch (err) {
      console.error("Error updating guests:", err);
      // Error is handled in the context
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
              className="bg-white rounded-lg shadow-elegant p-5 border border-wine-300 border-t-4 border-t-wine-600 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-xl text-sage-800 tracking-wide">
                  {guest.name} {guest.surname}
                </h3>
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
                  Adolescente/Niño
                </div>
              )}

              {/* Show additional fields only if attendance is confirmed */}
              {guest.confirmedAttendance && (
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium font-sans text-sage-700 mb-2">
                      Restricciones alimentarias
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
                      Sugerencias de música
                    </label>
                    <input
                      type="text"
                      value={guest.suggests || ''}
                      onChange={e => handleChange(guest.id, 'suggests', e.target.value)}
                      placeholder="¿Qué te gustaría escuchar? ¿Alguna canción que no puede faltar?"
                      className="w-full px-4 py-2 border-b-2 border-wine-400 focus:border-wine-600 bg-wine-50/30 rounded-t-md focus:outline-none transition-colors font-sans placeholder-sage-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium font-sans text-sage-700 mb-2">
                      ¿Vas a ir en bus a la boda?
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`goingByBus-${guest.id}`}
                          value="true"
                          checked={guest.goingByBus === true}
                          onChange={e => handleChange(guest.id, 'goingByBus', true)}
                          className="mr-2 text-wine-600 focus:ring-wine-500"
                        />
                        <span className="font-sans text-sage-700">Sí</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`goingByBus-${guest.id}`}
                          value="false"
                          checked={guest.goingByBus === false}
                          onChange={e => {
                            handleChange(guest.id, 'goingByBus', false);
                            handleChange(guest.id, 'bus', ''); // Reset bus return option
                          }}
                          className="mr-2 text-wine-600 focus:ring-wine-500"
                        />
                        <span className="font-sans text-sage-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Show return bus options only if going by bus */}
                  {guest.goingByBus && (
                    <div>
                      <label className="block text-sm font-medium font-sans text-sage-700 mb-2">
                        ¿Vas a volver en bus y a qué hora?
                      </label>
                      <select
                        value={guest.bus || ''}
                        onChange={e => handleChange(guest.id, 'bus', e.target.value)}
                        className={`w-full px-4 py-2 border-b-2 ${validationError && !guest.bus ? 'border-blush-500 bg-blush-50/30' : 'border-wine-400 bg-wine-50/30'} focus:border-wine-600 rounded-t-md focus:outline-none transition-colors font-sans text-sage-700`}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="No">No</option>
                        <option value="21h">21h</option>
                        <option value="00h">00h</option>
                      </select>
                      {validationError && !guest.bus && (
                        <p className="mt-1.5 text-sm text-blush-600 font-sans flex items-center animate-fade-in">
                          <svg className="h-4 w-4 mr-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Debes seleccionar una opción de vuelta en bus
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal de confirmación de no asistencia */}
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
            className={`px-8 py-3 rounded-md text-white font-sans font-medium text-lg transition-all ${submitting
                ? 'bg-sage-400 cursor-not-allowed'
                : 'bg-wine-600 hover:bg-wine-700 shadow-sm hover:shadow'
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