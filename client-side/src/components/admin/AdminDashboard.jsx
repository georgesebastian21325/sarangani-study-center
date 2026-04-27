import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// ─── Google Fonts injection ───────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cinzel:wght@400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const MEAL_DATA = [
  { day: 'Mon', breakfast: 10, lunch: 15, dinner: 12, merienda: 8 },
  { day: 'Tue', breakfast: 12, lunch: 14, dinner: 13, merienda: 9 },
  { day: 'Wed', breakfast: 11, lunch: 18, dinner: 11, merienda: 7 },
  { day: 'Thu', breakfast: 14, lunch: 16, dinner: 15, merienda: 10 },
  { day: 'Fri', breakfast: 13, lunch: 15, dinner: 14, merienda: 8 },
];

const RESIDENTS = [
  {
    id: 1,
    name: 'Alice Johnson',
    logs: { Mon: true, Tue: true, Wed: true, Thu: false, Fri: true },
    progress: 80,
  },
  {
    id: 2,
    name: 'Bob Smith',
    logs: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true },
    progress: 100,
  },
  {
    id: 3,
    name: 'Charlie Davis',
    logs: { Mon: true, Tue: false, Wed: false, Thu: false, Fri: false },
    progress: 20,
  },
  {
    id: 4,
    name: 'Diana Prince',
    logs: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: false },
    progress: 80,
  },
];

const NAV = [
  { icon: '⊞', label: 'Overview', tab: 'overview' },
  { icon: '❧', label: 'Residents', tab: 'residents' },
  { icon: '◈', label: 'Calendar', tab: null },
  { icon: '☩', label: 'Reports', tab: null },
  { icon: '⚙', label: 'Settings', tab: null },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{ fontFamily: "'Crimson Text', serif" }}
        className="bg-amber-50 border border-yellow-700/30 rounded px-3 py-2 shadow-lg text-sm text-stone-700"
      >
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '10px',
            letterSpacing: '0.1em',
          }}
          className="text-yellow-800 uppercase mb-1"
        >
          {label}
        </p>
        <p className="text-stone-800 font-semibold">{payload[0].value} meals</p>
      </div>
    );
  }
  return null;
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, icon }) => (
  <div
    className="relative bg-amber-50 border border-stone-200 overflow-hidden transition-all duration-200 hover:shadow-md group"
    style={{ borderTop: '3px solid #9e7c2e' }}
  >
    <div
      className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
      style={{
        background:
          'radial-gradient(circle at top right, rgba(201,168,76,0.1), transparent 70%)',
      }}
    />
    <div className="p-5">
      <p
        className="text-stone-400 mb-2 tracking-widest uppercase"
        style={{ fontFamily: "'Cinzel', serif", fontSize: '7.5px' }}
      >
        {label}
      </p>
      <p
        className="text-red-950 leading-none mb-1"
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: '42px',
          fontWeight: 500,
        }}
      >
        {value}
      </p>
      <p
        className="text-stone-400 italic"
        style={{ fontFamily: "'Crimson Text', serif", fontSize: '12px' }}
      >
        {sub}
      </p>
    </div>
    <div
      className="absolute top-4 right-4 text-red-950/10 text-2xl group-hover:text-red-950/20 transition-colors"
      aria-hidden
    >
      {icon}
    </div>
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  return (
    <>
      <FontLoader />

      {/* Global style overrides */}
      <style>{`
        .od-body { font-family: 'Crimson Text', serif; }
        .od-cinzel { font-family: 'Cinzel', serif; }
        .od-garamond { font-family: 'EB Garamond', serif; }
        .od-crimson { font-family: 'Crimson Text', serif; }
        .od-sidebar-gradient { background: linear-gradient(180deg, #2a040e 0%, #1a0209 100%); }
        .od-gold-bar { background: linear-gradient(to top, #5a0a1e, #7a1530); border-radius: 2px 2px 0 0; transition: all 0.3s; }
        .od-gold-bar:hover { background: linear-gradient(to top, #9e7c2e, #c9a84c); transform: scaleY(1.04); transform-origin: bottom; }
        .od-progress { background: linear-gradient(to right, #5a0a1e, #9e7c2e); }
        .od-progress-full { background: linear-gradient(to right, #9e7c2e, #c9a84c); }
        .od-fade-in { animation: odFadeIn 0.35s ease both; }
        @keyframes odFadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .od-sidebar-border::after {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, #c9a84c88, #e8c96e88, #c9a84c88, transparent);
        }
        .od-topbar-border { border-bottom: 1px solid #e8dece; }
        .od-nav-active { background: rgba(201,168,76,0.12); color: #e8c96e; border: 1px solid rgba(201,168,76,0.22); }
        .od-nav-inactive { border: 1px solid transparent; color: rgba(240,225,200,0.55); }
        .od-nav-inactive:hover { background: rgba(201,168,76,0.07); color: rgba(240,225,200,0.85); }
        .od-tab-active { color: #5a0a1e; border-bottom: 2px solid #9e7c2e; }
        .od-tab-inactive { color: #7a6e68; border-bottom: 2px solid transparent; }
        .od-tab-inactive:hover { color: #3a3430; }
        .od-dot-logged { width:22px; height:22px; border-radius:50%; background:rgba(90,10,30,0.08); border:1.5px solid #9e7c2e; display:flex; align-items:center; justify-content:center; color:#9e7c2e; font-size:11px; }
        .od-dot-missing { width:22px; height:22px; border-radius:50%; background:rgba(232,222,206,0.5); border:1.5px solid #d5c9b8; display:flex; align-items:center; justify-content:center; color:#d5c9b8; font-size:13px; }
        .od-nudge-btn { font-family:'Cinzel',serif; font-size:8px; letter-spacing:0.1em; text-transform:uppercase; color:#5a0a1e; background:none; border:1px solid #e8dece; padding:5px 10px; border-radius:3px; cursor:pointer; transition:all 0.2s; }
        .od-nudge-btn:hover { border-color:#9e7c2e; background:rgba(201,168,76,0.08); color:#9e7c2e; }
        .od-section-rule::after { content:''; flex:1; height:1px; background:linear-gradient(to right, #e8dece, transparent); }
        .od-card { background:#faf7f0; border:1px solid #e8dece; border-radius:2px; overflow:hidden; }
        .od-card-header { padding:14px 20px; border-bottom:1px solid #e8dece; background:rgba(90,10,30,0.025); }
        tbody tr:hover { background: rgba(90,10,30,0.02); }
      `}</style>

      <div
        className="od-body flex min-h-screen"
        style={{ background: '#f5f0e6', color: '#3a3430' }}
      >
        {/* ── SIDEBAR ── */}
        <aside
          className="od-sidebar-border relative flex flex-col items-center shrink-0"
          style={{ width: '220px', borderRight: '1px solid #9e7c2e55' }}
        >
          <div className="od-sidebar-gradient w-full flex flex-col items-center h-full">
            {/* Brand */}
            <div
              className="w-full text-center px-4 py-7"
              style={{ borderBottom: '1px solid rgba(201,168,76,0.18)' }}
            >
              <div
                className="text-4xl mb-3"
                style={{
                  color: '#c9a84c',
                  filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.5))',
                }}
              >
                ✠
              </div>
              <p
                className="od-cinzel text-yellow-300/80 leading-relaxed"
                style={{ fontSize: '10px', letterSpacing: '0.18em' }}
              >
                OPUS DEI
                <br />
                PRELATURE
              </p>
              <p
                className="od-crimson italic text-yellow-700/50 mt-1"
                style={{ fontSize: '10px' }}
              >
                Sarangani Adminstration
              </p>
            </div>

            {/* Nav */}
            <div className="w-full mt-4 px-0">
              <p
                className="od-cinzel text-yellow-700/35 px-4 mb-2"
                style={{
                  fontSize: '7px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                Navigation
              </p>
              {NAV.map(({ icon, label, tab }) => (
                <button
                  key={label}
                  onClick={() => tab && setActiveTab(tab)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 mx-0 text-left transition-all duration-150 rounded-md my-0.5 od-cinzel ${
                    activeTab === tab ? 'od-nav-active' : 'od-nav-inactive'
                  }`}
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '14px',
                    cursor: tab ? 'pointer' : 'default',
                    marginLeft: '8px',
                    marginRight: '8px',
                    width: 'calc(100% - 16px)',
                  }}
                >
                  <span style={{ fontSize: '14px', opacity: 0.85 }}>
                    {icon}
                  </span>
                  {label}
                </button>
              ))}
            </div>

            {/* Quote */}
            <div
              className="mt-auto w-full px-4 py-5 text-center"
              style={{ borderTop: '1px solid rgba(201,168,76,0.14)' }}
            >
              <p
                className="od-garamond italic"
                style={{
                  fontSize: '10.5px',
                  color: 'rgba(201,168,76,0.42)',
                  lineHeight: 1.7,
                }}
              >
                "Work is not a curse but a gift from God."
                <br />
                <span style={{ opacity: 0.65 }}>— St. Josemaría Escrivá</span>
              </p>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Topbar */}
          <header
            className="od-topbar-border flex items-center justify-between px-8 py-3.5 sticky top-0 z-10"
            style={{ background: '#faf7f0' }}
          >
            <div>
              <h1
                className="od-cinzel"
                style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#5a0a1e',
                  letterSpacing: '0.04em',
                }}
              >
                Sarangani Administration
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="od-cinzel text-stone-400 border border-stone-200 px-3 py-1.5 rounded"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  background: '#f5f0e6',
                }}
              >
                {dateStr}
              </span>
              <button
                className="od-cinzel flex items-center gap-2 px-4 py-2 text-amber-50 transition-all duration-200 hover:shadow-lg active:scale-95"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '9.5px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #5a0a1e, #7a1530)',
                  border: '1px solid #7a1530',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(90,10,30,0.3)',
                }}
              >
                🔔 &nbsp;Blast Reminders
              </button>
            </div>
          </header>

          {/* Tab Bar */}
          <div
            className="flex px-8"
            style={{ borderBottom: '1px solid #e8dece', background: '#faf7f0' }}
          >
            {[
              { id: 'overview', label: 'Overview', icon: '⊞' },
              { id: 'residents', label: 'Resident Status', icon: '❧' },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 pt-3 pb-3.5 transition-all duration-150 od-cinzel ${
                  activeTab === id ? 'od-tab-active' : 'od-tab-inactive'
                }`}
                style={{
                  fontSize: '9.5px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'none',
                  marginBottom: '-1px',
                }}
              >
                {icon}&nbsp;&nbsp;{label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="od-fade-in">
                {/* Section label */}
                <div className="od-section-rule flex items-center gap-3 mb-5">
                  <p
                    className="od-cinzel text-stone-400 shrink-0"
                    style={{
                      fontSize: '7.5px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Key Indicators
                  </p>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-3 gap-4 mb-7">
                  <KpiCard
                    label="Total Residents"
                    value="42"
                    sub="Members in residence"
                    icon="✦"
                  />
                  <KpiCard
                    label="Pending Logs"
                    value="12"
                    sub="Awaiting submission"
                    icon="⚠"
                  />
                  <KpiCard
                    label="Completion Rate"
                    value={
                      <>
                        71
                        <span style={{ fontSize: '22px', opacity: 0.55 }}>
                          %
                        </span>
                      </>
                    }
                    sub="This week's compliance"
                    icon="✠"
                  />
                </div>

                {/* Data Grid */}
                <div
                  className="grid gap-5"
                  style={{ gridTemplateColumns: '1.6fr 1fr' }}
                >
                  {/* Aggregates Table */}
                  <div className="od-card">
                    <div className="od-card-header">
                      <p
                        className="od-cinzel text-red-950"
                        style={{
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Meal Count Aggregates
                      </p>
                      <p
                        className="od-crimson italic text-stone-400 mt-0.5"
                        style={{ fontSize: '11.5px' }}
                      >
                        Weekly refectory consumption by session
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr
                            style={{
                              background: 'rgba(90,10,30,0.04)',
                              borderBottom: '1px solid #e8dece',
                            }}
                          >
                            {[
                              'Day',
                              'Breakfast',
                              'Lunch',
                              'Dinner',
                              'Merienda',
                            ].map((h, i) => (
                              <th
                                key={h}
                                className="od-cinzel text-stone-400"
                                style={{
                                  fontSize: '7.5px',
                                  letterSpacing: '0.18em',
                                  textTransform: 'uppercase',
                                  padding: '10px 16px',
                                  textAlign: i === 0 ? 'left' : 'right',
                                  fontWeight: 500,
                                }}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {MEAL_DATA.map((m) => (
                            <tr
                              key={m.day}
                              style={{
                                borderBottom: '1px solid rgba(232,222,206,0.6)',
                              }}
                            >
                              <td
                                className="od-crimson font-semibold"
                                style={{
                                  padding: '11px 16px',
                                  fontSize: '14px',
                                  color: '#3a3430',
                                }}
                              >
                                {
                                  {
                                    Mon: 'Monday',
                                    Tue: 'Tuesday',
                                    Wed: 'Wednesday',
                                    Thu: 'Thursday',
                                    Fri: 'Friday',
                                  }[m.day]
                                }
                              </td>
                              {[m.breakfast, m.lunch, m.dinner, m.merienda].map(
                                (v, i) => (
                                  <td
                                    key={i}
                                    className="od-garamond"
                                    style={{
                                      padding: '11px 16px',
                                      fontSize: '17px',
                                      textAlign: 'right',
                                      color: '#5a0a1e',
                                    }}
                                  >
                                    {v}
                                  </td>
                                )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="od-card">
                    <div className="od-card-header">
                      <p
                        className="od-cinzel text-red-950"
                        style={{
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Daily Lunch Volume
                      </p>
                      <p
                        className="od-crimson italic text-stone-400 mt-0.5"
                        style={{ fontSize: '11.5px' }}
                      >
                        Peak session comparison
                      </p>
                    </div>
                    <div className="p-5">
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={MEAL_DATA} barSize={28}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e8dece"
                          />
                          <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: '#9e7c2e',
                              fontSize: 10,
                              fontFamily: "'Cinzel', serif",
                              letterSpacing: '0.1em',
                            }}
                          />
                          <YAxis hide />
                          <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'rgba(90,10,30,0.04)' }}
                          />
                          <Bar
                            dataKey="lunch"
                            radius={[3, 3, 0, 0]}
                            fill="#5a0a1e"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── RESIDENTS TAB ── */}
            {activeTab === 'residents' && (
              <div className="od-fade-in">
                <div className="od-section-rule flex items-center gap-3 mb-5">
                  <p
                    className="od-cinzel text-stone-400 shrink-0"
                    style={{
                      fontSize: '7.5px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Resident Logging Tracker
                  </p>
                </div>

                <div className="od-card">
                  <div className="od-card-header flex justify-between items-start">
                    <div>
                      <p
                        className="od-cinzel text-red-950"
                        style={{
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Weekly Meal Submission Log
                      </p>
                      <p
                        className="od-crimson italic text-stone-400 mt-0.5"
                        style={{ fontSize: '11.5px' }}
                      >
                        Detailed compliance record for the current week
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {[
                        { color: '#9e7c2e', label: 'Logged' },
                        { color: '#d5c9b8', label: 'Missing' },
                      ].map(({ color, label }) => (
                        <div
                          key={label}
                          className="flex items-center gap-1.5 od-cinzel text-stone-400"
                          style={{
                            fontSize: '7px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: color }}
                          />
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr
                          style={{
                            background: 'rgba(90,10,30,0.03)',
                            borderBottom: '1px solid #e8dece',
                          }}
                        >
                          {[
                            'Resident Name',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Completion',
                            'Action',
                          ].map((h, i) => (
                            <th
                              key={h}
                              className="od-cinzel text-stone-400"
                              style={{
                                fontSize: '7.5px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                padding: '10px 16px',
                                fontWeight: 500,
                                textAlign: i === 7 ? 'center' : 'left',
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {RESIDENTS.map((r) => (
                          <tr
                            key={r.id}
                            style={{
                              borderBottom: '1px solid rgba(232,222,206,0.6)',
                            }}
                          >
                            <td
                              className="od-crimson font-semibold"
                              style={{
                                padding: '12px 16px',
                                fontSize: '14px',
                                color: '#3a3430',
                              }}
                            >
                              {r.name}
                            </td>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                              <td key={day} style={{ padding: '12px 16px' }}>
                                <div
                                  className={
                                    r.logs[day]
                                      ? 'od-dot-logged'
                                      : 'od-dot-missing'
                                  }
                                >
                                  {r.logs[day] ? '✦' : '·'}
                                </div>
                              </td>
                            ))}
                            <td style={{ padding: '12px 16px' }}>
                              <div
                                className="w-20 h-1 rounded-full mb-1"
                                style={{ background: '#e8dece' }}
                              >
                                <div
                                  className={
                                    r.progress === 100
                                      ? 'od-progress-full'
                                      : 'od-progress'
                                  }
                                  style={{
                                    width: `${r.progress}%`,
                                    height: '100%',
                                    borderRadius: '9999px',
                                  }}
                                />
                              </div>
                              <span
                                className="od-cinzel text-stone-400"
                                style={{
                                  fontSize: '8px',
                                  letterSpacing: '0.1em',
                                }}
                              >
                                {r.progress}%
                              </span>
                            </td>
                            <td
                              style={{
                                padding: '12px 16px',
                                textAlign: 'center',
                              }}
                            >
                              {r.progress < 100 ? (
                                <button className="od-nudge-btn">Remind</button>
                              ) : (
                                <span
                                  className="od-crimson italic text-stone-300"
                                  style={{ fontSize: '13px' }}
                                >
                                  —
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
