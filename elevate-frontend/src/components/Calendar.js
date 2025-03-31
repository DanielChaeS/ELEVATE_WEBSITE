import { useState } from 'react';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(17);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderDates = () => {
    const dates = [];
    // Empty cells for days before the 1st
    for (let i = 0; i < 6; i++) {
      dates.push(<span key={`empty-${i}`}></span>);
    }
    // Actual days of the month
    for (let i = 1; i <= 28; i++) {
      dates.push(
        <span 
          key={i}
          className={`date-span text-center p-2 rounded-full border border-white cursor-pointer ${
            selectedDate === i ? 'bg-blue-900' : ''
          }`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </span>
      );
    }
    return dates;
  };

  return (
    <div className="bg-[#1A2A5D] text-white font-sans p-4">
      <header className="flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold">Elevate</h1>
      </header>

      <div className="mt-4">
        <div className="flex justify-between">
          <span className="text-xl">2025</span>
          <span className="text-xl">February</span>
        </div>

        <div className="grid grid-cols-7 mt-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <span key={day} className="text-center">{day}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 mt-2 gap-1">
          {renderDates()}
        </div>

        {selectedDate === 17 && (
          <div id="eventDetails17" className="mt-6 bg-blue-900 p-4 rounded-lg flex items-center gap-4">
            <span className="bg-blue-600 p-2 rounded-full">17</span>
            <div>
              <p className="font-bold">Ryan's Chess Lesson</p>
              <p>7:00 - 8:00 pm</p>
            </div>
          </div>
        )}

        {selectedDate === 19 && (
          <div id="eventDetails19" className="mt-6 bg-blue-900 p-4 rounded-lg">
            <span className="bg-blue-600 p-2 rounded-full">19</span>
            <div>
              <p className="font-bold">Sally's Class Performance</p>
              <p>10:00 - 11:00 am</p>
            </div>
            <div className="mt-4">
              <p className="font-bold">Ryan's Soccer Practice</p>
              <p>3:00 - 4:30 pm</p>
            </div>
          </div>
        )}

        <nav className="fixed bottom-0 left-0 w-full bg-blue-900 p-3 flex justify-around">
          <a href="/">🏠</a>
          <a href="/forum">👥</a>
          <a href="/calendar">🗓️</a>
          <a href="/video">🎥</a>
          <a href="/settings">⚙️</a>
        </nav>
      </div>
    </div>
  );
}