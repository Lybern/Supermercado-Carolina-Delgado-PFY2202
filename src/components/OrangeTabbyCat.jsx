/**
 * Componente SVG de la gatita naranjosa atigrada (Eri)
 * Representa la mascota oficial de Supermercado Don Ahorro Eri Market.
 */
export function OrangeTabbyCat({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Gatita naranjosa atigrada Eri"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {/* Oreja izquierda */}
      <polygon
        points="12,28 17,5 30,20"
        fill="#E67E22"
        stroke="#BA4A00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon points="16,23 19,9 26,19" fill="#FFAAA6" />

      {/* Oreja derecha */}
      <polygon
        points="52,28 47,5 34,20"
        fill="#E67E22"
        stroke="#BA4A00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon points="48,23 45,9 38,19" fill="#FFAAA6" />

      {/* Cabeza esponjosa de la gatita (color naranja cálido) */}
      <circle cx="32" cy="36" r="22" fill="#F39C12" stroke="#BA4A00" strokeWidth="1.5" />

      {/* Rayitas atigradas en la frente */}
      <path d="M32 17 L32 26" stroke="#BA4A00" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 19 L28 26" stroke="#BA4A00" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M38 19 L36 26" stroke="#BA4A00" strokeWidth="2.2" strokeLinecap="round" />

      {/* Rayitas atigradas en las mejillas */}
      <path d="M13 32 L20 34" stroke="#BA4A00" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 37 L19 38" stroke="#BA4A00" strokeWidth="2" strokeLinecap="round" />
      <path d="M51 32 L44 34" stroke="#BA4A00" strokeWidth="2" strokeLinecap="round" />
      <path d="M52 37 L45 38" stroke="#BA4A00" strokeWidth="2" strokeLinecap="round" />

      {/* Hocico crema suave */}
      <ellipse cx="32" cy="42" rx="10" ry="7" fill="#FEF5E7" />

      {/* Naricita rosada de gatita */}
      <polygon points="30,38 34,38 32,41" fill="#FF6B81" />

      {/* Boquita sonriente */}
      <path
        d="M32 41 L32 43 C31 45.5, 27.5 45.5, 26.5 43.5"
        stroke="#78281F"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 43 C33 45.5, 36.5 45.5, 37.5 43.5"
        stroke="#78281F"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Ojos grandes, brillantes y expresivos */}
      <ellipse cx="23" cy="33" rx="4" ry="4.8" fill="#2C3E50" />
      <circle cx="21.5" cy="31.2" r="1.6" fill="#FFFFFF" />
      <circle cx="24.5" cy="34.2" r="0.8" fill="#FFFFFF" />

      <ellipse cx="41" cy="33" rx="4" ry="4.8" fill="#2C3E50" />
      <circle cx="39.5" cy="31.2" r="1.6" fill="#FFFFFF" />
      <circle cx="42.5" cy="34.2" r="0.8" fill="#FFFFFF" />

      {/* Mejillas rosaditas (blush) */}
      <ellipse cx="18" cy="38" rx="2.5" ry="1.5" fill="#FF85A1" opacity="0.6" />
      <ellipse cx="46" cy="38" rx="2.5" ry="1.5" fill="#FF85A1" opacity="0.6" />

      {/* Bigotes finos */}
      <line x1="7" y1="39" x2="19" y2="41" stroke="#4A235A" strokeWidth="1" strokeLinecap="round" />
      <line x1="7" y1="44" x2="19" y2="43" stroke="#4A235A" strokeWidth="1" strokeLinecap="round" />
      <line x1="57" y1="39" x2="45" y2="41" stroke="#4A235A" strokeWidth="1" strokeLinecap="round" />
      <line x1="57" y1="44" x2="45" y2="43" stroke="#4A235A" strokeWidth="1" strokeLinecap="round" />

      {/* Lazo rosa en la orejita izquierda */}
      <g transform="translate(13, 20) scale(0.85)">
        <polygon points="0,0 -8,-5 -8,5" fill="#FF3366" />
        <polygon points="0,0 8,-5 8,5" fill="#FF3366" />
        <circle cx="0" cy="0" r="3" fill="#FFD166" />
      </g>
    </svg>
  );
}

export default OrangeTabbyCat;
