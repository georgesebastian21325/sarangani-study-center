export const ChapelIllustration = () => (
  <svg
    viewBox="0 0 420 620"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', display: 'block' }}
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      {/* Deep crimson background gradient */}
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#160107" />
        <stop offset="55%" stopColor="#2e050f" />
        <stop offset="100%" stopColor="#1a0208" />
      </linearGradient>

      {/* Gold glow for central window */}
      <radialGradient id="windowGlow" cx="50%" cy="42%" r="28%">
        <stop offset="0%" stopColor="#f5d87a" stopOpacity="0.38" />
        <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
      </radialGradient>

      {/* Candlelight glow */}
      <radialGradient id="candle1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f5d87a" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
      </radialGradient>

      {/* Floor reflection */}
      <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a0b12" />
        <stop offset="100%" stopColor="#1a0208" />
      </linearGradient>

      {/* Arch stonework */}
      <linearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4a1420" />
        <stop offset="100%" stopColor="#2e0810" />
      </linearGradient>

      {/* Table cloth */}
      <linearGradient id="tablecloth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f5f0e2" />
        <stop offset="100%" stopColor="#e0d8c4" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect width="420" height="620" fill="url(#bg)" />

    {/* Window glow bloom */}
    <ellipse cx="210" cy="200" rx="130" ry="120" fill="url(#windowGlow)" />

    {/* ── BACK WALL ARCHITECTURE ── */}

    {/* Main back wall */}
    <rect x="20" y="60" width="380" height="400" fill="#29060d" rx="2" />

    {/* Grand Gothic Arch - outer */}
    <path
      d="M110,290 Q110,100 210,80 Q310,100 310,290 Z"
      fill="#1e0409"
      stroke="#5a1820"
      strokeWidth="1.5"
    />
    {/* Inner arch recess */}
    <path d="M125,290 Q125,115 210,96 Q295,115 295,290 Z" fill="#160107" />

    {/* Arch side columns left */}
    <rect
      x="96"
      y="110"
      width="18"
      height="180"
      fill="url(#stoneGrad)"
      rx="2"
    />
    <rect x="98" y="108" width="14" height="4" fill="#6a2030" rx="1" />
    {/* Column capital left */}
    <path d="M93,108 Q104,96 115,108 Z" fill="#5a1820" />

    {/* Arch side columns right */}
    <rect
      x="306"
      y="110"
      width="18"
      height="180"
      fill="url(#stoneGrad)"
      rx="2"
    />
    <rect x="308" y="108" width="14" height="4" fill="#6a2030" rx="1" />
    {/* Column capital right */}
    <path d="M305,108 Q316,96 327,108 Z" fill="#5a1820" />

    {/* Smaller flanking arches - left */}
    <path
      d="M22,290 Q22,180 72,165 Q122,180 122,290 Z"
      fill="#200508"
      stroke="#3a1015"
      strokeWidth="1"
    />
    <path d="M32,290 Q32,186 72,174 Q112,186 112,290 Z" fill="#160107" />

    {/* Smaller flanking arches - right */}
    <path
      d="M298,290 Q298,180 348,165 Q398,180 398,290 Z"
      fill="#200508"
      stroke="#3a1015"
      strokeWidth="1"
    />
    <path d="M308,290 Q308,186 348,174 Q388,186 388,290 Z" fill="#160107" />

    {/* ── ROSE WINDOW ── */}
    {/* Outer ring */}
    <circle
      cx="210"
      cy="175"
      r="56"
      fill="none"
      stroke="#7a2838"
      strokeWidth="1.5"
    />
    {/* Inner ring */}
    <circle
      cx="210"
      cy="175"
      r="40"
      fill="none"
      stroke="#9e3848"
      strokeWidth="1"
    />
    {/* Center circle */}
    <circle
      cx="210"
      cy="175"
      r="14"
      fill="#c9a84c18"
      stroke="#c9a84c"
      strokeWidth="1.2"
    />
    <circle cx="210" cy="175" r="6" fill="#c9a84c30" />
    {/* Spoke lines */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
      const r = (deg * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={210 + 14 * Math.cos(r)}
          y1={175 + 14 * Math.sin(r)}
          x2={210 + 40 * Math.cos(r)}
          y2={175 + 40 * Math.sin(r)}
          stroke="#7a2838"
          strokeWidth="0.8"
        />
      );
    })}
    {/* Petal arcs */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
      const r = (deg * Math.PI) / 180;
      const cx2 = 210 + 27 * Math.cos(r);
      const cy2 = 175 + 27 * Math.sin(r);
      return (
        <circle
          key={i}
          cx={cx2}
          cy={cy2}
          r="10"
          fill="#c9a84c08"
          stroke="#9e3848"
          strokeWidth="0.7"
        />
      );
    })}
    {/* Colored glass panes (simplified) */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const r = (deg * Math.PI) / 180;
      const colors = [
        '#8b1a2a',
        '#c9a84c',
        '#5a3a1a',
        '#8b1a2a',
        '#c9a84c',
        '#5a3a1a',
        '#8b1a2a',
        '#c9a84c',
      ];
      return (
        <path
          key={i}
          d={`M${210 + 16 * Math.cos(r)},${175 + 16 * Math.sin(r)} L${
            210 + 38 * Math.cos(r - 0.35)
          },${175 + 38 * Math.sin(r - 0.35)} L${
            210 + 38 * Math.cos(r + 0.35)
          },${175 + 38 * Math.sin(r + 0.35)} Z`}
          fill={colors[i]}
          opacity="0.35"
        />
      );
    })}

    {/* ── CROSS ABOVE WINDOW ── */}
    <rect
      x="206"
      y="100"
      width="8"
      height="28"
      fill="#c9a84c"
      rx="1"
      opacity="0.8"
    />
    <rect
      x="198"
      y="110"
      width="24"
      height="6"
      fill="#c9a84c"
      rx="1"
      opacity="0.8"
    />

    {/* ── WALL SCONCES ── */}
    {[72, 348].map((x, i) => (
      <g key={i}>
        {/* Sconce bracket */}
        <rect x={x - 4} y="220" width="8" height="20" fill="#4a1420" rx="1" />
        <ellipse cx={x} cy="218" rx="10" ry="4" fill="#3a1015" />
        {/* Candle */}
        <rect x={x - 2} y="208" width="4" height="14" fill="#e8dece" rx="1" />
        {/* Flame glow */}
        <ellipse cx={x} cy="206" rx="12" ry="12" fill="url(#candle1)" />
        {/* Flame */}
        <ellipse cx={x} cy="206" rx="3" ry="5" fill="#f5d87a" opacity="0.9" />
        <ellipse cx={x} cy="204" rx="1.5" ry="3" fill="#fff" opacity="0.7" />
      </g>
    ))}

    {/* ── DECORATIVE WAINSCOTING ── */}
    <rect x="20" y="288" width="380" height="8" fill="#3a0d15" />
    {/* Panel moldings */}
    {[20, 100, 180, 260, 340].map((x, i) => (
      <rect
        key={i}
        x={x + 6}
        y="300"
        width="70"
        height="90"
        fill="none"
        stroke="#4a1520"
        strokeWidth="1"
        rx="2"
      />
    ))}
    <rect x="20" y="390" width="380" height="4" fill="#3a0d15" />

    {/* ── REFECTORY TABLE ── */}
    {/* Table top */}
    <path
      d="M60,420 Q210,412 360,420 L360,438 Q210,446 60,438 Z"
      fill="url(#tablecloth)"
    />
    {/* Table edge shadow */}
    <path
      d="M60,438 Q210,446 360,438 L360,442 Q210,450 60,442 Z"
      fill="#c8bea0"
    />
    {/* Table legs */}
    <rect x="80" y="440" width="12" height="60" fill="#3a2210" rx="2" />
    <rect x="328" y="440" width="12" height="60" fill="#3a2210" rx="2" />
    {/* Cross beam */}
    <rect x="80" y="480" width="260" height="6" fill="#2e1a0a" rx="2" />

    {/* ── TABLE SETTINGS ── */}
    {/* Place settings */}
    {[110, 180, 250, 310].map((x, i) => (
      <g key={i}>
        {/* Plate */}
        <ellipse
          cx={x}
          cy="425"
          rx="20"
          ry="7"
          fill="#f5f0e2"
          stroke="#e0d8c4"
          strokeWidth="0.5"
        />
        <ellipse cx={x} cy="425" rx="14" ry="5" fill="#faf7f0" />
        {/* Fork */}
        <line
          x1={x - 24}
          y1="419"
          x2={x - 24}
          y2="431"
          stroke="#b8a878"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Knife */}
        <line
          x1={x + 24}
          y1="419"
          x2={x + 24}
          y2="431"
          stroke="#b8a878"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Glass */}
        <path
          d={`M${x + 28},419 L${x + 32},430 L${x + 24},430 Z`}
          fill="none"
          stroke="#c9a84c"
          strokeWidth="0.8"
        />
        <ellipse
          cx={x + 28}
          cy="430"
          rx="4"
          ry="1.5"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="0.8"
        />
      </g>
    ))}

    {/* Centerpiece — candelabra */}
    <rect x="205" y="400" width="10" height="26" fill="#9e7c2e" rx="1" />
    <ellipse cx="210" cy="400" rx="14" ry="4" fill="#7a5e20" />
    {/* Three candles */}
    {[-12, 0, 12].map((ox, i) => (
      <g key={i}>
        <rect
          x={210 + ox - 2}
          y={392 - (i === 1 ? 8 : 0)}
          width="4"
          height={i === 1 ? 14 : 10}
          fill="#e8dece"
          rx="1"
        />
        <ellipse
          cx={210 + ox}
          cy={392 - (i === 1 ? 8 : 0)}
          rx="5"
          ry="5"
          fill="url(#candle1)"
        />
        <ellipse
          cx={210 + ox}
          cy={391 - (i === 1 ? 8 : 0)}
          rx="2"
          ry="3"
          fill="#f5d87a"
          opacity="0.85"
        />
      </g>
    ))}

    {/* ── FLOOR ── */}
    <rect x="0" y="500" width="420" height="120" fill="url(#floorGrad)" />
    {/* Floor tiles — perspective lines horizontal */}
    {[510, 525, 545, 570, 605].map((y, i) => (
      <line
        key={i}
        x1="0"
        y1={y}
        x2="420"
        y2={y}
        stroke="#2e080f"
        strokeWidth="0.6"
      />
    ))}
    {/* Floor tiles — perspective lines vertical */}
    {[-60, 0, 60, 120, 180, 240, 300, 360, 420, 480].map((x, i) => {
      const vanishX = 210;
      return (
        <line
          key={i}
          x1={vanishX + (x - vanishX) * 0.3}
          y1="500"
          x2={x}
          y2="620"
          stroke="#2e080f"
          strokeWidth="0.6"
        />
      );
    })}
    {/* Floor reflection of table */}
    <ellipse cx="210" cy="510" rx="140" ry="12" fill="#3a0d15" opacity="0.6" />

    {/* ── FOREGROUND CHAIR SILHOUETTES ── */}
    {[80, 150, 270, 340].map((x, i) => (
      <g key={i} opacity="0.55">
        <rect x={x - 14} y="470" width="28" height="30" fill="#1a0208" rx="2" />
        <rect x={x - 16} y="460" width="32" height="12" fill="#1a0208" rx="2" />
        <rect x={x - 12} y="500" width="5" height="20" fill="#150107" rx="1" />
        <rect x={x + 7} y="500" width="5" height="20" fill="#150107" rx="1" />
      </g>
    ))}

    {/* ── TOP VAULTED CEILING ── */}
    {/* Ribbed vault lines */}
    {[0, 1, 2, 3, 4].map((i) => {
      const x = 84 * i;
      return (
        <path
          key={i}
          d={`M${x},0 Q210,55 ${420 - x},0`}
          fill="none"
          stroke="#3a1015"
          strokeWidth="0.8"
          opacity="0.6"
        />
      );
    })}
    {/* Ceiling crossribs */}
    <path
      d="M0,0 Q105,80 210,60 Q315,80 420,0"
      fill="none"
      stroke="#3a1015"
      strokeWidth="0.8"
      opacity="0.5"
    />
    <path
      d="M0,0 Q105,40 210,30 Q315,40 420,0"
      fill="none"
      stroke="#4a1820"
      strokeWidth="0.6"
      opacity="0.4"
    />

    {/* Top pendant chandelier */}
    <line x1="210" y1="0" x2="210" y2="65" stroke="#7a5e20" strokeWidth="1.5" />
    <ellipse
      cx="210"
      cy="68"
      rx="22"
      ry="7"
      fill="#5a3a10"
      stroke="#c9a84c"
      strokeWidth="0.8"
    />
    {/* Chandelier arms */}
    {[-16, 0, 16].map((ox, i) => (
      <g key={i}>
        <line
          x1="210"
          y1="68"
          x2={210 + ox}
          y2="76"
          stroke="#7a5e20"
          strokeWidth="1"
        />
        <ellipse
          cx={210 + ox}
          cy="76"
          rx="4"
          ry="4"
          fill="url(#candle1)"
          opacity="0.7"
        />
        <ellipse
          cx={210 + ox}
          cy="75"
          rx="1.5"
          ry="2.5"
          fill="#f5d87a"
          opacity="0.8"
        />
      </g>
    ))}
  </svg>
);
