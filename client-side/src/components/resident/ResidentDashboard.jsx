import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  X,
  Edit3,
  Calendar,
  Utensils,
  Coffee,
  Sun,
  Moon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';

// ─── HELPERS ─────────────────────────────────────────────

const getGreetingConfig = () => {
  const hour = new Date().getHours();
  if (hour < 12)
    return {
      text: 'Good Morning',
      icon: <Coffee size={20} className="text-orange-400" />,
    };
  if (hour < 18)
    return {
      text: 'Good Afternoon',
      icon: <Sun size={20} className="text-yellow-500" />,
    };
  return {
    text: 'Good Evening',
    icon: <Moon size={20} className="text-indigo-400" />,
  };
};

const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compare = new Date(date);
  compare.setHours(0, 0, 0, 0);
  return compare < today;
};

const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const generateCalendarDays = (viewDate) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(1 - firstDayOfMonth.getDay());
  const days = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push({
      fullDate: date,
      currentMonth: date.getMonth() === month,
      key: date.toDateString(),
    });
  }
  return days;
};

const MEAL_COLORS = {
  breakfast: '#f97316',
  lunch: '#10b981',
  merienda: '#8b5cf6',
  supper: '#3b82f6',
};

// ─── FONTS & GLOBAL STYLES ───────────────────────────────

const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Cinzel:wght@400;600&family=Crimson+Text:wght@400;600&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);
  return null;
};

const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; }
    .od-body { font-family: 'Crimson Text', serif; }
    .od-cinzel { font-family: 'Cinzel', serif; }
    .od-garamond { font-family: 'EB Garamond', serif; }

    /* Smooth calendar cell hover */
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
    .od-day.od-other-month {
      background: #f9f7f3;
    }

    /* Primary button */
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

    /* Ghost button */
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

    /* Meal chip */
    .od-chip {
      font-size: 9px;
      font-family: 'Cinzel', serif;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 2px 5px;
      border-radius: 99px;
      font-weight: 600;
    }

    /* Icon edit button on calendar cell */
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

    /* Checkbox custom */
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

    /* Slide-up animation for modal */
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .od-modal-enter { animation: slideUp 0.22s ease-out forwards; }

    /* Toast */
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes toastOut {
      from { opacity: 1; transform: translateY(0); }
      to   { opacity: 0; transform: translateY(10px); }
    }
    .toast-enter { animation: toastIn 0.25s ease-out forwards; }
    .toast-exit  { animation: toastOut 0.2s ease-in forwards; }

    /* Number input */
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

    /* Spinner spin */
    @keyframes spin { to { transform: rotate(360deg); } }
    .od-spin { animation: spin 0.8s linear infinite; }

    /* Progress bar */
    @keyframes progressFill {
      from { width: 0%; }
      to   { width: 100%; }
    }
    .od-progress { animation: progressFill 1.6s ease-out forwards; }
  `}</style>
);

// ─── TOAST ───────────────────────────────────────────────

const Toast = ({ toasts }) => (
  <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium pointer-events-auto ${
          t.exiting ? 'toast-exit' : 'toast-enter'
        } ${
          t.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : t.type === 'error'
            ? 'bg-red-50 text-red-800 border border-red-200'
            : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}
        style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px' }}
      >
        {t.type === 'success' ? (
          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
        ) : t.type === 'error' ? (
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
        ) : (
          <Loader2 size={16} className="text-amber-500 flex-shrink-0 od-spin" />
        )}
        {t.message}
      </div>
    ))}
  </div>
);

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success', duration = 3200) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        250
      );
    }, duration);
  }, []);

  return { toasts, show };
};

// ─── NAVBAR ──────────────────────────────────────────────

const Navbar = ({ userName }) => (
  <header
    className="px-8 py-4 flex justify-between items-center border-b"
    style={{ background: '#faf7f0', borderColor: '#e8dece' }}
  >
    <div className="flex items-center gap-3">
      {/* Logo placeholder — replace with your <img src={SaranganiLogo} ... /> */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: '#5a0a1e' }}
      >
        <Sparkles size={16} className="text-amber-300" />
      </div>
      <h1
        className="od-cinzel text-sm tracking-widest font-bold"
        style={{ color: '#5a0a1e' }}
      >
        Sarangani Resident Portal
      </h1>
    </div>
    <div className="flex items-center gap-5">
      <div
        className="flex items-center gap-2 text-sm font-medium"
        style={{ color: '#6b5a47' }}
      >
        <User size={15} />
        <span style={{ fontFamily: "'Crimson Text', serif" }}>{userName}</span>
      </div>
      <button
        className="flex items-center gap-1.5 text-sm hover:underline"
        style={{ color: '#9e1e2e', fontFamily: "'Crimson Text', serif" }}
      >
        <LogOut size={15} /> Logout
      </button>
    </div>
  </header>
);

// ─── CONFIRM MODAL ───────────────────────────────────────

const ConfirmModal = ({
  open,
  onClose,
  mealSelections,
  requestData,
  onSubmit,
  submitting,
  submitError,
}) => {
  if (!open) return null;

  const modifiedDates = Array.from(
    new Set([
      ...Object.keys(mealSelections).filter(
        (k) => mealSelections[k].length > 0
      ),
      ...Object.keys(requestData).filter((k) => {
        const r = requestData[k];
        return r?.viand || r?.sandwich || r?.eggs || r?.guests > 0;
      }),
    ])
  ).sort((a, b) => new Date(a) - new Date(b));

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[60] p-4"
      style={{ background: 'rgba(15,8,4,0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="od-modal-enter w-full max-w-2xl flex flex-col shadow-2xl"
        style={{
          background: '#faf7f0',
          border: '1px solid #e8dece',
          borderRadius: '10px',
          maxHeight: '82vh',
        }}
      >
        {/* Header */}
        <div
          className="p-6 flex justify-between items-center"
          style={{
            borderBottom: '1px solid #e8dece',
            background: '#fff',
            borderRadius: '10px 10px 0 0',
          }}
        >
          <div>
            <h2
              className="od-garamond text-2xl font-bold"
              style={{ color: '#5a0a1e' }}
            >
              Review Your Selection
            </h2>
            <p
              className="text-sm mt-0.5"
              style={{ color: '#9c856a', fontFamily: "'Crimson Text', serif" }}
            >
              {modifiedDates.length} day{modifiedDates.length !== 1 ? 's' : ''}{' '}
              scheduled
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-stone-100 transition-colors"
            style={{ color: '#9c856a' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {modifiedDates.length === 0 ? (
            <div className="text-center py-14 flex flex-col items-center gap-3">
              <Calendar size={36} style={{ color: '#d4b896' }} />
              <p
                className="italic"
                style={{
                  color: '#9c856a',
                  fontFamily: "'Crimson Text', serif",
                  fontSize: '17px',
                }}
              >
                No meals selected yet. Click on a date to get started.
              </p>
            </div>
          ) : (
            modifiedDates.map((dateKey) => {
              const meals = mealSelections[dateKey] || [];
              const req = requestData[dateKey];
              const hasReq =
                req &&
                (req.viand || req.sandwich || req.eggs || req.guests > 0);
              return (
                <div
                  key={dateKey}
                  className="p-4 flex flex-col md:flex-row md:justify-between gap-3"
                  style={{
                    background: '#fff',
                    border: '1px solid #e8dece',
                    borderRadius: '8px',
                  }}
                >
                  <div>
                    <h3
                      className="font-bold text-sm flex items-center gap-2 mb-2"
                      style={{ color: '#5a0a1e' }}
                    >
                      <Calendar size={13} style={{ flexShrink: 0 }} />
                      {dateKey}
                    </h3>
                    {meals.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {meals.map((m) => (
                          <span
                            key={m}
                            className="od-chip"
                            style={{
                              background: `${MEAL_COLORS[m]}18`,
                              color: MEAL_COLORS[m],
                              border: `1px solid ${MEAL_COLORS[m]}40`,
                            }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {hasReq && (
                    <div
                      className="text-xs pt-2 md:pt-0 md:pl-4 flex-shrink-0"
                      style={{
                        borderTop: '1px solid #f0ebe3',
                        color: '#7a6355',
                      }}
                    >
                      <span
                        className="uppercase tracking-wider font-bold block mb-1.5"
                        style={{
                          fontSize: '9px',
                          color: '#9e7c2e',
                          fontFamily: "'Cinzel', serif",
                        }}
                      >
                        Special Requests
                      </span>
                      <ul
                        className="space-y-0.5 list-disc list-inside"
                        style={{
                          fontFamily: "'Crimson Text', serif",
                          fontSize: '14px',
                        }}
                      >
                        {req.viand && <li>Extra Viand</li>}
                        {req.sandwich && <li>Sandwich</li>}
                        {req.eggs && <li>Eggs</li>}
                        {req.guests > 0 && <li>Guests: {req.guests}</li>}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Error Banner */}
        {submitError && (
          <div
            className="mx-6 mb-0 p-3 rounded-lg flex items-center gap-2 text-sm"
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              fontFamily: "'Crimson Text', serif",
              fontSize: '15px',
            }}
          >
            <AlertCircle size={15} className="flex-shrink-0" />
            {submitError}
          </div>
        )}

        {/* Footer */}
        <div
          className="p-6 flex gap-3"
          style={{
            borderTop: '1px solid #e8dece',
            background: '#f7f4ee',
            borderRadius: '0 0 10px 10px',
          }}
        >
          <button
            className="od-btn-ghost flex-1"
            onClick={onClose}
            disabled={submitting}
          >
            Back to Edit
          </button>
          <button
            className="od-btn-primary flex-1 justify-center"
            disabled={modifiedDates.length === 0 || submitting}
            onClick={onSubmit}
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="od-spin" />
                Submitting…
              </>
            ) : (
              <>
                <CheckCircle2 size={14} />
                Confirm & Submit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── MEAL MODAL ──────────────────────────────────────────

const MealModal = ({
  open,
  date,
  value,
  onChange,
  onSave,
  onClose,
  saving,
}) => {
  if (!open) return null;

  const toggleMeal = (meal) => {
    onChange(
      value.includes(meal) ? value.filter((m) => m !== meal) : [...value, meal]
    );
  };

  const MEAL_ICONS = {
    breakfast: '🌅',
    lunch: '☀️',
    merienda: '🌤️',
    supper: '🌙',
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(15,8,4,0.55)', backdropFilter: 'blur(3px)' }}
    >
      <div
        className="od-modal-enter w-full max-w-md shadow-2xl"
        style={{
          background: '#faf7f0',
          border: '1px solid #e8dece',
          borderRadius: '10px',
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <h2
              className="od-garamond text-2xl font-bold"
              style={{ color: '#5a0a1e' }}
            >
              Select Meals
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-stone-100 transition-colors"
              style={{ color: '#9c856a' }}
            >
              <X size={20} />
            </button>
          </div>
          <p
            className="text-sm mb-6"
            style={{ color: '#9c856a', fontFamily: "'Crimson Text', serif" }}
          >
            {date?.toLocaleDateString('default', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="space-y-2">
            {['breakfast', 'lunch', 'merienda', 'supper'].map((meal) => {
              const checked = value.includes(meal);
              return (
                <label
                  key={meal}
                  className="flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all"
                  style={{
                    border: checked
                      ? `1.5px solid ${MEAL_COLORS[meal]}80`
                      : '1px solid #e8dece',
                    background: checked ? `${MEAL_COLORS[meal]}0a` : '#fff',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: '18px' }}>{MEAL_ICONS[meal]}</span>
                    <div>
                      <span
                        className="capitalize font-semibold"
                        style={{
                          fontFamily: "'Crimson Text', serif",
                          fontSize: '17px',
                          color: '#3b1a0a',
                        }}
                      >
                        {meal}
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="od-checkbox"
                    checked={checked}
                    onChange={() => toggleMeal(meal)}
                  />
                </label>
              );
            })}
          </div>

          <button
            className="od-btn-primary w-full mt-6 justify-center"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 size={14} className="od-spin" /> Saving…
              </>
            ) : (
              <>
                <CheckCircle2 size={14} /> Save Selections
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── REQUEST MODAL ───────────────────────────────────────

const RequestModal = ({
  open,
  date,
  request,
  setRequest,
  onClose,
  onSave,
  saving,
}) => {
  if (!open) return null;

  const toggle = (field) =>
    setRequest(date.toDateString(), { ...request, [field]: !request[field] });

  const ITEM_LABELS = {
    viand: '🍖 Extra Viand',
    sandwich: '🥪 Sandwich',
    eggs: '🥚 Eggs',
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(15,8,4,0.55)', backdropFilter: 'blur(3px)' }}
    >
      <div
        className="od-modal-enter w-full max-w-md shadow-2xl"
        style={{
          background: '#faf7f0',
          border: '1px solid #e8dece',
          borderRadius: '10px',
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <h2
              className="od-garamond text-2xl font-bold"
              style={{ color: '#5a0a1e' }}
            >
              Special Requests
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-stone-100"
              style={{ color: '#9c856a' }}
            >
              <X size={20} />
            </button>
          </div>
          <p
            className="text-sm mb-6"
            style={{ color: '#9c856a', fontFamily: "'Crimson Text', serif" }}
          >
            {date?.toLocaleDateString('default', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="space-y-2">
            {['viand', 'sandwich', 'eggs'].map((item) => {
              const checked = request?.[item] || false;
              return (
                <label
                  key={item}
                  className="flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all"
                  style={{
                    border: checked
                      ? '1.5px solid #9e7c2e80'
                      : '1px solid #e8dece',
                    background: checked ? '#9e7c2e0a' : '#fff',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      fontSize: '17px',
                      color: '#3b1a0a',
                    }}
                  >
                    {ITEM_LABELS[item]}
                  </span>
                  <input
                    type="checkbox"
                    className="od-checkbox"
                    checked={checked}
                    onChange={() => toggle(item)}
                  />
                </label>
              );
            })}

            <div className="pt-2">
              <label
                className="block mb-1.5"
                style={{
                  fontSize: '11px',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#9e7c2e',
                }}
              >
                Number of Guests
              </label>
              <input
                type="number"
                min="0"
                className="od-number-input"
                value={request?.guests || 0}
                onChange={(e) =>
                  setRequest(date.toDateString(), {
                    ...request,
                    guests: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <button
            className="od-btn-primary w-full mt-6 justify-center"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 size={14} className="od-spin" /> Saving…
              </>
            ) : (
              <>
                <CheckCircle2 size={14} /> Save Request
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── LOADING SKELETON ────────────────────────────────────

const CalendarSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex justify-between items-center mb-8">
      <div className="w-8 h-8 rounded-full bg-stone-200" />
      <div className="w-48 h-6 rounded bg-stone-200" />
      <div className="w-8 h-8 rounded-full bg-stone-200" />
    </div>
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="h-6 rounded bg-stone-100" />
      ))}
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i} className="h-24 rounded-lg bg-stone-100" />
      ))}
    </div>
  </div>
);

// ─── MAIN DASHBOARD ─────────────────────────────────────

export default function ResidentDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(null);
  const [mealModalOpen, setMealModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [mealSelections, setMealSelections] = useState({});
  const [requestData, setRequestData] = useState({});

  // Loading states
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [mealSaving, setMealSaving] = useState(false);
  const [requestSaving, setRequestSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { toasts, show: showToast } = useToast();

  const user = { name: 'John Doe' };
  const greeting = useMemo(() => getGreetingConfig(), []);
  const days = useMemo(() => generateCalendarDays(currentDate), [currentDate]);

  // Simulate initial calendar load
  useEffect(() => {
    const t = setTimeout(() => setCalendarLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Reload when navigating months
  const navigateMonth = (delta) => {
    setCalendarLoading(true);
    setTimeout(() => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + delta)
      );
      setCalendarLoading(false);
    }, 350);
  };

  const handleDayClick = (day) => {
    if (!day.currentMonth || isPastDate(day.fullDate)) return;
    setActiveDate(day.fullDate);
    setMealModalOpen(true);
  };

  const handleRequestClick = (e, day) => {
    e.stopPropagation();
    if (!day.currentMonth || isPastDate(day.fullDate)) return;
    setActiveDate(day.fullDate);
    setRequestModalOpen(true);
  };

  const handleMealSave = async () => {
    setMealSaving(true);
    await new Promise((r) => setTimeout(r, 600)); // Simulated async save
    setMealSaving(false);
    setMealModalOpen(false);
    showToast('Meal selections saved!', 'success');
  };

  const handleRequestSave = async () => {
    setRequestSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setRequestSaving(false);
    setRequestModalOpen(false);
    showToast('Special request saved!', 'success');
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      await new Promise((r, rej) => {
        // Simulate ~15% failure rate for demo purposes
        setTimeout(
          () => (Math.random() > 0.15 ? r() : rej(new Error('Network error'))),
          1600
        );
      });
      setSubmitting(false);
      setConfirmOpen(false);
      showToast('Meals logged successfully!', 'success', 4000);
    } catch {
      setSubmitting(false);
      setSubmitError('Something went wrong. Please try again.');
      showToast('Submission failed. Please retry.', 'error');
    }
  };

  const totalMealsLogged = Object.values(mealSelections).reduce(
    (acc, m) => acc + m.length,
    0
  );

  return (
    <>
      <FontLoader />
      <GlobalStyles />

      <div
        className="od-body min-h-screen"
        style={{ background: '#f5f0e6', color: '#3b1a0a' }}
      >
        <Navbar userName={user.name} />

        <main className="max-w-6xl mx-auto p-4 md:p-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                {greeting.icon}
                <h2
                  className="od-cinzel text-base tracking-wide"
                  style={{ color: '#9e7c2e' }}
                >
                  {greeting.text}, {user.name.split(' ')[0]}!
                </h2>
              </div>
              <p
                className="italic mt-1"
                style={{
                  color: '#9c856a',
                  fontFamily: "'Crimson Text', serif",
                  fontSize: '16px',
                }}
              >
                Log your meal or else Mann will get angry.
              </p>
              {totalMealsLogged > 0 && (
                <div
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                  style={{
                    background: '#5a0a1e14',
                    color: '#5a0a1e',
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  <CheckCircle2 size={12} />
                  {totalMealsLogged} meal{totalMealsLogged !== 1 ? 's' : ''}{' '}
                  selected
                </div>
              )}
            </div>

            <button
              className="od-btn-primary shadow-md"
              onClick={() => setConfirmOpen(true)}
              style={{ padding: '12px 24px' }}
            >
              <Utensils size={14} />
              Log Meal
            </button>
          </div>

          {/* Calendar Card */}
          <div
            className="p-6 md:p-8 rounded-xl shadow-sm"
            style={{ background: '#fff', border: '1px solid #e8dece' }}
          >
            {calendarLoading ? (
              <CalendarSkeleton />
            ) : (
              <>
                {/* Month Nav */}
                <div className="flex justify-between items-center mb-8">
                  <button
                    className="p-2 rounded-full transition-colors hover:bg-stone-100"
                    onClick={() => navigateMonth(-1)}
                    style={{ color: '#5a0a1e' }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <h2
                    className="od-cinzel text-lg font-bold tracking-widest"
                    style={{ color: '#5a0a1e' }}
                  >
                    {currentDate.toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h2>
                  <button
                    className="p-2 rounded-full transition-colors hover:bg-stone-100"
                    onClick={() => navigateMonth(1)}
                    style={{ color: '#5a0a1e' }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 mb-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (d) => (
                      <div
                        key={d}
                        className="p-2 text-center font-bold uppercase"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          color: '#b09070',
                        }}
                      >
                        {d}
                      </div>
                    )
                  )}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day) => {
                    const meals = mealSelections[day.key] || [];
                    const isPast = isPastDate(day.fullDate);
                    const today = isToday(day.fullDate);
                    const hasSelections = meals.length > 0;

                    return (
                      <div
                        key={day.key}
                        onClick={() => handleDayClick(day)}
                        className={`h-24 p-2 od-day ${
                          !day.currentMonth ? 'od-other-month' : ''
                        } ${isPast ? 'od-disabled' : ''} ${
                          today ? 'od-today' : ''
                        } ${hasSelections ? 'od-selected' : ''}`}
                      >
                        {/* Date number */}
                        <span
                          className="text-sm font-semibold block"
                          style={{
                            color: today
                              ? '#5a0a1e'
                              : hasSelections
                              ? '#5a0a1e'
                              : !day.currentMonth
                              ? '#bdb0a0'
                              : '#3b1a0a',
                          }}
                        >
                          {day.fullDate.getDate()}
                          {today && (
                            <span
                              className="ml-1 inline-block w-1.5 h-1.5 rounded-full"
                              style={{
                                background: '#9e7c2e',
                                verticalAlign: 'middle',
                              }}
                            />
                          )}
                        </span>

                        {/* Meal chips */}
                        <div className="mt-1 flex flex-col gap-0.5">
                          {meals.slice(0, 3).map((m) => (
                            <div
                              key={m}
                              className="h-1.5 rounded-full"
                              style={{
                                background: MEAL_COLORS[m],
                                width: `${(meals.indexOf(m) + 1) * 22 + 20}%`,
                                maxWidth: '80%',
                              }}
                            />
                          ))}
                          {meals.length > 3 && (
                            <span
                              style={{
                                fontSize: '9px',
                                color: '#9c856a',
                                fontFamily: "'Cinzel', serif",
                              }}
                            >
                              +{meals.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Edit/request button */}
                        {!isPast && day.currentMonth && (
                          <button
                            className="od-edit-btn"
                            onClick={(e) => handleRequestClick(e, day)}
                            title="Special requests"
                          >
                            <Edit3 size={13} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap gap-4 justify-end">
                  {Object.entries(MEAL_COLORS).map(([meal, color]) => (
                    <div key={meal} className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: color }}
                      />
                      <span
                        className="capitalize"
                        style={{
                          fontFamily: "'Crimson Text', serif",
                          fontSize: '13px',
                          color: '#9c856a',
                        }}
                      >
                        {meal}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>

        {/* Modals */}
        <ConfirmModal
          open={confirmOpen}
          onClose={() => {
            setConfirmOpen(false);
            setSubmitError(null);
          }}
          mealSelections={mealSelections}
          requestData={requestData}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitError={submitError}
        />
        <MealModal
          open={mealModalOpen}
          date={activeDate}
          value={mealSelections[activeDate?.toDateString()] || []}
          onChange={(val) =>
            setMealSelections((prev) => ({
              ...prev,
              [activeDate.toDateString()]: val,
            }))
          }
          onSave={handleMealSave}
          onClose={() => setMealModalOpen(false)}
          saving={mealSaving}
        />
        <RequestModal
          open={requestModalOpen}
          date={activeDate}
          request={
            requestData[activeDate?.toDateString()] || {
              viand: false,
              sandwich: false,
              eggs: false,
              guests: 0,
            }
          }
          setRequest={(dateStr, data) =>
            setRequestData((prev) => ({ ...prev, [dateStr]: data }))
          }
          onSave={handleRequestSave}
          onClose={() => setRequestModalOpen(false)}
          saving={requestSaving}
        />

        {/* Toast Notifications */}
        <Toast toasts={toasts} />
      </div>
    </>
  );
}
