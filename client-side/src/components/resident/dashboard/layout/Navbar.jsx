import { LogOut, Sparkles, User } from 'lucide-react';

export const Navbar = ({ userName }) => (
  <header
    className="px-8 py-4 flex justify-between items-center border-b"
    style={{ background: '#faf7f0', borderColor: '#e8dece' }}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: '#5a0a1e' }}
      >
        <Sparkles size={16} className="text-amber-300" />
      </div>
      <h1
        className="od-cinzel tracking-widest font-bold"
        style={{ color: '#5a0a1e' }}
      >
        Sarangani Resident Portal
      </h1>
    </div>
    <div className="flex items-center gap-5">
      <div
        className="flex items-center gap-2 font-medium"
        style={{ color: '#6b5a47' }}
      >
        <User size={17} />
        <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '17px' }}>
          {userName}
        </span>
      </div>
      <button
        className="flex items-center gap-1.5 hover:underline"
        style={{
          color: '#9e1e2e',
          fontFamily: "'Crimson Text', serif",
          fontSize: '17px',
        }}
      >
        <LogOut size={17} /> Logout
      </button>
    </div>
  </header>
);
