import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MEAL_COLORS } from '../../../global/dashboard/data/mealConstants';
import { MealLegend } from '../../../global/dashboard/ui/MealLegend';
import { WEEKLY_DATA } from '../js/constants';
import { ChartTooltip } from '../ui/ChartTooltip';
import { DAY_NAMES } from '../js/weekDates';

export const WeeklyMealVolumeChart = () => (
  <div className="od-card">
    <div className="od-card-header">
      <p className="od-card-header-title">Weekly Meal Volume by Session</p>
      <p className="od-card-header-sub">
        All four sessions compared across the week
      </p>
    </div>
    <div className="p-5">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={WEEKLY_DATA} barSize={10} barGap={2}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e8dece"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: '#9e7c2e',
              fontSize: 10,
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.1em',
            }}
            tickFormatter={(day) => DAY_NAMES[day]}
          />
          <YAxis hide />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: 'rgba(90,10,30,0.04)' }}
          />
          {Object.entries(MEAL_COLORS).map(([meal, color]) => (
            <Bar key={meal} dataKey={meal} fill={color} radius={[3, 3, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <MealLegend />
    </div>
  </div>
);
