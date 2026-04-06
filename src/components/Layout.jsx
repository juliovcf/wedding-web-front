import { useRef, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import NavMenu from './NavMenu';

const Layout = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
    setShowMusicPrompt(false);
  };

  const dismissPrompt = () => {
    setShowMusicPrompt(false);
  };

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
    <div className="min-h-screen font-sans">
      {/* Navigation Menu */}
      <NavMenu />

      {/* Pop-up de música al entrar */}
      {showMusicPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-sm w-full text-center animate-fade-in">
            <span className="text-4xl mb-4 block">🎵</span>
            <h3 className="text-xl font-serif text-sage-800 mb-2">Música ambiental</h3>
            <p className="text-sage-600 text-sm mb-6">
              ¿Te gustaría disfrutar de música mientras navegas por nuestra invitación?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={startMusic}
                className="bg-gradient-to-r from-sage-600 to-wine-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
              >
                Sí, activar ♫
              </button>
              <button
                onClick={dismissPrompt}
                className="border border-sage-300 text-sage-600 px-6 py-2.5 rounded-full font-medium hover:bg-sage-50 transition-all"
              >
                No, gracias
              </button>
            </div>
          </div>
        </div>
      )}

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
