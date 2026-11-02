// Shared MailFlow logo mark — used in Sidebar and LoginPage.
// Reads the *effective* accent hex (theme value, or a custom-CSS override of
// --accent) so the SVG colour matches var(--accent) without relying on CSS
// variable resolution inside SVG, and updates on theme AND custom-CSS changes.
//
// Flat mark with only a restrained top highlight and envelope shadow: no
// gloss, bevels, or seam lines (those read as noise at sidebar size).
import { useState, useEffect } from 'react';
import { getEffectiveAccent, subscribeAccent } from '../themes.js';

export default function LogoMark({ size = 32 }) {
  const [accent, setAccent] = useState(getEffectiveAccent);
  useEffect(() => {
    // Re-sync in case the accent changed between render and this effect, then
    // subscribe for future theme/custom-CSS changes (cleanup unsubscribes).
    setAccent(getEffectiveAccent());
    return subscribeAccent(setAccent);
  }, []);

  const id = `lm_${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        {/* Restrained top highlight — just enough to keep the tile from reading flat */}
        <linearGradient id={`sh_${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.10)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        {/* Soft envelope shadow, no hard edge */}
        <filter id={`es_${id}`} x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="0.6" stdDeviation="0.7" floodColor="#000" floodOpacity="0.18"/>
        </filter>
      </defs>

      {/* Background — accent hex passed directly, re-renders when theme changes */}
      <rect width="32" height="32" rx="7.5" fill={accent}/>
      <rect width="32" height="32" rx="7.5" fill={`url(#sh_${id})`}/>

      {/* Envelope body, softened by a small drop shadow */}
      <rect
        x="10" y="11" width="15" height="10" rx="1.4"
        fill="#ffffff" filter={`url(#es_${id})`}
      />
      {/* Flap crease in the accent colour */}
      <path
        d="M10.6 11.8 L17.5 16.1 L24.4 11.8"
        fill="none" stroke={accent} strokeWidth="1.2" strokeLinejoin="round"
      />

      {/* Three flow lines on the left */}
      <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round">
        <line x1="6.4" y1="13.2" x2="8.4" y2="13.2"/>
        <line x1="5.8" y1="16.1" x2="8.4" y2="16.1"/>
        <line x1="6.4" y1="19.0" x2="8.4" y2="19.0"/>
      </g>
    </svg>
  );
}
