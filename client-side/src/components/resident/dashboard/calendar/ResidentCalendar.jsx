import { ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';
import { isPastDate, isToday } from '../../../global/dashboard/data/dateHelpers';
import { MEAL_COLORS } from '../../../global/dashboard/data/mealConstants';
import { CalendarSkeleton } from '../../../global/dashboard/ui/CalendarSkeleton';
import { MealLegend } from '../../../global/dashboard/ui/MealLegend';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ResidentCalendar = ({
  currentDate,
  days,
  mealSelections,
  loading,
  onDayClick,
  onNavigateMonth,
  onRequestClick,
}) => (
  <div
    className="p-6 md:p-8 rounded-xl shadow-sm"
    style={{ background: '#fff', border: '1px solid #e8dece' }}
  >
    {loading ? (
      <CalendarSkeleton dayHeightClass="h-24" />
    ) : (
      <>
        <div className="flex justify-between items-center mb-8">
          <button
            className="p-2 rounded-full transition-colors hover:bg-stone-100"
            onClick={() => onNavigateMonth(-1)}
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
            onClick={() => onNavigateMonth(1)}
            style={{ color: '#5a0a1e' }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="p-2 text-center font-bold uppercase"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: '#b09070',
              }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <CalendarDay
              key={day.key}
              day={day}
              meals={mealSelections[day.key] || []}
              onDayClick={onDayClick}
              onRequestClick={onRequestClick}
            />
          ))}
        </div>

        <MealLegend className="mt-6 flex flex-wrap gap-4 justify-end" />
      </>
    )}
  </div>
);

const CalendarDay = ({ day, meals, onDayClick, onRequestClick }) => {
  const isPast = isPastDate(day.fullDate);
  const today = isToday(day.fullDate);
  const hasSelections = meals.length > 0;

  return (
    <div
      onClick={() => onDayClick(day)}
      className={`h-24 p-2 od-day ${
        !day.currentMonth ? 'od-other-month' : ''
      } ${isPast ? 'od-disabled' : ''} ${today ? 'od-today' : ''} ${
        hasSelections ? 'od-selected' : ''
      }`}
    >
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
            style={{ background: '#9e7c2e', verticalAlign: 'middle' }}
          />
        )}
      </span>

      <div className="mt-1 flex flex-col gap-0.5">
        {meals.slice(0, 3).map((meal) => (
          <div
            key={meal}
            className="h-1.5 rounded-full"
            style={{
              background: MEAL_COLORS[meal],
              width: `${(meals.indexOf(meal) + 1) * 22 + 20}%`,
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

      {!isPast && day.currentMonth && (
        <button
          className="od-edit-btn"
          onClick={(event) => onRequestClick(event, day)}
          title="Special requests"
        >
          <Edit3 size={13} />
        </button>
      )}
    </div>
  );
};
