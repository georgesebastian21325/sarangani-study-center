import { Bell } from 'lucide-react';

const PAGE_COPY = {
  overview: "Here's today's meal overview for Sarangani.",
  residents: 'Monitor and manage resident meal submissions.',
  calendar: 'Browse aggregate meal counts across the month.',
};

export const PageHeader = ({ activeTab, greeting, onRemind }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
    <div>
      <div className="flex items-center gap-2 mb-1">
        {greeting.icon}
        <h2
          className="od-cinzel text-base tracking-wide"
          style={{ color: '#9e7c2e' }}
        >
          {greeting.text}, Admin!
        </h2>
      </div>
      <p
        className="italic"
        style={{
          color: '#9c856a',
          fontFamily: "'Crimson Text', serif",
          fontSize: '15px',
        }}
      >
        {PAGE_COPY[activeTab]}
      </p>
    </div>
    <button
      className="od-btn-primary shadow-md"
      onClick={onRemind}
      style={{ padding: '12px 24px' }}
    >
      <Bell size={14} />
      Blast Reminders
    </button>
  </div>
);

