import { X } from 'lucide-react';
import { MEAL_COLORS, MEAL_ICONS } from '../data/constants';
import { getMockDayCounts } from '../data/helpers';

export const DayDetailModal = ({ open, date, onClose }) => {
  if (!open || !date) return null;
  const counts = getMockDayCounts(date.toDateString());
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(15,8,4,0.55)', backdropFilter: 'blur(3px)' }}
    >
      <div
        className="od-modal-enter w-full max-w-sm shadow-2xl"
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
              Meal Summary
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
            className="text-sm mb-5"
            style={{ color: '#9c856a', fontFamily: "'Crimson Text', serif" }}
          >
            {date.toLocaleDateString('default', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="space-y-2 mb-5">
            {Object.entries(counts).map(([meal, count]) => (
              <div
                key={meal}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: '#fff', border: '1px solid #e8dece' }}
              >
                <div className="flex items-center gap-2.5">
                  <span style={{ fontSize: '16px' }}>{MEAL_ICONS[meal]}</span>
                  <span
                    className="capitalize"
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      fontSize: '17px',
                      color: '#3b1a0a',
                    }}
                  >
                    {meal}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: '60px', background: '#e8dece' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(count / 42) * 100}%`,
                        background: MEAL_COLORS[meal],
                      }}
                    />
                  </div>
                  <span
                    className="od-cinzel font-bold"
                    style={{
                      fontSize: '14px',
                      color: MEAL_COLORS[meal],
                      minWidth: '24px',
                      textAlign: 'right',
                    }}
                  >
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="p-3 rounded-lg flex justify-between items-center"
            style={{ background: '#5a0a1e08', border: '1px solid #5a0a1e18' }}
          >
            <span
              className="od-cinzel"
              style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: '#5a0a1e',
              }}
            >
              TOTAL MEALS
            </span>
            <span
              className="od-garamond font-bold"
              style={{ fontSize: '22px', color: '#5a0a1e' }}
            >
              {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
