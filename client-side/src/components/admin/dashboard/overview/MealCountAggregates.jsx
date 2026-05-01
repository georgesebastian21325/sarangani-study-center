import { WEEKLY_DATA } from '../js/constants';
import { DAY_NAMES, formatTableDate, formatWeekRange } from '../js/weekDates';

export const MealCountAggregates = ({ currentWeekDates }) => (
  <div className="od-card">
    <div className="od-card-header">
      <p className="od-card-header-title">Meal Count Aggregates</p>
      <p className="od-card-header-sub">
        Weekly totals by session, {formatWeekRange(currentWeekDates)}
      </p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <AggregateTableHead />
        <tbody>
          {WEEKLY_DATA.map((mealData) => (
            <AggregateRow
              key={mealData.day}
              mealData={mealData}
              date={currentWeekDates[mealData.day]}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AggregateTableHead = () => (
  <thead>
    <tr
      style={{
        background: 'rgba(90,10,30,0.03)',
        borderBottom: '1px solid #e8dece',
      }}
    >
      {['Day', 'BF', 'LN', 'ME', 'SP'].map((heading, index) => (
        <th
          key={heading}
          className="od-cinzel"
          style={{
            fontSize: '7.5px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '10px 12px',
            color: '#9c856a',
            textAlign: index === 0 ? 'left' : 'right',
            fontWeight: 500,
          }}
        >
          {heading}
        </th>
      ))}
    </tr>
  </thead>
);

const AggregateRow = ({ mealData, date }) => (
  <tr style={{ borderBottom: '1px solid rgba(232,222,206,0.6)' }}>
    <td
      className="od-body font-semibold"
      style={{
        padding: '10px 12px',
        fontSize: '14px',
        color: '#3a3430',
      }}
    >
      <div>{DAY_NAMES[mealData.day]}</div>
      <div
        className="od-cinzel"
        style={{
          marginTop: '2px',
          fontSize: '8px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#9c856a',
          fontWeight: 400,
        }}
      >
        {formatTableDate(date)}
      </div>
    </td>
    {[
      mealData.breakfast,
      mealData.lunch,
      mealData.merienda,
      mealData.supper,
    ].map((value, index) => (
      <td
        key={index}
        className="od-garamond"
        style={{
          padding: '10px 12px',
          fontSize: '17px',
          textAlign: 'right',
          color: '#5a0a1e',
        }}
      >
        {value}
      </td>
    ))}
  </tr>
);
