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
      <div className="w-full max-w-md mx-auto mt-4 p-4 bg-champagne-50 text-sage-700 rounded-md border border-champagne-200 font-sans animate-fade-in">
        <div className="flex items-center">
          <svg className="h-6 w-6 text-champagne-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No hay resultados. Escribe para buscar invitados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      {searchResults.length > 0 && (
        <h3 className="text-lg font-serif text-sage-700 mb-3">
          {searchResults.length === 1 ? "1 invitado encontrado" : `${searchResults.length} invitados encontrados`}
        </h3>
      )}
      <ul className="bg-white/90 backdrop-blur-sm rounded-md shadow-elegant divide-y divide-champagne-100">
        {searchResults.map((guest) => (
          <li key={guest.id} className="hover:bg-champagne-50 transition-colors">
            <button
              onClick={() => handleGuestSelect(guest)}
              className="w-full text-left px-5 py-4 focus:outline-none focus:bg-champagne-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-serif text-lg text-sage-800">
                    {guest.name} {guest.surname}
                  </span>
                  {guest.group && (
                    <p className="text-sm font-sans text-sage-500 mt-1">
                      {guest.group.name}
                    </p>
                  )}
                </div>
                <span className="text-champagne-600 transform transition-transform group-hover:translate-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;