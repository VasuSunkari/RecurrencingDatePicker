import React, { useState } from 'react';
import '../components/RecurringDatePicker.css';

const generateRecurringDates = (startDate, endDate, frequency) => {
  const dates = [];
  if (!startDate || !endDate) return dates;

  let current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(current.toISOString().split('T')[0]);

    if (frequency === 'Daily') {
      current.setDate(current.getDate() + 1);
    } else if (frequency === 'Weekly') {
      current.setDate(current.getDate() + 7);
    } else if (frequency === 'Monthly') {
      current.setMonth(current.getMonth() + 1);
    }
  }

  return dates;
};

const CalendarPreview = ({ dates }) => {
  const [monthOffset, setMonthOffset] = useState(0);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const generateCalendar = () => {
    const today = new Date();
    const displayMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);

    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = new Date(year, month, d).toISOString().split('T')[0];
      calendarDays.push({ day: d, marked: dates.includes(dateStr) });
    }

    return { calendarDays, month, year };
  };

  const { calendarDays, month, year } = generateCalendar();
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  return (
    <div className="calendar-preview">
      <div className="calendar-header">
        <button onClick={() => setMonthOffset((prev) => prev - 1)}>&lt;</button>
        <span>{monthName} {year}</span>
        <button onClick={() => setMonthOffset((prev) => prev + 1)}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="calendar-day-name">{d}</div>
        ))}
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className={`calendar-day ${day?.marked ? 'marked' : ''}`}
          >
            {day?.day || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

const RecurringDatePicker = () => {
  const [frequency, setFrequency] = useState('Daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showMore, setShowMore] = useState(false);

  const recurringDates = generateRecurringDates(startDate, endDate, frequency);

  return (
    <div className="recurring-date-picker">
      <div className="left-section">
        <h1>Recurring Date Picker</h1>
        <label>
          Select Frequency:
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </label>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>

      <div className="right-section">
        <h2>Preview</h2>
        <div className="preview-info">
          <span><strong>Frequency:</strong> {frequency}</span>
          <span><strong>From:</strong> {startDate}</span>
          <span><strong>To:</strong> {endDate}</span>
        </div>

        <div className={`recurring-dates ${showMore ? 'show-more' : ''}`}>
          {recurringDates.map((date, index) => {
          const [year, month, day] = date.split('-');
          return <span key={index}>{`${day}/${month} /${year}`}</span>;
        })}
        </div>


        {recurringDates.length > 10 && (
          <button className="show-more-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}

        <CalendarPreview dates={recurringDates} />
      </div>
    </div>
  );
};

export default RecurringDatePicker;
