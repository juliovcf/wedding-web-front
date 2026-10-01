import { useState } from 'react';
import { useGuests } from '../contexts/GuestContext';

const MIN_CHARS = 2;

const SearchForm = () => {
  const { searchGuests, clearSearch, isSearching, error, lastSearchTerm } = useGuests();
  // Al volver desde la confirmación se recupera la última búsqueda
  const [searchTerm, setSearchTerm] = useState(lastSearchTerm);

  const isTooShort = searchTerm.trim().length < MIN_CHARS;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // La búsqueda filtra la lista ya descargada, así que puede ir al momento
    if (value.trim().length >= MIN_CHARS) {
      searchGuests(value);
    } else {
      // Sin esto seguirían viéndose los resultados de la búsqueda anterior
      clearSearch();
    }
  };

  // Enter no recarga la página: los resultados ya están al día
  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} role="search" className="mb-2">
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
            className="w-full pl-4 pr-11 py-3 border-b-2 border-wine-400 focus:border-wine-600 bg-white/80 backdrop-blur-sm rounded-t-md focus:outline-none transition-colors placeholder-sage-400 font-sans"
            autoComplete="off"
            enterKeyHint="search"
            aria-describedby={isTooShort ? 'searchHint' : undefined}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {isSearching ? (
              <svg className="animate-spin h-5 w-5 text-sage-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="h-5 w-5 text-sage-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
        {isTooShort && (
          <p id="searchHint" className="text-xs text-sage-500 mt-2 font-sans">
            Escribe al menos {MIN_CHARS} letras para buscar
          </p>
        )}
      </form>

      {error && (
        <div className="form-alert mt-4" role="alert">
          <svg className="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
