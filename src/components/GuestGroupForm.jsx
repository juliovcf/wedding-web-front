import React, { useEffect, useState } from 'react';
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
      
      <div className="mb-8 bg-champagne-50 p-5 rounded-lg border border-champagne-200 shadow-sm">
        <h3 className="text-xl font-serif text-sage-800 mb-3 text-center tracking-wide">
          {selectedGuest.group.name}
        </h3>
      </div>

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
              className="bg-white rounded-lg shadow-elegant p-5 border border-champagne-100 animate-slide-up"
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
                  Niño/a
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
                      className="w-full px-4 py-2 border-b-2 border-champagne-200 focus:border-sage-500 bg-champagne-50/30 rounded-t-md focus:outline-none transition-colors font-sans placeholder-sage-400"
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
                      placeholder="¿Qué te gustaría escuchar?"
                      className="w-full px-4 py-2 border-b-2 border-champagne-200 focus:border-sage-500 bg-champagne-50/30 rounded-t-md focus:outline-none transition-colors font-sans placeholder-sage-400"
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
                        className="w-full px-4 py-2 border-b-2 border-champagne-200 focus:border-wine-500 bg-champagne-50/30 rounded-t-md focus:outline-none transition-colors font-sans text-sage-700"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="No">No</option>
                        <option value="21h">21h</option>
                        <option value="00h">00h</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className={`px-8 py-3 rounded-md text-white font-sans font-medium text-lg transition-all ${
              submitting 
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