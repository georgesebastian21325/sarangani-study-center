import { useState } from 'react';

// ─── Event data ───────────────────────────────────────────────
// Replace poster/photos with your actual imports, e.g.:
// import recollectionPoster from '../assets/events/recollection-poster.jpg';
const events = [
  {
    id: 1,
    title: 'Monthly Recollection',
    date: 'March 2025',
    category: 'Spiritual',
    description:
      'A day of prayer, silence, and reflection guided by a spiritual director. Members gather to examine their interior life, renew their commitments, and encounter God in stillness.',
    poster: null, // replace with imported image
    photos: [null, null, null], // replace with imported images
  },
  {
    id: 2,
    title: 'Annual Retreat',
    date: 'January 2025',
    category: 'Spiritual',
    description:
      'A three-day silent retreat for members and cooperators — an opportunity for deeper prayer, sacramental grace, and spiritual renewal away from the noise of everyday life.',
    poster: null,
    photos: [null, null],
  },
  {
    id: 3,
    title: 'Study Week',
    date: 'November 2024',
    category: 'Formation',
    description:
      'An intensive week of formation talks, seminars, and group discussions centred on doctrine, philosophy, and the integration of faith with professional life.',
    poster: null,
    photos: [null, null, null],
  },
  {
    id: 4,
    title: 'Community Night',
    date: 'October 2024',
    category: 'Community',
    description:
      'A festive evening of fellowship, shared meals, and cultural presentations — celebrating the bonds of fraternity that form the heartbeat of the center.',
    poster: null,
    photos: [null, null],
  },
  {
    id: 5,
    title: 'Holy Week Activities',
    date: 'April 2024',
    category: 'Spiritual',
    description:
      'Special liturgical celebrations, the Stations of the Cross, and formation talks during Holy Week — accompanying members through the sacred Triduum with depth and devotion.',
    poster: null,
    photos: [null, null, null],
  },
  {
    id: 6,
    title: 'Apostolic Outreach',
    date: 'August 2024',
    category: 'Outreach',
    description:
      'Community service and apostolic activities in partnership with local organizations — living out the mission of sanctifying ordinary work through concrete acts of charity.',
    poster: null,
    photos: [null, null],
  },
];

const categoryColors = {
  Spiritual: '#c5a059',
  Formation: '#990404',
  Community: '#6b3a3a',
  Outreach: '#4a3000',
};

// ─── Placeholder image component ─────────────────────────────
function ImgPlaceholder({ label, aspect = '3/4', icon = '◈' }) {
  return (
    <div
      style={{
        aspectRatio: aspect,
        background: '#110505',
        border: '1px solid rgba(197,160,89,0.1)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: '100%',
      }}
    >
      <span style={{ fontSize: '2rem', color: 'rgba(197,160,89,0.15)' }}>
        {icon}
      </span>
      <span
        style={{
          fontSize: 9,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(197,160,89,0.25)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────
function EventModal({ event, onClose }) {
  const [photoIdx, setPhotoIdx] = useState(0);

  if (!event) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(5,1,1,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'modalIn 0.3s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0f0606',
          border: '1px solid rgba(197,160,89,0.18)',
          borderRadius: 2,
          maxWidth: 880,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(197,160,89,0.2)',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#c5a059';
            e.currentTarget.style.color = '#c5a059';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(197,160,89,0.2)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          ✕
        </button>

        {/* Top red accent rule */}
        <div
          style={{
            height: 3,
            background:
              'linear-gradient(90deg, #990404, #c5a059 60%, transparent)',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            minHeight: 360,
          }}
        >
          {/* Left — poster */}
          <div
            style={{
              background: '#080202',
              padding: 24,
              borderRight: '1px solid rgba(197,160,89,0.08)',
            }}
          >
            <div
              style={{
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c5a059',
                marginBottom: 12,
              }}
            >
              Event Poster
            </div>
            {event.poster ? (
              <img
                src={event.poster}
                alt={event.title}
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            ) : (
              <ImgPlaceholder label="Poster" aspect="3/4" icon="◉" />
            )}
          </div>

          {/* Right — details */}
          <div style={{ padding: '32px 36px' }}>
            {/* Category + date */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 999,
                  background: `${categoryColors[event.category]}22`,
                  border: `1px solid ${categoryColors[event.category]}44`,
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: categoryColors[event.category],
                }}
              >
                {event.category}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.3)',
                  fontWeight: 300,
                }}
              >
                {event.date}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#f0e6d3',
                margin: '0 0 16px',
                lineHeight: 1.1,
              }}
            >
              {event.title}
            </h2>

            <div
              style={{
                width: 32,
                height: 1,
                background: '#c5a059',
                marginBottom: 20,
              }}
            />

            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 300,
                lineHeight: 1.9,
                color: 'rgba(255,255,255,0.5)',
                margin: '0 0 32px',
              }}
            >
              {event.description}
            </p>

            {/* Post photos */}
            <div
              style={{
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c5a059',
                marginBottom: 14,
              }}
            >
              Event Photos
            </div>

            {/* Main photo */}
            <div style={{ marginBottom: 10 }}>
              {event.photos[photoIdx] ? (
                <img
                  src={event.photos[photoIdx]}
                  alt={`${event.title} photo ${photoIdx + 1}`}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />
              ) : (
                <ImgPlaceholder
                  label={`Photo ${photoIdx + 1}`}
                  aspect="16/9"
                  icon="◈"
                />
              )}
            </div>

            {/* Thumbnail strip */}
            {event.photos.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {event.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIdx(i)}
                    style={{
                      flex: 1,
                      padding: 0,
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: 2,
                      outline:
                        photoIdx === i
                          ? '2px solid #c5a059'
                          : '2px solid transparent',
                      outlineOffset: 2,
                      overflow: 'hidden',
                      background: 'none',
                      transition: 'outline 0.2s',
                    }}
                  >
                    {photo ? (
                      <img
                        src={photo}
                        alt=""
                        style={{
                          width: '100%',
                          aspectRatio: '1',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <ImgPlaceholder label="" aspect="1/1" icon="◈" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────
function EventCard({ event, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#160808' : '#0f0606',
        border: `1px solid ${
          hovered ? 'rgba(197,160,89,0.3)' : 'rgba(197,160,89,0.1)'
        }`,
        borderRadius: 2,
        cursor: 'pointer',
        transition:
          'background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 16px 48px rgba(0,0,0,0.5)'
          : '0 2px 12px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          height: 2,
          background: hovered
            ? 'linear-gradient(90deg, #990404, #c5a059)'
            : 'linear-gradient(90deg, #990404, transparent)',
          transition: 'background 0.3s',
        }}
      />

      {/* Poster — portrait */}
      <div style={{ position: 'relative' }}>
        {event.poster ? (
          <img
            src={event.poster}
            alt={event.title}
            style={{
              width: '100%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <ImgPlaceholder label="Event Poster" aspect="3/4" icon="◉" />
        )}
        {/* Category badge */}
        <span
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            padding: '4px 10px',
            borderRadius: 999,
            background: 'rgba(5,1,1,0.75)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${categoryColors[event.category]}55`,
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: categoryColors[event.category],
          }}
        >
          {event.category}
        </span>
      </div>

      {/* Text */}
      <div style={{ padding: '20px 22px 24px' }}>
        <div
          style={{
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.3)',
            fontWeight: 300,
            marginBottom: 8,
          }}
        >
          {event.date}
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.25rem',
            fontWeight: 600,
            color: hovered ? '#e8c97a' : '#f0e6d3',
            margin: '0 0 10px',
            lineHeight: 1.2,
            transition: 'color 0.3s',
          }}
        >
          {event.title}
        </h3>
        <p
          style={{
            fontSize: '0.78rem',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.4)',
            margin: '0 0 16px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {event.description}
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#c5a059',
          }}
        >
          View Details
          <svg
            width="12"
            height="12"
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
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function EventsPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = [
    'All',
    ...Array.from(new Set(events.map((e) => e.category))),
  ];
  const filtered =
    filter === 'All' ? events : events.filter((e) => e.category === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500&display=swap');

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        .events-page {
          font-family: 'Jost', sans-serif;
          background: #080202;
          min-height: 100vh;
          color: #f0e6d3;
        }

        /* ── Page header ── */
        .events-header {
          position: relative;
          padding: 100px 40px 72px;
          background: linear-gradient(180deg, #0f0404 0%, #080202 100%);
          text-align: center;
          overflow: hidden;
        }

        .events-header::before {
          content: '✛';
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          font-size: 500px;
          color: rgba(255,255,255,0.018);
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        .events-header-eyebrow {
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

        .events-header-eyebrow::before,
        .events-header-eyebrow::after {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: #c5a059;
        }

        .events-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 700;
          color: #f0e6d3;
          line-height: 1.08;
          margin: 0 0 20px;
          position: relative;
        }

        .events-header h1 em {
          font-style: italic;
          color: #e8c97a;
        }

        .events-header p {
          font-size: 0.9rem;
          font-weight: 300;
          color: rgba(255,255,255,0.42);
          max-width: 460px;
          margin: 0 auto;
          line-height: 1.85;
          position: relative;
        }

        /* Gold rule */
        .gold-rule {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .gold-rule-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #c5a059 40%, transparent); }
        .gold-rule-diamond { width: 7px; height: 7px; background: #c5a059; transform: rotate(45deg); flex-shrink: 0; }

        /* ── Filter bar ── */
        .events-filter {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 32px 40px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 7px 18px;
          border-radius: 999px;
          border: 1px solid rgba(197,160,89,0.18);
          background: transparent;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          border-color: rgba(197,160,89,0.4);
          color: rgba(255,255,255,0.75);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #990404, #7a0303);
          border-color: rgba(197,160,89,0.3);
          color: #f0e6d3;
        }

        /* ── Grid ── */
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        @media (max-width: 640px) {
          .events-header { padding: 80px 24px 56px; }
          .events-grid { padding: 0 24px 64px; gap: 16px; }
          .events-filter { padding: 24px; }
          .gold-rule { padding: 0 24px; }
        }

        /* Modal scroll lock */
        body.modal-open { overflow: hidden; }
      `}</style>

      <div className="events-page">
        {/* ── Header ── */}
        <div className="events-header">
          <div className="events-header-eyebrow">Sarangani Study Center</div>
          <h1>
            Events &amp; <em>Gatherings</em>
          </h1>
          <p>
            A record of the moments that have shaped our community — click any
            event to explore its story.
          </p>
        </div>

        {/* Gold rule */}
        <div style={{ padding: '0', marginTop: 0 }}>
          <div className="gold-rule">
            <span className="gold-rule-line" />
            <span className="gold-rule-diamond" />
            <span className="gold-rule-line" />
          </div>
        </div>

        {/* ── Filter ── */}
        <div className="events-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${filter === cat ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className="events-grid">
          {filtered.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelected(event)}
            />
          ))}
        </div>

        {/* ── Modal ── */}
        {selected && (
          <EventModal event={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </>
  );
}
