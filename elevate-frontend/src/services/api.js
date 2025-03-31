import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5002/api',
});

// Fetch activities with filters
export const getActivities = async (filters = {}) => {
  try {
    const response = await API.get('/activities', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    // Fallback to mock data if API fails
    return [
      {
        id: 1,
        name: 'Columbus Force Soccer Club',
        category: 'Sports',
        rating: 4.5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIvGWzNUeqpB2rRcLooSOtb4yHoqNE_qgD7g&s',
        ageRange: '5-8',
        location: 'Columbus, OH',
        isFree: false,
        featured: true
      },
      // ... other mock activities
    ];
  }
};

// Update user location
export const updateUserLocation = async (location) => {
  try {
    await API.post('/user/location', { location });
  } catch (error) {
    console.error('Error updating location:', error);
  }
};