import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AlertCircle, CheckCircle2, Users } from 'lucide-react';
import { MEAL_COLORS, WEEKLY_DATA } from '../data/constants';
import { ChartTooltip } from '../ui/ChartTooltip';
import { KpiCard } from '../ui/KpiCard';
import { MealLegend } from '../ui/MealLegend';
import { SectionRule } from '../ui/SectionRule';

const DAY_NAMES = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

export const OverviewTab = ({ completionRate, pendingCount }) => (
  <div className="od-fade-in space-y-6">
    <div>
      <SectionRule>Key Indicators</SectionRule>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <KpiCard
          label="Total Residents"
          value="42"
          sub="Members in residence"
          icon={Users}
        />
        <KpiCard
          label="Pending Logs"
          value={pendingCount}
          sub="Residents with gaps today"
          icon={AlertCircle}
        />
        <KpiCard
          label="Completion Rate"
          value={`${completionRate}%`}
          sub="This week's compliance"
          icon={CheckCircle2}
        />
      </div>
    </div>

    <div className="grid gap-5" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
      <div className="od-card">
        <div className="od-card-header">
          <p className="od-card-header-title">Weekly Meal Volume by Session</p>
          <p className="od-card-header-sub">
            All four sessions compared across the week
          </p>
        </div>
        <div className="p-5">
          <ResponsiveContainer width="100%" height={300}>
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
                <Bar
                  key={meal}
                  dataKey={meal}
                  fill={color}
                  radius={[3, 3, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <MealLegend />
        </div>
      </div>

      <div className="od-card">
        <div className="od-card-header">
          <p className="od-card-header-title">Meal Count Aggregates</p>
          <p className="od-card-header-sub">Weekly totals by session</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                style={{
                  background: 'rgba(90,10,30,0.03)',
                  borderBottom: '1px solid #e8dece',
                }}
              >
                {['Day', 'BF', 'LN', 'ME', 'SP'].map((h, i) => (
                  <th
                    key={h}
                    className="od-cinzel"
                    style={{
                      fontSize: '7.5px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '10px 12px',
                      color: '#9c856a',
                      textAlign: i === 0 ? 'left' : 'right',
                      fontWeight: 500,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WEEKLY_DATA.map((m) => (
                <tr
                  key={m.day}
                  style={{
                    borderBottom: '1px solid rgba(232,222,206,0.6)',
                  }}
                >
                  <td
                    className="od-body font-semibold"
                    style={{
                      padding: '10px 12px',
                      fontSize: '14px',
                      color: '#3a3430',
                    }}
                  >
                    {DAY_NAMES[m.day]}
                  </td>
                  {[m.breakfast, m.lunch, m.merienda, m.supper].map((v, i) => (
                    <td
                      key={i}
                      className="od-garamond"
                      style={{
                        padding: '10px 12px',
                        fontSize: '17px',
                        textAlign: 'right',
                        color: '#5a0a1e',
                      }}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
