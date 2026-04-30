import { MEAL_COLORS } from '../data/mealConstants';

export const MealLegend = ({
  className = 'flex flex-wrap gap-4 justify-end mt-3',
}) => (
  <div className={className}>
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
);

