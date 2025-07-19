import React from 'react';
import './App.css';
import { RecurringProvider } from './context/RecurringContext'; 
import Preview from './components/Preview';
import CalendarPreview from './components/CalendarPreview';
import RecurringDatePicker from './components/RecurringDatePicker';

const App = () => {
  return (
    <RecurringProvider>
      <div className="app-container">
        <h1>PearlThoughts Frontend Assessment</h1>
        <RecurringDatePicker/>
        <Preview />
        <CalendarPreview />
      </div>
    </RecurringProvider>
  );
};

export default App;
