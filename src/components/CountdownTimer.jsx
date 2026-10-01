import { useEffect, useState } from 'react';
import { WEDDING_DATE } from '../config';

const LABELS = {
  days: 'Días',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
};

const CountdownTimer = ({ weddingDate = WEDDING_DATE }) => {
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
      className="w-full max-w-2xl mx-auto section-card"
      role="timer"
      aria-label="Cuenta atrás para la boda"
    >
      <h3 className="section-title">Cuenta atrás para nuestro gran día</h3>

      {isOver ? (
        <p className="text-xl font-serif text-sage-700 text-center" aria-live="polite">
          ¡Hoy es el gran día!
        </p>
      ) : (
        <div className="flex justify-center gap-2.5 md:gap-5">
          {entries.map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <div className="countdown-card">
                {/* key={value}: se vuelve a montar al cambiar y repite el giro */}
                <span key={value} className="countdown-card__value">
                  {String(value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-sage-500 mt-2.5 font-sans font-medium">
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
