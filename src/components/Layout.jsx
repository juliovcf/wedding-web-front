import { useRef, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import IntroEnvelope from './IntroEnvelope';
import NavMenu from './NavMenu';

const Layout = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Se llama dentro del clic de la intro, así el navegador permite reproducir el audio
  const handleIntroOpen = (withMusic) => {
    if (withMusic && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
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

      {/* Sobre de bienvenida al entrar (también decide si suena la música) */}
      {showIntro && (
        <IntroEnvelope onOpen={handleIntroOpen} onFinish={() => setShowIntro(false)} />
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
        type="button"
        onClick={toggleMusic}
        className={`music-button group ${isPlaying ? 'is-playing' : ''}`}
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <span className="music-bars" aria-hidden="true">
            <span /><span /><span /><span />
          </span>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 18V6l10-2v12" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="16" r="2" />
          </svg>
        )}
        <span className="absolute bottom-full right-0 mb-2 bg-sage-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isPlaying ? 'Pausar música' : 'Poner música'}
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
