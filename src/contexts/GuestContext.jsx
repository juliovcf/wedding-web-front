import React, { createContext, useContext, useState } from 'react';
import guestService from '../services/api';

// Create context
const GuestContext = createContext();

// Context provider component
export const GuestProvider = ({ children }) => {
  // State for search results
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // State for selected guest group
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [groupGuests, setGroupGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Search for guests
  const searchGuests = async (searchTerm) => {
    setIsSearching(true);
    setError(null);
    try {
      const results = await guestService.searchGuests(searchTerm);
      setSearchResults(results || []);
    } catch (err) {
      setError('Error al buscar invitados. Por favor, inténtalo de nuevo.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch guests from a group
  const fetchGroupGuests = async (guest) => {
    if (!guest || !guest.group || !guest.group.id) {
      setError('No se pudo encontrar el grupo de invitados');
      return;
    }
    
    setSelectedGuest(guest);
    setIsLoading(true);
    setError(null);
    setUpdateSuccess(false); // Reset success state when loading new group
    
    try {
      const groupId = guest.group.id;
      const groupMembers = await guestService.getGuestsByGroup(groupId);
      setGroupGuests(groupMembers || []);
    } catch (err) {
      setError('Error al cargar el grupo de invitados');
    } finally {
      setIsLoading(false);
    }
  };

  // Update guests in a group
  const updateGroupGuests = async (groupId, updatedGuests) => {
    setIsLoading(true);
    setError(null);
    setUpdateSuccess(false);
    
    try {
      const result = await guestService.updateGuestsByGroup(groupId, updatedGuests);
      console.log("API update successful:", result);
      setUpdateSuccess(true);
      return result;
    } catch (err) {
      console.error("API update error:", err);
      setError('Error al actualizar los invitados');
      setUpdateSuccess(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form state
  const resetFormState = () => {
    setUpdateSuccess(false);
    setError(null);
  };

  // Clear search
  const clearSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
  };

  // Reset all state
  const resetAll = () => {
    setSearchResults([]);
    setSelectedGuest(null);
    setGroupGuests([]);
    setIsSearching(false);
    setIsLoading(false);
    setError(null);
    setUpdateSuccess(false);
  };

  // Context value
  const value = {
    searchResults,
    isSearching,
    selectedGuest,
    groupGuests,
    isLoading,
    error,
    updateSuccess,
    searchGuests,
    fetchGroupGuests,
    updateGroupGuests,
    resetFormState,
    clearSearch,
    resetAll
  };

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
};

// Custom hook for using the context
export const useGuests = () => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error('useGuests must be used within a GuestProvider');
  }
  return context;
};

export default GuestContext;