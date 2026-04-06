import saranganiLogo from '../../../../public/sarangani-logo.png';

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500&display=swap');

        .footer-root {
          font-family: 'Jost', sans-serif;
          background: #0a0404;
          position: relative;
          overflow: hidden;
        }

        /* Top gold rule */
        .footer-top-rule {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #c5a059 30%, #990404 60%, transparent 100%);
        }

        /* Watermark cross */
        .footer-root::before {
          content: '✛';
          position: absolute;
          left: -60px;
          bottom: -80px;
          font-size: 420px;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 40px 40px;
          position: relative;
          z-index: 1;
        }

        /* ── Main grid ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 56px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(197,160,89,0.15);
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-inner { padding: 48px 24px 32px; }
        }

        /* Brand column */
        .footer-brand-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c5a059;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .footer-brand-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: #c5a059;
        }

        .footer-brand h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 700;
          color: #f0e6d3;
          line-height: 1.15;
          margin: 0 0 16px;
        }

        .footer-brand h2 em {
          font-style: italic;
          color: #e8c97a;
        }

        .footer-brand p {
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(255,255,255,0.42);
          margin: 0;
          max-width: 280px;
        }

        /* Column headers */
        .footer-col-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c5a059;
          margin-bottom: 20px;
          display: block;
        }

        /* Social links */
        .footer-social-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-social-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          font-size: 0.9rem;
          font-weight: 400;
          transition: color 0.25s ease;
        }

        .footer-social-link:hover {
          color: #c5a059;
        }

        .footer-social-icon {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(197,160,89,0.25);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.25s ease, background 0.25s ease;
          flex-shrink: 0;
        }

        .footer-social-link:hover .footer-social-icon {
          border-color: #c5a059;
          background: rgba(197,160,89,0.08);
        }

        .footer-social-icon svg {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        /* Location */
        .footer-location {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-location-pin {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: rgba(255,255,255,0.55);
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.75;
        }

        .footer-pin-icon {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(197,160,89,0.25);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-pin-icon svg {
          width: 15px;
          height: 15px;
          fill: #c5a059;
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          padding-top: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-copyright {
          font-size: 0.775rem;
          font-weight: 300;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.04em;
        }

        .footer-copyright span {
          color: #c5a059;
        }

        .footer-bottom-diamond {
          width: 5px;
          height: 5px;
          background: rgba(197,160,89,0.4);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .footer-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          font-style: italic;
          color: rgba(255,255,255,0.22);
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-top-rule" />

        <div className="footer-inner">
          <div className="footer-grid">
            {/* ── Brand ── */}
            <div className="footer-brand">
              <img src={saranganiLogo} alt="Sarangani Logo" srcset="" />
              <p>
                Dedicated to the spiritual and intellectual formation of its
                members — finding holiness through work and ordinary life.
              </p>
            </div>

            {/* ── Social ── */}
            <div>
              <span className="footer-col-label">Follow Us</span>
              <ul className="footer-social-list">
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    <span className="footer-social-icon">
                      {/* Facebook icon */}
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    <span className="footer-social-icon">
                      {/* Instagram icon */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <circle cx="12" cy="12" r="4" />
                        <circle
                          cx="17.5"
                          cy="6.5"
                          r="0.5"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                    </span>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* ── Location ── */}
            <div>
              <span className="footer-col-label">Find Us</span>
              <div className="footer-location">
                <div className="footer-location-pin">
                  <div className="footer-pin-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                  </div>
                  <span>
                    1046 Dos Castillas Street,
                    <br />
                    Sampaloc, Manila,
                    <br />
                    1008 Philippines
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Sarangani Study Center. All
              rights reserved. Developed and maintained by George Sebastian.
            </p>
            <div className="footer-bottom-diamond" />
            <p className="footer-tagline">Ora et Labora</p>
          </div>
        </div>
      </footer>
    </>
  );
}
