import { useState } from 'react';
import PreferencesForm from './PreferencesForm';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'Deborah',
    email: 'deborah229@mail.com',
    profilePic: 'https://img.tineye.com/result/33594475e0b9ab2cc4acf58668d708dbb591d53eec836f7c38952298b49416d9-58?size=160'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // In a real app, you would save to backend here
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-[#1A2A5D] text-white min-h-screen p-4 pb-16">
      <header className="flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold">Settings</h1>
      </header>

      <div className="mt-8 flex">
        <div className="w-1/4 space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left p-2 rounded ${activeTab === 'profile' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`w-full text-left p-2 rounded ${activeTab === 'preferences' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left p-2 rounded ${activeTab === 'notifications' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left p-2 rounded ${activeTab === 'security' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
          >
            Security
          </button>
        </div>

        <div className="w-3/4 pl-8">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={user.profilePic} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button 
                    type="button"
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Change Photo
                  </button>
                </div>
                
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className="w-full p-2 rounded text-black"
                  />
                </div>
                
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    className="w-full p-2 rounded text-black"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Activity Preferences</h2>
              <PreferencesForm userId="user-123" />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Event Reminders</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Change Password</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full p-2 rounded text-black"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full p-2 rounded text-black"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full p-2 rounded text-black"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Account Actions</h3>
                  <button
                    className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 w-full bg-blue-900 p-3 flex justify-around">
        <a href="/">🏠</a>
        <a href="/forum">👥</a>
        <a href="/calendar">🗓️</a>
        <a href="/video">🎥</a>
        <a href="/settings">⚙️</a>
      </nav>
    </div>
  );
}