import { useState } from 'react';

const spaces = [
  {
    id: 'oratory',
    label: 'Oratory',
    icon: '✛',
    tagline: 'A Place of Prayer',
    description:
      "The heart of the center — a consecrated space for daily Mass, meditation, and the sacraments. Quiet, sacred, and open to all who seek God's presence in stillness.",
  },
  {
    id: 'living-room',
    label: 'Living Room',
    icon: '⌂',
    tagline: 'Where Community Breathes',
    description:
      'A warm gathering space for casual conversation, recollections, and fraternal exchange. Here, friendships deepen and the spirit of family is lived out naturally.',
  },
  {
    id: 'study-room',
    label: 'Study Room',
    icon: '◈',
    tagline: 'Formation Through Knowledge',
    description:
      'Dedicated to intellectual growth, the study room hosts seminars, reading circles, and formation talks. A disciplined yet welcoming space for the life of the mind.',
  },
  {
    id: 'dining',
    label: 'Dining Room',
    icon: '◇',
    tagline: 'Breaking Bread Together',
    description:
      'Shared meals are a cornerstone of community life. The dining room is where members gather after activities — nourishing both body and fellowship.',
  },
  {
    id: 'chapel-garden',
    label: 'Garden',
    icon: '❧',
    tagline: 'Contemplation Outdoors',
    description:
      'A modest outdoor space for quiet walks, rosary prayers, and moments of reflection — where nature and spirituality meet in unhurried silence.',
  },
  {
    id: 'conference',
    label: 'Conference Room',
    icon: '▣',
    tagline: 'Where Events Come Alive',
    description:
      'The venue for our formation seminars, recollections, and community events. Equipped for talks and workshops, it regularly hosts students, professionals, and guests.',
  },
];

const timeline = [
  {
    year: '1980s',
    title: 'Foundation',
    body: "Sarangani Study Center was established in General Santos City as part of Opus Dei's growing apostolate in Mindanao — bringing the message of sanctification through ordinary work to southern Philippines.",
  },
  {
    year: '1990s',
    title: 'Growth & Formation',
    body: 'The center deepened its formation programs, welcoming students and young professionals from across the region into its circles, recollections, and annual retreats.',
  },
  {
    year: '2000s',
    title: 'Community Expansion',
    body: "A widening circle of members and cooperators strengthened the center's apostolate. Regular events, study weeks, and outreach activities became hallmarks of the center's character.",
  },
  {
    year: 'Today',
    title: 'Living the Mission',
    body: 'Today, the center continues its mission of integral formation — intellectual, spiritual, and human — serving a vibrant community of students, professionals, and families in Sarangani and beyond.',
  },
];

export default function AboutUs() {
  const [activeSpace, setActiveSpace] = useState('oratory');
  const active = spaces.find((s) => s.id === activeSpace);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500&display=swap');

        .about-root {
          font-family: 'Jost', sans-serif;
          background: #080202;
          color: #f0e6d3;
          overflow: hidden;
        }

        /* ── Shared helpers ── */
        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c5a059;
          margin-bottom: 16px;
        }
        .about-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: #c5a059;
        }

        .about-display {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.01em;
        }

        .gold-rule {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 auto;
        }
        .gold-rule-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c5a059 40%, transparent);
        }
        .gold-rule-diamond {
          width: 7px;
          height: 7px;
          background: #c5a059;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* ═══════════════════════════
           SECTION 1 — HERO INTRO
        ═══════════════════════════ */
        .about-hero {
          position: relative;
          padding: 100px 40px 80px;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .about-hero { grid-template-columns: 1fr; gap: 40px; padding: 64px 24px 56px; }
        }

        .about-hero-left h2 {
          font-size: clamp(2.8rem, 5.5vw, 4.2rem);
          margin: 0 0 28px;
          color: #f0e6d3;
        }

        .about-hero-left h2 em {
          font-style: italic;
          color: #e8c97a;
        }

        .about-hero-left p {
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(255,255,255,0.5);
          max-width: 420px;
        }

        /* Stat cards on the right */
        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: #1c0a0a;
          border: 2px solid #1c0a0a;
          border-radius: 2px;
        }

        .about-stat {
          background: #0f0606;
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
        }

        .about-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, #c5a059, transparent);
        }

        .about-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: #c5a059;
          line-height: 1;
          margin-bottom: 6px;
        }

        .about-stat-label {
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }

        /* Location chip */
        .about-location-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 32px;
          padding: 10px 18px;
          border: 1px solid rgba(197,160,89,0.2);
          border-radius: 999px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.55);
          background: rgba(197,160,89,0.04);
        }

        .about-location-chip svg {
          width: 13px;
          height: 13px;
          fill: #c5a059;
          flex-shrink: 0;
        }

        /* ═══════════════════════════
           SECTION 2 — HISTORY TIMELINE
        ═══════════════════════════ */
        .about-history {
          padding: 80px 40px;
          background: #050101;
          position: relative;
        }

        @media (max-width: 768px) {
          .about-history { padding: 64px 24px; }
        }

        .about-history-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .about-history-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .about-history-header h3 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0 0 16px;
          color: #f0e6d3;
        }

        .about-history-header p {
          font-size: 0.9rem;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          max-width: 480px;
          margin: 16px auto 0;
          line-height: 1.8;
        }

        /* Timeline */
        .timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Vertical spine */
        .timeline::before {
          content: '';
          position: absolute;
          left: 120px;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent, #c5a059 15%, #c5a059 85%, transparent);
        }

        @media (max-width: 600px) {
          .timeline::before { left: 16px; }
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 40px;
          padding: 36px 0;
          position: relative;
        }

        @media (max-width: 600px) {
          .timeline-item { grid-template-columns: 16px 1fr; gap: 24px; }
        }

        /* Year */
        .timeline-year {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #c5a059;
          text-align: right;
          padding-right: 28px;
          padding-top: 4px;
          line-height: 1;
        }

        @media (max-width: 600px) {
          .timeline-year { display: none; }
        }

        /* Dot */
        .timeline-dot {
          position: absolute;
          left: 113px;
          top: 42px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          border: 2px solid #c5a059;
          background: #050101;
          z-index: 1;
        }

        @media (max-width: 600px) {
          .timeline-dot { left: 9px; }
        }

        .timeline-content {
          padding-left: 28px;
          padding-bottom: 8px;
        }

        .timeline-content h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #f0e6d3;
          margin: 0 0 10px;
        }

        .timeline-content p {
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(255,255,255,0.45);
          margin: 0;
          max-width: 560px;
        }

        /* ═══════════════════════════
           SECTION 3 — EVENTS BANNER
        ═══════════════════════════ */
        .about-events {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #7a0303 0%, #990404 50%, #3d1a00 100%);
          padding: 72px 40px;
        }

        .about-events::before {
          content: '✛';
          position: absolute;
          right: -40px; top: -80px;
          font-size: 460px;
          color: rgba(255,255,255,0.04);
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        /* noise grain */
        .about-events::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .about-events-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 640px) {
          .about-events-inner { grid-template-columns: 1fr; gap: 32px; }
          .about-events { padding: 56px 24px; }
        }

        .about-events-inner h3 {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          margin: 0 0 16px;
          color: #fff;
        }

        .about-events-inner p {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(255,255,255,0.75);
          max-width: 520px;
          margin: 0;
        }

        .event-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }

        .event-pill {
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.25);
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.06);
        }

        .events-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 2px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(197,160,89,0.4);
          color: #e8c97a;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s;
          align-self: flex-start;
        }

        .events-cta:hover {
          background: rgba(197,160,89,0.12);
          border-color: #c5a059;
        }

        /* ═══════════════════════════
           SECTION 4 — SPACES
        ═══════════════════════════ */
        .about-spaces {
          padding: 80px 40px;
          background: #080202;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .about-spaces { padding: 64px 24px; }
        }

        .about-spaces-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .about-spaces-header h3 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0 0 12px;
          color: #f0e6d3;
        }

        .about-spaces-header p {
          font-size: 0.875rem;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          max-width: 440px;
          margin: 16px auto 0;
          line-height: 1.8;
        }

        /* Tab strip */
        .spaces-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 32px;
          border-bottom: 1px solid rgba(197,160,89,0.12);
          padding-bottom: 0;
        }

        .spaces-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: none;
          background: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.38);
          cursor: pointer;
          position: relative;
          transition: color 0.2s ease;
          bottom: -1px;
        }

        .spaces-tab.active {
          color: #c5a059;
        }

        .spaces-tab.active::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #c5a059, #990404);
        }

        .spaces-tab:hover:not(.active) {
          color: rgba(255,255,255,0.65);
        }

        .spaces-tab-icon {
          font-size: 1rem;
          line-height: 1;
        }

        /* Panel */
        .spaces-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: #1c0a0a;
          border: 2px solid #1c0a0a;
          border-radius: 2px;
          overflow: hidden;
          min-height: 240px;
        }

        @media (max-width: 640px) {
          .spaces-panel { grid-template-columns: 1fr; }
        }

        .spaces-panel-img {
          background: #110505;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
          position: relative;
          overflow: hidden;
        }

        /* Placeholder when no image */
        .spaces-panel-img-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          height: 100%;
          min-height: 220px;
        }

        .spaces-panel-img-icon {
          font-size: 4rem;
          color: rgba(197,160,89,0.15);
          line-height: 1;
        }

        .spaces-img-tag {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(197,160,89,0.3);
        }

        .spaces-panel-body {
          background: #0f0606;
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .spaces-panel-body span {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c5a059;
          display: block;
          margin-bottom: 12px;
        }

        .spaces-panel-body h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 600;
          color: #f0e6d3;
          margin: 0 0 8px;
          line-height: 1.15;
        }

        .spaces-panel-body em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem;
          color: rgba(197,160,89,0.6);
          display: block;
          margin-bottom: 20px;
        }

        .spaces-panel-body p {
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(255,255,255,0.48);
          margin: 0;
        }

        /* nav dots for spaces */
        .spaces-nav {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }

        .spaces-nav-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(197,160,89,0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, transform 0.2s;
        }

        .spaces-nav-dot.active {
          background: #c5a059;
          transform: scale(1.3);
        }
      `}</style>

      <section id="about" className="about-root">
        {/* ══ 1. HERO INTRO ══ */}
        <div className="about-hero">
          <div className="about-hero-left">
            <div className="about-eyebrow">Our Story</div>
            <h2 className="about-display">
              A Home for
              <br />
              <em>Formation</em>
              <br />& Faith
            </h2>
            <p>
              Sarangani Study Center has served the General Santos City
              community for decades — offering a space where young people and
              professionals encounter God, deepen their intellect, and grow in
              virtue through the ordinary rhythms of life.
            </p>
            <div className="about-location-chip">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              General Santos City, South Cotabato, Philippines
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-num">40+</div>
              <div className="about-stat-label">Years of Mission</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">∞</div>
              <div className="about-stat-label">Lives Touched</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">6</div>
              <div className="about-stat-label">Spaces for Formation</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">12+</div>
              <div className="about-stat-label">Annual Events</div>
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div style={{ padding: '0 40px' }}>
          <div
            className="gold-rule"
            style={{ maxWidth: 1100, margin: '0 auto' }}
          >
            <span className="gold-rule-line" />
            <span className="gold-rule-diamond" />
            <span className="gold-rule-line" />
          </div>
        </div>

        {/* ══ 2. HISTORY TIMELINE ══ */}
        <div className="about-history">
          <div className="about-history-inner">
            <div className="about-history-header">
              <div
                className="about-eyebrow"
                style={{ justifyContent: 'center' }}
              >
                Our History
              </div>
              <h3 className="about-display">
                Decades of
                <br />
                <em style={{ fontStyle: 'italic', color: '#e8c97a' }}>
                  Faithful Presence
                </em>
              </h3>
              <p>
                From humble beginnings to a thriving community — a journey
                marked by grace, commitment, and the quiet work of formation.
              </p>
            </div>

            <div className="timeline">
              {timeline.map((item, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 3. EVENTS BANNER ══ */}
        <div className="about-events">
          <div className="about-events-inner">
            <div>
              <div className="about-eyebrow">Life at the Center</div>
              <h3 className="about-display">
                Events &<br />
                Gatherings
              </h3>
              <p>
                The center is alive with activity throughout the year — from
                intimate recollections and formation talks to larger community
                celebrations and outreach. Every event is an opportunity to
                encounter God and grow with others.
              </p>
              <div className="event-pills">
                {[
                  'Recollections',
                  'Study Weeks',
                  'Annual Retreat',
                  'Formation Talks',
                  'Community Nights',
                  'Outreach Programs',
                  'Holy Week Activities',
                  'Apostolic Events',
                ].map((e) => (
                  <span className="event-pill" key={e}>
                    {e}
                  </span>
                ))}
              </div>
            </div>
            <a href="#events" className="events-cta">
              View Events
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* ══ 4. SPACES ══ */}
        <div className="about-spaces">
          <div className="about-spaces-header">
            <div className="about-eyebrow" style={{ justifyContent: 'center' }}>
              Inside the Center
            </div>
            <h3 className="about-display">
              Our{' '}
              <em style={{ fontStyle: 'italic', color: '#e8c97a' }}>Spaces</em>
            </h3>
            <p>
              Each room of the center carries a purpose — crafted to support a
              different dimension of the formation journey.
            </p>
          </div>

          {/* Tab strip */}
          <div className="spaces-tabs" role="tablist">
            {spaces.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={activeSpace === s.id}
                className={`spaces-tab${activeSpace === s.id ? ' active' : ''}`}
                onClick={() => setActiveSpace(s.id)}
              >
                <span className="spaces-tab-icon">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="spaces-panel">
            {/* Left — image placeholder (swap src with actual image per space) */}
            <div className="spaces-panel-img">
              <div className="spaces-panel-img-placeholder">
                <div className="spaces-panel-img-icon">{active.icon}</div>
                <div className="spaces-img-tag">Photo coming soon</div>
              </div>
            </div>

            {/* Right — text */}
            <div className="spaces-panel-body">
              <span>{active.label}</span>
              <h4>{active.label}</h4>
              <em>{active.tagline}</em>
              <p>{active.description}</p>
            </div>
          </div>

          {/* Dot nav */}
          <div className="spaces-nav">
            {spaces.map((s) => (
              <button
                key={s.id}
                className={`spaces-nav-dot${
                  activeSpace === s.id ? ' active' : ''
                }`}
                onClick={() => setActiveSpace(s.id)}
                aria-label={s.label}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
