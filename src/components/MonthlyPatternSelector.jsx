import React, { useContext } from 'react';
import { RecurringContext } from '../context/RecurringContext';

const MonthlyPatternSelector = () => {
  const { monthPattern, setMonthPattern } = useContext(RecurringContext);

  return (
    <div className="section">
      <label>
        Monthly Pattern:
        <select
          value={monthPattern}
          onChange={(e) => setMonthPattern(e.target.value)}
        >
          <option value="first">First Day</option>
          <option value="last">Last Day</option>
          <option value="custom">Custom Day</option>
        </select>
      </label>
    </div>
  );
};

export default MonthlyPatternSelector;