import { CheckCircle2, Utensils } from 'lucide-react';

export const PageHeader = ({ greeting, userName, totalMealsLogged, onLogMeal }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
    <div>
      <div className="flex items-center gap-2.5 mb-1">
        {greeting.icon}
        <h2
          className="od-cinzel tracking-wide"
          style={{ color: '#9e7c2e', fontSize: '18px' }}
        >
          {greeting.text}, {userName.split(' ')[0]}!
        </h2>
      </div>
      <p
        className="italic mt-1"
        style={{
          color: '#9c856a',
          fontFamily: "'Crimson Text', serif",
          fontSize: '19px',
        }}
      >
        Log your meal or else Mann will get angry.
      </p>
      {totalMealsLogged > 0 && (
        <div
          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: '#5a0a1e14',
            color: '#5a0a1e',
            fontFamily: "'Cinzel', serif",
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontSize: '12px',
          }}
        >
          <CheckCircle2 size={14} />
          {totalMealsLogged} meal{totalMealsLogged !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>

    <button
      className="od-btn-primary shadow-md"
      onClick={onLogMeal}
      style={{ padding: '14px 26px' }}
    >
      <Utensils size={16} />
      Log Meal
    </button>
  </div>
);
