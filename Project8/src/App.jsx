import React from 'react';
import CountdownTimer from './components/CountdownTimer';

const App = () => {
  // Set your event date here
  const eventDate = '2025-07-01T00:00:00';

  return <CountdownTimer targetDate={eventDate} />;
};

export default App;
