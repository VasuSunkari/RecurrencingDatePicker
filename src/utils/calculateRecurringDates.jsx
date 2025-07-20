// src/utils/calculateRecurringDates.js
export const calculateRecurringDates = (startDate, endDate, frequency) => {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(new Date(current).toISOString().split('T')[0]); // YYYY-MM-DD
    if (frequency === 'daily') {
      current.setDate(current.getDate() + 1);
    } else if (frequency === 'weekly') {
      current.setDate(current.getDate() + 7);
    } else if (frequency === 'monthly') {
      current.setMonth(current.getMonth() + 1);
    } else {
      break;
    }
  }

  return dates;
};