// Duración total de la animación de apertura (debe cuadrar con index.css: la carta termina a 0.9s + 1.3s)
export const ENVELOPE_OPEN_MS = 2200;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Sobre con solapa 3D, sello de lacre y carta que sale al abrirlo.
 * - children: contenido de la carta
 * - front: contenido escrito en la cara frontal del sobre
 * - above: contenido sobre el sobre cerrado (se desvanece al abrir)
 */
const Envelope = ({
  isOpen,
  wasOpened,
  onOpen,
  openLabel,
  front,
  above,
  className = '',
  children,
}) => {
  const stageClasses = [
    'envelope-stage',
    isOpen && 'is-open',
    wasOpened && 'was-opened',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={stageClasses}>
      {above && <div className="envelope-stage__above">{above}</div>}

      <div className="envelope">
        <div className="envelope__back" aria-hidden="true" />

        <div
          className="envelope__letter"
          aria-hidden={!isOpen}
          inert={isOpen ? undefined : ''}
        >
          <div className="envelope__letter-inner">{children}</div>
        </div>

        <div className="envelope__front" aria-hidden="true">
          <div className="envelope__pocket">
            <svg className="envelope__folds" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 Q28 76 46 58" />
              <path d="M100 100 Q72 76 54 58" />
            </svg>
            {front && <div className="envelope__front-content">{front}</div>}
          </div>
        </div>

        <div className="envelope__flap-shadow" aria-hidden="true"><div /></div>

        <div className="envelope__flap" aria-hidden="true">
          <div className="envelope__flap-face envelope__flap-face--out" />
          <div className="envelope__flap-face envelope__flap-face--in" />
        </div>

        <div className="envelope__seal" aria-hidden="true">
          <span className="envelope__seal-half envelope__seal-half--l">C&amp;J</span>
          <span className="envelope__seal-half envelope__seal-half--r">C&amp;J</span>
        </div>

        {!isOpen && onOpen && (
          <button
            type="button"
            className="envelope__hit"
            onClick={onOpen}
            aria-label={openLabel}
          />
        )}
      </div>
    </div>
  );
};

export default Envelope;
