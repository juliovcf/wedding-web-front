import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const navItems = [
  { id: 'confirmar', label: 'Asistencia' },
  { id: 'informacion', label: 'Información' },
  { id: 'galeria', label: 'Galería' },
  { id: 'regalo', label: 'Regalo' },
];

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      if (!isHomePage) return;

      const sections = navItems.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      let current = '';
      for (const section of sections) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  if (!isHomePage) return null;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Desktop nav */}
        <div className="hidden md:flex items-center justify-center gap-1 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-sans tracking-wide transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-sage-600 text-white shadow-sm'
                  : isScrolled
                    ? 'text-sage-700 hover:bg-sage-100'
                    : 'text-sage-700/80 hover:text-sage-800 hover:bg-white/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center justify-end py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-sage-700 hover:bg-sage-100'
                : 'text-sage-700/80 hover:bg-white/30'
            }`}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-sage-200/50 overflow-hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-5 py-3 text-sm font-sans tracking-wide transition-colors border-b border-sage-100 last:border-b-0 ${
                    activeSection === item.id
                      ? 'bg-sage-50 text-sage-700 font-medium'
                      : 'text-sage-600 hover:bg-sage-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavMenu;
