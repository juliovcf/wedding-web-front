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
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label 
            htmlFor="searchInput" 
            className="block text-sm font-medium font-sans text-sage-700 mb-2"
          >
            Busca tu invitación
          </label>
          <div className="relative">
            <input
              id="searchInput"
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Escribe tu nombre o apellido"
              className="w-full px-4 py-3 border-b-2 border-sage-300 focus:border-champagne-500 bg-white/80 backdrop-blur-sm rounded-t-md focus:outline-none transition-colors placeholder-sage-400 font-sans"
              autoComplete="off"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isSearching ? (
                <svg className="animate-spin h-5 w-5 text-sage-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5 text-sage-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <p className="text-xs text-sage-500 mt-2 font-sans">
            Introduce al menos 2 caracteres para buscar
          </p>
        </div>
        
        <button
          type="submit"
          disabled={searchTerm.trim().length < 2 || isSearching}
          className={`w-full py-3 px-4 rounded-md text-white font-sans font-medium transition-all shadow-sm
            ${isSearching || searchTerm.trim().length < 2 
              ? 'bg-sage-300 cursor-not-allowed' 
              : 'bg-sage-600 hover:bg-sage-700 hover:shadow'}`}
        >
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      
      {error && (
        <div className="p-4 bg-blush-100 text-blush-700 rounded-md mb-4 border-l-4 border-blush-500 animate-fade-in">
          <div className="flex">
            <svg className="h-5 w-5 text-blush-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-sans text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;