import React, { useCallback, useState } from 'react';
import { useGuests } from '../contexts/GuestContext';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchGuests, isSearching, error } = useGuests();

  // Debounce function for search
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Create debounced search function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term.trim().length >= 2) {
        searchGuests(term);
      }
    }, 300),
    [searchGuests]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length >= 2) {
      debouncedSearch(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 2) {
      searchGuests(searchTerm);
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-2">
          <label 
            htmlFor="searchInput" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Busca tu invitación:
          </label>
          <input
            id="searchInput"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Escribe tu nombre o apellido"
            className="w-full px-4 py-2 border border-olive-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500"
            autoComplete="off"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Introduce al menos 2 caracteres para buscar
          </p>
        </div>
        
        <button
          type="submit"
          disabled={searchTerm.trim().length < 2 || isSearching}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors 
            ${isSearching || searchTerm.trim().length < 2 
              ? 'bg-olive-300 cursor-not-allowed' 
              : 'bg-olive-600 hover:bg-olive-700'}`}
        >
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md mb-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchForm;