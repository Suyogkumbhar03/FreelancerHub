import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight, Briefcase, UserCheck, Sparkles, X } from 'lucide-react';
import { apiLogin, apiDemoLogin } from '../api';

export default function LoginModal({
  initialRole = 'freelancer',
  onClose,
  onSwitchToRegister,
  onAuthSuccess,
  onLoginSuccess
}) {
  const handleSuccess = onAuthSuccess || onLoginSuccess;
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Standard email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiLogin(email, password);
      if (typeof handleSuccess === 'function') {
        handleSuccess(data.user, data.token);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Incorrect email or password. Please check your details or create a new account.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Demo Login
  const handleQuickDemoLogin = async (demoRole) => {
    setError('');
    setLoading(true);
    try {
      const data = await apiDemoLogin(demoRole);
      if (typeof handleSuccess === 'function') {
        handleSuccess(data.user, data.token);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Could not log in to demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="live-tag">LOG IN</span>
            <h2>Log In to Your Account</h2>
            <p className="modal-sub-title">Choose whether you are working as a Freelancer or hiring as a Client.</p>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="auth-role-tabs card-box" style={{ marginBottom: '18px' }}>
          <button
            type="button"
            className={`role-tab-btn ${role === 'freelancer' ? 'active' : ''}`}
            onClick={() => setRole('freelancer')}
          >
            <Briefcase size={20} />
            <div>
              <strong>I am a Freelancer</strong>
              <p>Find jobs and earn money</p>
            </div>
          </button>

          <button
            type="button"
            className={`role-tab-btn ${role === 'client' ? 'active' : ''}`}
            onClick={() => setRole('client')}
          >
            <UserCheck size={20} />
            <div>
              <strong>I am a Client</strong>
              <p>Post jobs and hire talent</p>
            </div>
          </button>
        </div>

        {/* 1-CLICK INSTANT DEMO LOGIN */}
        <div className="demo-accounts-box card-box" style={{ background: '#f8fafc', padding: '14px 16px', marginBottom: '18px', border: '1px dashed #cbd5e1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '0.8rem', fontWeight: 700, marginBottom: '10px' }}>
            <Sparkles size={14} className="text-blue" />
            <span>TRY INSTANT 1-CLICK DEMO:</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              type="button"
              className="btn-secondary btn-sm"
              style={{ padding: '8px 10px', fontSize: '0.8rem', textAlign: 'left', background: role === 'freelancer' ? '#eff6ff' : 'white', borderColor: role === 'freelancer' ? '#93c5fd' : '#e2e8f0' }}
              onClick={() => handleQuickDemoLogin('freelancer')}
              disabled={loading}
            >
              <strong>⚡ Pratik</strong>
              <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b' }}>Freelancer Account</span>
            </button>
            <button
              type="button"
              className="btn-secondary btn-sm"
              style={{ padding: '8px 10px', fontSize: '0.8rem', textAlign: 'left', background: role === 'client' ? '#eff6ff' : 'white', borderColor: role === 'client' ? '#93c5fd' : '#e2e8f0' }}
              onClick={() => handleQuickDemoLogin('client')}
              disabled={loading}
            >
              <strong>⚡ Suyog</strong>
              <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b' }}>Client Account</span>
            </button>
          </div>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder={role === 'freelancer' ? 'pratik@freelancehub.com' : 'suyog@freelancehub.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password *</label>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="escrow-notice-banner">
            <ShieldCheck size={18} className="text-blue" />
            <p>Your password and account are safe and secure.</p>
          </div>

          <div className="modal-footer justify-between">
            <button
              type="button"
              className="toggle-auth-link"
              onClick={() => onSwitchToRegister(role)}
            >
              New here? <strong>Sign Up Free</strong>
            </button>

            <button type="submit" className="btn-primary" disabled={loading}>
              <span>{loading ? 'Logging in...' : `Log In as ${role === 'freelancer' ? 'Freelancer' : 'Client'}`}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
