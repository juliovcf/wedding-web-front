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
  const [allConfirmed, setAllConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Initialize form data when group guests are loaded
  useEffect(() => {
    if (groupGuests.length > 0) {
      const initialFormData = groupGuests.map(guest => ({
        ...guest,
        confirmedAttendance: guest.confirmedAttendance === null ? false : guest.confirmedAttendance
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

  // Handle toggle all confirmations
  const handleToggleAll = () => {
    const newConfirmed = !allConfirmed;
    setAllConfirmed(newConfirmed);
    setFormData(prevData =>
      prevData.map(guest => ({
        ...guest,
        confirmedAttendance: newConfirmed
      }))
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
      groupGuestId: selectedGuest.group.id
    }));
    
    try {
      await updateGroupGuests(selectedGuest.group.id, guestDTOs);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // Error is handled in the context
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
        <p className="mt-3 text-gray-600">Cargando invitados...</p>
      </div>
    );
  }

  if (!selectedGuest || groupGuests.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No se ha seleccionado ningún invitado</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-olive-700 mb-6">
        Confirmación de asistencia
      </h2>
      
      <div className="mb-6 bg-olive-50 p-4 rounded-md">
        <h3 className="text-lg font-medium text-olive-700 mb-2">
          {selectedGuest.group.name}
        </h3>
        <p className="text-neutral-600">
          Por favor, confirma la asistencia y completa la información para todos los invitados.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {updateSuccess && (
        <div className="mb-6 p-4 bg-olive-100 text-olive-700 rounded-md">
          ¡Información actualizada correctamente!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div 
            className="flex items-center justify-between p-3 bg-gray-100 rounded-md mb-4 cursor-pointer"
            onClick={handleToggleAll}
          >
            <span className="font-medium">Confirmar/Rechazar todos</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={allConfirmed}
                className="sr-only peer"
                readOnly
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          {formData.map(guest => (
            <div 
              key={guest.id} 
              className="bg-white rounded-md shadow-sm p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-lg text-gray-800">
                  {guest.name} {guest.surname}
                </h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">
                    {guest.confirmedAttendance ? 'Asistirá' : 'No asistirá'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guest.confirmedAttendance}
                      onChange={e => handleChange(guest.id, 'confirmedAttendance', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-olive-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-olive-600"></div>
                  </label>
                </div>
              </div>

              {guest.kid && (
                <div className="mb-2 text-sm bg-olive-50 text-olive-800 px-2 py-1 rounded inline-block">
                  Niño/a
                </div>
              )}

              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restricciones alimentarias
                  </label>
                  <input
                    type="text"
                    value={guest.dietaryRestrictions || ''}
                    onChange={e => handleChange(guest.id, 'dietaryRestrictions', e.target.value)}
                    placeholder="Alergias, intolerancias, etc."
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sugerencias de música
                  </label>
                  <input
                    type="text"
                    value={guest.suggests || ''}
                    onChange={e => handleChange(guest.id, 'suggests', e.target.value)}
                    placeholder="¿Qué te gustaría escuchar?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-3 rounded-md text-white font-medium text-lg ${
              submitting 
                ? 'bg-olive-400 cursor-not-allowed' 
                : 'bg-olive-600 hover:bg-olive-700'
            }`}
          >
            {submitting ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestGroupForm;