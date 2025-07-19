import React, { useContext } from 'react';
import { RecurringContext } from '../context/RecurringContext';
import WeeklySelector from './WeeklySelector';
import MonthlyPatternSelector from './MonthlyPatternSelector';

const RecurrenceOptions = () => {
  const { frequency, setFrequency } = useContext(RecurringContext);

  return (
    <div className="section">
      <label htmlFor="frequency">Recurrence:</label>
      <select
        id="frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      {frequency === 'weekly' && <WeeklySelector />}
      {frequency === 'monthly' && <MonthlyPatternSelector />}
    </div>
  );
};

export default RecurrenceOptions;