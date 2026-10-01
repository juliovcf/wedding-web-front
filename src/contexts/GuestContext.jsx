import { createContext, useContext, useEffect, useState } from 'react';
import guestService from '../services/api';

// === MOCK DATA ===
const MOCK_GUESTS = [
  {
    id: 1, name: "Julio", surname: "Pérez", kid: false,
    confirmedAttendance: true, goingByBus: true, bus: "21h",
    dietaryRestrictions: "Sin gluten", suggests: "Algo de los 80",
    group: { id: 1, name: "Familia Pérez" }
  },
  {
    id: 2, name: "Cristina", surname: "Gavilán", kid: false,
    confirmedAttendance: true, goingByBus: false, bus: null,
    dietaryRestrictions: "", suggests: "Música en directo",
    group: { id: 1, name: "Familia Pérez" }
  },
  {
    id: 3, name: "María", surname: "López", kid: false,
    confirmedAttendance: true, goingByBus: true, bus: "00h",
    dietaryRestrictions: "Vegetariana", suggests: "",
    group: { id: 2, name: "Familia López" }
  },
  {
    id: 4, name: "Carlos", surname: "López", kid: false,
    confirmedAttendance: true, goingByBus: null, bus: "21h",
    dietaryRestrictions: "", suggests: "Reggaeton por favor",
    group: { id: 2, name: "Familia López" }
  },
  {
    id: 5, name: "Ana", surname: "Martínez", kid: true,
    confirmedAttendance: false, goingByBus: null, bus: null,
    dietaryRestrictions: "", suggests: "",
    group: { id: 3, name: "Familia Martínez" }
  },
  {
    id: 6, name: "Pedro", surname: "Martínez", kid: false,
    confirmedAttendance: true, goingByBus: true, bus: "21h",
    dietaryRestrictions: "Alergia frutos secos", suggests: "Bachata",
    group: { id: 3, name: "Familia Martínez" }
  },
  {
    id: 7, name: "Sofía", surname: "García", kid: false,
    confirmedAttendance: true, goingByBus: null, bus: null,
    dietaryRestrictions: "", suggests: "",
    group: { id: 4, name: "Amigos Universidad" }
  },
];

const MOCK_GROUP_GUESTS = {
  1: [MOCK_GUESTS[0], MOCK_GUESTS[1]],  // Familia Pérez
  2: [MOCK_GUESTS[2], MOCK_GUESTS[3]],  // Familia López
  3: [MOCK_GUESTS[4], MOCK_GUESTS[5]],  // Familia Martínez
  4: [MOCK_GUESTS[6]],                   // Amigos Universidad
};

const USE_MOCK = false; // Cambiar a false cuando el backend esté disponible
// ==================

// Create context
const GuestContext = createContext();

// Context provider component
export const GuestProvider = ({ children }) => {
  const [allGuests, setAllGuests] = useState([]);
  const [isLoadingAllGuests, setIsLoadingAllGuests] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [groupGuests, setGroupGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState('');

  useEffect(() => {
    const loadAllGuests = async () => {
      try {
        setIsLoadingAllGuests(true);
        if (USE_MOCK) {
          console.log('🎭 Usando datos mock (backend offline)');
          setAllGuests(MOCK_GUESTS);
        } else {
          const guests = await guestService.getAllGuests();
          setAllGuests(guests || []);
        }
      } catch (err) {
        console.error('❌ Error cargando invitados:', err);
        setError('Error al cargar los invitados');
      } finally {
        setIsLoadingAllGuests(false);
      }
    };
    loadAllGuests();
  }, []);

  const normalizeString = (value) =>
    (value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const searchGuests = (searchTerm) => {
    setIsSearching(true);
    setError(null);
    setLastSearchTerm(searchTerm);
    try {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setIsSearching(false);
        return;
      }
      const normalizedTerm = normalizeString(searchTerm.trim());
      const results = allGuests.filter(guest => {
        const name = normalizeString(guest.name);
        const surname = normalizeString(guest.surname);
        const fullName = `${name} ${surname}`;
        return name.includes(normalizedTerm) || surname.includes(normalizedTerm) || fullName.includes(normalizedTerm);
      });
      setSearchResults(results || []);
      setHasSearched(true);
    } catch (err) {
      setError('Error al buscar invitados.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const fetchGroupGuests = async (guest) => {
    if (!guest || !guest.group || !guest.group.id) {
      setError('No se pudo encontrar el grupo de invitados');
      return;
    }
    setSelectedGuest(guest);
    setIsLoading(true);
    setError(null);
    setUpdateSuccess(false);
    try {
      if (USE_MOCK) {
        console.log('🎭 Cargando grupo mock:', guest.group.id);
        // Simular un pequeño delay para ver el spinner
        await new Promise(r => setTimeout(r, 400));
        setGroupGuests(MOCK_GROUP_GUESTS[guest.group.id] || []);
      } else {
        const groupMembers = await guestService.getGuestsByGroup(guest.group.id);
        setGroupGuests(groupMembers || []);
      }
    } catch (err) {
      setError('Error al cargar el grupo de invitados');
    } finally {
      setIsLoading(false);
    }
  };

  // Usa isSaving (y no isLoading) para que el formulario siga visible mientras se guarda
  const updateGroupGuests = async (groupId, updatedGuests) => {
    setIsSaving(true);
    setError(null);
    setUpdateSuccess(false);
    try {
      if (USE_MOCK) {
        console.log('🎭 Guardando mock:', updatedGuests);
        await new Promise(r => setTimeout(r, 500));
      } else {
        await guestService.updateGuestsByGroup(groupId, updatedGuests);
      }
      setUpdateSuccess(true);
    } catch (err) {
      setError('No hemos podido guardar tu respuesta. Inténtalo de nuevo en unos segundos.');
      setUpdateSuccess(false);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const resetFormState = () => { setUpdateSuccess(false); setError(null); };
  const clearSearch = () => { setSearchResults([]); setIsSearching(false); setHasSearched(false); setLastSearchTerm(''); };
  const resetAll = () => {
    setSearchResults([]); setSelectedGuest(null); setGroupGuests([]);
    setIsSearching(false); setIsLoading(false); setError(null);
    setUpdateSuccess(false); setHasSearched(false);
    setIsSaving(false); setLastSearchTerm('');
  };

  const value = {
    allGuests, isLoadingAllGuests, searchResults, isSearching, hasSearched,
    selectedGuest, groupGuests, isLoading, isSaving, error, updateSuccess, lastSearchTerm,
    searchGuests, fetchGroupGuests, updateGroupGuests,
    resetFormState, clearSearch, resetAll
  };

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
};

export const useGuests = () => {
  const context = useContext(GuestContext);
  if (!context) throw new Error('useGuests must be used within a GuestProvider');
  return context;
};

export default GuestContext;
