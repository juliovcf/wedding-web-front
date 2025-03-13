import React, { useState } from 'react';

const WeddingGallery = () => {
  // Placeholder for images - in a real app, you'd import actual images
  const images = [
    { id: 1, src: '/src/assets/gallery/couple-1.jpg', alt: 'Couple Photo 1' },
    { id: 2, src: '/src/assets/gallery/venue-1.jpg', alt: 'Venue Photo 1' },
    { id: 3, src: '/src/assets/gallery/couple-2.jpg', alt: 'Couple Photo 2' },
    { id: 4, src: '/src/assets/gallery/venue-2.jpg', alt: 'Venue Photo 2' },
  ];

  const placeholders = [
    { id: 1, gradient: 'from-blush-200 to-champagne-200', alt: 'Nosotros en la playa' },
    { id: 2, gradient: 'from-sage-200 to-champagne-100', alt: 'La Masia de les Casotes' },
    { id: 3, gradient: 'from-blush-100 to-navy-100', alt: 'Nuestra propuesta' },
    { id: 4, gradient: 'from-champagne-200 to-sage-100', alt: 'Jardines de la Masia' },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === placeholders.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? placeholders.length - 1 : prev - 1));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-4 my-8 overflow-hidden">
      <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-4">Nuestras Fotos</h3>
      
      <div className="relative">
        {/* Using gradient backgrounds as placeholders */}
        <div className={`w-full h-64 md:h-80 bg-gradient-to-r ${placeholders[currentImage].gradient} rounded-lg flex items-center justify-center`}>
          <span className="font-handwriting text-xl text-navy-700">
            {placeholders[currentImage].alt}
          </span>
        </div>
        
        <button 
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        {placeholders.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full ${
              currentImage === index ? 'bg-sage-600' : 'bg-sage-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WeddingGallery;