import React, { useState, useRef, useEffect } from 'react';
import CalendarPreview from './CalendarPreview';
import './RecurringDatePicker.css';

const RecurringDatePicker = () => {
  const [frequency, setFrequency] = useState('Daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showMore, setShowMore] = useState(false);

   const datesContainerRef = useRef(null);

   useEffect(() => {
  if (!datesContainerRef.current) return;

  if (showMore) {
    setTimeout(() => {
      datesContainerRef.current.scrollTo({
        top: datesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 100); // delay to allow layout reflow
  } else {
    datesContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }
}, [showMore]);



  // "dates" is for previewing the raw list
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
            <option value="Yearly">Yearly</option>
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
        <div className={`recurring-dates ${showMore ? 'show-more' : ''}`}ref={datesContainerRef}>
          {recurringDates.map((date, index) => {
            const [year, month, day] = date.split('-');
            return <span key={index}>{`${day}/${month}/${year}`}</span>;
          })}
        </div>
        {recurringDates.length > 10 && (
          <button className="show-more-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
        <CalendarPreview
          startDate={startDate}
          endDate={endDate}
          frequency={frequency}
        />
      </div>
    </div>
  );
};

export default RecurringDatePicker;
