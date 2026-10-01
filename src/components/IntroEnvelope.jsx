import { useEffect, useRef, useState } from 'react';
import Envelope, { ENVELOPE_OPEN_MS, prefersReducedMotion } from './Envelope';

const LEAVE_MS = 900;

/**
 * Sobre de bienvenida a pantalla completa. Al abrirlo (con o sin música)
 * la carta sale del sobre y la pantalla se desvanece mostrando la web.
 * onOpen(withMusic) se llama dentro del clic para que el navegador permita el audio.
 */
const IntroEnvelope = ({ onOpen, onFinish }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const pending = timers.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      pending.forEach(clearTimeout);
    };
  }, []);

  const open = (withMusic) => {
    if (isOpen) return;
    onOpen(withMusic);
    setIsOpen(true);

    const reduced = prefersReducedMotion();
    const openMs = reduced ? 300 : ENVELOPE_OPEN_MS + 200;
    const leaveMs = reduced ? 0 : LEAVE_MS;
    timers.current.push(
      setTimeout(() => setIsLeaving(true), openMs),
      setTimeout(onFinish, openMs + leaveMs)
    );
  };

  return (
    <div
      className={`intro-overlay ${isLeaving ? 'is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Invitación de boda de Cristina y Julio"
    >
      <div className="intro-overlay__content">
        <Envelope
          className="intro-envelope"
          isOpen={isOpen}
          onOpen={() => open(true)}
          openLabel="Abrir la invitación con música"
          above={
            <p className="font-handwriting text-3xl md:text-4xl text-sage-700">
              Tienes una invitación
            </p>
          }
          front={
            <>
              <span className="envelope__front-title" style={{ fontSize: '7.5cqw' }}>
                Cristina &amp; Julio
              </span>
              <span className="envelope__front-sub">21 · 11 · 2026</span>
            </>
          }
        >
          <div
            className="intro-letter__logo"
            style={{ backgroundImage: 'url(/images/logo.png)' }}
            aria-hidden="true"
          />
          <p className="intro-letter__title">¡Nos casamos!</p>
          <p className="intro-letter__names">Cristina &amp; Julio</p>
          <p className="intro-letter__date">21 · 11 · 2026</p>
        </Envelope>

        <div className={`intro-actions ${isOpen ? 'is-hidden' : ''}`}>
          <button
            type="button"
            autoFocus
            onClick={() => open(true)}
            className="inline-flex items-center gap-2 bg-wine-700 text-white px-7 py-3 rounded-full font-sans font-medium tracking-wide shadow-md hover:bg-wine-800 hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-wine-400 focus-visible:ring-offset-2 focus-visible:ring-offset-champagne-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            Abrir con música
          </button>
          <button
            type="button"
            onClick={() => open(false)}
            className="text-sm font-sans text-sage-600 underline underline-offset-4 decoration-sage-300 hover:text-sage-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wine-400 rounded px-2 py-1"
          >
            Abrir sin música
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroEnvelope;
