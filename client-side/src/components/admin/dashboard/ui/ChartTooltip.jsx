export const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: '#faf7f0',
        border: '1px solid #e8dece',
        borderRadius: '6px',
        padding: '10px 14px',
      }}
    >
      <p
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '9px',
          letterSpacing: '0.1em',
          color: '#9e7c2e',
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}
      >
        {label}
      </p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: p.fill }}
          />
          <span
            style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: '14px',
              color: '#3b1a0a',
            }}
          >
            {p.dataKey.charAt(0).toUpperCase() + p.dataKey.slice(1)}:{' '}
            <strong>{p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

