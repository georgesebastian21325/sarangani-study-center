import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import saranganiLogo from '../../../../public/sarangani-logo.png';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Events', href: '/events-page' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Cormorant+Garamond:wght@600&display=swap');

        .nav-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          justify-content: center;
          padding: 16px 24px;
          transition: padding 0.4s ease;
          font-family: 'Jost', sans-serif;
        }

        .nav-root.scrolled {
          padding: 10px 24px;
        }

        /* Glass pill */
        .nav-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1000px;
          padding: 10px 10px 10px 20px;
          border-radius: 999px;
          border: 1px solid rgba(197, 160, 89, 0.2);
          background: rgba(10, 4, 4, 0.45);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            0 4px 32px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.06);
          transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .nav-root.scrolled .nav-pill {
          background: rgba(8, 2, 2, 0.72);
          border-color: rgba(197, 160, 89, 0.3);
          box-shadow:
            0 8px 40px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* Logo */
        .nav-logo {
          height: 36px;
          width: auto;
          flex-shrink: 0;
        }

        /* Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          display: block;
          padding: 7px 14px;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          border-radius: 999px;
          transition: color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }

        .nav-links a:hover {
          color: #f0e6d3;
          background: rgba(197, 160, 89, 0.1);
        }

        /* CTA button */
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: 999px;
          background: linear-gradient(135deg, #990404 0%, #7a0303 100%);
          border: 1px solid rgba(197,160,89,0.25);
          color: #f0e6d3;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.25s ease, box-shadow 0.25s ease;
          flex-shrink: 0;
        }

        .nav-cta:hover {
          background: linear-gradient(135deg, #b30505 0%, #990404 100%);
          box-shadow: 0 0 18px rgba(153,4,4,0.5);
        }

        .nav-cta-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c5a059;
          flex-shrink: 0;
        }

        /* Mobile toggle */
        .nav-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: none;
          border: 1px solid rgba(197,160,89,0.2);
          border-radius: 50%;
          color: rgba(255,255,255,0.75);
          font-size: 1.1rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }

        .nav-toggle:hover {
          border-color: #c5a059;
          color: #c5a059;
        }

        /* Mobile drawer */
        .nav-drawer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 49;
          background: rgba(8,2,2,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .nav-drawer.open {
          opacity: 1;
          pointer-events: auto;
        }

        .nav-drawer a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s ease;
        }

        .nav-drawer a:hover {
          color: #c5a059;
        }

        .nav-drawer-rule {
          width: 40px;
          height: 1px;
          background: rgba(197,160,89,0.25);
          margin: 8px 0;
        }

        .nav-drawer-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: 1px solid rgba(197,160,89,0.2);
          border-radius: 50%;
          color: rgba(255,255,255,0.6);
          width: 38px;
          height: 38px;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, color 0.2s;
        }

        .nav-drawer-close:hover {
          border-color: #c5a059;
          color: #c5a059;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .nav-toggle { display: flex; }
          .nav-pill { padding: 8px 8px 8px 16px; }
        }
      `}</style>

      {/* Sticky Navbar */}
      <nav className={`nav-root${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-pill">
          {/* Logo */}
          <Link to="/">
            <img
              src={saranganiLogo}
              alt="Sarangani Logo"
              className="nav-logo"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            {links.slice(0, -1).map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          {/* CTA — last link styled as button */}

          <a href="/contact-us" className="nav-cta">
            <span className="nav-cta-dot" />
            Contact Us
          </a>

          {/* Mobile Toggle */}
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nav-drawer${menuOpen ? ' open' : ''}`}>
        <button
          className="nav-drawer-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {links.map((link, i) => (
          <div key={link.label} style={{ display: 'contents' }}>
            {i !== 0 && <div className="nav-drawer-rule" />}
            <a href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
