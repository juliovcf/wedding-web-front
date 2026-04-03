import { useState } from 'react';

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
  const [imageError, setImageError] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageError = (id) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-4 md:p-6 my-8 overflow-hidden border border-wine-300 border-t-4 border-t-wine-600">
      <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-4 tracking-wide">
        Nuestras Fotos
      </h3>

      {/* Collage Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {images.map((image, index) => {
          const hasError = imageError[image.id];
          // Make some images span 2 columns for visual variety
          const isWide = index === 0 || index === 5;

          return (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`relative overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-wine-400 focus:ring-offset-2 h-44 md:h-52 ${
                isWide ? 'col-span-2' : ''
              }`}
            >
              {hasError ? (
                <div
                  className={`w-full h-full bg-gradient-to-r ${image.fallback} flex items-center justify-center`}
                >
                  <span className="font-handwriting text-lg text-sage-700">{image.alt}</span>
                </div>
              ) : (
                <>
                  <img
                    src={image.src}
                    alt={image.alt}
                    onError={() => handleImageError(image.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="font-serif text-sm text-white drop-shadow-md">
                      {image.alt}
                    </span>
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-label={selectedImage.alt}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2"
            aria-label="Cerrar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-center font-serif text-sm text-white/90 mt-3">
              {selectedImage.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default WeddingGallery;
