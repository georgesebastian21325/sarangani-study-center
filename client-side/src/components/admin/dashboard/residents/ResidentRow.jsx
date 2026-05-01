import { MEALS } from '../../../global/dashboard/data/mealConstants';
import { getCompletionStatus } from '../js/completionStatus';

export const ResidentRow = ({ resident, onRemind }) => {
  const loggedCount = Object.values(resident.meals).filter(Boolean).length;
  const pct = Math.round((loggedCount / 4) * 100);

  return (
    <tr style={{ borderBottom: '1px solid rgba(232,222,206,0.6)' }}>
      <ResidentNameCell resident={resident} />
      <MealStatusCells meals={resident.meals} />
      <CompletionCell pct={pct} />
      <ActionCell resident={resident} pct={pct} onRemind={onRemind} />
    </tr>
  );
};

const ResidentNameCell = ({ resident }) => (
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
);

const MealStatusCells = ({ meals }) =>
  MEALS.map((meal) => {
    const logged = meals[meal];

    return (
      <td key={meal} style={{ padding: '12px 16px' }}>
        <div
          className={logged ? 'od-dot-logged' : 'od-dot-missing'}
          title={logged ? 'Logged' : 'Missing'}
          aria-label={`${meal} ${logged ? 'logged' : 'missing'}`}
        >
          {logged ? '✓' : '!'}
        </div>
      </td>
    );
  });

const CompletionCell = ({ pct }) => {
  const status = getCompletionStatus(pct);

  return (
    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
      <div
        className="od-progress-track mx-auto mb-2"
        aria-label={`${pct}% complete, ${status.label}`}
      >
        <div
          className="od-progress-fill"
          style={{ width: `${pct}%`, background: status.color }}
        />
      </div>
      <span
        className="od-cinzel"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '58px',
          padding: '3px 7px',
          borderRadius: '999px',
          border: `1px solid ${status.border}`,
          background: status.background,
          color: status.color,
          fontSize: '8px',
          letterSpacing: '0.1em',
          fontWeight: 700,
        }}
        title={status.label}
      >
        {pct}%
      </span>
    </td>
  );
};

const ActionCell = ({ resident, pct, onRemind }) => (
  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
    {pct < 100 ? (
      <button className="od-nudge-btn" onClick={() => onRemind(resident)}>
        Remind
      </button>
    ) : (
      <span
        className="od-body italic"
        style={{ color: '#d5c9b8', fontSize: '14px' }}
      >
        —
      </span>
    )}
  </td>
);
