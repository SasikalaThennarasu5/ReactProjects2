import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (!updated) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <h2>Event Countdown Timer</h2>
      {timeLeft ? (
        <div className="time-grid">
          <div><span>{timeLeft.days}</span>Days</div>
          <div><span>{timeLeft.hours}</span>Hours</div>
          <div><span>{timeLeft.minutes}</span>Minutes</div>
          <div><span>{timeLeft.seconds}</span>Seconds</div>
        </div>
      ) : (
        <h3 className="event-started">🎉 The event has started!</h3>
      )}
    </div>
  );
};

export default CountdownTimer;
