export function EmailInput({ role, email, setEmail, handleSubmit }) {
  return (
    <div className="form-field">
      <label className="field-label" htmlFor="email">
        {role === 'admin' ? 'Admin Email' : 'Email Address'}
      </label>
      <div className="field-input-wrap">
        <input
          id="email"
          type="email"
          className="field-input"
          placeholder={
            role === 'admin' ? 'admin@sarangani.org' : 'john.doe@example.com'
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoComplete="email"
        />
      </div>
    </div>
  );
}
