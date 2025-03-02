import React from 'react';
import { useGuests } from '../contexts/GuestContext';

const GuestList = ({ onSelectGuest }) => {
  const { searchResults, isSearching } = useGuests();

  // Handler for guest selection
  const handleGuestSelect = (guest) => {
    if (guest && guest.group && guest.group.id) {
      onSelectGuest(guest);
    }
  };

  // No results found message
  if (!isSearching && searchResults.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto mt-4 p-4 bg-olive-50 text-olive-700 rounded-md">
        No hay resultados. Escribe para buscar invitados.
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-medium text-olive-700 mb-3">
        {searchResults.length === 1 ? "1 invitado encontrado" : `${searchResults.length} invitados encontrados`}
      </h3>
      <ul className="bg-white rounded-md shadow-sm divide-y divide-neutral-100">
        {searchResults.map((guest) => (
          <li key={guest.id} className="hover:bg-olive-50 transition-colors">
            <button
              onClick={() => handleGuestSelect(guest)}
              className="w-full text-left px-4 py-3 focus:outline-none focus:bg-olive-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-neutral-800">
                    {guest.name} {guest.surname}
                  </span>
                  {guest.group && (
                    <p className="text-sm text-neutral-500">
                      {guest.group.name}
                    </p>
                  )}
                </div>
                <span className="text-olive-600">&rarr;</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;