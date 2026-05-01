export const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; }
    .od-body { font-family: 'Crimson Text', serif; }
    .od-cinzel { font-family: 'Cinzel', serif; }
    .od-garamond { font-family: 'EB Garamond', serif; }

    .od-day {
      background: #fff;
      border: 1px solid #e8dece;
      border-radius: 6px;
      transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s;
      position: relative;
      cursor: default;
      overflow: hidden;
    }
    .od-day.od-today { border-color: #9e7c2e; background: #fffdf5; }
    .od-day.od-has-data { border-color: #c8a96e40; }
    .od-day.od-other-month { background: #f9f7f3; }
    .od-day.od-past { opacity: 0.45; }

    .od-btn-primary {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: #5a0a1e;
      color: #e8c96e;
      border: none;
      border-radius: 6px;
      padding: 11px 20px;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .od-btn-primary:hover:not(:disabled) { background: #7a1428; box-shadow: 0 4px 14px rgba(90,10,30,0.25); transform: translateY(-1px); }
    .od-btn-primary:active:not(:disabled) { transform: translateY(0); }
    .od-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

    .od-btn-ghost {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: transparent;
      color: #5a0a1e;
      border: 1px solid #c8a96e;
      border-radius: 6px;
      padding: 11px 20px;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .od-btn-ghost:hover { background: rgba(201,168,76,0.08); transform: translateY(-1px); }

    .od-chip {
      font-size: 9px;
      font-family: 'Cinzel', serif;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 99px;
      font-weight: 600;
    }

    .od-nudge-btn {
      font-family: 'Cinzel', serif;
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #5a0a1e;
      background: none;
      border: 1px solid #e8dece;
      padding: 5px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .od-nudge-btn:hover { border-color: #9e7c2e; background: rgba(201,168,76,0.08); color: #9e7c2e; }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .od-modal-enter { animation: slideUp 0.22s ease-out forwards; }

    @keyframes toastIn  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes toastOut { from { opacity:1; transform:translateY(0); }   to { opacity:0; transform:translateY(10px); } }
    .toast-enter { animation: toastIn  0.25s ease-out forwards; }
    .toast-exit  { animation: toastOut 0.2s  ease-in  forwards; }

    @keyframes odFadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    .od-fade-in { animation: odFadeIn 0.3s ease both; }

    @keyframes spin { to { transform: rotate(360deg); } }
    .od-spin { animation: spin 0.8s linear infinite; }

    tbody tr { transition: background 0.12s; }
    tbody tr:hover { background: rgba(90,10,30,0.025); }

    .od-section-rule { display: flex; align-items: center; gap: 12px; }
    .od-section-rule::after { content:''; flex:1; height:1px; background: linear-gradient(to right, #e8dece, transparent); }

    .od-nav-item {
      width: calc(100% - 16px);
      margin: 2px 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 14px;
      border-radius: 6px;
      font-family: 'Crimson Text', serif;
      font-size: 15px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s;
      background: none;
      text-align: left;
    }
    .od-nav-active  { background: rgba(201,168,76,0.12); color: #e8c96e; border-color: rgba(201,168,76,0.22); }
    .od-nav-inactive { color: rgba(240,225,200,0.55); }
    .od-nav-inactive:hover { background: rgba(201,168,76,0.07); color: rgba(240,225,200,0.85); }

    .od-tab-active   { color: #5a0a1e; border-bottom: 2px solid #9e7c2e; }
    .od-tab-inactive { color: #7a6e68; border-bottom: 2px solid transparent; }
    .od-tab-inactive:hover { color: #3a3430; }

    .od-dot-logged  { width:24px; height:24px; border-radius:50%; background:#ecfdf5; border:1.5px solid #a7f3d0; display:flex; align-items:center; justify-content:center; color:#047857; font-size:13px; font-weight:700; }
    .od-dot-missing { width:24px; height:24px; border-radius:50%; background:#fef2f2; border:1.5px solid #fecaca; display:flex; align-items:center; justify-content:center; color:#dc2626; font-size:14px; font-weight:700; }

    .od-progress-track { background: #e8dece; border-radius: 9999px; height: 4px; width: 80px; overflow: hidden; }
    .od-progress-fill  { height: 100%; border-radius: 9999px; background: #b45309; transition: width 0.2s ease, background 0.2s ease; }
    .od-progress-full  { background: linear-gradient(to right, #9e7c2e, #c9a84c); }

    .od-card { background: #fff; border: 1px solid #e8dece; border-radius: 8px; overflow: hidden; }
    .od-card-header { padding: 16px 20px; border-bottom: 1px solid #e8dece; background: rgba(90,10,30,0.02); }
    .od-card-header-title { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #5a0a1e; }
    .od-card-header-sub   { font-family: 'Crimson Text', serif; font-style: italic; color: #9c856a; font-size: 13px; margin-top: 2px; }

    .od-kpi {
      background: #faf7f0;
      border: 1px solid #e8dece;
      border-top: 3px solid #9e7c2e;
      border-radius: 8px;
      padding: 20px;
      position: relative;
      overflow: hidden;
      transition: box-shadow 0.2s;
    }
    .od-kpi:hover { box-shadow: 0 4px 16px rgba(90,10,30,0.08); }
    .od-kpi-label { font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: #9c856a; margin-bottom: 8px; }
    .od-kpi-value { font-family: 'EB Garamond', serif; font-size: 44px; font-weight: 500; color: #5a0a1e; line-height: 1; margin-bottom: 4px; }
    .od-kpi-sub   { font-family: 'Crimson Text', serif; font-style: italic; font-size: 13px; color: #9c856a; }
    .od-kpi-icon  { position: absolute; top: 16px; right: 16px; font-size: 22px; opacity: 0.07; }

    .od-sidebar-gradient { background: linear-gradient(180deg, #2a040e 0%, #1a0209 100%); }
  `}</style>
);
