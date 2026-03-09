import { useCallback, useEffect, useRef, useState } from 'react';

const images = [
  { id: 1, src: '/images/venue-1.jpg', alt: 'El Castillo de Bran', fallback: 'from-champagne-200 to-sage-200' },
  { id: 2, src: '/images/image1.jpg', alt: 'Nuestra primera foto juntos', fallback: 'from-sage-200 to-champagne-100' },
  { id: 3, src: '/images/oporto.jpg', alt: 'Oporto, Portugal', fallback: 'from-champagne-100 to-sage-200' },
  { id: 4, src: '/images/pais_vasco1.jpg', alt: 'Pais Vasco, Espana', fallback: 'from-champagne-200 to-sage-100' },
  { id: 5, src: '/images/london.jpg', alt: 'Londres, Inglaterra', fallback: 'from-champagne-200 to-sage-100' },
  { id: 6, src: '/images/rubielos.jpg', alt: 'Rubielos de Mora, Espana', fallback: 'from-champagne-200 to-sage-100' },
  { id: 7, src: '/images/asturias.jpg', alt: 'Asturias, Espana', fallback: 'from-champagne-200 to-sage-100' },
  { id: 8, src: '/images/rome.jpg', alt: 'Roma, Italia', fallback: 'from-champagne-200 to-sage-100' },
  { id: 9, src: '/images/wedding3.jpg', alt: 'Boda Paula & Pau', fallback: 'from-champagne-200 to-sage-100' },
  { id: 10, src: '/images/wedding2.jpg', alt: 'Boda Oscar & Ana', fallback: 'from-champagne-200 to-sage-100' },
];

const WeddingGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageError, setImageError] = useState({});
  const [isFading, setIsFading] = useState(false);
  const touchStartX = useRef(null);
  const galleryRef = useRef(null);

  const goTo = useCallback(
    (next) => {
      if (isFading) return;
      setIsFading(true);
      setTimeout(() => {
        setCurrentImage(next);
        setIsFading(false);
      }, 250);
    },
    [isFading]
  );

  const nextImage = useCallback(() => {
    goTo(currentImage === images.length - 1 ? 0 : currentImage + 1);
  }, [currentImage, goTo]);

  const prevImage = useCallback(() => {
    goTo(currentImage === 0 ? images.length - 1 : currentImage - 1);
  }, [currentImage, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    const ref = galleryRef.current;
    ref?.addEventListener('keydown', handleKey);
    return () => ref?.removeEventListener('keydown', handleKey);
  }, [nextImage, prevImage]);

  // Touch / swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextImage() : prevImage();
    }
    touchStartX.current = null;
  };

  const handleImageError = (id) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  // Preload next image
  useEffect(() => {
    const nextIdx = currentImage === images.length - 1 ? 0 : currentImage + 1;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = images[nextIdx].src;
  }, [currentImage]);

  const current = images[currentImage];
  const hasError = imageError[current.id];

  return (
    <section className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-4 md:p-6 my-8 overflow-hidden border border-wine-300 border-t-4 border-t-wine-600">
      <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-4 tracking-wide">
        Nuestras Fotos
      </h3>

      <div
        ref={galleryRef}
        className="relative select-none"
        tabIndex={0}
        role="region"
        aria-roledescription="carrusel"
        aria-label={`Galeria de fotos, imagen ${currentImage + 1} de ${images.length}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image */}
        <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden">
          {hasError ? (
            <div
              className={`w-full h-full bg-gradient-to-r ${current.fallback} flex items-center justify-center`}
            >
              <span className="font-handwriting text-xl text-sage-700">{current.alt}</span>
            </div>
          ) : (
            <img
              src={current.src}
              alt={current.alt}
              onError={() => handleImageError(current.id)}
              className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                isFading ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-wine-600 text-white rounded-full p-2 hover:bg-wine-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-wine-400"
          aria-label="Foto anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-wine-600 text-white rounded-full p-2 hover:bg-wine-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-wine-400"
          aria-label="Siguiente foto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center mt-4 gap-1.5" role="tablist" aria-label="Seleccionar imagen">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wine-400 ${
              currentImage === index ? 'bg-wine-600 w-6' : 'bg-wine-200 w-2 hover:bg-wine-300'
            }`}
            role="tab"
            aria-selected={currentImage === index}
            aria-label={`Ver imagen ${index + 1}: ${images[index].alt}`}
          />
        ))}
      </div>

      {/* Caption */}
      <p className="text-center font-serif text-sm text-sage-600 mt-3" aria-live="polite">
        {current.alt}
      </p>
    </section>
  );
};

export default WeddingGallery;
