import React from 'react';
import './CalendarPreview.css';

// Recurring dates calculation from RecurringDatePicker
const generateRecurringDates = (startDate, endDate, frequency) => {
  const dates = [];
  if (!startDate || !endDate) return dates;
  let current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    dates.push(current.toLocaleDateString('en-CA'));
    if (frequency === 'Daily') {
      current.setDate(current.getDate() + 1);
    } else if (frequency === 'Weekly') {
      current.setDate(current.getDate() + 7);
    } else if (frequency === 'Monthly') {
      current.setMonth(current.getMonth() + 1);
    } else if (frequency === 'Yearly') {
      current.setFullYear(current.getFullYear() + 1);
    }
  }
  return dates;
};

const CalendarPreview = ({ startDate, endDate, frequency }) => {
  if (!startDate || !endDate || !frequency) return <div>Please select all fields to view the calendar.</div>;

  const dates = generateRecurringDates(startDate, endDate, frequency);
  if (!dates.length) return <div>No dates to show (select a valid range and frequency).</div>;

  const dateSet = new Set(dates);

  // Get start & end year/month
  const [startYear, startMonth] = dates[0].split('-').map(Number);
  const [endYear, endMonth] = dates[dates.length - 1].split('-').map(Number);

  // Make array of all first-of-month Date objects in range
  const months = [];
  let year = startYear, month = startMonth - 1;
  while (year < endYear || (year === endYear && month <= endMonth - 1)) {
    months.push(new Date(year, month, 1));
    if (month === 11) { year++; month = 0; }
    else { month++; }
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
        const dateString = dayDate.toLocaleDateString('en-CA');
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
