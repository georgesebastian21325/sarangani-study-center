import { Eye, EyeOff } from 'lucide-react';

export function PasswordInput({
  password,
  setPassword,
  showPass,
  setShowPass,
  handleSubmit,
}) {
  return (
    <div className="form-field">
      <label className="field-label" htmlFor="password">
        Password
      </label>
      <div className="field-input-wrap">
        <input
          id="password"
          type={showPass ? 'text' : 'password'}
          className="field-input has-icon"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoComplete="current-password"
        />
        <button
          className="eye-btn"
          onClick={() => setShowPass(!showPass)}
          type="button"
          tabIndex={-1}
        >
          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
