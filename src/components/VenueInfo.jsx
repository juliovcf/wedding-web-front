import React from 'react';

const VenueInfo = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-elegant p-6 my-8 border border-champagne-100">
      <h3 className="text-center font-handwriting text-2xl md:text-3xl text-sage-700 mb-4">Lugar de Celebración</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="w-full h-48 bg-gradient-to-r from-sage-100 to-sage-200 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-subtle-pattern bg-[length:50px_50px]"></div>
            </div>
            <span className="font-handwriting text-xl text-navy-700 relative z-10">Mapa de ubicación</span>
          </div>
          <div className="mt-4">
            <h4 className="font-serif text-lg text-sage-800 mb-2">Masia de les Casotes</h4>
            <p className="text-sm text-sage-600">
              Camí de les Casotes, s/n<br />
              12200 Onda, Castellón<br />
              España
            </p>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h4 className="font-serif text-lg text-sage-800 mb-2">Horario</h4>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-champagne-100 pb-2">
              <span className="text-sm font-medium text-sage-700">Ceremonia</span>
              <span className="text-sm text-sage-600">17:00h</span>
            </div>
            <div className="flex justify-between border-b border-champagne-100 pb-2">
              <span className="text-sm font-medium text-sage-700">Cóctel</span>
              <span className="text-sm text-sage-600">18:00h</span>
            </div>
            <div className="flex justify-between border-b border-champagne-100 pb-2">
              <span className="text-sm font-medium text-sage-700">Cena</span>
              <span className="text-sm text-sage-600">20:00h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-sage-700">Fiesta</span>
              <span className="text-sm text-sage-600">22:30h</span>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-champagne-50 rounded-md border border-champagne-100">
            <p className="text-sm text-sage-700">
              Se ruega puntualidad. Por favor, llegue 30 minutos antes del inicio de la ceremonia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueInfo;