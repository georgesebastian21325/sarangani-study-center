import { createElement } from 'react';
import { BarChart2, Calendar, Settings, Users } from 'lucide-react';

const NAV_ITEMS = [
  { icon: BarChart2, label: 'Overview', tab: 'overview' },
  { icon: Users, label: 'Residents', tab: 'residents' },
  { icon: Calendar, label: 'Calendar', tab: 'calendar' },
  { icon: Settings, label: 'Settings', tab: null },
];

export const Sidebar = ({ activeTab, onTabChange }) => (
  <aside
    className="od-sidebar-gradient flex flex-col shrink-0 relative"
    style={{ width: '200px', borderRight: '1px solid #9e7c2e44' }}
  >
    <div
      className="w-full text-center px-4 py-6"
      style={{ borderBottom: '1px solid rgba(201,168,76,0.18)' }}
    >
      <div
        className="text-3xl mb-2"
        style={{
          color: '#c9a84c',
          filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.4))',
        }}
      >
        ✠
      </div>
      <p
        className="od-cinzel text-yellow-300/80 leading-relaxed"
        style={{ fontSize: '9px', letterSpacing: '0.18em' }}
      >
        OPUS DEI
        <br />
        PRELATURE
      </p>
      <p
        className="od-body italic text-yellow-700/50 mt-1"
        style={{ fontSize: '10px' }}
      >
        Sarangani
      </p>
    </div>

    <nav className="mt-3 flex-1">
      <p
        className="od-cinzel px-5 mb-2"
        style={{
          fontSize: '7px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.35)',
        }}
      >
        Navigation
      </p>
      {NAV_ITEMS.map(({ icon, label, tab }) => (
        <button
          key={label}
          onClick={() => tab && onTabChange(tab)}
          className={`od-nav-item ${
            activeTab === tab ? 'od-nav-active' : 'od-nav-inactive'
          }`}
          style={{ cursor: tab ? 'pointer' : 'default' }}
        >
          {createElement(icon, { size: 15, style: { opacity: 0.8 } })}
          {label}
        </button>
      ))}
    </nav>

    <div
      className="px-4 py-5 text-center"
      style={{ borderTop: '1px solid rgba(201,168,76,0.14)' }}
    >
      <p
        className="od-garamond italic"
        style={{
          fontSize: '10px',
          color: 'rgba(201,168,76,0.4)',
          lineHeight: 1.7,
        }}
      >
        "Work is not a curse
        <br />
        but a gift from God."
        <br />
        <span style={{ opacity: 0.6 }}>— St. Josemaría</span>
      </p>
    </div>
  </aside>
);
