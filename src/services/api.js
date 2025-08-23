import axios from 'axios';

// Base URL for API requests - update this to match your backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request and response interceptors for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status || 'Unknown error', error.config?.url);
    return Promise.reject(error);
  }
);

// API service functions
export const guestService = {
  // Search for guests by name or surname
  searchGuests: async (searchTerm) => {
    try {
      console.log('Searching guests with term:', searchTerm);
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
      console.log('Fetching guests for group:', groupId);
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
      console.log('Updating guests for group:', groupId, 'with data:', guestsData);
      const response = await apiClient.put(`/guests/group/${groupId}`, guestsData);
      console.log('Update response:', response.status, response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating guests:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default guestService;