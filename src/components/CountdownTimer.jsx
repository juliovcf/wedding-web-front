import { useEffect, useState } from 'react';

const LABELS = {
  days: 'Dias',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
};

const CountdownTimer = ({ weddingDate = '2026-11-21T12:00:00' }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(weddingDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  const entries = Object.entries(timeLeft);
  const isOver = entries.length === 0;

  return (
    <div
      className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-6 my-8 border border-wine-300 border-t-4 border-t-wine-600"
      role="timer"
      aria-label="Cuenta atrás para la boda"
    >
      <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-6 tracking-wide text-balance">
        Cuenta atrás para nuestro gran día
      </h3>

      {isOver ? (
        <p className="text-xl font-serif text-sage-700 text-center" aria-live="polite">
          Hoy es el gran día!
        </p>
      ) : (
        <div className="flex justify-center gap-3 md:gap-6">
          {entries.map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-center min-w-[60px] md:min-w-[80px] bg-champagne-50 rounded-lg p-3 md:p-4"
            >
              <span
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-sage-800 tabular-nums leading-none"
                aria-label={`${value} ${LABELS[key]}`}
              >
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-wider text-sage-500 mt-2 font-sans font-medium">
                {LABELS[key]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function calculateTimeLeft(weddingDate) {
  const difference = new Date(weddingDate) - new Date();
  if (difference <= 0) return {};
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default CountdownTimer;
