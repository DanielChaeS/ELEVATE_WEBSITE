import { useState } from 'react';
import { updatePreferences } from '../services/api';

export default function PreferencesForm({ userId }) {
  const [preferences, setPreferences] = useState({
    age: '',
    locationPref: '',
    interests: [],
    athleticism: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPreferences(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, value]
          : prev.interests.filter(i => i !== value)
      }));
    } else {
      setPreferences(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePreferences(userId, preferences);
      alert('Preferences updated successfully!');
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Age</label>
        <input
          type="number"
          name="age"
          value={preferences.age}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />
      </div>
      
      <div>
        <label className="block">Location Preference</label>
        <select
          name="locationPref"
          value={preferences.locationPref}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        >
          <option value="">Select</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
          <option value="both">Both</option>
        </select>
      </div>
      
      <div>
        <label className="block">Interests</label>
        {['sports', 'educational', 'arts', 'music', 'technology'].map(interest => (
          <div key={interest} className="flex items-center">
            <input
              type="checkbox"
              id={interest}
              value={interest}
              checked={preferences.interests.includes(interest)}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor={interest}>{interest.charAt(0).toUpperCase() + interest.slice(1)}</label>
          </div>
        ))}
      </div>
      
      <div>
        <label className="block">Athleticism Level</label>
        <select
          name="athleticism"
          value={preferences.athleticism}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        >
          <option value="">Select</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save Preferences
      </button>
    </form>
  );
}