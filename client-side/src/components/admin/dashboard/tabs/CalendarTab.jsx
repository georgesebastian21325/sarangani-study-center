import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isPastDate, isToday } from '../../../global/dashboard/data/dateHelpers';
import { MEAL_COLORS } from '../../../global/dashboard/data/mealConstants';
import { CalendarSkeleton } from '../../../global/dashboard/ui/CalendarSkeleton';
import { MealLegend } from '../../../global/dashboard/ui/MealLegend';
import { getMockDayCounts } from '../data/helpers';
import { SectionRule } from '../ui/SectionRule';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarTab = ({
  calendarDate,
  calendarLoading,
  days,
  onDayClick,
  onNavigateMonth,
}) => (
  <div className="od-fade-in">
    <SectionRule>Aggregate Meal Calendar</SectionRule>

    <div className="od-card p-6 md:p-8">
      {calendarLoading ? (
        <CalendarSkeleton dayHeightClass="h-20" />
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
              {calendarDate.toLocaleString('default', {
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
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="p-2 text-center font-bold uppercase od-cinzel"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: '#b09070',
                }}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <CalendarDay key={day.key} day={day} onClick={onDayClick} />
            ))}
          </div>

          <MealLegend className="mt-6 flex flex-wrap gap-4 justify-end" />

          <p
            className="text-center mt-3 italic"
            style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: '13px',
              color: '#c8b898',
            }}
          >
            Click any day to view detailed meal counts
          </p>
        </>
      )}
    </div>
  </div>
);

const CalendarDay = ({ day, onClick }) => {
  const today = isToday(day.fullDate);
  const past = isPastDate(day.fullDate);
  const counts = day.currentMonth ? getMockDayCounts(day.key) : null;
  const total = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0;

  return (
    <div
      onClick={() => day.currentMonth && onClick(day)}
      className={`h-24 p-2 od-day ${!day.currentMonth ? 'od-other-month' : ''} ${
        today ? 'od-today' : ''
      } ${day.currentMonth && total > 0 ? 'od-has-data' : ''} ${
        past ? 'od-past' : ''
      }`}
      style={{ cursor: day.currentMonth ? 'pointer' : 'default' }}
    >
      <span
        className="text-sm font-semibold block"
        style={{
          color: today ? '#5a0a1e' : !day.currentMonth ? '#bdb0a0' : '#3b1a0a',
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

      {day.currentMonth && counts && (
        <div className="mt-1 flex flex-col gap-0.5">
          {Object.entries(counts)
            .slice(0, 3)
            .map(([meal, count]) => (
              <div key={meal} className="flex items-center gap-1">
                <div
                  className="h-1.5 rounded-full flex-1"
                  style={{
                    background: MEAL_COLORS[meal],
                    maxWidth: `${(count / 42) * 100}%`,
                    minWidth: '16%',
                  }}
                />
              </div>
            ))}
          {total > 0 && (
            <span
              className="od-cinzel"
              style={{
                fontSize: '8px',
                color: '#9c856a',
                letterSpacing: '0.04em',
              }}
            >
              {total} meals
            </span>
          )}
        </div>
      )}
    </div>
  );
};
