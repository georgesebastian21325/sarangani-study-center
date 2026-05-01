import { KpiSummary } from '../overview/KpiSummary';
import { MealCountAggregates } from '../overview/MealCountAggregates';
import { WeeklyMealVolumeChart } from '../overview/WeeklyMealVolumeChart';
import { getCurrentWeekDates } from '../js/weekDates.js';

export const OverviewTab = ({ completionRate, pendingCount }) => {
  const currentWeekDates = getCurrentWeekDates();

  return (
    <div className="od-fade-in space-y-6">
      <KpiSummary completionRate={completionRate} pendingCount={pendingCount} />

      <div className="grid gap-5" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <WeeklyMealVolumeChart />
        <MealCountAggregates currentWeekDates={currentWeekDates} />
      </div>
    </div>
  );
};
