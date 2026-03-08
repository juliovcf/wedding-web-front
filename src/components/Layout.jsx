import { useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Intentar reproducir automáticamente (algunos navegadores lo bloquean sin interacción)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log('Autoplay bloqueado - usuario debe hacer clic para reproducir');
      });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div className="min-h-screen bg-champagne-50 bg-elegant-gradient bg-fixed font-sans">
      {/* Audio element - persiste durante toda la navegación */}
      <audio
        ref={audioRef}
        loop
        onPlay={handlePlay}
        onPause={handlePause}
      >
        <source src="/music/boda.mp3" type="audio/mpeg" />
        Tu navegador no soporta audio HTML5
      </audio>

      {/* Botón flotante de música */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-sage-600 to-wine-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        <span className="text-xl animate-pulse" style={{ animationDuration: isPlaying ? '1s' : '0s' }}>
          {isPlaying ? '♫' : '♪'}
        </span>
        <span className="absolute bottom-full right-0 mb-2 bg-sage-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </span>
      </button>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
