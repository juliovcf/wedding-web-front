import axios from 'axios';

// Base URL for API requests - update this to match your backend URL
const API_BASE_URL = 'http://localhost:8585/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const guestService = {
  // Search for guests by name or surname
  searchGuests: async (searchTerm) => {
    try {
      const response = await apiClient.post('/guests/search', { name: searchTerm });
      return response.data;
    } catch (error) {
      console.error('Error searching guests:', error);
      throw error;
    }
  },

  // Get all guests from a group
  getGuestsByGroup: async (groupId) => {
    try {
      const response = await apiClient.get(`/guests/group/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching group guests:', error);
      throw error;
    }
  },

  // Update all guests in a group
  updateGuestsByGroup: async (groupId, guestsData) => {
    try {
      const response = await apiClient.put(`/guests/group/${groupId}`, guestsData);
      return response.data;
    } catch (error) {
      console.error('Error updating guests:', error);
      throw error;
    }
  }
};

export default guestService;