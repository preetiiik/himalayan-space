/**
 * Placeholder artwork for the specialty cards, drawn as SVG so the build has
 * no binary dependencies. Drop the real Figma exports into /public/images and
 * swap a <SpaceArt/> for an <img/> when they're available.
 */
export default function SpaceArt({ kind }) {
  const art = ART[kind] ?? ART.moon
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className="spaceArt">
      {art}
    </svg>
  )
}

const ART = {
  astronaut: (
    <g>
      <circle cx="60" cy="42" r="20" fill="#e6ebf2" />
      <path d="M46 40a14 14 0 0 1 28 0 14 14 0 0 1-28 0Z" fill="#0b1119" />
      <path d="M50 36a10 10 0 0 1 12-4" stroke="#6f8ba8" strokeWidth="2" strokeLinecap="round" />
      <rect x="44" y="60" width="32" height="38" rx="12" fill="#dfe5ee" />
      <rect x="52" y="70" width="16" height="12" rx="3" fill="#9aa7b8" />
      <rect x="26" y="64" width="18" height="9" rx="4.5" fill="#cfd7e2" />
      <rect x="76" y="64" width="18" height="9" rx="4.5" fill="#cfd7e2" />
      <rect x="48" y="96" width="10" height="20" rx="5" fill="#d6dde7" />
      <rect x="62" y="96" width="10" height="20" rx="5" fill="#d6dde7" />
    </g>
  ),
  rocket: (
    <g>
      <path d="M60 8c11 12 16 27 16 44v22H44V52c0-17 5-32 16-44Z" fill="#e8edf4" />
      <circle cx="60" cy="44" r="7" fill="#1d3450" />
      <path d="M44 60 30 84l14-6V60Z" fill="#c2ccda" />
      <path d="M76 60l14 24-14-6V60Z" fill="#c2ccda" />
      <path
        d="M52 76h16l-3 18a5 5 0 0 1-10 0l-3-18Z"
        fill="url(#flame)"
      />
      <defs>
        <linearGradient id="flame" x1="60" y1="76" x2="60" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffd9a0" />
          <stop offset="0.5" stopColor="#ff9a4d" />
          <stop offset="1" stopColor="#ff5722" stopOpacity="0" />
        </linearGradient>
      </defs>
    </g>
  ),
  saturn: (
    <g>
      <circle cx="60" cy="58" r="28" fill="url(#sat)" />
      <ellipse
        cx="60"
        cy="58"
        rx="52"
        ry="14"
        stroke="#c9b28c"
        strokeWidth="5"
        opacity="0.85"
        transform="rotate(-16 60 58)"
      />
      <ellipse
        cx="60"
        cy="58"
        rx="44"
        ry="11"
        stroke="#8d7856"
        strokeWidth="2"
        opacity="0.6"
        transform="rotate(-16 60 58)"
      />
      <defs>
        <radialGradient id="sat" cx="0.35" cy="0.3" r="0.85">
          <stop stopColor="#e8d3ac" />
          <stop offset="0.6" stopColor="#c19a63" />
          <stop offset="1" stopColor="#5d451f" />
        </radialGradient>
      </defs>
    </g>
  ),
  telescope: (
    <g>
      <rect
        x="20"
        y="46"
        width="80"
        height="15"
        rx="7"
        fill="#e4e9f0"
        transform="rotate(-24 60 54)"
      />
      <circle cx="94" cy="34" r="10" fill="#9fb0c4" />
      <path d="M56 66 44 108h10l8-30Z" fill="#c8d1dd" />
      <path d="M62 68l14 40h10L70 64Z" fill="#c8d1dd" />
      <rect x="40" y="104" width="46" height="5" rx="2.5" fill="#8c98a8" />
    </g>
  ),
  flag: (
    <g>
      <rect x="46" y="18" width="3" height="82" rx="1.5" fill="#cdd6e2" />
      <path d="M49 22h34v22H49z" fill="#e9edf3" />
      <path d="M49 22h34v7H49z" fill="#c0392b" />
      <path d="M49 37h34v7H49z" fill="#c0392b" />
      <ellipse cx="58" cy="104" rx="26" ry="6" fill="#2a3340" opacity="0.55" />
    </g>
  ),
  rover: (
    <g>
      <rect x="34" y="46" width="52" height="24" rx="5" fill="#c9a86f" />
      <rect x="44" y="30" width="20" height="18" rx="3" fill="#e2e7ef" />
      <path d="M54 30V16m0 0-6 5m6-5 6 5" stroke="#e2e7ef" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="44" cy="80" r="12" fill="#3c4450" stroke="#8b96a6" strokeWidth="3" />
      <circle cx="76" cy="80" r="12" fill="#3c4450" stroke="#8b96a6" strokeWidth="3" />
      <rect x="38" y="66" width="44" height="6" rx="3" fill="#8b7546" />
    </g>
  ),
  moon: (
    <g>
      <circle cx="60" cy="60" r="42" fill="url(#luna)" />
      <circle cx="46" cy="46" r="8" fill="#8d8474" opacity="0.5" />
      <circle cx="74" cy="70" r="11" fill="#8d8474" opacity="0.42" />
      <circle cx="58" cy="82" r="5" fill="#8d8474" opacity="0.5" />
      <circle cx="80" cy="42" r="4" fill="#8d8474" opacity="0.45" />
      <defs>
        <radialGradient id="luna" cx="0.35" cy="0.32" r="0.8">
          <stop stopColor="#e3ddd2" />
          <stop offset="0.65" stopColor="#a89f92" />
          <stop offset="1" stopColor="#4c4740" />
        </radialGradient>
      </defs>
    </g>
  ),
  suit: (
    <g>
      <rect x="42" y="34" width="36" height="26" rx="13" fill="#eef2f7" />
      <path d="M48 44a12 12 0 0 1 24 0 12 12 0 0 1-24 0Z" fill="#111820" />
      <rect x="38" y="58" width="44" height="44" rx="14" fill="#dfe5ee" />
      <rect x="52" y="70" width="16" height="14" rx="3" fill="#a6b2c2" />
      <rect x="44" y="100" width="13" height="16" rx="6" fill="#d3dae4" />
      <rect x="63" y="100" width="13" height="16" rx="6" fill="#d3dae4" />
    </g>
  ),
}
