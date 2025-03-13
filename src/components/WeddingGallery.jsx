import React, { useState } from 'react';

// Componente para cargar y mostrar imágenes
const WeddingGallery = () => {
  // Aquí definimos las imágenes
  // Para usar tus propias imágenes:
  // 1. Crea una carpeta 'images' dentro de la carpeta 'public'
  // 2. Coloca tus imágenes en esa carpeta
  // 3. Reemplaza las rutas aquí abajo con las rutas a tus imágenes
  const images = [
    { 
      id: 1, 
      src: '/images/venue-1.jpg', 
      alt: 'El Castillo de Bran',
      // Gradient como respaldo en caso de error de carga
      fallbackGradient: 'from-blush-200 to-champagne-200'  
    },
    { 
      id: 2, 
      src: '/images/venue-1.jpg', 
      alt: 'La Masia de les Casotes',
      fallbackGradient: 'from-sage-200 to-champagne-100' 
    },
    { 
      id: 3, 
      src: '/images/couple-2.jpg', 
      alt: 'Nuestra propuesta',
      fallbackGradient: 'from-blush-100 to-navy-100' 
    },
    { 
      id: 4, 
      src: '/images/venue-2.jpg', 
      alt: 'Jardines de la Masia',
      fallbackGradient: 'from-champagne-200 to-sage-100' 
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => {
      const next = prev === images.length - 1 ? 0 : prev + 1;
      setImageError(false);
      return next;
    });
  };

  const prevImage = () => {
    setCurrentImage((prev) => {
      const previous = prev === 0 ? images.length - 1 : prev - 1;
      setImageError(false);
      return previous;
    });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-4 my-8 overflow-hidden">
      <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-4 tracking-wide">Nuestras Fotos</h3>
      
      <div className="relative">
        {/* Mostrar imagen o gradiente de respaldo si hay error */}
        {imageError ? (
          <div className={`w-full h-64 md:h-80 bg-gradient-to-r ${images[currentImage].fallbackGradient} rounded-lg flex items-center justify-center`}>
            <span className="font-handwriting text-xl text-navy-700">
              {images[currentImage].alt}
            </span>
          </div>
        ) : (
          <div className="w-full h-90 md:h-80 rounded-lg overflow-hidden">
            <img 
              src={images[currentImage].src} 
              alt={images[currentImage].alt}
              onError={handleImageError}
              className="w-full h-full object-cover transition-opacity duration-500 rounded-lg"
            />
          </div>
        )}
        
        <button 
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Indicadores de imágenes */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImage(index);
              setImageError(false);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentImage === index 
                ? 'bg-sage-600 w-4' // Más ancho para el actual
                : 'bg-sage-200'
            }`}
            aria-label={`Ver imagen ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Texto descriptivo de la imagen */}
      <p className="text-center font-serif text-sm text-sage-600 mt-3">
        {images[currentImage].alt}
      </p>
    </div>
  );
};

export default WeddingGallery;