import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, ChevronRight } from 'lucide-react';
import { FontLoader } from '../components/global/styles/FontLoader';
import { GlobalStyles } from '../components/login/styles/GlobalStyles';
import LeftPanel from '../components/login/ui/LeftPanel';
import { RoleToggle } from '../components/login/ui/RoleToggle';
import { SuccessMessage } from '../components/login/ui/SuccessMessage';
import { ErrorBanner } from '../components/login/ui/ErrorBanner';
import { EmailInput } from '../components/login/ui/EmailInput';
import { PasswordInput } from '../components/login/ui/PasswordInput';
import { SubmitButton } from '../components/login/ui/SubmitButton';
import { GoogleSSO } from '../components/login/ui/GoogleSSO';

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

  return (
    <>
      <FontLoader />
      <GlobalStyles />

      <div className="login-root">
        <LeftPanel />

        <div className="login-right">
          <div className="form-inner">
            <h1 className="welcome-head">Welcome back.</h1>
            <p className="welcome-sub">
              {role === 'admin'
                ? 'Sign in to the administration panel.'
                : 'Sign in to your resident account.'}
            </p>

            <RoleToggle role={role} handleRoleSwitch={handleRoleSwitch} />

            {success ? (
              <SuccessMessage role={role} />
            ) : (
              <>
                {error && <ErrorBanner error={error} />}
                <EmailInput
                  role={role}
                  email={email}
                  setEmail={setEmail}
                  handleSubmit={handleSubmit}
                />
                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  showPass={showPass}
                  setShowPass={setShowPass}
                  handleSubmit={handleSubmit}
                />
                <div className="forgot-row">
                  <button className="forgot-link" type="button">
                    Forgot your password?
                  </button>
                </div>
                <SubmitButton loading={loading} handleSubmit={handleSubmit} />
                <div className="form-divider">or</div>
                <GoogleSSO />
              </>
            )}
          </div>

          <div className="right-footer">
            Opus Dei Prelature · Sarangani · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
}
