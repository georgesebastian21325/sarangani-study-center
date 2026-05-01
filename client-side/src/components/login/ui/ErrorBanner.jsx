export function ErrorBanner({ error }) {
  return (
    <div className="error-banner">
      <span style={{ fontSize: '15px' }}>⚠</span>
      {error}
    </div>
  );
}
