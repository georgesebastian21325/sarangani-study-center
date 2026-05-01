export const GlobalStyles = () => (
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
