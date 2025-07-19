// src/components/Preview.jsx
import React, { useContext } from 'react';
import { RecurringContext } from '../context/RecurringContext';
import { calculateRecurringDates } from '../utils/calculateRecurringDates';
import './Preview.css'; // Make sure the CSS is applied

const Preview = () => {
  const { frequency, startDate, endDate } = useContext(RecurringContext);

  if (!startDate || !endDate || !frequency) return null;

  const recurringDates = calculateRecurringDates(startDate, endDate, frequency);

  return (
    <div className="preview-container">
      <h3 className="preview-title">Preview</h3>
      <p><strong>Frequency:</strong> {frequency}</p>
      <p><strong>From:</strong> {startDate} <strong>To:</strong> {endDate}</p>

      <h4 className="preview-subtitle">Recurring Dates:</h4>
      <ul className="recurring-dates">
        {recurringDates.map((date, index) => (
          <li key={index} className="date-chip">{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Preview;
