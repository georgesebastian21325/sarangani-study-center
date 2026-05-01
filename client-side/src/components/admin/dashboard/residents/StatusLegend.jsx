import { STATUS_LEGEND } from '../js/residentStatusLegend';

export const StatusLegend = () => (
  <div className="flex items-center gap-4">
    {STATUS_LEGEND.map(({ color, label }) => (
      <div key={label} className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span
          className="od-cinzel"
          style={{
            fontSize: '7px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#9c856a',
          }}
        >
          {label}
        </span>
      </div>
    ))}
  </div>
);
