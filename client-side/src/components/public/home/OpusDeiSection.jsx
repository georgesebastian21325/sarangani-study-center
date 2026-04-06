export default function OpusDeiSection() {
  const formations = [
    {
      icon: '📚',
      label: 'Intellectual',
      title: 'Intellectual Formation',
      description:
        'We foster academic excellence and intellectual development through rigorous study, seminars, and meaningful dialogue. Our members are encouraged to pursue knowledge as a path to deeper understanding of their faith and vocation.',
    },
    {
      icon: '✨',
      label: 'Spiritual',
      title: 'Spiritual Formation',
      description:
        'Through prayer, sacraments, and spiritual direction, we guide members toward a deeper relationship with God. Our formation emphasizes the sanctity of ordinary work and the pursuit of holiness in daily life.',
    },
    {
      icon: '🤝',
      label: 'Community',
      title: 'Community Formation',
      description:
        'We cultivate genuine fraternity and sisterhood among members, fostering an environment where individuals support each other in their spiritual journey and personal growth.',
    },
    {
      icon: '🌱',
      label: 'Vocational',
      title: 'Vocational Formation',
      description:
        'We help members discern their vocation, whether in the married life, priesthood, or professional celibacy, and support them in living their calling with authenticity and dedication.',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500&display=swap');

        .opus-root {
          font-family: 'Jost', sans-serif;
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
          
        }

        /* ── Hero band ── */
        .opus-hero {
          position: relative;
          background: linear-gradient(135deg, #7a0303 0%, #990404 45%, #3d1a00 100%);
          border-radius: 32px;
          overflow: hidden;
          padding: 72px 64px 64px;
        }

        /* Subtle noise grain */
        .opus-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.6;
        }

        /* Large decorative cross watermark */
        .opus-hero::after {
          content: '✛';
          position: absolute;
          right: -40px;
          top: -60px;
          font-size: 380px;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .opus-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c5a059;
          margin-bottom: 20px;
        }

        .opus-eyebrow-line {
          display: inline-block;
          width: 32px;
          height: 1px;
          background: #c5a059;
        }

        .opus-hero h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin: 0 0 28px;
          letter-spacing: -0.01em;
        }

        .opus-hero h2 em {
          font-style: italic;
          color: #e8c97a;
        }

        .opus-hero-body {
          font-size: 1.05rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(255,255,255,0.82);
          max-width: 640px;
          margin: 0;
        }

        /* ── Gold rule divider ── */
        .opus-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 56px 0 48px;
        }

        .opus-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c5a059 40%, transparent);
        }

        .opus-divider-diamond {
          width: 8px;
          height: 8px;
          background: #c5a059;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* ── Formation grid ── */
        .opus-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: #1c0a0a;
          border: 2px solid #1c0a0a;
          border-radius: 32px;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .opus-grid { grid-template-columns: 1fr; }
          .opus-hero { padding: 48px 28px 44px; }
        }

        .opus-card {
          background: #0f0606;
          padding: 40px 36px;
          position: relative;
          transition: background 0.35s ease;
          cursor: default;
        }

        .opus-card:hover {
          background: #160808;
        }

        .opus-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 0;
          background: linear-gradient(180deg, #c5a059, #990404);
          transition: height 0.4s ease;
        }

        .opus-card:hover .opus-card-accent {
          height: 100%;
        }

        .opus-card-icon {
          font-size: 1.7rem;
          margin-bottom: 16px;
          display: block;
        }

        .opus-card-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c5a059;
          margin-bottom: 8px;
          display: block;
        }

        .opus-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #f0e6d3;
          margin: 0 0 14px;
          line-height: 1.2;
        }

        .opus-card p {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        /* ── Mission block ── */
        .opus-mission {
          margin-top: 56px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 640px) {
          .opus-mission { grid-template-columns: 1fr; gap: 20px; }
          .opus-mission-left { display: none; }
        }

        .opus-mission-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding-top: 4px;
        }

        .opus-mission-icon {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          color: #c5a059;
          line-height: 1;
        }

        .opus-mission-stem {
          width: 1px;
          height: 80px;
          background: linear-gradient(180deg, #c5a059, transparent);
        }

        .opus-mission-right span {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c5a059;
          display: block;
          margin-bottom: 12px;
        }

        .opus-mission-right h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 600;
          color: #f0e6d3;
          margin: 0 0 16px;
          line-height: 1.15;
        }

        .opus-mission-right p {
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(255,255,255,0.55);
          margin: 0;
          max-width: 620px;
        }
      `}</style>

      <div className="opus-root">
        {/* ── Hero band ── */}
        <div className="opus-hero rounded-lg mt-[-3rem] relative -z-10">
          <div className="opus-eyebrow">
            <span className="opus-eyebrow-line" />
            Personal Prelature of the Catholic Church
          </div>
          <h2>
            Opus <em>Dei</em>
          </h2>
          <p className="opus-hero-body">
            Sarangani Study Center is an Opus Dei center dedicated to the
            spiritual and intellectual formation of its members. Opus Dei
            focuses on helping people find holiness and spiritual growth through
            their daily work and ordinary life activities.
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="opus-divider">
          <span className="opus-divider-line" />
          <span className="opus-divider-diamond" />
          <span className="opus-divider-line" />
        </div>

        {/* ── Formation grid ── */}
        <div className="opus-grid mb-12">
          {formations.map((f) => (
            <div key={f.label} className="opus-card">
              <div className="opus-card-accent" />
              <span className="opus-card-icon">{f.icon}</span>
              <span className="opus-card-label">{f.label}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
