import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  LogOut,
  User,
  X,
  Plus,
  Edit3,
} from 'lucide-react';

// ─── FONT LOADER ─────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Cinzel:wght@400;600&family=Crimson+Text:wght@400;600&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

// ─── GLOBAL STYLES ─────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    .od-body { font-family: 'Crimson Text', serif; }
    .od-cinzel { font-family: 'Cinzel', serif; }
    .od-garamond { font-family: 'EB Garamond', serif; }

    .od-card { background:#faf7f0; border:1px solid #e8dece; }
    .od-header { background:#faf7f0; border-bottom:1px solid #e8dece; }

    .od-btn {
      font-family:'Cinzel',serif;
      font-size:10px;
      letter-spacing:0.12em;
      text-transform:uppercase;
      border:1px solid #9e7c2e;
      color:#5a0a1e;
      padding:10px;
      transition:all .2s;
    }

    .od-btn:hover {
      background:rgba(201,168,76,0.1);
      color:#9e7c2e;
    }

    .od-day {
      border:1px solid #e8dece;
      background:#faf7f0;
      transition:all .2s;
    }

    .od-day:hover {
      border-color:#9e7c2e;
      transform:translateY(-1px);
    }

    .od-selected {
      background:#5a0a1e;
      color:#e8c96e;
      border-color:#9e7c2e;
    }

    .od-dot {
      width:6px;
      height:6px;
      border-radius:50%;
      background:#9e7c2e;
      margin-top:2px;
    }
  `}</style>
);

// ─── HELPERS ─────────────────────────────────────────────
const isSameDay = (d1, d2) =>
  new Date(d1).toDateString() === new Date(d2).toDateString();

const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compare = new Date(date);
  compare.setHours(0, 0, 0, 0);
  return compare < today;
};

const generateCalendarDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({ fullDate: new Date(year, month, -i), currentMonth: false });
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push({ fullDate: new Date(year, month, i), currentMonth: true });
  }

  while (days.length < 42) {
    days.push({
      fullDate: new Date(
        year,
        month + 1,
        days.length - totalDays - startDay + 1
      ),
      currentMonth: false,
    });
  }

  return days;
};

// ─── INPUT FIELD ─────────────────────────────────────────────
const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="od-cinzel text-[10px] text-stone-400">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 p-2 border border-[#e8dece] bg-[#faf7f0]"
    />
  </div>
);

// ─── MODAL ─────────────────────────────────────────────
const MealModal = ({ date, data, update, onClose }) => {
  if (!date) return null;

  const key = date.toDateString();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="od-card w-full max-w-lg p-6 space-y-5">
        <div className="flex justify-between">
          <div>
            <p className="od-cinzel text-[10px] text-stone-400 uppercase">
              Meal Details
            </p>
            <h2 className="od-garamond text-xl text-[#5a0a1e]">
              {date.toDateString()}
            </h2>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <InputField
          label="Viand"
          value={data.viand}
          onChange={(v) => update(key, 'viand', v)}
        />
        <InputField
          label="Sandwich"
          value={data.sandwich}
          onChange={(v) => update(key, 'sandwich', v)}
        />
        <InputField
          label="Late Meal"
          value={data.lateMeal}
          onChange={(v) => update(key, 'lateMeal', v)}
        />
        <InputField
          label="Guests"
          value={data.guests}
          onChange={(v) => update(key, 'guests', Number(v))}
        />

        <div>
          <label className="od-cinzel text-[10px] text-stone-400">
            Comment
          </label>
          <textarea
            value={data.comment}
            onChange={(e) => update(key, 'comment', e.target.value)}
            className="w-full mt-1 p-2 border border-[#e8dece] bg-[#faf7f0]"
          />
        </div>

        <button className="od-btn w-full" onClick={onClose}>
          Save
        </button>
      </div>
    </div>
  );
};

// ─── NAVBAR ─────────────────────────────────────────────
const Navbar = () => (
  <header className="od-header px-8 py-4 flex justify-between items-center">
    <h1 className="od-cinzel text-[#5a0a1e] text-sm tracking-widest">
      Resident Portal
    </h1>

    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 text-stone-500 text-sm">
        <User size={16} /> John Doe
      </div>
      <button className="text-red-800 text-sm flex items-center gap-1">
        <LogOut size={16} /> Logout
      </button>
    </div>
  </header>
);

// ─── CALENDAR DAY ─────────────────────────────────────────────
const CalendarDay = ({
  day,
  isSelected,
  hasData,
  isPast,
  onClick,
  onEdit,
  data,
}) => {
  const weekday = day.fullDate.toLocaleDateString('en-US', {
    weekday: 'short',
  });

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={!day.currentMonth || isPast}
        className={`h-20 w-full flex flex-col items-center justify-center text-sm od-day
        ${isSelected ? 'od-selected' : ''}
        ${isPast ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {/* WEEKDAY */}
        <span className="text-[9px] uppercase opacity-60">{weekday}</span>

        {/* DATE */}
        <span className="text-base font-semibold">
          {day.fullDate.getDate()}
        </span>

        {/* DATA INDICATOR */}
        {hasData && <div className="od-dot" />}

        {/* COUNT */}
        {data?.count > 1 && (
          <span className="text-[10px] mt-1">{data.count}x</span>
        )}
      </button>

      {/* EDIT ICON */}
      {!isPast && day.currentMonth && (
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="bg-white border border-[#e8dece] p-1 hover:border-[#9e7c2e]"
          >
            <Edit3 size={10} />
          </button>
        </div>
      )}
    </div>
  );
};

// ─── MAIN ─────────────────────────────────────────────
export default function ResidentDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [mealDetails, setMealDetails] = useState({});
  const [activeDate, setActiveDate] = useState(null);

  const quickAdd = (date) => {
    const key = date.toDateString();
    setMealDetails((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        count: (prev[key]?.count || 1) + 1,
      },
    }));
  };

  const toggleDate = (day) => {
    if (!day.currentMonth || isPastDate(day.fullDate)) return;

    const key = day.fullDate.toDateString();

    setSelectedDates((prev) => {
      const exists = prev.some((d) => isSameDay(d, day.fullDate));
      return exists
        ? prev.filter((d) => !isSameDay(d, day.fullDate))
        : [...prev, day.fullDate];
    });

    setMealDetails((prev) => ({
      ...prev,
      [key]: prev[key] || {
        viand: '',
        sandwich: '',
        lateMeal: '',
        comment: '',
        guests: 0,
        count: 1,
      },
    }));
  };

  const updateMealDetail = (key, field, value) => {
    setMealDetails((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const days = generateCalendarDays(currentDate);

  return (
    <>
      <FontLoader />
      <GlobalStyles />

      <div className="od-body min-h-screen" style={{ background: '#f5f0e6' }}>
        <Navbar />

        <main className="max-w-6xl mx-auto p-8">
          {/* HEADER */}
          <div className="mb-6">
            <p className="od-cinzel text-[10px] text-stone-400 uppercase tracking-widest">
              Resident Refectory System
            </p>
            <h1 className="od-garamond text-3xl text-[#5a0a1e]">Meal Logger</h1>
            <p className="text-sm text-stone-500 mt-1">
              Select your meal days and optionally provide details or special
              requests.
            </p>
          </div>

          {/* CALENDAR HEADER */}
          <div className="flex justify-between items-center mb-6">
            <ChevronLeft
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1
                  )
                )
              }
            />

            <h2 className="od-garamond text-xl text-[#5a0a1e]">
              {currentDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </h2>

            <ChevronRight
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1
                  )
                )
              }
            />
          </div>

          {/* CALENDAR */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => {
              const key = day.fullDate.toDateString();
              return (
                <CalendarDay
                  key={i}
                  day={day}
                  isSelected={selectedDates.some((d) =>
                    isSameDay(d, day.fullDate)
                  )}
                  hasData={!!mealDetails[key]}
                  data={mealDetails[key]}
                  isPast={isPastDate(day.fullDate)}
                  onClick={() => toggleDate(day)}
                  onQuickAdd={() => quickAdd(day.fullDate)}
                  onEdit={() => setActiveDate(day.fullDate)}
                />
              );
            })}
          </div>
        </main>

        {/* MODAL */}
        <MealModal
          date={activeDate}
          data={activeDate ? mealDetails[activeDate.toDateString()] || {} : {}}
          update={updateMealDetail}
          onClose={() => setActiveDate(null)}
        />
      </div>
    </>
  );
}
