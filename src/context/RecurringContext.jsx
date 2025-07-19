import React, { createContext, useState } from 'react';

export const RecurringContext = createContext();

export const RecurringProvider = ({ children }) => {
  const [frequency, setFrequency] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <RecurringContext.Provider value={{
      frequency,
      setFrequency,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
    }}>
      {children}
    </RecurringContext.Provider>
  );
};
