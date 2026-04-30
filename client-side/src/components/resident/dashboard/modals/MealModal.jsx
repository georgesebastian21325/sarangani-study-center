import { CheckCircle2, Loader2, X } from 'lucide-react';
import {
  MEAL_COLORS,
  MEAL_ICONS,
  MEALS,
} from '../../../global/dashboard/data/mealConstants';

export const MealModal = ({
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
      value.includes(meal) ? value.filter((selected) => selected !== meal) : [...value, meal]
    );
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
            {MEALS.map((meal) => {
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
