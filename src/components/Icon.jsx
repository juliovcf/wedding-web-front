// Iconos de trazo fino, a juego con el estilo de papelería de la web
const PATHS = {
  check: <path d="M5 13l4 4L19 7" />,
  x: <path d="M6 18L18 6M6 6l12 12" />,
  alert: (
    <>
      <path d="M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  pencil: <path d="M15.2 5.2l3.6 3.6M4 20l4.5-1 10-10a2.5 2.5 0 00-3.5-3.5l-10 10z" />,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
  rings: (
    <>
      <circle cx="9" cy="15" r="5" />
      <circle cx="15" cy="15" r="5" />
      <path d="M12 3.5l1.5 2-1.5 2-1.5-2z" />
    </>
  ),
  cocktail: (
    <>
      <path d="M5 4h14l-7 8z" />
      <path d="M12 12v7M8.5 20h7" />
      <path d="M15 4l2.5-2" />
    </>
  ),
  utensils: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M3 3v4M4.5 3v4M6 3v4M3 7c0 1.5.7 2.5 1.5 2.5S6 8.5 6 7M4.5 9.5V21" />
      <path d="M20.5 21V3c-1.4.8-2 3-2 6v3h2" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="16" r="2" />
    </>
  ),
  bus: (
    <>
      <rect x="5" y="3" width="14" height="14" rx="2" />
      <path d="M5 10h14M8 17v2.5M16 17v2.5" />
      <circle cx="8.5" cy="13.5" r="0.8" />
      <circle cx="15.5" cy="13.5" r="0.8" />
    </>
  ),
  car: (
    <>
      <path d="M5 13l1.8-4.7A2 2 0 018.7 7h6.6a2 2 0 011.9 1.3L19 13" />
      <rect x="4" y="13" width="16" height="4.5" rx="1.5" />
      <path d="M7 17.5V19M17 17.5V19" />
    </>
  ),
  sunset: (
    <>
      <path d="M3 18h18M7 18a5 5 0 0110 0" />
      <path d="M12 6v4M5.6 10.6L7 12M18.4 10.6L17 12M2.5 15h2M19.5 15h2" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />,
  child: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M7.5 21v-4.5a4.5 4.5 0 019 0V21" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

const Icon = ({ name, className = 'w-5 h-5', strokeWidth = 1.6 }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {PATHS[name]}
  </svg>
);

export default Icon;
