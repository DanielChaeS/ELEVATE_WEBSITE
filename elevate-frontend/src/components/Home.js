import { useState, useEffect } from 'react';
import { getActivities } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Columbus, OH');
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({
    category: null,
    age: null,
    distance: null,
    price: null,
    time: null,
    rating: null
  });

  // Fetch activities from backend
  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getActivities(filters);
      setActivities(data);
    };
    fetchActivities();
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setActiveFilter(null); // Close filter options after selection
  };

  const updateLocation = () => {
    setLocation(newLocation);
    setShowLocationPopup(false);
    setNewLocation('');
    // In a real app, you would call: updateUserLocation(newLocation);
  };

  const featuredActivities = activities.filter(a => a.featured);
  const recommendedActivities = activities.filter(a => !a.featured);

  return (
    <div className="bg-[#1A2A5D] text-white min-h-screen p-4 pb-16">
      {/* Header */}
      <header className="flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold">Elevate</h1>
        <div className="flex items-center gap-4">
          <span>📍 {location}</span>
          <span 
            onClick={() => setShowLocationPopup(true)} 
            className="cursor-pointer"
          >
            ℹ️
          </span>
        </div>
      </header>

      {/* Search Bar */}
      <div className="mt-4">
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full p-2 rounded-lg text-black" 
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mt-4">
        {['Sports ⚽', 'Academic ✏️', 'Arts 🎨'].map(category => (
          <button 
            key={category}
            className={`px-4 py-2 rounded-full ${
              filters.category === category ? 'bg-blue-700' : 'bg-blue-600'
            }`}
            onClick={() => handleFilterChange('category', category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Filters */}
      <div className="flex justify-between mt-4 bg-blue-900 p-2 rounded-lg">
        {['Age', 'Distance', 'Price', 'Time', 'Rating'].map(filter => (
          <button
            key={filter}
            className={`px-2 py-1 rounded ${
              activeFilter === filter ? 'bg-blue-600' : 'bg-blue-700'
            }`}
            onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Filter Options */}
      {activeFilter && (
        <div className="flex gap-2 mt-2 p-2 rounded-lg bg-[#1A2A5D]">
          {getFilterOptions(activeFilter).map(option => (
            <button
              key={option.value}
              className={`px-2 py-1 rounded ${
                filters[activeFilter.toLowerCase()] === option.value 
                  ? 'bg-blue-600' 
                  : 'bg-blue-500'
              }`}
              onClick={() => handleFilterChange(
                activeFilter.toLowerCase(), 
                option.value
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Featured Activities */}
      <h2 className="mt-6 text-xl font-bold">Featured ⭐</h2>
      <div className="flex gap-4 mt-2 overflow-x-auto pb-4">
        {featuredActivities.map(activity => (
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
            onClick={() => navigate(`/activity/${activity.id}`)}
          />
        ))}
      </div>

      {/* Recommended Activities */}
      <h2 className="mt-6 text-xl font-bold">Recommended</h2>
      <div className="flex gap-4 mt-2 overflow-x-auto pb-4">
        {recommendedActivities.map(activity => (
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
            onClick={() => navigate(`/activity/${activity.id}`)}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-blue-900 p-3 flex justify-around">
        <button onClick={() => navigate('/')}>🏠</button>
        <button onClick={() => navigate('/forum')}>👥</button>
        <button onClick={() => navigate('/calendar')}>🗓️</button>
        <button onClick={() => navigate('/video')}>🎥</button>
        <button onClick={() => navigate('/settings')}>⚙️</button>
      </nav>

      {/* Location Popup */}
      {showLocationPopup && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-10"
            onClick={() => setShowLocationPopup(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 text-black p-6 rounded-lg shadow-lg z-20 w-80 max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Location</h2>
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Enter new location"
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button 
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowLocationPopup(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={updateLocation}
              >
                Enter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Activity Card Component
function ActivityCard({ activity, onClick }) {
  return (
    <div 
      className="activity-card bg-white p-2 rounded-lg text-black cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={activity.image} 
        alt={activity.name} 
        className="activity-image"
      />
      <div className="activity-card-content">
        <p className="font-bold mt-2">{activity.name}</p>
        <p className="mt-auto">
          {activity.rating ? `⭐ ${activity.rating}` : 'No ratings yet'}
        </p>
      </div>
    </div>
  );
}

// Helper function for filter options
function getFilterOptions(filterType) {
  switch(filterType) {
    case 'Age':
      return [
        { value: '0-3', label: '0-3' },
        { value: '3-5', label: '3-5' },
        { value: '6-8', label: '6-8' },
        { value: '9-12', label: '9-12' }
      ];
    case 'Distance':
      return [
        { value: '0-5', label: '0-5 miles' },
        { value: '5-10', label: '5-10 miles' },
        { value: '10+', label: '10+ miles' }
      ];
    case 'Price':
      return [
        { value: 'free', label: 'Free' },
        { value: '$', label: '$' },
        { value: '$$', label: '$$' },
        { value: '$$$', label: '$$$' }
      ];
    case 'Time':
      return [
        { value: 'morning', label: 'Morning' },
        { value: 'afternoon', label: 'Afternoon' },
        { value: 'evening', label: 'Evening' }
      ];
    case 'Rating':
      return [
        { value: '3+', label: '⭐ 3+' },
        { value: '4+', label: '⭐ 4+' },
        { value: '5', label: '⭐ 5' }
      ];
    default:
      return [];
  }
}