import { TABS } from '../data/constants';

export const TabBar = ({ activeTab, onTabChange }) => (
  <div
    className="flex px-8 sticky top-0 z-10"
    style={{
      background: '#faf7f0',
      borderBottom: '1px solid #e8dece',
    }}
  >
    {TABS.map(({ id, label }) => (
      <button
        key={id}
        onClick={() => onTabChange(id)}
        className={`od-cinzel flex items-center gap-2 px-5 pt-3 pb-3.5 transition-all duration-150 ${
          activeTab === id ? 'od-tab-active' : 'od-tab-inactive'
        }`}
        style={{
          fontSize: '9.5px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          background: 'none',
          border: 'none',
          borderBottom: '2px solid transparent',
          marginBottom: '-1px',
          cursor: 'pointer',
        }}
      >
        {label}
      </button>
    ))}
  </div>
);
