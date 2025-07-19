import React, { useContext } from 'react';
import { RecurringContext } from '../context/RecurringContext';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeeklySelector = () => {
  const { selectedDays, setSelectedDays } = useContext(RecurringContext);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="weekly-selector">
      {days.map((day) => (
        <button
          key={day}
          className={selectedDays.includes(day) ? 'selected' : ''}
          onClick={() => toggleDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default WeeklySelector;