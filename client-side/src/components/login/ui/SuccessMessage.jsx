export function SuccessMessage({ role }) {
  return (
    <div className="success-box">
      <div className="success-icon">✠</div>
      <h3 className="success-title">Signed in successfully</h3>
      <p className="success-sub">
        Redirecting you to the{' '}
        {role === 'admin' ? 'administration panel' : 'resident dashboard'}…
      </p>
    </div>
  );
}
