import { useEffect, useRef, useState } from 'react';
import Envelope, { ENVELOPE_OPEN_MS, prefersReducedMotion } from './Envelope';

const IBAN = 'ES5601825319750202327727';
const IBAN_DISPLAY = IBAN.replace(/(.{4})/g, '$1 ').trim();

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};

const GiftEnvelope = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wasOpened, setWasOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const animationTimer = useRef(null);
  const copiedTimer = useRef(null);

  useEffect(() => () => {
    clearTimeout(animationTimer.current);
    clearTimeout(copiedTimer.current);
  }, []);

  const toggleEnvelope = () => {
    if (isAnimating) return;
    setIsOpen((open) => !open);
    setWasOpened(true);
    setIsAnimating(true);
    animationTimer.current = setTimeout(
      () => setIsAnimating(false),
      prefersReducedMotion() ? 0 : ENVELOPE_OPEN_MS
    );
  };

  const copyIBAN = async () => {
    await copyToClipboard(IBAN);
    setIsCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <Envelope
        isOpen={isOpen}
        wasOpened={wasOpened}
        onOpen={toggleEnvelope}
        openLabel="Abrir el sobre con la información bancaria"
      >
        <p className="gift-letter__title">Cristina y Julio</p>
        <p className="gift-letter__label">IBAN</p>
        <p className="gift-letter__iban">{IBAN_DISPLAY}</p>
        <button
          type="button"
          onClick={copyIBAN}
          className={`gift-letter__copy ${isCopied ? 'is-copied' : ''}`}
        >
          {isCopied ? (
            <svg className="w-[1.1em] h-[1.1em]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-[1.1em] h-[1.1em]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
          {isCopied ? '¡Copiado!' : 'Copiar IBAN'}
        </button>
        <span className="sr-only" aria-live="polite">
          {isCopied ? 'IBAN copiado al portapapeles' : ''}
        </span>
      </Envelope>

      <button
        type="button"
        onClick={toggleEnvelope}
        disabled={isAnimating}
        aria-expanded={isOpen}
        className="mt-5 text-sm font-sans italic text-sage-600 hover:text-wine-700 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine-400 rounded px-2 py-1"
      >
        {isOpen ? 'Cerrar el sobre' : 'Toca el sobre para abrirlo'}
      </button>
    </div>
  );
};

export default GiftEnvelope;
