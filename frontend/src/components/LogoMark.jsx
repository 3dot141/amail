// Shared MailFlow logo mark — used in Sidebar and LoginPage.
//
// Blue-envelope brand mark (261102): fixed brand gradient instead of the
// theme accent, matching the favicon / PWA icon artwork. No gloss or seam
// lines — only a soft envelope shadow, which reads cleanly at 24px.
export default function LogoMark({ size = 32 }) {
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
        {/* Brand blue background: bright top-left fading to deep blue */}
        <linearGradient id={`bg_${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#1E9BFF"/>
          <stop offset="55%"  stopColor="#0868F7"/>
          <stop offset="100%" stopColor="#0043D6"/>
        </linearGradient>
        {/* Envelope body — pale blue paper */}
        <linearGradient id={`env_${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#F4FAFF"/>
          <stop offset="100%" stopColor="#CFE9FF"/>
        </linearGradient>
        {/* Soft top-left glow, echoing the artwork's curved highlight */}
        <radialGradient id={`glow_${id}`} cx="18%" cy="12%" r="72%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </radialGradient>
        {/* Soft envelope shadow, no hard edge */}
        <filter id={`es_${id}`} x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="0.5" stdDeviation="0.55" floodColor="#002B8F" floodOpacity="0.28"/>
        </filter>
      </defs>

      {/* Background */}
      <rect width="32" height="32" rx="7.5" fill={`url(#bg_${id})`}/>
      <rect width="32" height="32" rx="7.5" fill={`url(#glow_${id})`}/>

      {/* Envelope body */}
      <rect
        x="7.6" y="9.2" width="16.8" height="13.6" rx="2.3"
        fill={`url(#env_${id})`}
      />

      {/* White flap covering the top half, V-shaped lower edge */}
      <path
        d="M7.6 11.5 C7.6 10.0 8.7 9.2 10.1 9.2 L21.9 9.2 C23.3 9.2 24.4 10.0 24.4 11.5 L24.4 12.4 L16.7 18.1 C16.3 18.4 15.7 18.4 15.3 18.1 L7.6 12.4 Z"
        fill="#ffffff"
        filter={`url(#es_${id})`}
      />
    </svg>
  );
}
