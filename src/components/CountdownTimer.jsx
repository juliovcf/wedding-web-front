import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ weddingDate = "2026-11-21T12:00:00" }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(weddingDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <div key={interval} className="flex flex-col items-center p-2 md:p-4">
        <div className="text-2xl md:text-3xl lg:text-4xl font-serif text-champagne-800">
          {timeLeft[interval]}
        </div>
        <div className="text-xs md:text-sm uppercase tracking-wide text-champagne-600">
          {interval}
        </div>
      </div>
    );
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-4 my-8 border border-champagne-100">
      <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-4">Cuenta atrás para nuestro gran día</h3>
      <div className="flex justify-center space-x-2 md:space-x-6">
        {timerComponents.length ? timerComponents : <span className="text-xl font-serif text-blush-600">¡Hoy es el gran día!</span>}
      </div>
    </div>
  );
};

export default CountdownTimer;