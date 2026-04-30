import { MEALS, RESIDENTS } from '../data/constants';
import { SectionRule } from '../ui/SectionRule';

const STATUS_LEGEND = [
  { color: '#9e7c2e', label: 'Logged' },
  { color: '#d5c9b8', label: 'Missing' },
];

export const ResidentsTab = ({ onRemindResident }) => (
  <div className="od-fade-in">
    <SectionRule>Resident Logging Tracker</SectionRule>

    <div className="od-card">
      <div className="od-card-header flex justify-between items-start">
        <div>
          <p className="od-card-header-title">
            Today's Meal Submission Status
          </p>
          <p className="od-card-header-sub">
            Logged by session for each resident
          </p>
        </div>
        <div className="flex items-center gap-4">
          {STATUS_LEGEND.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span
                className="od-cinzel"
                style={{
                  fontSize: '7px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#9c856a',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              style={{
                background: 'rgba(90,10,30,0.025)',
                borderBottom: '1px solid #e8dece',
              }}
            >
              {[
                'Resident',
                'Breakfast',
                'Lunch',
                'Merienda',
                'Supper',
                'Completion',
                'Action',
              ].map((h, i) => (
                <th
                  key={h}
                  className="od-cinzel"
                  style={{
                    fontSize: '7.5px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '10px 16px',
                    fontWeight: 500,
                    color: '#9c856a',
                    textAlign: i >= 5 ? 'center' : 'left',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RESIDENTS.map((resident) => (
              <ResidentRow
                key={resident.id}
                resident={resident}
                onRemind={onRemindResident}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ResidentRow = ({ resident, onRemind }) => {
  const loggedCount = Object.values(resident.meals).filter(Boolean).length;
  const pct = Math.round((loggedCount / 4) * 100);

  return (
    <tr style={{ borderBottom: '1px solid rgba(232,222,206,0.6)' }}>
      <td style={{ padding: '12px 16px' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 od-cinzel"
            style={{
              background: '#5a0a1e14',
              color: '#5a0a1e',
              fontSize: '9px',
              letterSpacing: '0.05em',
              border: '1px solid #5a0a1e20',
            }}
          >
            {resident.avatar}
          </div>
          <span
            className="od-body font-semibold"
            style={{ fontSize: '15px', color: '#3a3430' }}
          >
            {resident.name}
          </span>
        </div>
      </td>

      {MEALS.map((meal) => (
        <td key={meal} style={{ padding: '12px 16px' }}>
          <div
            className={resident.meals[meal] ? 'od-dot-logged' : 'od-dot-missing'}
            title={resident.meals[meal] ? 'Logged' : 'Not logged'}
          >
            {resident.meals[meal] ? '✦' : '·'}
          </div>
        </td>
      ))}

      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
        <div className="od-progress-track mx-auto mb-1">
          <div
            className={`od-progress-fill ${pct === 100 ? 'od-progress-full' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span
          className="od-cinzel"
          style={{ fontSize: '8px', letterSpacing: '0.1em', color: '#9c856a' }}
        >
          {pct}%
        </span>
      </td>

      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
        {pct < 100 ? (
          <button className="od-nudge-btn" onClick={() => onRemind(resident)}>
            Remind
          </button>
        ) : (
          <span className="od-body italic" style={{ color: '#d5c9b8', fontSize: '14px' }}>
            —
          </span>
        )}
      </td>
    </tr>
  );
};
