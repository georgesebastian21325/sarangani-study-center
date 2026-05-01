import { LogOut, Sparkles, User } from 'lucide-react';
import SaranganiLogo from '../../../../../public/sarangani-logo-without-text.png';

export const Navbar = () => (
  <header
    className="px-8 py-4 flex justify-between items-center border-b"
    style={{ background: '#faf7f0', borderColor: '#e8dece' }}
  >
    <div className="flex items-center gap-3">
      <div>
        <img src={SaranganiLogo} alt="Sarangani Logo" className="w-5 h-5" />
      </div>
      <h1
        className="od-cinzel text-sm tracking-widest font-bold"
        style={{ color: '#5a0a1e' }}
      >
        Sarangani Administration
      </h1>
    </div>
    <div className="flex items-center gap-5">
      <div
        className="flex items-center gap-2 text-sm font-medium"
        style={{ color: '#6b5a47' }}
      >
        <User size={15} />
        <span style={{ fontFamily: "'Crimson Text', serif" }}>Admin</span>
      </div>
      <button
        className="flex items-center gap-1.5 text-sm hover:underline"
        style={{ color: '#9e1e2e', fontFamily: "'Crimson Text', serif" }}
      >
        <LogOut size={15} /> Logout
      </button>
    </div>
  </header>
);
