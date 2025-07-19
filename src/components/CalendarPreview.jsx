// src/components/CalendarPreview.jsx
import React, { useContext } from 'react';
import { RecurringContext } from '../context/RecurringContext';
import { calculateRecurringDates } from '../utils/calculateRecurringDates';
import './CalendarPreview.css';

const CalendarPreview = () => {
  const { frequency, startDate, endDate } = useContext(RecurringContext);

  if (!startDate || !endDate || !frequency) return null;

  const recurringDates = calculateRecurringDates(startDate, endDate, frequency);
  const dateSet = new Set(recurringDates); // For quick lookup

  const months = [];
  const current = new Date(startDate);

  current.setDate(1); // Move to start of month
  const end = new Date(endDate);

  while (current <= end) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }

  const generateMonth = (monthStart) => {
    const year = monthStart.getFullYear();
    const month = monthStart.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const weeks = [];
    let currentDay = 1 - firstDay;

    while (currentDay <= daysInMonth) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        const dayDate = new Date(year, month, currentDay);
        const dateString = dayDate.toISOString().split('T')[0];

        if (currentDay < 1 || currentDay > daysInMonth) {
          week.push(<td key={i}></td>);
        } else {
          const isRecurring = dateSet.has(dateString);
          week.push(
            <td key={i} className={isRecurring ? 'highlight' : ''}>
              {currentDay}
            </td>
          );
        }

        currentDay++;
      }

      weeks.push(<tr key={currentDay}>{week}</tr>);
    }

    return (
      <div className="calendar-month" key={monthStart.toISOString()}>
        <h4>{monthStart.toLocaleString('default', { month: 'long' })} {year}</h4>
        <table>
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <th key={d}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="calendar-scroll-container">
      {months.map(generateMonth)}
    </div>
  );
};

export default CalendarPreview;
