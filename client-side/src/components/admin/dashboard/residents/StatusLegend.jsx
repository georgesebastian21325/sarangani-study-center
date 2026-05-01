import { STATUS_LEGEND } from '../js/residentStatusLegend';

export const StatusLegend = () => (
  <div className="flex items-center gap-4">
    {STATUS_LEGEND.map(({ color, background, border, label }) => (
      <div key={label} className="flex items-center gap-1.5">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background,
            border: `1.5px solid ${border}`,
            boxShadow: `inset 0 0 0 3px ${color}`,
          }}
        />
        <span
          className="od-cinzel"
          style={{
            fontSize: '7.5px',
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
