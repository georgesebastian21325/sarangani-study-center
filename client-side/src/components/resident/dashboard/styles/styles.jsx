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
      cursor: pointer;
      overflow: hidden;
    }
    .od-day:hover:not(.od-disabled) {
      border-color: #9e7c2e;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(90,10,30,0.1);
    }
    .od-day.od-selected {
      border: 2px solid #5a0a1e;
      background: #fdfcf8;
    }
    .od-day.od-today {
      border-color: #9e7c2e;
      background: #fffdf5;
    }
    .od-day.od-disabled {
      opacity: 0.35;
      cursor: not-allowed;
      background: #f5f3ef;
      pointer-events: none;
    }
    .od-day.od-other-month { background: #f9f7f3; }

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
    .od-btn-primary:hover:not(:disabled) {
      background: #7a1428;
      box-shadow: 0 4px 14px rgba(90,10,30,0.25);
      transform: translateY(-1px);
    }
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
    .od-btn-ghost:active { transform: translateY(0); }

    .od-chip {
      font-size: 9px;
      font-family: 'Cinzel', serif;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 2px 5px;
      border-radius: 99px;
      font-weight: 600;
    }

    .od-edit-btn {
      position: absolute;
      top: 4px; right: 4px;
      padding: 3px;
      border-radius: 4px;
      color: #9e7c2e;
      opacity: 0;
      transition: opacity 0.15s, background 0.15s;
      cursor: pointer;
      background: transparent;
      border: none;
      line-height: 0;
    }
    .od-day:hover .od-edit-btn { opacity: 1; }
    .od-edit-btn:hover { background: rgba(158,124,46,0.12); }

    .od-checkbox {
      width: 18px; height: 18px;
      border-radius: 4px;
      border: 1.5px solid #c8a96e;
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
      flex-shrink: 0;
    }
    .od-checkbox:checked {
      background: #5a0a1e;
      border-color: #5a0a1e;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3.5L4 6.5L9 1' stroke='%23e8c96e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .od-modal-enter { animation: slideUp 0.22s ease-out forwards; }

    @keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes toastOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(10px); } }
    .toast-enter { animation: toastIn 0.25s ease-out forwards; }
    .toast-exit  { animation: toastOut 0.2s ease-in forwards; }

    .od-number-input {
      width: 100%;
      border: 1px solid #e8dece;
      padding: 10px 14px;
      border-radius: 6px;
      font-family: 'Crimson Text', serif;
      font-size: 16px;
      color: #3b1a0a;
      background: #faf7f0;
      transition: border-color 0.15s;
      outline: none;
    }
    .od-number-input:focus { border-color: #9e7c2e; }

    @keyframes spin { to { transform: rotate(360deg); } }
    .od-spin { animation: spin 0.8s linear infinite; }

    @keyframes progressFill { from { width: 0%; } to { width: 100%; } }
    .od-progress { animation: progressFill 1.6s ease-out forwards; }
  `}</style>
);
