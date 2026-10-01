import { useCallback, useEffect, useRef, useState } from 'react';

const images = [
  { id: 1, src: '/images/venue-1.jpg', alt: 'El Castillo de Bran, Rumania', fallback: 'from-champagne-200 to-sage-200' },
  { id: 2, src: '/images/image1.jpg', alt: 'Nuestra primera foto juntos', fallback: 'from-sage-200 to-champagne-100' },
  { id: 3, src: '/images/oporto.jpg', alt: 'Oporto, Portugal', fallback: 'from-champagne-100 to-sage-200' },
  { id: 4, src: '/images/pais_vasco1.jpg', alt: 'País Vasco, España', fallback: 'from-champagne-200 to-sage-100' },
  { id: 10, src: '/images/san_juan.jpeg', alt: 'San Juan de Gaztelugatxe, España', fallback: 'from-champagne-200 to-sage-100' },
  { id: 5, src: '/images/london.jpg', alt: 'Londres, Inglaterra', fallback: 'from-champagne-200 to-sage-100' },
  { id: 6, src: '/images/rubielos.jpg', alt: 'Rubielos de Mora, España', fallback: 'from-champagne-200 to-sage-100' },
  { id: 8, src: '/images/rome.jpg', alt: 'Roma, Italia', fallback: 'from-champagne-200 to-sage-100' },
  { id: 9, src: '/images/toledo.jpeg', alt: 'Toledo, España', fallback: 'from-champagne-200 to-sage-100' },
  { id: 11, src: '/images/moli.jpeg', alt: 'Moli l\'Abad, España', fallback: 'from-champagne-200 to-sage-100' },
  { id: 7, src: '/images/asturias.jpg', alt: 'Asturias, España', fallback: 'from-champagne-200 to-sage-100' },
  { id: 12, src: '/images/reveal.jpeg', alt: '¡Nos casamos!', fallback: 'from-champagne-200 to-sage-100' },
  { id: 13, src: '/images/romania1.jpg', alt: 'Rumania', fallback: 'from-champagne-200 to-sage-100' },
];

// Inclinación de cada polaroid, como si estuvieran esparcidas sobre una mesa
const TILTS = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.2, -2.2, 2, -1, 1.6, -2.6, 1.4, -1.5];
const SWIPE_THRESHOLD = 50;

const WeddingGallery = () => {
  const [imageError, setImageError] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const touchStartX = useRef(null);

  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  const handleImageError = (id) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  const close = useCallback(() => setSelectedIndex(null), []);
  const showPrev = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  }, []);
  const showNext = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % images.length);
  }, []);

  const isLightboxOpen = selectedIndex !== null;

  useEffect(() => {
    if (!isLightboxOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, close, showPrev, showNext]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX > SWIPE_THRESHOLD) showPrev();
    else if (deltaX < -SWIPE_THRESHOLD) showNext();
  };

  const stop = (handler) => (e) => {
    e.stopPropagation();
    handler();
  };

  return (
    <section className="w-full max-w-2xl mx-auto section-card overflow-hidden">
      <h3 className="section-title">Nuestras Fotos</h3>

      {/* Polaroids */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8 pt-3 pb-2 px-1">
        {images.map((image, index) => {
          const hasError = imageError[image.id];

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="polaroid w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)]"
              style={{ '--tilt': `${TILTS[index % TILTS.length]}deg`, '--delay': `${index * 70}ms` }}
              aria-label={`Ver foto: ${image.alt}`}
            >
              <span className="polaroid__photo block">
                {hasError ? (
                  <span className={`w-full h-full bg-gradient-to-r ${image.fallback} flex items-center justify-center p-2`}>
                    <span className="font-handwriting text-lg text-sage-700">{image.alt}</span>
                  </span>
                ) : (
                  <img
                    src={image.src}
                    alt=""
                    onError={() => handleImageError(image.id)}
                    loading="lazy"
                  />
                )}
              </span>
              <span className="polaroid__caption">{image.alt}</span>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:px-20 animate-fade-in"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={stop(close)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Cerrar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={stop(showPrev)}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 transition-colors p-2 md:p-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Foto anterior"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <figure
            key={selectedImage.id}
            className="lightbox-polaroid animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
            />
            <figcaption>{selectedImage.alt}</figcaption>
          </figure>

          <button
            type="button"
            onClick={stop(showNext)}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 transition-colors p-2 md:p-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Foto siguiente"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <p className="absolute bottom-4 left-0 right-0 text-center font-sans text-xs tracking-[0.3em] text-white/70" aria-live="polite">
            {selectedIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
};

export default WeddingGallery;
