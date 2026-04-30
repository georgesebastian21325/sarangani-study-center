import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Sparkles,
  Bell,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Users,
  BarChart2,
  Settings,
  Coffee,
  Sun,
  Moon,
  Utensils,
  X,
} from 'lucide-react';

// ─── CONSTANTS ────────────────────────────────────────────

const MEAL_COLORS = {
  breakfast: '#f97316',
  lunch: '#10b981',
  merienda: '#8b5cf6',
  supper: '#3b82f6',
};

const MEAL_ICONS = {
  breakfast: '🌅',
  lunch: '☀️',
  merienda: '🌤️',
  supper: '🌙',
};

// ─── MOCK DATA ────────────────────────────────────────────

const RESIDENTS = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'AJ',
    meals: { breakfast: true, lunch: true, merienda: false, supper: true },
    week: 14,
    total: 20,
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: 'BS',
    meals: { breakfast: true, lunch: true, merienda: true, supper: true },
    week: 20,
    total: 20,
  },
  {
    id: 3,
    name: 'Charlie Davis',
    avatar: 'CD',
    meals: { breakfast: true, lunch: false, merienda: false, supper: false },
    week: 5,
    total: 20,
  },
  {
    id: 4,
    name: 'Diana Prince',
    avatar: 'DP',
    meals: { breakfast: true, lunch: true, merienda: true, supper: false },
    week: 16,
    total: 20,
  },
  {
    id: 5,
    name: 'Ethan Moore',
    avatar: 'EM',
    meals: { breakfast: false, lunch: true, merienda: true, supper: true },
    week: 18,
    total: 20,
  },
  {
    id: 6,
    name: 'Fiona Clarke',
    avatar: 'FC',
    meals: { breakfast: true, lunch: true, merienda: false, supper: false },
    week: 10,
    total: 20,
  },
];

const WEEKLY_DATA = [
  { day: 'Mon', breakfast: 38, lunch: 42, merienda: 28, supper: 35 },
  { day: 'Tue', breakfast: 36, lunch: 40, merienda: 30, supper: 33 },
  { day: 'Wed', breakfast: 40, lunch: 38, merienda: 25, supper: 36 },
  { day: 'Thu', breakfast: 35, lunch: 44, merienda: 32, supper: 38 },
  { day: 'Fri', breakfast: 42, lunch: 41, merienda: 27, supper: 30 },
];

// ─── HELPERS ─────────────────────────────────────────────

const getGreetingConfig = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good Morning', icon: <Coffee size={18} className="text-orange-400" /> };
  if (hour < 18) return { text: 'Good Afternoon', icon: <Sun size={18} className="text-yellow-500" /> };
  return { text: 'Good Evening', icon: <Moon size={18} className="text-indigo-400" /> };
};

const isPastDate = (date) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const c = new Date(date); c.setHours(0,0,0,0);
  return c < today;
};

const isToday = (date) => {
  const t = new Date();
  return date.getDate() === t.getDate() && date.getMonth() === t.getMonth() && date.getFullYear() === t.getFullYear();
};

const generateCalendarDays = (viewDate) => {
  const year = viewDate.getFullYear(), month = viewDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first); start.setDate(1 - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i);
    return { fullDate: d, currentMonth: d.getMonth() === month, key: d.toDateString() };
  });
};

// Mock calendar meal counts per day (admin sees aggregate counts)
const getMockDayCounts = (dateKey) => {
  const seed = dateKey.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
  const rng = (n) => (seed * 7 + n * 13) % 20 + 22;
  return {
    breakfast: rng(1),
    lunch: rng(2),
    merienda: rng(3),
    supper: rng(4),
  };
};

// ─── FONTS & GLOBAL STYLES ───────────────────────────────

const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Cinzel:wght@400;600&family=Crimson+Text:wght@400;600&display=swap';
    document.head.appendChild(link);
    return () => { if (document.head.contains(link)) document.head.removeChild(link); };
  }, []);
  return null;
};

const GlobalStyles = () => (
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

    .od-dot-logged  { width:22px; height:22px; border-radius:50%; background:rgba(90,10,30,0.08);  border:1.5px solid #9e7c2e; display:flex; align-items:center; justify-content:center; color:#9e7c2e; font-size:10px; }
    .od-dot-missing { width:22px; height:22px; border-radius:50%; background:rgba(232,222,206,0.5); border:1.5px solid #d5c9b8; display:flex; align-items:center; justify-content:center; color:#d5c9b8; font-size:14px; }

    .od-progress-track { background: #e8dece; border-radius: 9999px; height: 4px; width: 80px; overflow: hidden; }
    .od-progress-fill  { height: 100%; border-radius: 9999px; background: linear-gradient(to right, #5a0a1e, #9e7c2e); }
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

// ─── TOAST ───────────────────────────────────────────────

const Toast = ({ toasts }) => (
  <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg pointer-events-auto ${t.exiting ? 'toast-exit' : 'toast-enter'} ${
          t.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          : t.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200'
          : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}
        style={{ fontFamily: "'Crimson Text', serif", fontSize: '15px' }}
      >
        {t.type === 'success' ? <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
          : t.type === 'error' ? <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          : <Loader2 size={16} className="text-amber-500 flex-shrink-0 od-spin" />}
        {t.message}
      </div>
    ))}
  </div>
);

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((message, type = 'success', duration = 3200) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((p) => p.map((t) => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 250);
    }, duration);
  }, []);
  return { toasts, show };
};

// ─── NAVBAR ──────────────────────────────────────────────

const Navbar = () => (
  <header className="px-8 py-4 flex justify-between items-center border-b" style={{ background: '#faf7f0', borderColor: '#e8dece' }}>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#5a0a1e' }}>
        <Sparkles size={16} className="text-amber-300" />
      </div>
      <h1 className="od-cinzel text-sm tracking-widest font-bold" style={{ color: '#5a0a1e' }}>
        Sarangani Administration
      </h1>
    </div>
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#6b5a47' }}>
        <User size={15} />
        <span style={{ fontFamily: "'Crimson Text', serif" }}>Admin</span>
      </div>
      <button className="flex items-center gap-1.5 text-sm hover:underline" style={{ color: '#9e1e2e', fontFamily: "'Crimson Text', serif" }}>
        <LogOut size={15} /> Logout
      </button>
    </div>
  </header>
);

// ─── REMIND MODAL ────────────────────────────────────────

const RemindModal = ({ open, onClose, onSend, sending }) => {
  const [message, setMessage] = useState('');
  if (!open) return null;

  const defaultMsg = 'Kindly submit your meal log for today before the deadline. Thank you!';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(15,8,4,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="od-modal-enter w-full max-w-md shadow-2xl" style={{ background: '#faf7f0', border: '1px solid #e8dece', borderRadius: '10px' }}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <h2 className="od-garamond text-2xl font-bold" style={{ color: '#5a0a1e' }}>Blast Reminders</h2>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone-100" style={{ color: '#9c856a' }}><X size={20} /></button>
          </div>
          <p className="text-sm mb-5" style={{ color: '#9c856a', fontFamily: "'Crimson Text', serif" }}>
            Send a reminder to all residents who have not yet submitted their meal log.
          </p>

          <div className="mb-4">
            <label className="block mb-1.5" style={{ fontFamily: "'Cinzel', serif", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9e7c2e' }}>
              Message
            </label>
            <textarea
              rows={3}
              placeholder={defaultMsg}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '100%', border: '1px solid #e8dece', borderRadius: '6px', padding: '10px 14px', fontFamily: "'Crimson Text', serif", fontSize: '16px', color: '#3b1a0a', background: '#faf7f0', resize: 'vertical', outline: 'none' }}
            />
          </div>

          <div className="p-3 rounded-lg mb-4 flex items-start gap-2" style={{ background: '#fff8e6', border: '1px solid #e8c96e40' }}>
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#9e7c2e' }} />
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '13px', color: '#7a6040' }}>
              This will notify <strong>3 residents</strong> who have pending meal logs today.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="od-btn-ghost flex-1" onClick={onClose} disabled={sending}>Cancel</button>
            <button className="od-btn-primary flex-1 justify-center" onClick={() => onSend(message || defaultMsg)} disabled={sending}>
              {sending ? <><Loader2 size={14} className="od-spin" />Sending…</> : <><Bell size={14} />Send Reminder</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── DAY DETAIL MODAL ────────────────────────────────────

const DayDetailModal = ({ open, date, onClose }) => {
  if (!open || !date) return null;
  const counts = getMockDayCounts(date.toDateString());
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(15,8,4,0.55)', backdropFilter: 'blur(3px)' }}>
      <div className="od-modal-enter w-full max-w-sm shadow-2xl" style={{ background: '#faf7f0', border: '1px solid #e8dece', borderRadius: '10px' }}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <h2 className="od-garamond text-2xl font-bold" style={{ color: '#5a0a1e' }}>Meal Summary</h2>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone-100" style={{ color: '#9c856a' }}><X size={20} /></button>
          </div>
          <p className="text-sm mb-5" style={{ color: '#9c856a', fontFamily: "'Crimson Text', serif" }}>
            {date.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-2 mb-5">
            {Object.entries(counts).map(([meal, count]) => (
              <div key={meal} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#fff', border: '1px solid #e8dece' }}>
                <div className="flex items-center gap-2.5">
                  <span style={{ fontSize: '16px' }}>{MEAL_ICONS[meal]}</span>
                  <span className="capitalize" style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px', color: '#3b1a0a' }}>{meal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 rounded-full" style={{ width: '60px', background: '#e8dece' }}>
                    <div className="h-full rounded-full" style={{ width: `${(count / 42) * 100}%`, background: MEAL_COLORS[meal] }} />
                  </div>
                  <span className="od-cinzel font-bold" style={{ fontSize: '14px', color: MEAL_COLORS[meal], minWidth: '24px', textAlign: 'right' }}>{count}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg flex justify-between items-center" style={{ background: '#5a0a1e08', border: '1px solid #5a0a1e18' }}>
            <span className="od-cinzel" style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#5a0a1e' }}>TOTAL MEALS</span>
            <span className="od-garamond font-bold" style={{ fontSize: '22px', color: '#5a0a1e' }}>{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CALENDAR SKELETON ───────────────────────────────────

const CalendarSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex justify-between items-center mb-8">
      <div className="w-8 h-8 rounded-full bg-stone-200" />
      <div className="w-48 h-6 rounded bg-stone-200" />
      <div className="w-8 h-8 rounded-full bg-stone-200" />
    </div>
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 7 }).map((_, i) => <div key={i} className="h-6 rounded bg-stone-100" />)}
      {Array.from({ length: 35 }).map((_, i) => <div key={i} className="h-20 rounded-lg bg-stone-100" />)}
    </div>
  </div>
);

// ─── CUSTOM CHART TOOLTIP ────────────────────────────────

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#faf7f0', border: '1px solid #e8dece', borderRadius: '6px', padding: '10px 14px' }}>
      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '9px', letterSpacing: '0.1em', color: '#9e7c2e', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '14px', color: '#3b1a0a' }}>
            {p.dataKey.charAt(0).toUpperCase() + p.dataKey.slice(1)}: <strong>{p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── KPI CARD ─────────────────────────────────────────────

const KpiCard = ({ label, value, sub, icon: Icon }) => (
  <div className="od-kpi">
    <p className="od-kpi-label">{label}</p>
    <p className="od-kpi-value">{value}</p>
    <p className="od-kpi-sub">{sub}</p>
    <div className="od-kpi-icon"><Icon size={36} /></div>
  </div>
);

// ─── MAIN ADMIN DASHBOARD ─────────────────────────────────

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [remindOpen, setRemindOpen] = useState(false);
  const [remindSending, setRemindSending] = useState(false);
  const [detailDate, setDetailDate] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { toasts, show: showToast } = useToast();
  const greeting = useMemo(() => getGreetingConfig(), []);
  const days = useMemo(() => generateCalendarDays(calendarDate), [calendarDate]);

  const navigateMonth = (delta) => {
    setCalendarLoading(true);
    setTimeout(() => {
      setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + delta));
      setCalendarLoading(false);
    }, 300);
  };

  const handleDayClick = (day) => {
    if (!day.currentMonth) return;
    setDetailDate(day.fullDate);
    setDetailOpen(true);
  };

  const handleSendReminder = async (msg) => {
    setRemindSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setRemindSending(false);
    setRemindOpen(false);
    showToast('Reminders sent to 3 residents.', 'success');
  };

  const completionRate = Math.round(
    (RESIDENTS.reduce((acc, r) => acc + r.week, 0) / RESIDENTS.reduce((acc, r) => acc + r.total, 0)) * 100
  );

  const pendingCount = RESIDENTS.filter((r) => Object.values(r.meals).some((v) => !v)).length;

  const NAV_ITEMS = [
    { icon: BarChart2, label: 'Overview', tab: 'overview' },
    { icon: Users, label: 'Residents', tab: 'residents' },
    { icon: Calendar, label: 'Calendar', tab: 'calendar' },
    { icon: Settings, label: 'Settings', tab: null },
  ];

  return (
    <>
      <FontLoader />
      <GlobalStyles />

      <div className="od-body flex flex-col min-h-screen" style={{ background: '#f5f0e6', color: '#3b1a0a' }}>
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          {/* ── SIDEBAR ── */}
          <aside className="od-sidebar-gradient flex flex-col shrink-0 relative" style={{ width: '200px', borderRight: '1px solid #9e7c2e44' }}>
            {/* Brand */}
            <div className="w-full text-center px-4 py-6" style={{ borderBottom: '1px solid rgba(201,168,76,0.18)' }}>
              <div className="text-3xl mb-2" style={{ color: '#c9a84c', filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.4))' }}>✠</div>
              <p className="od-cinzel text-yellow-300/80 leading-relaxed" style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
                OPUS DEI<br />PRELATURE
              </p>
              <p className="od-body italic text-yellow-700/50 mt-1" style={{ fontSize: '10px' }}>Sarangani</p>
            </div>

            {/* Nav */}
            <nav className="mt-3 flex-1">
              <p className="od-cinzel px-5 mb-2" style={{ fontSize: '7px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)' }}>Navigation</p>
              {NAV_ITEMS.map(({ icon: Icon, label, tab }) => (
                <button key={label} onClick={() => tab && setActiveTab(tab)}
                  className={`od-nav-item ${activeTab === tab ? 'od-nav-active' : 'od-nav-inactive'}`}
                  style={{ cursor: tab ? 'pointer' : 'default' }}
                >
                  <Icon size={15} style={{ opacity: 0.8 }} />
                  {label}
                </button>
              ))}
            </nav>

            {/* Quote */}
            <div className="px-4 py-5 text-center" style={{ borderTop: '1px solid rgba(201,168,76,0.14)' }}>
              <p className="od-garamond italic" style={{ fontSize: '10px', color: 'rgba(201,168,76,0.4)', lineHeight: 1.7 }}>
                "Work is not a curse<br />but a gift from God."
                <br /><span style={{ opacity: 0.6 }}>— St. Josemaría</span>
              </p>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="flex flex-col flex-1 overflow-auto">
            {/* Tab bar */}
            <div className="flex px-8 sticky top-0 z-10" style={{ background: '#faf7f0', borderBottom: '1px solid #e8dece' }}>
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'residents', label: 'Resident Status' },
                { id: 'calendar', label: 'Meal Calendar' },
              ].map(({ id, label }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`od-cinzel flex items-center gap-2 px-5 pt-3 pb-3.5 transition-all duration-150 ${activeTab === id ? 'od-tab-active' : 'od-tab-inactive'}`}
                  style={{ fontSize: '9.5px', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: 'none', borderBottom: '2px solid transparent', marginBottom: '-1px', cursor: 'pointer' }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex-1 p-6 md:p-8">
              {/* Page Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {greeting.icon}
                    <h2 className="od-cinzel text-base tracking-wide" style={{ color: '#9e7c2e' }}>
                      {greeting.text}, Admin!
                    </h2>
                  </div>
                  <p className="italic" style={{ color: '#9c856a', fontFamily: "'Crimson Text', serif", fontSize: '15px' }}>
                    {activeTab === 'overview' && "Here's today's meal overview for Sarangani."}
                    {activeTab === 'residents' && 'Monitor and manage resident meal submissions.'}
                    {activeTab === 'calendar' && 'Browse aggregate meal counts across the month.'}
                  </p>
                </div>
                <button className="od-btn-primary shadow-md" onClick={() => setRemindOpen(true)} style={{ padding: '12px 24px' }}>
                  <Bell size={14} />
                  Blast Reminders
                </button>
              </div>

              {/* ── OVERVIEW TAB ── */}
              {activeTab === 'overview' && (
                <div className="od-fade-in space-y-6">
                  {/* KPI Row */}
                  <div className="od-section-rule mb-4">
                    <p className="od-cinzel shrink-0" style={{ fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9c856a' }}>Key Indicators</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <KpiCard label="Total Residents" value="42" sub="Members in residence" icon={Users} />
                    <KpiCard label="Pending Logs" value={pendingCount} sub="Residents with gaps today" icon={AlertCircle} />
                    <KpiCard label="Completion Rate" value={`${completionRate}%`} sub="This week's compliance" icon={CheckCircle2} />
                  </div>

                  {/* Charts Row */}
                  <div className="grid gap-5" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
                    {/* Bar chart */}
                    <div className="od-card">
                      <div className="od-card-header">
                        <p className="od-card-header-title">Weekly Meal Volume by Session</p>
                        <p className="od-card-header-sub">All four sessions compared across the week</p>
                      </div>
                      <div className="p-5">
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={WEEKLY_DATA} barSize={10} barGap={2}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8dece" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false}
                              tick={{ fill: '#9e7c2e', fontSize: 10, fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' }} />
                            <YAxis hide />
                            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(90,10,30,0.04)' }} />
                            {Object.entries(MEAL_COLORS).map(([meal, color]) => (
                              <Bar key={meal} dataKey={meal} fill={color} radius={[3, 3, 0, 0]} />
                            ))}
                          </BarChart>
                        </ResponsiveContainer>
                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 justify-end mt-3">
                          {Object.entries(MEAL_COLORS).map(([meal, color]) => (
                            <div key={meal} className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                              <span className="capitalize" style={{ fontFamily: "'Crimson Text', serif", fontSize: '13px', color: '#9c856a' }}>{meal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Aggregate table */}
                    <div className="od-card">
                      <div className="od-card-header">
                        <p className="od-card-header-title">Meal Count Aggregates</p>
                        <p className="od-card-header-sub">Weekly totals by session</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr style={{ background: 'rgba(90,10,30,0.03)', borderBottom: '1px solid #e8dece' }}>
                              {['Day', 'BF', 'LN', 'ME', 'SP'].map((h, i) => (
                                <th key={h} className="od-cinzel" style={{ fontSize: '7.5px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '10px 12px', color: '#9c856a', textAlign: i === 0 ? 'left' : 'right', fontWeight: 500 }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {WEEKLY_DATA.map((m) => (
                              <tr key={m.day} style={{ borderBottom: '1px solid rgba(232,222,206,0.6)' }}>
                                <td className="od-body font-semibold" style={{ padding: '10px 12px', fontSize: '14px', color: '#3a3430' }}>
                                  {{ Mon:'Monday', Tue:'Tuesday', Wed:'Wednesday', Thu:'Thursday', Fri:'Friday' }[m.day]}
                                </td>
                                {[m.breakfast, m.lunch, m.merienda, m.supper].map((v, i) => (
                                  <td key={i} className="od-garamond" style={{ padding: '10px 12px', fontSize: '17px', textAlign: 'right', color: '#5a0a1e' }}>{v}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── RESIDENTS TAB ── */}
              {activeTab === 'residents' && (
                <div className="od-fade-in">
                  <div className="od-section-rule mb-5">
                    <p className="od-cinzel shrink-0" style={{ fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9c856a' }}>Resident Logging Tracker</p>
                  </div>

                  <div className="od-card">
                    <div className="od-card-header flex justify-between items-start">
                      <div>
                        <p className="od-card-header-title">Today's Meal Submission Status</p>
                        <p className="od-card-header-sub">Logged by session for each resident</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {[{ color: '#9e7c2e', label: 'Logged' }, { color: '#d5c9b8', label: 'Missing' }].map(({ color, label }) => (
                          <div key={label} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                            <span className="od-cinzel" style={{ fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9c856a' }}>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr style={{ background: 'rgba(90,10,30,0.025)', borderBottom: '1px solid #e8dece' }}>
                            {['Resident', 'Breakfast', 'Lunch', 'Merienda', 'Supper', 'Completion', 'Action'].map((h, i) => (
                              <th key={h} className="od-cinzel" style={{ fontSize: '7.5px', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '10px 16px', fontWeight: 500, color: '#9c856a', textAlign: i >= 5 ? 'center' : 'left' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {RESIDENTS.map((r) => {
                            const loggedCount = Object.values(r.meals).filter(Boolean).length;
                            const pct = Math.round((loggedCount / 4) * 100);
                            return (
                              <tr key={r.id} style={{ borderBottom: '1px solid rgba(232,222,206,0.6)' }}>
                                {/* Name with avatar */}
                                <td style={{ padding: '12px 16px' }}>
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 od-cinzel"
                                      style={{ background: '#5a0a1e14', color: '#5a0a1e', fontSize: '9px', letterSpacing: '0.05em', border: '1px solid #5a0a1e20' }}>
                                      {r.avatar}
                                    </div>
                                    <span className="od-body font-semibold" style={{ fontSize: '15px', color: '#3a3430' }}>{r.name}</span>
                                  </div>
                                </td>
                                {/* Meal dots */}
                                {['breakfast', 'lunch', 'merienda', 'supper'].map((meal) => (
                                  <td key={meal} style={{ padding: '12px 16px' }}>
                                    <div className={r.meals[meal] ? 'od-dot-logged' : 'od-dot-missing'} title={r.meals[meal] ? 'Logged' : 'Not logged'}>
                                      {r.meals[meal] ? '✦' : '·'}
                                    </div>
                                  </td>
                                ))}
                                {/* Progress */}
                                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                  <div className="od-progress-track mx-auto mb-1">
                                    <div className={`od-progress-fill ${pct === 100 ? 'od-progress-full' : ''}`} style={{ width: `${pct}%` }} />
                                  </div>
                                  <span className="od-cinzel" style={{ fontSize: '8px', letterSpacing: '0.1em', color: '#9c856a' }}>{pct}%</span>
                                </td>
                                {/* Action */}
                                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                  {pct < 100
                                    ? <button className="od-nudge-btn" onClick={() => showToast(`Reminder sent to ${r.name}.`, 'success')}>Remind</button>
                                    : <span className="od-body italic" style={{ color: '#d5c9b8', fontSize: '14px' }}>—</span>
                                  }
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── CALENDAR TAB ── */}
              {activeTab === 'calendar' && (
                <div className="od-fade-in">
                  <div className="od-section-rule mb-5">
                    <p className="od-cinzel shrink-0" style={{ fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9c856a' }}>Aggregate Meal Calendar</p>
                  </div>

                  <div className="od-card p-6 md:p-8">
                    {calendarLoading ? <CalendarSkeleton /> : (
                      <>
                        {/* Month Nav */}
                        <div className="flex justify-between items-center mb-8">
                          <button className="p-2 rounded-full transition-colors hover:bg-stone-100" onClick={() => navigateMonth(-1)} style={{ color: '#5a0a1e' }}>
                            <ChevronLeft size={24} />
                          </button>
                          <h2 className="od-cinzel text-lg font-bold tracking-widest" style={{ color: '#5a0a1e' }}>
                            {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </h2>
                          <button className="p-2 rounded-full transition-colors hover:bg-stone-100" onClick={() => navigateMonth(1)} style={{ color: '#5a0a1e' }}>
                            <ChevronRight size={24} />
                          </button>
                        </div>

                        {/* Day headers */}
                        <div className="grid grid-cols-7 mb-1">
                          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
                            <div key={d} className="p-2 text-center font-bold uppercase od-cinzel" style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#b09070' }}>{d}</div>
                          ))}
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-7 gap-1">
                          {days.map((day) => {
                            const today = isToday(day.fullDate);
                            const past = isPastDate(day.fullDate);
                            const counts = day.currentMonth ? getMockDayCounts(day.key) : null;
                            const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0;

                            return (
                              <div key={day.key}
                                onClick={() => day.currentMonth && handleDayClick(day)}
                                className={`h-24 p-2 od-day ${!day.currentMonth ? 'od-other-month' : ''} ${today ? 'od-today' : ''} ${day.currentMonth && total > 0 ? 'od-has-data' : ''} ${past ? 'od-past' : ''}`}
                                style={{ cursor: day.currentMonth ? 'pointer' : 'default' }}
                              >
                                <span className="text-sm font-semibold block" style={{ color: today ? '#5a0a1e' : !day.currentMonth ? '#bdb0a0' : '#3b1a0a' }}>
                                  {day.fullDate.getDate()}
                                  {today && <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#9e7c2e', verticalAlign: 'middle' }} />}
                                </span>

                                {/* Meal count bars */}
                                {day.currentMonth && counts && (
                                  <div className="mt-1 flex flex-col gap-0.5">
                                    {Object.entries(counts).slice(0, 3).map(([meal, count]) => (
                                      <div key={meal} className="flex items-center gap-1">
                                        <div className="h-1.5 rounded-full flex-1" style={{ background: MEAL_COLORS[meal], maxWidth: `${(count / 42) * 100}%`, minWidth: '16%' }} />
                                      </div>
                                    ))}
                                    {/* Total badge */}
                                    {total > 0 && (
                                      <span className="od-cinzel" style={{ fontSize: '8px', color: '#9c856a', letterSpacing: '0.04em' }}>{total} meals</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Legend */}
                        <div className="mt-6 flex flex-wrap gap-4 justify-end">
                          {Object.entries(MEAL_COLORS).map(([meal, color]) => (
                            <div key={meal} className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                              <span className="capitalize" style={{ fontFamily: "'Crimson Text', serif", fontSize: '13px', color: '#9c856a' }}>{meal}</span>
                            </div>
                          ))}
                        </div>

                        <p className="text-center mt-3 italic" style={{ fontFamily: "'Crimson Text', serif", fontSize: '13px', color: '#c8b898' }}>
                          Click any day to view detailed meal counts
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RemindModal
        open={remindOpen}
        onClose={() => setRemindOpen(false)}
        onSend={handleSendReminder}
        sending={remindSending}
      />
      <DayDetailModal
        open={detailOpen}
        date={detailDate}
        onClose={() => setDetailOpen(false)}
      />

      <Toast toasts={toasts} />
    </>
  );
}