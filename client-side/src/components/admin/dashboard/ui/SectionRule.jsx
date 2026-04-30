export const SectionRule = ({ children }) => (
  <div className="od-section-rule mb-5">
    <p
      className="od-cinzel shrink-0"
      style={{
        fontSize: '7.5px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#9c856a',
      }}
    >
      {children}
    </p>
  </div>
);

