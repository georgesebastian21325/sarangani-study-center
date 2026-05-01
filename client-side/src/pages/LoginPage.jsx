import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, ChevronRight, Sparkles } from 'lucide-react';
import SaranganiLogo from '../../public/sarangani-logo-without-text.png';

// ─── FONT LOADER ─────────────────────────────────────────

const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cinzel:wght@400;500;600&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);
  return null;
};

// ─── GLOBAL STYLES ───────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body, #root { height: 100%; }

    .login-root {
      height: 100vh;
      width: 100vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
      font-family: 'Crimson Text', serif;
      overflow: hidden;
      animation: fadeIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* ── Left panel ── */
    .login-left {
      position: relative;
      overflow: hidden;
      background: #160107;
    }

    .login-left svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Grain texture */
    .login-left::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 3;
    }

    .left-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        175deg,
        rgba(22,1,7,0.08) 0%,
        rgba(22,1,7,0.0) 35%,
        rgba(22,1,7,0.55) 75%,
        rgba(22,1,7,0.88) 100%
      );
      z-index: 4;
    }

    /* Top badge */
    .left-top-badge {
      position: absolute;
      top: 40px; left: 44px;
      z-index: 5;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .left-top-badge-icon {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: rgba(90,10,30,0.7);
      border: 1px solid rgba(201,168,76,0.4);
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(4px);
    }
    .left-top-badge-text {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(201,168,76,0.8);
    }

    /* Bottom content */
    .left-content {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      padding: 52px 48px;
      z-index: 5;
    }

    .left-ornament {
      font-size: 28px;
      color: #c9a84c;
      filter: drop-shadow(0 0 12px rgba(201,168,76,0.7));
      margin-bottom: 16px;
      display: block;
      line-height: 1;
    }

    .left-title {
      font-family: 'Cinzel', serif;
      font-size: 30px;
      font-weight: 600;
      color: #f5edd8;
      line-height: 1.25;
      letter-spacing: 0.02em;
      margin-bottom: 16px;
    }

    .left-rule {
      width: 48px;
      height: 1px;
      background: linear-gradient(to right, #c9a84c80, transparent);
      margin-bottom: 16px;
    }

    .left-quote {
      font-family: 'EB Garamond', serif;
      font-style: italic;
      font-size: 16px;
      color: rgba(201,168,76,0.6);
      line-height: 1.75;
      max-width: 340px;
    }

    .left-quote-attr {
      margin-top: 14px;
      font-family: 'Cinzel', serif;
      font-size: 9px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(201,168,76,0.35);
    }

    /* Meal chips row along bottom of left panel */
    .left-chips {
      display: flex;
      gap: 8px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }
    .left-chip {
      font-family: 'Cinzel', serif;
      font-size: 8px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 99px;
      border: 1px solid;
      font-weight: 600;
    }

    /* ── Right panel ── */
    .login-right {
      background: #faf7f0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 72px;
      position: relative;
      overflow: hidden;
    }

    /* Subtle parchment texture lines */
    .login-right::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 28px,
        rgba(232,222,206,0.35) 28px,
        rgba(232,222,206,0.35) 29px
      );
      pointer-events: none;
    }

    /* Gold border accent */
    .login-right::after {
      content: '';
      position: absolute;
      left: 0; top: 10%; bottom: 10%;
      width: 1px;
      background: linear-gradient(to bottom, transparent, #c9a84c60, #9e7c2e80, #c9a84c60, transparent);
    }

    .form-inner {
      position: relative;
      z-index: 1;
      max-width: 400px;
      width: 100%;
      margin: 0 auto;
    }

    /* ── Brand ── */
    .brand-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 40px;
    }
    .brand-icon {
      width: 40px; height: 40px;
      border-radius: 50%;
      background: #5a0a1e;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(90,10,30,0.3);
    }
    .brand-text { display: flex; flex-direction: column; gap: 1px; }
    .brand-name {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #5a0a1e;
      font-weight: 600;
      line-height: 1;
    }
    .brand-sub {
      font-family: 'Crimson Text', serif;
      font-style: italic;
      font-size: 12px;
      color: #b09070;
    }

    /* ── Welcome ── */
    .welcome-head {
      font-family: 'EB Garamond', serif;
      font-size: 36px;
      font-weight: 500;
      color: #3b1a0a;
      margin-bottom: 4px;
      line-height: 1.1;
    }
    .welcome-sub {
      font-family: 'Crimson Text', serif;
      font-size: 16px;
      font-style: italic;
      color: #9c856a;
      margin-bottom: 32px;
    }

    /* ── Role toggle ── */
    .role-toggle {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border: 1.5px solid #e8dece;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 28px;
    }
    .role-btn {
      padding: 11px 0;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      background: transparent;
      color: #9c856a;
      border: none;
      cursor: pointer;
      transition: all 0.22s;
    }
    .role-btn:first-child { border-right: 1px solid #e8dece; }
    .role-btn.active { background: #5a0a1e; color: #e8c96e; }
    .role-btn:not(.active):hover { background: rgba(90,10,30,0.04); color: #5a0a1e; }

    /* ── Form fields ── */
    .form-field { margin-bottom: 18px; }
    .field-label {
      display: block;
      font-family: 'Cinzel', serif;
      font-size: 9.5px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #9e7c2e;
      margin-bottom: 7px;
    }
    .field-input-wrap { position: relative; }
    .field-input {
      width: 100%;
      border: 1px solid #e8dece;
      padding: 13px 16px;
      border-radius: 7px;
      font-family: 'Crimson Text', serif;
      font-size: 17px;
      color: #3b1a0a;
      background: #fff;
      transition: border-color 0.15s, box-shadow 0.15s;
      outline: none;
    }
    .field-input:focus {
      border-color: #9e7c2e;
      box-shadow: 0 0 0 3px rgba(158,124,46,0.1);
    }
    .field-input::placeholder { color: #d0c0a8; }
    .field-input.has-icon { padding-right: 46px; }

    .eye-btn {
      position: absolute;
      right: 14px; top: 50%;
      transform: translateY(-50%);
      background: none; border: none;
      color: #c8a96e; cursor: pointer;
      display: flex; align-items: center;
      transition: color 0.15s;
    }
    .eye-btn:hover { color: #5a0a1e; }

    /* ── Forgot ── */
    .forgot-row {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
      margin-top: -10px;
    }
    .forgot-link {
      font-family: 'Crimson Text', serif;
      font-style: italic;
      font-size: 14px;
      color: #9c856a;
      background: none; border: none; cursor: pointer;
      padding: 0;
      transition: color 0.15s;
    }
    .forgot-link:hover { color: #5a0a1e; }

    /* ── Submit ── */
    .submit-btn {
      width: 100%;
      padding: 14px;
      background: #5a0a1e;
      color: #e8c96e;
      border: none;
      border-radius: 8px;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
      box-shadow: 0 4px 20px rgba(90,10,30,0.3);
    }
    .submit-btn:hover:not(:disabled) {
      background: #7a1428;
      box-shadow: 0 6px 26px rgba(90,10,30,0.4);
      transform: translateY(-1px);
    }
    .submit-btn:active:not(:disabled) { transform: translateY(0); }
    .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

    /* ── Divider ── */
    .form-divider {
      display: flex; align-items: center; gap: 12px;
      margin: 22px 0;
      color: #d5c5b2;
      font-family: 'Cinzel', serif;
      font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
    }
    .form-divider::before, .form-divider::after {
      content: ''; flex: 1; height: 1px; background: #e8dece;
    }

    /* ── SSO button ── */
    .sso-btn {
      width: 100%; padding: 13px;
      background: transparent;
      border: 1px solid #e8dece;
      border-radius: 8px;
      font-family: 'Cinzel', serif;
      font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
      color: #9c856a; cursor: pointer;
      transition: all 0.2s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .sso-btn:hover { border-color: #c8a96e; color: #5a0a1e; background: rgba(201,168,76,0.04); }

    /* ── Success state ── */
    .success-box {
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 24px 0;
      animation: fadeIn 0.4s ease both;
    }
    .success-icon {
      width: 60px; height: 60px; border-radius: 50%;
      background: #5a0a1e10;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 18px;
      font-size: 26px;
      border: 1.5px solid #5a0a1e28;
    }
    .success-title {
      font-family: 'EB Garamond', serif;
      font-size: 26px; font-weight: 500;
      color: #3b1a0a; margin-bottom: 8px;
    }
    .success-sub {
      font-family: 'Crimson Text', serif; font-style: italic;
      font-size: 16px; color: #9c856a;
    }

    /* ── Error banner ── */
    .error-banner {
      display: flex; align-items: center; gap: 8px;
      background: #fef2f2; border: 1px solid #fecaca;
      border-radius: 6px; padding: 11px 14px;
      margin-bottom: 16px;
      font-family: 'Crimson Text', serif; font-size: 15px; color: #991b1b;
      animation: fadeIn 0.25s ease both;
    }

    /* ── Footer inside right panel ── */
    .right-footer {
      position: absolute;
      bottom: 28px; left: 0; right: 0;
      text-align: center;
      font-family: 'Crimson Text', serif;
      font-style: italic;
      font-size: 12px;
      color: #c8b898;
    }

    /* ── Spinner ── */
    @keyframes spin { to { transform: rotate(360deg); } }
    .od-spin { animation: spin 0.8s linear infinite; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .login-root { grid-template-columns: 1fr; }
      .login-left { display: none; }
      .login-right { padding: 0 36px; }
    }
  `}</style>
);

// ─── ILLUSTRATION — Left Panel SVG ───────────────────────
// A refined ink-and-gold illustration of a chapel refectory

const ChapelIllustration = () => (
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

// ─── LOGIN PAGE ───────────────────────────────────────────

export default function LoginPage() {
  const [role, setRole] = useState('resident');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields to continue.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    // Demo: wrong credentials
    if (password === 'wrong') {
      setError('Invalid credentials. Please try again.');
      return;
    }
    setSuccess(true);
  };

  const handleRoleSwitch = (r) => {
    setRole(r);
    setError('');
    setSuccess(false);
    setEmail('');
    setPassword('');
  };

  const MEAL_CHIPS = [
    { label: 'Breakfast', color: '#f97316' },
    { label: 'Lunch', color: '#10b981' },
    { label: 'Merienda', color: '#8b5cf6' },
    { label: 'Supper', color: '#3b82f6' },
  ];

  return (
    <>
      <FontLoader />
      <GlobalStyles />

      <div className="login-root">
        {/* ── LEFT: Full-height Illustration Panel ── */}
        <div className="login-left">
          <ChapelIllustration />
          <div className="left-overlay" />

          {/* Top badge */}
          <div className="left-top-badge">
            <img src={SaranganiLogo} alt="Sarangani Study Center" />
          </div>

          {/* Bottom content */}
          <div className="left-content">
            {/* Meal chips — same as dashboards */}
            <div className="left-chips">
              {MEAL_CHIPS.map(({ label, color }) => (
                <span
                  key={label}
                  className="left-chip"
                  style={{
                    color,
                    background: `${color}18`,
                    borderColor: `${color}50`,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <h2 className="left-title">
              Sarangani
              <br />
              Study Center
            </h2>
            <div className="left-rule" />
            <p className="left-quote">
              "The ordinary tasks of each day
              <br />
              are the material of our sanctification."
            </p>
            <p className="left-quote-attr">— St. Josemaría Escrivá</p>
          </div>
        </div>

        {/* ── RIGHT: Full-height Login Form ── */}
        <div className="login-right">
          <div className="form-inner">
            {/* Welcome */}
            <h1 className="welcome-head">Welcome back.</h1>
            <p className="welcome-sub">
              {role === 'admin'
                ? 'Sign in to the administration panel.'
                : 'Sign in to your resident account.'}
            </p>

            {/* Role Toggle */}
            <div className="role-toggle">
              <button
                className={`role-btn ${role === 'resident' ? 'active' : ''}`}
                onClick={() => handleRoleSwitch('resident')}
              >
                Resident
              </button>
              <button
                className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleSwitch('admin')}
              >
                Admin
              </button>
            </div>

            {success ? (
              <div className="success-box">
                <div className="success-icon">✠</div>
                <h3 className="success-title">Signed in successfully</h3>
                <p className="success-sub">
                  Redirecting you to the{' '}
                  {role === 'admin'
                    ? 'administration panel'
                    : 'resident dashboard'}
                  …
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="error-banner">
                    <span style={{ fontSize: '15px' }}>⚠</span>
                    {error}
                  </div>
                )}

                {/* Email */}
                <div className="form-field">
                  <label className="field-label" htmlFor="email">
                    {role === 'admin' ? 'Admin Email' : 'Email Address'}
                  </label>
                  <div className="field-input-wrap">
                    <input
                      id="email"
                      type="email"
                      className="field-input"
                      placeholder={
                        role === 'admin'
                          ? 'admin@sarangani.org'
                          : 'john.doe@example.com'
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-field">
                  <label className="field-label" htmlFor="password">
                    Password
                  </label>
                  <div className="field-input-wrap">
                    <input
                      id="password"
                      type={showPass ? 'text' : 'password'}
                      className="field-input has-icon"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      autoComplete="current-password"
                    />
                    <button
                      className="eye-btn"
                      onClick={() => setShowPass(!showPass)}
                      type="button"
                      tabIndex={-1}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Forgot */}
                <div className="forgot-row">
                  <button className="forgot-link" type="button">
                    Forgot your password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="od-spin" /> Signing in…
                    </>
                  ) : (
                    <>
                      Sign In <ChevronRight size={15} />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="form-divider">or</div>

                {/* Google SSO */}
                <button className="sso-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#9c856a"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#9c856a"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#9c856a"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#9c856a"
                    />
                  </svg>
                  Continue with Google SSO
                </button>
              </>
            )}
          </div>

          {/* Footer inside panel */}
          <div className="right-footer">
            Opus Dei Prelature · Sarangani · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
}
