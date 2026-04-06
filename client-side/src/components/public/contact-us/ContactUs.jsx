import { useState } from 'react';

// ── Replace these with your actual imports ──────────────────
// import chaplainPhoto from '../assets/chaplain.jpg';
// import buildingPhoto from '../assets/building.jpg';
const chaplainPhoto = null;
const buildingPhoto = null;

const confessionSchedule = [
  { day: 'Monday', time: null },
  { day: 'Tuesday', time: '5:00 PM – 6:00 PM' },
  { day: 'Wednesday', time: null },
  { day: 'Thursday', time: '5:00 PM – 6:00 PM' },
  { day: 'Friday', time: '4:30 PM – 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 11:00 AM' },
  { day: 'Sunday', time: null },
];

function ImgPlaceholder({ label, aspect = '1/1', icon = '◈' }) {
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
        gap: 10,
        width: '100%',
        height: '100%',
      }}
    >
      <span style={{ fontSize: '2.5rem', color: 'rgba(197,160,89,0.15)' }}>
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // wire up your actual form handler here
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .cp-root {
          font-family: 'Jost', sans-serif;
          background: #080202;
          color: #f0e6d3;
          min-height: 100vh;
        }

        /* ── Eyebrow ── */
        .cp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c5a059;
          margin-bottom: 14px;
        }
        .cp-eyebrow::before {
          content: '';
          display: inline-block;
          width: 26px; height: 1px;
          background: #c5a059;
        }

        .cp-display {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.01em;
        }

        .cp-display em { font-style: italic; color: #e8c97a; }

        /* gold rule */
        .cp-gold-rule {
          display: flex; align-items: center; gap: 14px;
          max-width: 1100px; margin: 0 auto; padding: 0 40px;
        }
        .cp-gold-rule-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #c5a059 40%, transparent); }
        .cp-gold-rule-diamond { width: 7px; height: 7px; background: #c5a059; transform: rotate(45deg); flex-shrink: 0; }

        /* ══ HERO HEADER ══════════════════════════════════════ */
        .cp-hero {
          position: relative;
          padding: 110px 40px 80px;
          text-align: center;
          background: linear-gradient(180deg, #0f0404 0%, #080202 100%);
          overflow: hidden;
        }

        .cp-hero::before {
          content: '✛';
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          font-size: 520px;
          color: rgba(255,255,255,0.018);
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        .cp-hero h1 { font-size: clamp(2.8rem, 6vw, 4.5rem); margin: 0 0 20px; position: relative; }

        .cp-hero p {
          font-size: 0.9rem; font-weight: 300;
          color: rgba(255,255,255,0.42);
          max-width: 440px; margin: 0 auto;
          line-height: 1.85; position: relative;
        }

        /* ══ MAIN CONTENT ═════════════════════════════════════ */
        .cp-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 72px 40px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
        }

        @media (max-width: 860px) {
          .cp-body { grid-template-columns: 1fr; gap: 48px; padding: 56px 24px 64px; }
          .cp-hero { padding: 80px 24px 64px; }
          .cp-gold-rule { padding: 0 24px; }
        }

        /* ── Card shell ── */
        .cp-card {
          background: #0f0606;
          border: 1px solid rgba(197,160,89,0.12);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }
        .cp-card-top-rule {
          height: 2px;
          background: linear-gradient(90deg, #990404, #c5a059 60%, transparent);
        }
        .cp-card-body { padding: 32px 32px 36px; }

        /* ── Section label ── */
        .cp-section-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c5a059;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cp-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(197,160,89,0.15);
        }

        /* ══ CHAPLAIN ═════════════════════════════════════════ */
        .chaplain-grid {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 480px) {
          .chaplain-grid { grid-template-columns: 1fr; }
        }

        .chaplain-img-wrap {
          position: relative;
          border-radius: 2px;
          overflow: hidden;
        }

        .chaplain-img-wrap img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          display: block;
        }

        .chaplain-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #f0e6d3;
          margin: 0 0 4px;
          line-height: 1.2;
        }

        .chaplain-title {
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #c5a059;
          margin-bottom: 14px;
        }

        .chaplain-number {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          border: 1px solid rgba(197,160,89,0.2);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255,255,255,0.65);
          background: rgba(197,160,89,0.04);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          display: inline-flex;
        }

        .chaplain-number:hover {
          border-color: #c5a059;
          color: #c5a059;
        }

        .chaplain-number svg { width: 13px; height: 13px; flex-shrink: 0; }

        /* ══ CONFESSION SCHEDULE ══════════════════════════════ */
        .schedule-table {
          width: 100%;
          border-collapse: collapse;
        }

        .schedule-table tr {
          border-bottom: 1px solid rgba(197,160,89,0.07);
        }

        .schedule-table tr:last-child { border-bottom: none; }

        .schedule-table td {
          padding: 11px 0;
          font-size: 0.83rem;
          font-weight: 300;
          vertical-align: middle;
        }

        .schedule-day {
          color: rgba(255,255,255,0.5);
          width: 44%;
        }

        .schedule-time {
          color: #f0e6d3;
          font-weight: 400;
          text-align: right;
        }

        .schedule-closed {
          color: rgba(255,255,255,0.2);
          font-style: italic;
          text-align: right;
          font-size: 0.78rem;
        }

        .schedule-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          margin-right: 10px;
          vertical-align: middle;
          flex-shrink: 0;
        }

        .schedule-note {
          margin-top: 18px;
          padding: 12px 16px;
          border-left: 2px solid rgba(197,160,89,0.3);
          background: rgba(197,160,89,0.04);
          border-radius: 0 2px 2px 0;
        }

        .schedule-note p {
          font-size: 0.78rem;
          font-weight: 300;
          color: rgba(255,255,255,0.38);
          margin: 0;
          line-height: 1.7;
        }

        /* ══ LOCATION ═════════════════════════════════════════ */
        .cp-location-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        @media (max-width: 860px) {
          .cp-location-section { padding: 0 24px 64px; }
        }

        .cp-location-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: #1c0a0a;
          border: 2px solid #1c0a0a;
          border-radius: 2px;
          overflow: hidden;
        }

        @media (max-width: 720px) {
          .cp-location-grid { grid-template-columns: 1fr; }
        }

        .cp-building-img {
          position: relative;
          min-height: 300px;
          overflow: hidden;
        }

        .cp-building-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cp-location-body {
          background: #0f0606;
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cp-address-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 8px;
        }

        .cp-address-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .cp-address-icon {
          width: 34px; height: 34px;
          border: 1px solid rgba(197,160,89,0.2);
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
        }

        .cp-address-icon svg { width: 14px; height: 14px; fill: #c5a059; }

        .cp-address-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c5a059;
          display: block;
          margin-bottom: 4px;
        }

        .cp-address-value {
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
        }

        .cp-map-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
          padding: 10px 22px;
          border-radius: 2px;
          background: transparent;
          border: 1px solid rgba(197,160,89,0.25);
          color: #c5a059;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          align-self: flex-start;
        }

        .cp-map-btn:hover {
          background: rgba(197,160,89,0.08);
          border-color: #c5a059;
        }

        /* ══ CONTACT FORM ═════════════════════════════════════ */
        .cp-form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 18px;
        }

        .cp-form-field label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c5a059;
        }

        .cp-form-field input,
        .cp-form-field textarea {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(197,160,89,0.15);
          border-radius: 2px;
          padding: 12px 14px;
          font-family: 'Jost', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          color: #f0e6d3;
          outline: none;
          transition: border-color 0.2s;
          resize: none;
          width: 100%;
        }

        .cp-form-field input:focus,
        .cp-form-field textarea:focus {
          border-color: rgba(197,160,89,0.45);
          background: rgba(255,255,255,0.04);
        }

        .cp-form-field input::placeholder,
        .cp-form-field textarea::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .cp-submit-btn {
          width: 100%;
          padding: 13px;
          border-radius: 2px;
          background: linear-gradient(135deg, #990404, #7a0303);
          border: 1px solid rgba(197,160,89,0.25);
          color: #f0e6d3;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: box-shadow 0.25s, background 0.25s;
          margin-top: 4px;
        }

        .cp-submit-btn:hover {
          box-shadow: 0 0 24px rgba(153,4,4,0.45);
          background: linear-gradient(135deg, #b30505, #990404);
        }

        .cp-success {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border: 1px solid rgba(197,160,89,0.25);
          border-radius: 2px;
          background: rgba(197,160,89,0.06);
          font-size: 0.8rem;
          font-weight: 300;
          color: #c5a059;
          margin-top: 12px;
        }
      `}</style>

      <div className="cp-root">
        {/* ── HERO ── */}
        <div className="cp-hero">
          <div className="cp-eyebrow" style={{ justifyContent: 'center' }}>
            Sarangani Study Center
          </div>
          <h1 className="cp-display">
            Get in <em>Touch</em>
          </h1>
          <p>
            We'd love to hear from you. Reach out for inquiries, visit
            arrangements, or simply to learn more about the center.
          </p>
        </div>

        {/* Gold rule */}
        <div className="cp-gold-rule">
          <span className="cp-gold-rule-line" />
          <span className="cp-gold-rule-diamond" />
          <span className="cp-gold-rule-line" />
        </div>

        {/* ── BODY GRID ── */}
        <div className="cp-body">
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Chaplain card */}
            <div className="cp-card">
              <div className="cp-card-top-rule" />
              <div className="cp-card-body">
                <div className="cp-section-label">Our Chaplain</div>
                <div className="chaplain-grid">
                  <div className="chaplain-img-wrap">
                    {chaplainPhoto ? (
                      <img src={chaplainPhoto} alt="Chaplain" />
                    ) : (
                      <ImgPlaceholder label="Photo" aspect="3/4" icon="✛" />
                    )}
                  </div>
                  <div>
                    <div className="chaplain-name">Fr. [Chaplain Name]</div>
                    <div className="chaplain-title">
                      Center Chaplain · Opus Dei
                    </div>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 300,
                        lineHeight: 1.8,
                        color: 'rgba(255,255,255,0.42)',
                        margin: '0 0 18px',
                      }}
                    >
                      Available for spiritual direction, confession, and
                      pastoral guidance. Do not hesitate to reach out.
                    </p>
                    <a href="tel:+639000000000" className="chaplain-number">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c5a059"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.89 5.89l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      +63 900 000 0000
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Confession Schedule */}
            <div className="cp-card">
              <div className="cp-card-top-rule" />
              <div className="cp-card-body">
                <div className="cp-section-label">Confession Schedule</div>
                <table className="schedule-table">
                  <tbody>
                    {confessionSchedule.map(({ day, time }) => (
                      <tr key={day}>
                        <td className="schedule-day">
                          <span
                            className="schedule-dot"
                            style={{
                              background: time
                                ? '#c5a059'
                                : 'rgba(255,255,255,0.12)',
                            }}
                          />
                          {day}
                        </td>
                        <td
                          className={time ? 'schedule-time' : 'schedule-closed'}
                        >
                          {time || 'No schedule'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="schedule-note">
                  <p>
                    Confession by appointment is also available. Contact the
                    chaplain directly to arrange a time outside the regular
                    schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Contact form */}
          <div className="cp-card" style={{ alignSelf: 'start' }}>
            <div className="cp-card-top-rule" />
            <div className="cp-card-body">
              <div className="cp-section-label">Send a Message</div>
              <h3
                className="cp-display"
                style={{
                  fontSize: '1.6rem',
                  margin: '0 0 6px',
                  color: '#f0e6d3',
                }}
              >
                We'd Love to
                <br />
                <em>Hear from You</em>
              </h3>
              <p
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.75,
                  margin: '0 0 28px',
                }}
              >
                For inquiries, visit requests, or questions about formation and
                events — fill out the form below.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="cp-form-field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="cp-form-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="cp-form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="cp-submit-btn">
                  Send Message
                </button>
                {sent && (
                  <div className="cp-success">
                    <span>✛</span>
                    Your message has been sent. We'll be in touch soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* ── LOCATION SECTION ── */}
        <div className="cp-location-section">
          {/* Section eyebrow */}
          <div
            style={{
              marginBottom: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span className="cp-eyebrow" style={{ marginBottom: 0 }}>
              Find Us
            </span>
            <div
              style={{ flex: 1, height: 1, background: 'rgba(197,160,89,0.1)' }}
            />
          </div>

          <div className="cp-location-grid">
            {/* Building photo */}
            <div className="cp-building-img">
              {buildingPhoto ? (
                <img
                  src={buildingPhoto}
                  alt="Sarangani Study Center Building"
                />
              ) : (
                <ImgPlaceholder
                  label="Center Building Photo"
                  aspect="4/3"
                  icon="⌂"
                />
              )}
            </div>

            {/* Location details */}
            <div className="cp-location-body">
              <h3
                className="cp-display"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  color: '#f0e6d3',
                  margin: '0 0 28px',
                }}
              >
                Sarangani
                <br />
                <em>Study Center</em>
              </h3>

              <div className="cp-address-block">
                {/* Address */}
                <div className="cp-address-row">
                  <div className="cp-address-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="cp-address-label">Address</span>
                    <div className="cp-address-value">
                      [Street Address]
                      <br />
                      General Santos City
                      <br />
                      South Cotabato, Philippines
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="cp-address-row">
                  <div className="cp-address-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm.5 11H11V7h1.5v5.25l3.5 2.08-.75 1.27-2.75-1.6z" />
                    </svg>
                  </div>
                  <div>
                    <span className="cp-address-label">Office Hours</span>
                    <div className="cp-address-value">
                      Monday – Saturday
                      <br />
                      8:00 AM – 6:00 PM
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="cp-address-row">
                  <div className="cp-address-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="cp-address-label">Email</span>
                    <div className="cp-address-value">
                      sarangani@studycenter.ph
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cp-map-btn"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
