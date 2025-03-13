import React from 'react';

const VenueInfo = () => {
  // Coordenadas de la Masia de les Casotes (reemplaza con las coordenadas correctas)
  const latitude = 39.9647; // Ejemplo - reemplaza con las coordenadas reales
  const longitude = -0.2636; // Ejemplo - reemplaza con las coordenadas reales
  
  // URL de Google Maps para insertar un iframe
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Masia+de+les+Casotes,Onda+Castellón&center=${latitude},${longitude}&zoom=15`;
  
  // URL para abrir Google Maps con direcciones
  const getDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=ChIJjw3e2Oz_XA0R5sN3hX3tEm4`;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-6 my-8 border border-champagne-100">
      <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-4 tracking-wide">Lugar de Celebración</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {/* Opción 1: Iframe de Google Maps (necesita API key) */}
          {/* 
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-sm">
            <iframe 
              title="Ubicación de la boda"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }} 
              src={googleMapsUrl} 
              allowFullScreen
            ></iframe>
          </div>
          */}

          {/* Opción 2: Imagen estática de mapa con enlace */}
          <a 
            href={getDirectionsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full h-48 rounded-lg overflow-hidden shadow-sm relative group"
          >
            {/* Imagen estática del mapa (reemplaza la URL con una captura real del mapa) */}
            <div className="w-full h-full bg-gradient-to-r from-sage-100 to-sage-200 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-subtle-pattern bg-[length:50px_50px]"></div>
              </div>
              <img 
                src="/images/masia-map.jpg" 
                alt="Mapa de la Masia de les Casotes" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-sage-700/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">Abrir en Google Maps</span>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </a>

          <div className="mt-4">
            <h4 className="font-serif text-lg text-sage-800 mb-2 tracking-wide">Masia de les Casotes</h4>
            <p className="text-sm text-sage-600 font-sans">
              Camí de les Casotes, s/n<br />
              12200 Onda, Castellón<br />
              España
            </p>
            
            {/* Botón para obtener direcciones */}
            <a 
              href={getDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 mt-3 bg-sage-100 text-sage-700 rounded-md hover:bg-sage-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Cómo llegar
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h4 className="font-serif text-lg text-sage-800 mb-2 tracking-wide">Horario</h4>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-champagne-100 pb-2">
              <span className="text-sm font-medium text-sage-700 font-sans">Ceremonia</span>
              <span className="text-sm text-sage-600 font-sans">17:00h</span>
            </div>
            <div className="flex justify-between border-b border-champagne-100 pb-2">
              <span className="text-sm font-medium text-sage-700 font-sans">Cóctel</span>
              <span className="text-sm text-sage-600 font-sans">18:00h</span>
            </div>
            <div className="flex justify-between border-b border-champagne-100 pb-2">
              <span className="text-sm font-medium text-sage-700 font-sans">Cena</span>
              <span className="text-sm text-sage-600 font-sans">20:00h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-sage-700 font-sans">Fiesta</span>
              <span className="text-sm text-sage-600 font-sans">22:30h</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-champagne-50 rounded-md border border-champagne-100">
            <h5 className="font-serif text-base text-sage-800 mb-2">Información adicional</h5>
            <ul className="space-y-2 text-sm text-sage-700 font-sans">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Se ruega puntualidad. Por favor, llegue 30 minutos antes del inicio de la ceremonia.
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.97-.757l1-4A1 1 0 0014 4H3zm11 3a1 1 0 00-1.477-.874l-2.675 1.783A1 1 0 0010 9v2a1 1 0 001 1h2a1 1 0 001-1v-4z" />
                </svg>
                Hay amplio aparcamiento disponible en el recinto.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueInfo;