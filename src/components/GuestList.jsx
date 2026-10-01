import { CONTACT_EMAIL } from '../config';
import { useGuests } from '../contexts/GuestContext';

const GuestList = ({ onSelectGuest }) => {
  const { searchResults, isSearching, hasSearched } = useGuests();

  const handleGuestSelect = (guest) => {
    if (guest?.group?.id) {
      onSelectGuest(guest);
    }
  };

  if (!hasSearched || isSearching) {
    return null;
  }

  if (searchResults.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-champagne-50 text-sage-700 rounded-md border border-champagne-200 font-sans text-sm animate-fade-in" role="status">
        <p className="font-medium">No encontramos ese nombre.</p>
        <p className="mt-1 text-sage-600">
          Prueba solo con tu nombre o tu apellido. Si sigue sin aparecer, escríbenos a{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">{CONTACT_EMAIL}</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <h3 className="text-lg font-serif text-sage-700 mb-3 tracking-wide">
        {searchResults.length === 1 ? '1 invitado encontrado' : `${searchResults.length} invitados encontrados`}
      </h3>
      <ul className="bg-white/90 backdrop-blur-sm rounded-md shadow-elegant divide-y divide-wine-200 border border-wine-300">
        {searchResults.map((guest) => (
          <li key={guest.id} className="hover:bg-wine-50 transition-colors">
            <button
              type="button"
              onClick={() => handleGuestSelect(guest)}
              className="group w-full text-left px-5 py-4 focus:outline-none focus-visible:bg-wine-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-wine-400"
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
                <span className="text-wine-500 transition-transform group-hover:translate-x-1" aria-hidden="true">
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
