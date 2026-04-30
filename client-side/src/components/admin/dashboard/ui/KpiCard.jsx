import { createElement } from 'react';

export const KpiCard = ({ label, value, sub, icon }) => (
  <div className="od-kpi">
    <p className="od-kpi-label">{label}</p>
    <p className="od-kpi-value">{value}</p>
    <p className="od-kpi-sub">{sub}</p>
    <div className="od-kpi-icon">
      {createElement(icon, { size: 36 })}
    </div>
  </div>
);
