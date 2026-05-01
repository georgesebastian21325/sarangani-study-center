import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, ChevronRight, Sparkles } from 'lucide-react';
import SaranganiLogo from '../../public/sarangani-logo-without-text.png';
import { FontLoader } from '../components/global/styles/FontLoader';

import { GlobalStyles } from '../components/login/styles/GlobalStyles';
import { ChapelIllustration } from '../components/global/styles/ChapelIllustration';

// ─── ILLUSTRATION — Left Panel SVG ───────────────────────
// A refined ink-and-gold illustration of a chapel refectory

// ─── LOGIN PAGE ───────────────────────────────────────────

export default function LoginPage() {
  const [role, setRole] = useState('resident');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields to continue.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    // Demo: wrong credentials
    if (password === 'wrong') {
      setError('Invalid credentials. Please try again.');
      return;
    }
    setSuccess(true);
  };

  const handleRoleSwitch = (r) => {
    setRole(r);
    setError('');
    setSuccess(false);
    setEmail('');
    setPassword('');
  };

  const MEAL_CHIPS = [
    { label: 'Breakfast', color: '#f97316' },
    { label: 'Lunch', color: '#10b981' },
    { label: 'Merienda', color: '#8b5cf6' },
    { label: 'Supper', color: '#3b82f6' },
  ];

  return (
    <>
      <FontLoader />
      <GlobalStyles />

      <div className="login-root">
        {/* ── LEFT: Full-height Illustration Panel ── */}
        <div className="login-left">
          <ChapelIllustration />
          <div className="left-overlay" />

          {/* Top badge */}
          <div className="left-top-badge">
            <img src={SaranganiLogo} alt="Sarangani Study Center" />
          </div>

          {/* Bottom content */}
          <div className="left-content">
            {/* Meal chips — same as dashboards */}
            <div className="left-chips">
              {MEAL_CHIPS.map(({ label, color }) => (
                <span
                  key={label}
                  className="left-chip"
                  style={{
                    color,
                    background: `${color}18`,
                    borderColor: `${color}50`,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <h2 className="left-title">
              Sarangani
              <br />
              Study Center
            </h2>
            <div className="left-rule" />
            <p className="left-quote">
              "The ordinary tasks of each day
              <br />
              are the material of our sanctification."
            </p>
            <p className="left-quote-attr">— St. Josemaría Escrivá</p>
          </div>
        </div>

        {/* ── RIGHT: Full-height Login Form ── */}
        <div className="login-right">
          <div className="form-inner">
            {/* Welcome */}
            <h1 className="welcome-head">Welcome back.</h1>
            <p className="welcome-sub">
              {role === 'admin'
                ? 'Sign in to the administration panel.'
                : 'Sign in to your resident account.'}
            </p>

            {/* Role Toggle */}
            <div className="role-toggle">
              <button
                className={`role-btn ${role === 'resident' ? 'active' : ''}`}
                onClick={() => handleRoleSwitch('resident')}
              >
                Resident
              </button>
              <button
                className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleSwitch('admin')}
              >
                Admin
              </button>
            </div>

            {success ? (
              <div className="success-box">
                <div className="success-icon">✠</div>
                <h3 className="success-title">Signed in successfully</h3>
                <p className="success-sub">
                  Redirecting you to the{' '}
                  {role === 'admin'
                    ? 'administration panel'
                    : 'resident dashboard'}
                  …
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="error-banner">
                    <span style={{ fontSize: '15px' }}>⚠</span>
                    {error}
                  </div>
                )}

                {/* Email */}
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
                        role === 'admin'
                          ? 'admin@sarangani.org'
                          : 'john.doe@example.com'
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
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

                {/* Forgot */}
                <div className="forgot-row">
                  <button className="forgot-link" type="button">
                    Forgot your password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="od-spin" /> Signing in…
                    </>
                  ) : (
                    <>
                      Sign In <ChevronRight size={15} />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="form-divider">or</div>

                {/* Google SSO */}
                <button className="sso-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#9c856a"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#9c856a"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#9c856a"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#9c856a"
                    />
                  </svg>
                  Continue with Google SSO
                </button>
              </>
            )}
          </div>

          {/* Footer inside panel */}
          <div className="right-footer">
            Opus Dei Prelature · Sarangani · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
}
